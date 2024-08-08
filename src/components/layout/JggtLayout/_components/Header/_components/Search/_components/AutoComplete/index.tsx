import { throttle } from 'lodash'
import Link from 'next/link'
import { useEffect, useState, useMemo } from 'react'

import Text from '@/components/common/Text'
import { getProductsByKeyword } from '@/repository/products/getProductsByKeyword'
import { addRecentKeyword } from '@/utils/localstorage'

type Props = {
  query: string
  handleClose: () => void
}

export default function AutoComplete({ query, handleClose }: Props) {
  const [keywords, setKeywords] = useState<string[]>([])

  const handleSearch = useMemo(
    () =>
      throttle(async (query: string) => {
        if (!query) {
          setKeywords([])
          return
        }
        const { data } = await getProductsByKeyword({
          query,
          fromPage: 0,
          toPage: 2,
        })
        setKeywords(data.map((product) => product.title))
      }, 500),
    [],
  )

  useEffect(() => {
    handleSearch(query)
  }, [query, handleSearch])

  return (
    <div className="flex flex-col h-full">
      <div className="h-full p-2">
        <Link
          className="border-b border-grey-300 pb-1 mb-2 flex items-center"
          href={`/search/shop?query=${encodeURIComponent(query)}`}
          prefetch={false}
          onClick={handleClose}
        >
          <span className="material-symbols-outlined shrink-0">storefront</span>
          <Text size="sm" className="ml-1 shrink-0">
            상점 검색 {'>'}
          </Text>
          <Text size="sm" color="red" className="mx-1 truncate">
            {query}
          </Text>
          <Text size="sm" color="grey" className="shrink-0">
            상점명으로 검색
          </Text>
        </Link>
        {keywords.length === 0 ? (
          <div className="h-full flex justify-center items-center">
            <Text color="grey" size="sm">
              추천 검색어가 없습니다
            </Text>
          </div>
        ) : (
          <div className="h-full overflow-scroll pb-8">
            {keywords.map((keyword, idx) => (
              <Link
                key={keyword}
                href={`/search?query=${encodeURIComponent(keyword)}`}
                prefetch={false}
                onClick={() => {
                  addRecentKeyword(keyword)
                  handleClose()
                }}
              >
                <Text size="sm" className="block my-1 truncate cursor-pointer">
                  {keyword}
                </Text>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="bg-gray-100 flex justify-end items-center h-8 px-2">
        <Text size="sm" className="cursor-pointer" onClick={handleClose}>
          닫기
        </Text>
      </div>
    </div>
  )
}
