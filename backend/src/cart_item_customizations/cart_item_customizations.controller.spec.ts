import { Test, TestingModule } from '@nestjs/testing';
import { CartItemCustomizationsController } from './cart_item_customizations.controller';
import { CartItemCustomizationsService } from './cart_item_customizations.service';

describe('CartItemCustomizationsController', () => {
  let controller: CartItemCustomizationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartItemCustomizationsController],
      providers: [CartItemCustomizationsService],
    }).compile();

    controller = module.get<CartItemCustomizationsController>(CartItemCustomizationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
