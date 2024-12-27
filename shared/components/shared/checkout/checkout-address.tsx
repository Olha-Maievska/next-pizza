'use client'

import React from 'react'
import { CheckoutContentBlock } from './checkout-content-block'
import { FormTextarea } from '../form'
import { Controller, useFormContext } from 'react-hook-form'
import { ErrorText } from '../error-text'
import AddressInput from './address-input'

interface Props {
  className?: string
}

export const CheckoutAddress: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext()

  return (
    <CheckoutContentBlock className={className} title="3. Address details">
      <div className="flex flex-col gap-5">
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </>
          )}
        />

        <FormTextarea
          className="text-base mb-2"
          name="comment"
          rows={5}
          placeholder="Comments (optional)"
        />
      </div>
    </CheckoutContentBlock>
  )
}
