import { prisma } from '@/prisma/prisma-client'
import { updateCartTotalAmount } from '@/shared/lib'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: paramsID } = await params
    const id = Number(paramsID)
    const data = (await req.json()) as { quantity: number }
    const token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' })
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    })

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' })
    }

    await prisma.cartItem.update({
      where: { id },
      data: {
        quantity: data.quantity,
      },
    })

    const updatesUserCart = await updateCartTotalAmount(token)
    return NextResponse.json(updatesUserCart)
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update cart' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: paramsID } = await params
    const id = Number(paramsID)
    const token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' })
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    })

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' })
    }

    await prisma.cartItem.delete({
      where: { id },
    })

    const updatesUserCart = await updateCartTotalAmount(token)
    return NextResponse.json(updatesUserCart)
  } catch (error) {
    console.log('[CART_DELETE] Server error', error)
    return NextResponse.json(
      { message: 'Failed to delete cart' },
      { status: 500 }
    )
  }
}
