import { TableColumn } from '../../../../components/ui/Table/Table';
import { Product } from '../../../../types/product.type';
import { Actions } from './actions';

export const columns = (
  fetchProducts: ({
    page,
    limit,
  }: {
    page: string;
    limit: string;
  }) => Promise<void>,
  { page, limit }: { page: string; limit: string },
): TableColumn<Product & { action?: string }>[] => [
  { key: 'id', title: 'ID' },
  { key: 'name', title: 'Name' },
  {
    key: 'category',
    title: 'Category',
    renderRow: (row) => <span>{row.category.name}</span>,
  },
  { key: 'description', title: 'Description' },
  { key: 'price', title: 'Price' },
  { key: 'quantity', title: 'Quantity' },
  {
    key: 'action',
    title: 'Actions',
    renderRow: (row) => (
      <Actions
        rowId={row.id}
        fetchProducts={() => fetchProducts({ page, limit })}
        page={page}
        limit={limit}
      />
    ),
  },
];
