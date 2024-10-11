import { Repository } from 'typeorm';
import DatabaseInstance from '../Database';
import ProductImage from '../entities/ProductImage.entity';

export class ProductImageRepository {
  private productImageRepository: Repository<ProductImage>;

  constructor() {
    if (DatabaseInstance) {
      this.productImageRepository =
        DatabaseInstance.getAppDataSource().getRepository(ProductImage);
    }
  }

  async addProductImage({
    path,
    productId,
  }: {
    path: string;
    productId: number;
  }): Promise<ProductImage> {
    const newProductImage = this.productImageRepository.create({
      path,
      product: { id: productId },
    });
    return await this.productImageRepository.save(newProductImage);
  }
}

const productImageRepository = new ProductImageRepository();
export default productImageRepository;
