import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import Pagination from '@/components/common/Pagination'
import Product from '@/components/common/Product'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import { getProductsByKeyword } from '@/repository/products/getProductsByKeyword'
import { getProductsByKeywordCount } from '@/repository/products/getProductsByKeywordCount'
import { Product as TProduct } from '@/types'

export const getServerSideProps: GetServerSideProps<{
  products: TProduct[]
  query: string
  count: number
}> = async (context) => {
  const originalQuery = context.query.query as string | undefined
  if (!originalQuery) {
    throw new Error('query is required')
  }
  const query = decodeURIComponent(originalQuery)

  const [{ data: products }, { data: count }] = await Promise.all([
    getProductsByKeyword({
      query,
      fromPage: 0,
      toPage: 1,
    }),
    getProductsByKeywordCount(query),
  ])

  return { props: { products, query, count } }
}

export default function Search({
  products: initialProducts,
  query,
  count,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState<TProduct[]>(initialProducts)

  useEffect(() => {
    setCurrentPage(1)
  }, [initialProducts])

  useEffect(() => {
    ;(async () => {
      const { data: products } = await getProductsByKeyword({
        query,
        fromPage: currentPage - 1,
        toPage: currentPage,
      })
      setProducts(products)
    })()
  }, [currentPage, query])
  return (
    <Wrapper>
      <Container>
        <div className="my-7">
          <Text size="lg" color="red">
            {query}
          </Text>
          <Text size="lg">의 검색 결과</Text>
        </div>
        <div className="grid grid-cols-5 gap-4 my-3">
          {products.length === 0 ? (
            <Text>검색 결과가 없습니다.</Text>
          ) : (
            products.map(({ id, title, price, createdAt, imageUrls }) => (
              <Link key={id} href={`/products/${id}`}>
                <Product
                  title={title}
                  price={price}
                  createdAt={createdAt}
                  imageUrl={imageUrls[0]}
                />
              </Link>
            ))
          )}
        </div>
        <div className="my-6 flex justify-end">
          <Pagination
            currentPage={currentPage}
            count={count}
            handlePageChange={(pageNumber) => {
              setCurrentPage(pageNumber)
            }}
          />
        </div>
      </Container>
    </Wrapper>
  )
}
