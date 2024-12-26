import React from 'react'
import { CheckoutContentBlock } from './checkout-content-block'
import { Input } from '../../ui'
import { Textarea } from '../../ui/textarea'

interface Props {
  className?: string
}

export const CheckoutAddress: React.FC<Props> = ({ className }) => {
  return (
    <CheckoutContentBlock className={className} title="3. Address details">
      <div className="flex flex-col gap-5">
        <Input className="text-base" name="address" placeholder="Addres ..." />
        <Textarea
          className="text-base"
          rows={5}
          placeholder="Comments (optional)"
        />
      </div>
    </CheckoutContentBlock>
  )
}
