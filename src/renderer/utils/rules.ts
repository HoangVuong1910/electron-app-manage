import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup.string().required().max(160, 'Độ dài tối đa là 160 ký tự'),
  category: yup.string().required().max(20, 'Độ dài tối đa là 20 ký tự'),
  description: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  price: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  quantity: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  productImage: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
});

export type ProductSchema = yup.InferType<typeof productSchema>;
