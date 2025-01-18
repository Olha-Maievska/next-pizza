import React from 'react'
import { Container } from '../container'
import Image from 'next/image'
import { Title } from '../title'
import Link from 'next/link'
import { cn } from '@/shared/lib/utils'

interface Props {
  className?: string
}

export const CheckoutEmptyCart: React.FC<Props> = ({ className }) => {
  return (
    <Container className={cn(className, 'mt-28')}>
      <div className="flex flex-col items-center">
        <Image
          src="/images/empty-cart.svg"
          alt="empty cart"
          width={250}
          height={250}
        />
        <Title
          text="Checkout is not available. Your cart is empty"
          size="lg"
          className="font-extrabold my-8"
        />
        <p className="text-gray-600 text-lg mb-5">
          Add at least one pizza to the cart
        </p>
        <Link
          href="/"
          className="text-primary font-semibold border border-primary px-4 py-2 rounded-md"
        >
          Go home
        </Link>
      </div>
    </Container>
  )
}
