import * as React from 'react'

export interface Props {
  firstName: string
  orderID: number
  totalAmount: number
  paymantLink: string
}

export const PayOrderTemplate: React.FC<Props> = ({
  firstName,
  orderID,
  totalAmount,
  paymantLink,
}) => (
  <div>
    <h4>Dear {firstName}!</h4>
    <p>
      Pay for the <b>order #{orderID}</b> in the amount of <b>${totalAmount}</b>{' '}
      now! Follow <a href={paymantLink}>this link</a> to pay for your order.
    </p>
    <p className="font-bold">Next Pizza team!</p>
  </div>
)
