import Stripe from 'stripe'

interface Details {
  description: string
  orderID: number
  amount: number
}

export const STRIPE_WEBHOOK_SECRET = 'whsec_Hl0sTB39eir6bur1Uk6f2DN7PdAaBzFF'
export const STRIPE_API_KEY =
  'sk_test_51Qc93PCQ0eUEbioTdOtz5pvqtSK00TNvkHGUwCFgnhIkTZ6zyRjEvUmktRo7g1ZIuLLqGEt8qRe9ALEWZMgrFzvk00J3A9WcnF'

const stripe = new Stripe(STRIPE_API_KEY)

export async function createPayment(details: Details) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: details.description,
            },
            unit_amount: details.amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        order_id: details.orderID.toString(),
      },
      success_url: 'https://next-pizza-food.vercel.app/?paid',
      cancel_url: 'https://next-pizza-food.vercel.app/?cancel',
    })

    return session
  } catch (error) {
    console.error('[CREATE_PAYMENT] Error creating payment:', error)
    throw new Error('Failed to create Stripe payment')
  }
}
