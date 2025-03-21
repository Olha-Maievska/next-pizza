import * as z from 'zod'

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(9, { message: 'Invalid phone number' }),
  address: z
    .string()
    .min(5, { message: 'Address must be at least 5 characters' }),
  comment: z.string().optional(),
})

export type CheckoutFormType = z.infer<typeof checkoutFormSchema>
