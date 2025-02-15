import { Test, TestingModule } from '@nestjs/testing';
import { CartItemCustomizationsService } from './cart_item_customizations.service';

describe('CartItemCustomizationsService', () => {
  let service: CartItemCustomizationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartItemCustomizationsService],
    }).compile();

    service = module.get<CartItemCustomizationsService>(CartItemCustomizationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
