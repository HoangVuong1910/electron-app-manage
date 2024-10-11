import Table from '../../components/ui/Table/Table';
import { CiCirclePlus } from 'react-icons/ci';
import ProductSearch from './components/ProductSearch';
import { useCallback, useEffect, useState } from 'react';
import { Product } from '../../types/product.type';
import { columns } from './components/Tables/columns';
import { Link } from 'react-router-dom';
import path from '../../constants/path';
import Pagination from '../../components/common/Pagination';
import useQueryConfig from '../../hooks/useQueryConfig';

const ProductList = () => {
  const queryConfig = useQueryConfig();
  const [productList, setProductList] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = useCallback(
    async ({ page, limit }: { page: string; limit: string }) => {
      const result = await window.electron.ipcRenderer.invoke(
        'get-all-products',
        { page, limit },
      );
      console.log(result);
      setProductList(result.products);
      setTotalProducts(result.total);
    },
    [],
  );

  useEffect(() => {
    fetchProducts({
      page: queryConfig.page as string,
      limit: queryConfig.limit as string,
    });
  }, [fetchProducts, queryConfig.page, queryConfig.limit]);

  const totalPages = Math.ceil(totalProducts / Number(queryConfig.limit));

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold">Products</h2>
          <div className="flex gap-4">
            <ProductSearch />
            <Link
              to={path.addProduct}
              className="bg-[#0b51b7] hover:bg-[#0b51b7]/90 text-white h-9 px-3 py-2 text-sm"
            >
              <div className="flex items-center justify-center w-full h-full">
                <CiCirclePlus className="w-5 h-5 bg-inherit" />
                <span className="ml-1">Add Product</span>
              </div>
            </Link>
          </div>
        </div>

        <Table
          rowKey="id"
          rows={productList}
          columns={columns(fetchProducts, {
            page: queryConfig.page as string,
            limit: queryConfig.limit as string,
          })}
        />

        <Pagination queryConfig={queryConfig} pageSize={totalPages} />
      </div>
    </div>
  );
};

export default ProductList;
