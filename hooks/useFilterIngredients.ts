import { Api } from '@/services/api-client'
import { Ingredient } from '@prisma/client'
import { useEffect, useState } from 'react'

interface ReturnsProps {
  ingredients: Ingredient[]
  loading: boolean
}

export const useFilterIngredients = (): ReturnsProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getIngredients() {
      try {
        setLoading(true)
        const ingredients = await Api.ingredients.getAll()
        setIngredients(ingredients)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getIngredients()
  }, [])

  return { ingredients, loading }
}
