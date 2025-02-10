import { Test, TestingModule } from '@nestjs/testing';
import { OrderCustomizationsController } from './order_customizations.controller';
import { OrderCustomizationsService } from './order_customizations.service';

describe('OrderCustomizationsController', () => {
  let controller: OrderCustomizationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderCustomizationsController],
      providers: [OrderCustomizationsService],
    }).compile();

    controller = module.get<OrderCustomizationsController>(OrderCustomizationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
