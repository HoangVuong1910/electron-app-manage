import 'reflect-metadata';
import { DataSource } from 'typeorm';
import path from 'path';
import Category from './entities/Category.entity';
import Product from './entities/Product.entity';
import ProductImage from './entities/ProductImage.entity';

const uri = path.join(
  __dirname,
  '../renderer/database/scripts/electron-app-product-manage.sqlite',
);

class Database {
  private uri: string = path.join(
    __dirname,
    '../renderer/database/scripts/electron-app-product-manage.sqlite',
  );
  private static instance: Database;
  private AppDataSource: DataSource;

  private constructor() {
    this.AppDataSource = new DataSource({
      type: 'sqlite',
      database: this.uri,
      synchronize: false,
      logging: true,
      entities: [Category, Product, ProductImage],
      entitySkipConstructor: true,
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async initialize(): Promise<void> {
    try {
      if (!this.AppDataSource.isInitialized) {
        await this.AppDataSource.initialize();
        console.log('connect to sqlite successfully');
      } else {
        console.log('Already initialized.');
      }
    } catch (error) {
      console.error('Failed to connect to sqlite', error);
    }
  }

  public getAppDataSource(): DataSource {
    return this.AppDataSource;
  }
}

const DatabaseInstance = Database.getInstance();
export default DatabaseInstance;
