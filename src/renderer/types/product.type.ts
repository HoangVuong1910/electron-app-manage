import { Category } from './category.type';

export type Product = {
  id: number;
  name: string;
  category: Category;
  description: string;
  price: number;
  quantity: number;
  isDeleted: number;
};

export interface ProductListConfig {
  page?: number | string;
  limit?: number | string;
  perPage?: number | string;
}
