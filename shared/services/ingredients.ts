import { Ingredient } from '@prisma/client'
import { axiosInstance } from './instance'
import { ApiRorutes } from './consts'

export const getAll = async (): Promise<Ingredient[]> => {
  const { data } = await axiosInstance.get<Ingredient[]>(ApiRorutes.INGREDIENTS)

  return data
}
