import { Test, TestingModule } from '@nestjs/testing';
import { OrderCustomizationsService } from './order_customizations.service';

describe('OrderCustomizationsService', () => {
  let service: OrderCustomizationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderCustomizationsService],
    }).compile();

    service = module.get<OrderCustomizationsService>(OrderCustomizationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
