import { ProductSale } from './productsale';

export class Sale {
  buyer?: string;
  date?: Date;
  products: ProductSale[] = [];
  totalPrice: Number = 0;
}
