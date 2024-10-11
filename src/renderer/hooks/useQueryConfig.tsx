import { ProductListConfig } from '../types/product.type';
import useQueryParams from './useQueryParams';

export type QueryConfig = {
  [key in keyof ProductListConfig]: string;
};
export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams();
  const queryConfig: QueryConfig = {
    page: queryParams.page || '1',
    limit: queryParams.limit || '10',
    perPage: queryParams.perPage || '10',
  };

  return queryConfig;
}
