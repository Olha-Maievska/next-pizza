'use client'

import React from 'react'
import { CheckoutContentBlock } from './checkout-content-block'
import { FormInput, FormTextarea } from '../form'
import { Controller, useFormContext } from 'react-hook-form'
import { ErrorText } from '../error-text'
import AddressInput from './address-input'

interface Props {
  className?: string
  loading?: boolean
}

export const CheckoutAddress: React.FC<Props> = ({ className, loading }) => {
  const { control } = useFormContext()

  return (
    <CheckoutContentBlock className={className} title="3. Address details">
      <div className="flex flex-col gap-5">
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => {
            if (loading) {
              return (
                <FormInput name="address" placeholder="Enter address here" />
              )
            } else {
              return (
                <>
                  <AddressInput onChange={field.onChange} value={field.value} />
                  {fieldState.error?.message && (
                    <ErrorText text={fieldState.error.message} />
                  )}
                </>
              )
            }
          }}
        />

        <FormTextarea
          className="mb-2"
          name="comment"
          rows={5}
          placeholder="Comments (optional)"
        />
      </div>
    </CheckoutContentBlock>
  )
}
