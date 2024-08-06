import { fakerKO as faker } from '@faker-js/faker'

import { Product } from '@/types'
import { getMockProductData } from '@/utils/mock'

type Params = {
  query: string
  fromPage?: number
  toPage?: number
}

export async function getProductsByKeyword({
  query,
  fromPage = 1,
  toPage = 10,
}: Params): Promise<{ data: Product[] }> {
  const data: Product[] = Array.from({ length: (toPage - fromPage) * 10 }).map(
    () =>
      getMockProductData({
        title: `${query} - ${faker.commerce.productName()}`,
      }),
  )
  return Promise.resolve({ data })
}
