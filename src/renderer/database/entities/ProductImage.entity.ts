import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Relation,
} from 'typeorm';
import Product from './Product.entity';
@Entity('ProductImage')
export default class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  path: string;

  @ManyToOne(() => Product, (product) => product.product_images)
  product: Relation<Product>;
}
