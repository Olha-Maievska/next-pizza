import zod from 'zod'

export const checkoutFormSchema = zod.object({
  firstName: zod
    .string()
    .min(2, { message: 'First name must be at least 2 characters' }),
  lastName: zod
    .string()
    .min(2, { message: 'Last name must be at least 2 characters' }),
  email: zod.string().email({ message: 'Invalid email address' }),
  phone: zod.string().min(10, { message: 'Invalid phone number' }),
  address: zod
    .string()
    .min(5, { message: 'Address must be at least 5 characters' }),
  comment: zod.string().optional(),
})

export type CheckoutFormType = zod.infer<typeof checkoutFormSchema>
