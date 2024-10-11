import { Repository } from 'typeorm';
import DatabaseInstance from '../Database';
import Category from '../entities/Category.entity';

export class CategoryRepository {
  private categoryRepository: Repository<Category>;

  constructor() {
    if (DatabaseInstance) {
      this.categoryRepository =
        DatabaseInstance.getAppDataSource().getRepository(Category);
    }
  }

  getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: ['parent'],
    });
  }
}

const categoryRepository = new CategoryRepository();
export default categoryRepository;
