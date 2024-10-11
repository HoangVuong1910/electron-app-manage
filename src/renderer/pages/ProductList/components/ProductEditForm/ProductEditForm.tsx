import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Button from '../../../../components/common/Button';
import { productSchema, ProductSchema } from '../../../../utils/rules';
import Input from '../../../../components/common/Input';
import InputNumber from '../../../../components/common/InputNumber';
import { Category } from '../../../../types/category.type';
import Select from '../../../../components/common/Select';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../../../types/product.type';

type FormData = Pick<
  ProductSchema,
  'name' | 'description' | 'category' | 'price' | 'quantity' | 'productImage'
>;

export default function ProductEditForm() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      description: '',
      category: '',
      price: '',
      quantity: '',
      productImage: '',
    },
    resolver: yupResolver(productSchema),
  });
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = methods;

  const fetchDetailProduct = useCallback(async () => {
    try {
      const product: Product = await window.electron.ipcRenderer.invoke(
        'get-detail-product',
        id,
      );

      if (product) {
        setValue('name', product.name);
        setValue('description', product.description);
        setValue('category', product.category.name);
        setValue('price', String(product.price));
        setValue('quantity', String(product.quantity));
      }
    } catch (error) {
      console.log(error);
    }
  }, [id, setValue]);

  useEffect(() => {
    fetchDetailProduct();
  }, [fetchDetailProduct]);

  useEffect(() => {
    const fetchCategories = async () => {
      const result =
        await window.electron.ipcRenderer.invoke('get-all-categories');
      console.log(result);
      setCategoryList(result);
    };

    fetchCategories();
  }, []);

  const reset = () => {
    setValue('name', '');
    setValue('description', '');
    setValue('category', '');
    setValue('price', '');
    setValue('quantity', '');
    setValue('productImage', '');
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      let product;

      (product = await window.electron.ipcRenderer.invoke('update-product', {
        id,
        name: data.name,
        description: data.description,
        price: Number(data.price),
        quantity: Number(data.quantity),
        categoryId: Number(data.category),
      })),
        reset();
      navigate('/manage/products');
      // toast.success('Thêm sản phẩm thành công');
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          Sửa sản phẩm
        </h1>
      </div>
      <FormProvider {...methods}>
        <form
          className="mt-8 flex flex-col-reverse md:flex-row md:items-start"
          onSubmit={onSubmit}
        >
          {/* form information */}
          <div className="mt-6 flex-grow md:mt-0 md:pr-12">
            {/* row item name*/}
            <div className="mt-6 flex flex-col flex-wrap sm:flex-row">
              <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
                Tên
              </div>
              <div className="sm:w-[80%] sm:pl-5">
                <Input
                  classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                  register={register}
                  name="name"
                  placeholder="Tên"
                  errorMessage={errors.name?.message}
                />
              </div>
            </div>
            {/* row item description*/}
            <div className="mt-6 flex flex-col flex-wrap sm:flex-row">
              <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
                Mô tả
              </div>
              <div className="sm:w-[80%] sm:pl-5">
                <Input
                  classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                  register={register}
                  name="description"
                  placeholder="Mô tả"
                  errorMessage={errors.description?.message}
                />
              </div>
            </div>
            {/* row item category*/}

            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  errorMessage={errors.category?.message}
                  onChange={field.onChange}
                  list={categoryList}
                  value={field.value}
                />
              )}
            />
            {/* row item price*/}
            <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
              <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
                Giá bán
              </div>
              <div className="sm:w-[80%] sm:pl-5">
                <Controller
                  control={control}
                  name="price"
                  render={({ field }) => (
                    <InputNumber
                      classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                      placeholder="Giá bán"
                      errorMessage={errors.price?.message}
                      {...field}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
            {/* row item Quantity*/}
            <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
              <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
                Số lượng trong kho
              </div>
              <div className="sm:w-[80%] sm:pl-5">
                <Controller
                  control={control}
                  name="quantity"
                  render={({ field }) => (
                    <InputNumber
                      classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                      placeholder="Số lượng trong kho"
                      errorMessage={errors.quantity?.message}
                      {...field}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            {/* button save */}
            <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
              <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right"></div>
              <div className="sm:w-[80%] sm:pl-5">
                <Button
                  className="bg-[#0b51b7] hover:bg-[#0b51b7]/90 text-white h-9 px-3 py-2 text-sm"
                  type="submit"
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
