import { Api } from '@/services/api-client'
import { Ingredient } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useSet } from 'react-use'

interface ReturnsProps {
  ingredients: Ingredient[]
  loading: boolean
  selectedIds: Set<string>
  onAddId: (id: string) => void
}

export const useFilterIngredients = (): ReturnsProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(false)

  const [selectedIds, { toggle }] = useSet(new Set<string>([]))

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

  return { ingredients, loading, selectedIds, onAddId: toggle }
}
