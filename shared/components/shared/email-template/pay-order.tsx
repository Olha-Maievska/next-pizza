import * as React from 'react'

interface Props {
  firstName: string
  orderID: string
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
    <h2>Dear {firstName}!</h2>
    <p>
      Pay for the order #{orderID} in the amount of {totalAmount} $ now!
    </p>
    <p>
      Follow <a href={paymantLink}>this link</a> to pay for your order{' '}
    </p>
    <p>Thank you for your understanding</p>
    <p>Next Pizza</p>
  </div>
)
