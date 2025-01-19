'use server'

import { prisma } from '@/prisma/prisma-client'
import { CheckoutFormType } from '@/shared/components/shared'
import {
  PayOrderTemplate,
  VerifyEmailTemplate,
} from '@/shared/components/shared/email-template'
import { createPayment, sendEmail } from '@/shared/lib'
import { getUserSession } from '@/shared/lib/get-user-session'
import { OrderStatus, Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { cookies } from 'next/headers'

export async function createOrder(
  data: CheckoutFormType,
  totalWithDeliveryFee: number
) {
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

    if (!userCart || userCart.cartItems.length === 0) {
      throw new Error('Cart is empty or not found')
    }

    if (userCart.totalAmount <= 0) {
      throw new Error('Invalid total price')
    }

    const order = await prisma.order.create({
      data: {
        fullname: `${data.firstName} ${data.lastName}`,
        email: data.email,
        address: data.address,
        phone: data.phone,
        comment: data.comment || '',
        totalAmount: totalWithDeliveryFee,
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

    const paymentDetails = {
      amount: order.totalAmount,
      description: `Next Pizza order #${order.id}`,
      orderID: order.id,
    }

    const paymentData = await createPayment(paymentDetails)

    if (!paymentData) {
      throw new Error('Payment data not found')
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    })

    const paymentUrl = paymentData.url as string

    await sendEmail(
      data.email,
      'Next pizza | Your order has been created',
      PayOrderTemplate({
        firstName: data.firstName,
        orderID: order.id,
        totalAmount: order.totalAmount,
        paymantLink: paymentUrl,
      })
    )
    return paymentUrl
  } catch (error) {
    console.log('[ORDER_CREATE] Server error', error)
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession()

    if (!currentUser) {
      throw new Error('User not found')
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    })

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullname: body.fullname,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    })
  } catch (error) {
    console.log('[UPDATE_USER_INFO] Server error', error)
    throw error
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    })

    if (user) {
      if (!user.verified) {
        throw new Error('User not verified')
      }
      throw new Error('User already exists')
    }

    const createUser = await prisma.user.create({
      data: {
        fullname: body.fullname,
        email: body.email,
        password: hashSync(body.password as string, 10),
      },
    })

    const code = Math.floor(10000 + Math.random() * 90000).toString()

    await prisma.verificationCode.create({
      data: {
        userId: createUser.id,
        code,
      },
    })

    await sendEmail(
      createUser.email,
      'Next pizza | Verify your email',
      VerifyEmailTemplate({
        code,
      })
    )
  } catch (error) {
    console.log('[REGISTER_USER] Server error', error)
    throw error
  }
}
