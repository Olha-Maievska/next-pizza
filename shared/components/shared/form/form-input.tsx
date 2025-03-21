'use client'

import React from 'react'
import { Input } from '../../ui'
import { ClearButton, ErrorText, RequiredSymbol } from '../index'
import { useFormContext } from 'react-hook-form'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  name: string
  label?: string
  required?: boolean
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()
  const value = watch(name)
  const errorText = errors[name]?.message as string

  const onClickClear = () => {
    setValue(name, '')
  }

  return (
    <div className={className}>
      {label && (
        <p>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input
          className="h-12 text-md"
          {...props}
          {...register(name, {
            onChange: (e) => setValue(name, e.target.value),
          })}
          value={value}
        />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      <ErrorText className="mt-2" text={errorText} />
    </div>
  )
}
