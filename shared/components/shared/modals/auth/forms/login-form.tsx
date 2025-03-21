'use client'

import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { formLoginSchema, FormLoginType } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Title } from '../../../title'
import { FormInput } from '../../../form'
import { Button } from '@/shared/components/ui'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'

interface Props {
  onClose?: VoidFunction
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<FormLoginType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formLoginSchema),
  })

  const onSubmit = async (data: FormLoginType) => {
    try {
      const response = await signIn('credentials', { ...data, redirect: false })

      if (!response?.ok) {
        throw Error()
      }

      toast.success('Logged in successfully', {
        icon: '✅',
      })

      onClose?.()
    } catch (error) {
      console.log('Error [LOGIN]', error)
      toast.error('Error logging in', {
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
        <div className="flex justify-between items-center">
          <div className="mr-6">
            <Title text="Sign in" size="md" className="font-bold" />
            <p className="text-gray-400">
              Enter your email address to log into your account
            </p>
          </div>
          <img
            src="/images/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>

        <FormInput name="email" label="Email" required />
        <FormInput name="password" label="Password" type="password" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Sign in
        </Button>
      </form>
    </FormProvider>
  )
}
