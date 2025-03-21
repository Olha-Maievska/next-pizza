import { prisma } from '@/prisma/prisma-client'

export interface GetsSearchsParams {
  query?: string
  sizes?: string
  pizzaTypes?: string
  ingredients?: string
  limit?: string
  priceFrom?: string
  priceTo?: string
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 50

export async function findPizzas(params: GetsSearchsParams) {
  const sizes = params.sizes?.split(',').map(Number)
  const pizzaTypes = params.pizzaTypes?.split(',').map(Number)
  const ingredientsIDArray = params.ingredients?.split(',').map(Number)
  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'asc',
        },
        where: {
          ingredients: ingredientsIDArray
            ? {
                some: {
                  id: {
                    in: ingredientsIDArray,
                  },
                },
              }
            : undefined,
          items: {
            some: {
              pizzaType: { in: pizzaTypes },
              size: { in: sizes },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        include: {
          items: {
            orderBy: {
              id: 'asc',
            },
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
          ingredients: true,
        },
      },
    },
  })

  return categories
}
