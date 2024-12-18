import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function GET(req: NextRequest) {
  try {
    const userId = 1
    const token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] })
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        cartItems: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    })

    return NextResponse.json(userCart)
  } catch (error) {
    console.log('[CART_GET] Server error', error)

    return NextResponse.json(
      { message: 'Failed to get a cart' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('token')?.value

    if (!token) {
      token = crypto.randomUUID()
    }

    const cart = await prisma.cart.create({
      data: {
        token,
      },
    })
  } catch (error) {
    console.log('[CART_GET] Server error', error)

    return NextResponse.json(
      { message: 'Failed to create a cart' },
      { status: 500 }
    )
  }
}
