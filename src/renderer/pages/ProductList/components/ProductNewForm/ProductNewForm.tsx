import { useContext, useEffect, useMemo, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import Button from '../../../../components/common/Button';
import InputFile from '../../../../components/common/InputFile';
import { productSchema, ProductSchema } from '../../../../utils/rules';
import Input from '../../../../components/common/Input';
import InputNumber from '../../../../components/common/InputNumber';
import { Category } from '../../../../types/category.type';
import Select from '../../../../components/common/Select';
import { generateRandomImageId } from '../../../../utils/file';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type FormData = Pick<
  ProductSchema,
  'name' | 'description' | 'category' | 'price' | 'quantity' | 'productImage'
>;

export default function ProductNewForm() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File>();
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : '';
  }, [file]);

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
      if (!file) {
        product = await window.electron.ipcRenderer.invoke('add-product', {
          name: data.name,
          description: data.description,
          price: Number(data.price),
          quantity: Number(data.quantity),
          categoryId: Number(data.category),
        });
      }
      const newFileName = generateRandomImageId();
      setValue('productImage', newFileName);
      // await Promise.all([]);
      (product = await window.electron.ipcRenderer.invoke('add-product', {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        quantity: Number(data.quantity),
        categoryId: Number(data.category),
      })),
        await window.electron.ipcRenderer.invoke('add-product-image', {
          path: newFileName,
          productId: product.id,
        });
      reset();
      navigate('/manage/products');
      // toast.success('Thêm sản phẩm thành công');
    } catch (error) {
      console.log(error);
    }
  });

  const handleChangeInputFile = (file?: File) => {
    setFile(file);
  };

  return (
    <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          Thêm sản phẩm
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

          {/* form upload image */}
          <div className="md-border-l flex justify-center md:w-72 md:border-l-gray-200">
            <div className="flex flex-col items-center">
              <div className="my-5 h-48 w-48">
                <img
                  src={previewImage}
                  alt=""
                  className="h-full w-full  object-cover"
                />
              </div>

              <InputFile onChange={handleChangeInputFile} />
              <div className="mt-3 text-gray-400">
                <div>Dụng lượng file tối đa 1 MB</div>
                <div>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
