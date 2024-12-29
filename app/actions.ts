'use server'

import { prisma } from '@/prisma/prisma-client'
import { CheckoutFormType } from '@/shared/components/shared'
import { OrderStatus } from '@prisma/client'
import { cookies } from 'next/headers'

export async function createOrder(data: CheckoutFormType) {
  try {
    const cookiesStore = await cookies()
    const token = cookiesStore.get('token')?.value

    if (!token) {
      throw new Error('Cart token not found')
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        cartItems: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token,
      },
    })

    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty')
    }

    if (!userCart) {
      throw new Error('Cart not found')
    }

    const order = await prisma.order.create({
      data: {
        fullname: data.firstName + ' ' + data.lastName,
        email: data.email,
        address: data.address,
        phone: data.phone,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        token,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.cartItems),
      },
    })

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    })
  } catch (error) {
    console.log(error)
  }
  return 'https://github.com/Archakov06/next-pizza'
}
