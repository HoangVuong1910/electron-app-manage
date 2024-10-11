import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Relation,
} from 'typeorm';
import ProductImage from './ProductImage.entity';
import Category from './Category.entity';
@Entity('Product')
export default class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('double')
  price: number;

  @Column()
  quantity: number;

  @Column()
  isDeleted: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Relation<Category>;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  product_images: Relation<ProductImage>[];
  product: { id: number };
}
