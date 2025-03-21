'use client'

import React from 'react'
import { CheckoutContentBlock } from './checkout-content-block'
import { FormInput } from '../form'

interface Props {
  className?: string
}

export const CheckoutPersonalData: React.FC<Props> = ({ className }) => {
  return (
    <CheckoutContentBlock className={className} title="2. Personal details">
      <div className="grid grid-cols-2 gap-5">
        <FormInput
          className="text-base"
          name="firstName"
          placeholder="First name"
        />
        <FormInput
          className="text-base"
          name="lastName"
          placeholder="Last name"
        />

        <FormInput className="text-base" name="email" placeholder="Email" />

        <FormInput
          className="text-base"
          name="phone"
          placeholder="Phone"
          type="number"
        />
      </div>
    </CheckoutContentBlock>
  )
}
