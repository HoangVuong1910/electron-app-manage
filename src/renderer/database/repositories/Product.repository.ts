import { Repository } from 'typeorm';
import Product from '../entities/Product.entity';
import DatabaseInstance from '../Database';

export class ProductRepository {
  private productRepository: Repository<Product>;

  constructor() {
    if (DatabaseInstance) {
      this.productRepository =
        DatabaseInstance.getAppDataSource().getRepository(Product);
    }
  }

  async getAllProducts({
    page,
    limit,
  }: {
    page: string;
    limit: string;
  }): Promise<{ products: Product[]; total: number }> {
    const offset: number = (Number(page) - 1) * Number(limit);
    const [products, total] = await this.productRepository.findAndCount({
      relations: ['category.parent', 'product_images'],
      skip: offset,
      take: Number(limit),
    });

    return { products, total };
  }

  async addProduct({
    name,
    description = '',
    price,
    quantity,
    categoryId,
  }: {
    name: string;
    description?: string;
    price: number;
    quantity: number;
    categoryId: number;
  }): Promise<Product> {
    const newProduct = this.productRepository.create({
      name,
      description,
      price,
      quantity,
      category: { id: categoryId },
    });
    return await this.productRepository.save(newProduct);
  }

  async getProductById(id: number): Promise<Product | null> {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['category.parent', 'product_images'],
    });
  }

  async updateProduct({
    id,
    name,
    description = '',
    price,
    quantity,
    categoryId,
  }: {
    id: number;
    name: string;
    description?: string;
    price: number;
    quantity: number;
    categoryId: number;
  }): Promise<Product | null> {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) return null;

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (quantity) product.quantity = quantity;
    if (categoryId) product.category = { id: categoryId };

    return await this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) return null;

    product.isDeleted = 0;

    return await this.productRepository.save(product);
  }
}

const productRepository = new ProductRepository();
export default productRepository;
