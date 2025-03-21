import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('query') || ''

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
    take: 5,
  })

  return NextResponse.json(products)
}
