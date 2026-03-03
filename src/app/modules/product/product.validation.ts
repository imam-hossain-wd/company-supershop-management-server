import { z } from 'zod';

 const createProductZodSchema = z.object({
    body: z.object({
      name: z.string({
        message: 'name is required',
      }),
      category: z.string({
        message: 'category is required',
      }),
      image: z.string({
        message: 'image is required',
      }),
      availability: z.boolean({
        message: 'availability is required',
      }),
      netWeight: z.string({
        message: 'netWeight is required',
      }),
      description: z.string({
        message: 'description is required',
      }),
      price: z.number({
        message: 'price is required',
      }),
      quantity: z.number({
        message: 'quantity is required',
      }),
    }),
  });
export const ProductValidation= {
    createProductZodSchema
}