export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { prisma } from '@/prisma/prisma-client'
import { OrderSuccessTemplate } from '@/shared/components/shared/email-template/order-success'
import { sendEmail } from '@/shared/lib'
import {
  STRIPE_API_KEY,
  STRIPE_WEBHOOK_SECRET,
} from '@/shared/lib/create-payment'
import { CartItemDTO } from '@/shared/services/dto/cart-dto'
import { OrderStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(STRIPE_API_KEY)

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json(
      { error: 'Missing Stripe signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    const body = await req.text()
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Error verifying Stripe webhook signature:', err)
    return NextResponse.json(
      { error: `Webhook Error: ${err}` },
      { status: 400 }
    )
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      const orderId = session.metadata?.order_id

      if (!orderId) {
        throw new Error('Order ID not found in metadata')
      }

      const order = await prisma.order.findFirst({
        where: {
          id: parseInt(orderId, 10),
        },
      })

      if (!order) {
        throw new Error('Order not found')
      }

      await prisma.order.update({
        where: {
          id: parseInt(orderId, 10),
        },
        data: {
          status: OrderStatus.SUCCEEDED,
        },
      })

      const items = JSON.parse(order.items as string) as CartItemDTO[]

      await sendEmail(
        order.email,
        `Next Pizza | Your order successfully paid`,
        OrderSuccessTemplate({
          orderID: order.id,
          totalAmount: order.totalAmount,
          items,
        })
      )
    } catch (error) {
      console.error('Error updating order status:', error)
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ received: true })
}
