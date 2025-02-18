import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { CartItem } from './entities/cart_item.entity';
import { CartItemCustomization } from '../cart_item_customizations/entities/cart_item_customization.entity';
import { CustomizationOptions } from '../customization_options/customization_options.entity';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(CustomizationOptions)
    private customizationOptionRepository: Repository<CustomizationOptions>,
    @InjectRepository(CartItemCustomization)
    private cartItemCustomizationRepository: Repository<CartItemCustomization>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<CartItem[]> {
    const items = await this.cartItemRepository.find({
      relations: {
        cart: true,
        recipe: true,
        customizations: {
          customizationOption: true,
        },
      },
    });

    return items;
  }

  async findOne(id: number): Promise<CartItem> {
    const item = await this.cartItemRepository.findOne({
      where: { id },
      relations: {
        cart: true,
        recipe: true,
        customizations: {
          customizationOption: true,
        },
      },
    });

    return item;
  }

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // カートアイテムの作成
      const item = this.cartItemRepository.create({
        cart_id: createCartItemDto.cart_id,
        recipe_id: createCartItemDto.recipe_id,
        quantity: createCartItemDto.quantity,
        special_request: createCartItemDto.special_request,
      });
      const savedItem = await queryRunner.manager.save(CartItem, item);

      // カスタマイズオプションの作成
      if (createCartItemDto.customizations?.length) {
        const customizationPromises = createCartItemDto.customizations.map(
          async (customization) => {
            // カスタマイズオプションの存在確認
            const option = await this.customizationOptionRepository.findOne({
              where: { id: customization },
            });

            if (!option) {
              throw new NotFoundException(
                `CustomizationOption with ID "${customization}" not found`,
              );
            }

            const cartItemCustomization =
              this.cartItemCustomizationRepository.create({
                cart_item_id: savedItem.id,
                customization_option_id: customization,
              });

            return queryRunner.manager.save(
              CartItemCustomization,
              cartItemCustomization,
            );
          },
        );

        await Promise.all(customizationPromises);
      }

      await queryRunner.commitTransaction();
      return this.findOne(savedItem.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    id: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 既存のアイテムを確認
      const existingItem = await this.findOne(id);

      // 基本情報の更新
      const updatedItem = Object.assign(existingItem, {
        quantity: updateCartItemDto.quantity,
      });

      await queryRunner.manager.save(CartItem, updatedItem);

      // カスタマイズの更新
      if (updateCartItemDto.customizations?.length) {
        // 既存のカスタマイズを削除
        await queryRunner.manager.delete(CartItemCustomization, {
          cart_item_id: id,
        });

        // 新しいカスタマイズを追加
        const customizationPromises = updateCartItemDto.customizations.map(
          async (customization) => {
            const cartItemCustomization =
              this.cartItemCustomizationRepository.create({
                cart_item_id: id,
                customization_option_id: customization,
              });
            return queryRunner.manager.save(
              CartItemCustomization,
              cartItemCustomization,
            );
          },
        );

        await Promise.all(customizationPromises);
      }

      await queryRunner.commitTransaction();
      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: number): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // カートアイテムの存在確認
      const item = await this.findOne(id);

      // 関連するカスタマイズを先に削除
      await queryRunner.manager.delete(CartItemCustomization, {
        cart_item_id: id,
      });

      // カートアイテムを削除
      await queryRunner.manager.delete(CartItem, id);

      await queryRunner.commitTransaction();
      return `CartItem with ID "${id}" has been deleted`;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
