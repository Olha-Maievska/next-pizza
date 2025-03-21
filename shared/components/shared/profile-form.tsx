'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  formRegisterSchema,
  FormRegisterType,
} from './modals/auth/forms/schema'
import { User } from '@prisma/client'
import toast from 'react-hot-toast'
import { signOut } from 'next-auth/react'
import { Container } from './container'
import { Title } from './title'
import { FormInput } from './form'
import { Button } from '../ui'
import { updateUserInfo } from '@/app/actions'
import Image from 'next/image'

interface Props {
  data: User
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullname: data.fullname,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: FormRegisterType) => {
    try {
      await updateUserInfo({
        fullname: data.fullname,
        email: data.email,
        password: data.password,
      })
      toast.success('Data updated', {
        icon: '✅',
      })
    } catch (error) {
      console.log(error)
      toast.error('Error updating data', {
        icon: '❌',
      })
    }
  }

  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    })
  }

  return (
    <Container className="my-10">
      <Title text="Personal Information" size="md" className="font-bold" />
      <div className="flex justify-between">
        <FormProvider {...form}>
          <form
            className="flex flex-col gap-5 w-96 mt-10"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormInput name="fullname" label="Full Name" required />
            <FormInput name="email" label="Email" required />

            <FormInput
              name="password"
              label="New password"
              type="password"
              required
            />
            <FormInput
              name="confirmPassword"
              label="Confirm password"
              type="password"
              required
            />

            <Button
              className="text-base mt-10"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Save
            </Button>

            <Button
              className="text-base"
              variant="secondary"
              type="button"
              onClick={onClickSignOut}
              disabled={form.formState.isSubmitting}
            >
              Sign out
            </Button>
          </form>
        </FormProvider>
        <div className="w-1/2 h-auto rounded-3xl">
          <Image
            src="/images/profile_picture.jpg"
            className="w-full h-full object-cover rounded-3xl"
            width={640}
            height={580}
            alt="Profile picture"
            priority
          />
        </div>
      </div>
    </Container>
  )
}
