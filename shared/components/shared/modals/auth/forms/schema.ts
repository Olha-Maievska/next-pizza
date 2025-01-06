import { z } from 'zod'

export const passwordSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters' })

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: passwordSchema,
})

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullname: z
        .string()
        .min(2, { message: 'Fullname must be at least 2 characters' }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type FormLoginType = z.infer<typeof formLoginSchema>
export type FormRegisterType = z.infer<typeof formRegisterSchema>
