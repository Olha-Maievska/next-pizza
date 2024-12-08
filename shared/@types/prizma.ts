import { Product, ProductItem, Ingredient } from '@prisma/client'

export type ProductWithRelations = Product & {
  ingredients: Ingredient[]
  items: ProductItem[]
}
