import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  Relation,
} from 'typeorm';
import Product from './Product.entity';
@Entity('Category')
export default class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @OneToOne(() => Category)
  @JoinColumn()
  parent: Category;

  @OneToMany(() => Product, (product) => product.category)
  products: Relation<Product>[];
}
