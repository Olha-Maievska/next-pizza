import { Product } from '@prisma/client'
import { axiosInstance } from './instance'
import { ApiRorutes } from './consts'

export const search = async (query: string): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>(
    ApiRorutes.SEARCH_PRODUCTS,
    {
      params: { query },
    }
  )

  return data
}
