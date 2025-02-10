import { PaymentMethod } from 'src/orders/order-payment-method.enum';
import { OrderStatus } from 'src/orders/order-status.enum';

export interface Order {
  id: number;
  userId: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentDetails: string;
  createdAt: string;
  updatedAt: string;
}
