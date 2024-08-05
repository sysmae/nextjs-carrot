import { getMockProductData } from '../../utils/mock'

import { Product } from '@/types'
export async function getProduct(id: string): Promise<{
  data: Product
}> {
  const data: Product = getMockProductData({ id })

  return { data }
}
