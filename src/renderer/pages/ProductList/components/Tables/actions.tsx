import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ConfirmPopup from '../../../../components/common/ConfirmPopup';

interface Props {
  rowId: number;
  fetchProducts: ({
    page,
    limit,
  }: {
    page: string;
    limit: string;
  }) => Promise<void>;
  page: string;
  limit: string;
}

export const Actions = ({ rowId, fetchProducts, page, limit }: Props) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const handleDeleteClick = () => {
    setSelectedProduct(rowId);
    setShowPopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await window.electron.ipcRenderer.invoke('delete-product', rowId);
      setShowPopup(false);
      setSelectedProduct(null);
      await fetchProducts({ page, limit });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  return (
    <div className="flex items-center gap-4">
      <Link to={`/manage/edit-product/${rowId}`}>
        <FaRegEdit className="w-4 h-4 text-gray-600" />
      </Link>
      <button onClick={handleDeleteClick}>
        <AiOutlineDelete className="w-4 h-4 text-gray-600" />
      </button>

      {showPopup && selectedProduct === rowId && (
        <ConfirmPopup
          message="Bạn có chắc chắn muốn xóa sản phẩm này không?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};
