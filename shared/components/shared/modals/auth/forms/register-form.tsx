'use client'

import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { formRegisterSchema, FormRegisterType } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Title } from '../../../title'
import { FormInput } from '../../../form'
import { Button } from '@/shared/components/ui'
import toast from 'react-hot-toast'
import { registerUser } from '@/app/actions'

interface Props {
  onClose?: VoidFunction
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<FormRegisterType>({
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(formRegisterSchema),
  })

  const onSubmit = async (data: FormRegisterType) => {
    try {
      await registerUser({
        email: data.email,
        fullname: data.fullname,
        password: data.password,
      })

      toast.success('Registration was successful! Please check your email', {
        icon: '✅',
      })

      onClose?.()
    } catch (error) {
      console.log('Error [REGISTRATION]', error)
      toast.error('Registration error', {
        icon: '❌',
      })
    }
  }

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Title text="Registration" size="md" className="font-bold" />

        <FormInput name="fullname" label="Full name" required />
        <FormInput name="email" label="Email" required />
        <FormInput name="password" label="Password" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Confirm password"
          type="password"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Sign up now
        </Button>
      </form>
    </FormProvider>
  )
}
