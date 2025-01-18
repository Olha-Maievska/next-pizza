import { Ingredient } from '@prisma/client'
import { useEffect, useState } from 'react'
import { Api } from '@/shared/services/api-client'

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)

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

  return {
    ingredients,
    loading,
  }
}
