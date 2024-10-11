import { useRoutes } from 'react-router-dom';
import path from './constants/path';
import ProductList from './pages/ProductList';
import MainLayout from './components/layouts/MainLayout';
import ProductNewForm from './pages/ProductList/components/ProductNewForm';
import ProductEditForm from './pages/ProductList/components/ProductEditForm';

function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: path.manage,
      element: <MainLayout />,
      children: [
        {
          path: path.products,
          element: <ProductList />,
        },
        {
          path: path.addProduct,
          element: <ProductNewForm />,
        },
        {
          path: path.editProduct,
          element: <ProductEditForm />,
        },
      ],
    },
  ]);
  return routeElement;
}

export default useRouteElement;
