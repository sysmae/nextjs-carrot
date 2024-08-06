import { constants } from 'http2'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useEffect, useState } from 'react'

import SearchShopItem from './_components/SearchShopItem'

import Pagination from '@/components/common/Pagination'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import { getShopsByKeyword } from '@/repository/shops/getShopsByKeyword'
import { getShopsByKeywordCount } from '@/repository/shops/getShopsByKeywordCount'
import { Shop } from '@/types'

export const getServerSideProps: GetServerSideProps<{
  shops: Shop[]
  query: string
  count: number
}> = async (context) => {
  const originalQuery = context.query.query as string | undefined
  if (!originalQuery) {
    throw new Error('query is required')
  }
  const query = decodeURIComponent(originalQuery)

  const [{ data: shops }, { data: count }] = await Promise.all([
    getShopsByKeyword({
      query,
      fromPage: 0,
      toPage: 1,
    }),
    getShopsByKeywordCount(query),
  ])

  return { props: { shops, query, count } }
}

export default function SearchShop({
  shops: initialShops,
  query,
  count,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [shops, setShops] = useState<Shop[]>(initialShops)
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    setCurrentPage(1)
  }, [initialShops])
  useEffect(() => {
    ;(async () => {
      const { data: shops } = await getShopsByKeyword({
        query,
        fromPage: currentPage - 1,
        toPage: currentPage,
      })
      setShops(shops)
    })()
  }, [currentPage, query])
  return (
    <Wrapper>
      <Container>
        <div className="my-7">
          <Text size="lg">검색 결과</Text>
          <Text size="lg" color="grey" className="ml-1">
            {count.toLocaleString()}개
          </Text>
        </div>
        <div className="flex flex-col gap-3">
          {shops.length === 0 ? (
            <Text>검색 결과가 없습니다.</Text>
          ) : (
            shops.map(({ id, name, imageUrl }) => (
              <SearchShopItem
                key={id}
                id={id}
                name={name}
                profileImageUrl={imageUrl || undefined}
              />
            ))
          )}
        </div>
        <div className="my-6 justify-end">
          <Pagination
            currentPage={currentPage}
            count={count}
            handlePageChange={(pageIndex) => setCurrentPage(pageIndex)}
          />
        </div>
      </Container>
    </Wrapper>
  )
}
