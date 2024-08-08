import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import Product from '@/components/common/Product'
import Spinner from '@/components/common/Spinner'
import { getProducts } from '@/repository/products/getProducts'
import { Product as TProduct } from '@/types'

export default function ProductList({
  initialProducts,
}: {
  initialProducts: TProduct[]
}) {
  const [products, setProducts] = useState<TProduct[]>(initialProducts)
  const { ref, inView } = useInView()
  const [isLoading, setIsLoading] = useState(false)
  const [isLastPage, setIsLastPage] = useState(false)

  const handleGetProducts = async ({
    fromPage,
    toPage,
  }: {
    fromPage: number
    toPage: number
  }) => {
    try {
      setIsLoading(true)
      const { data } = await getProducts({ fromPage, toPage })
      return data
    } finally {
      setIsLoading(false)
    }
  }
  // 항상 products 값은 2페이지 까지 불러져 있는 상태
  const [page, setPage] = useState(2)

  useEffect(() => {
    if (inView) {
      //inView가 true일 때, page를 1 증가시키고 해당 페이지의 데이터를 불러옴
      ;(async () => {
        const data = await handleGetProducts({
          fromPage: page,
          toPage: page + 1,
        })
        if (data.length === 0) {
          setIsLastPage(true)
          return
        }
        setProducts((products) => [...(products || []), ...data])
        setPage(page + 1)
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <div className="my-8">
      <div className="grid grid-cols-5 gap-4">
        {products?.map(({ id, title, price, imageUrls, createdAt }) => (
          <Link key={id} href={`/products/${id}`}>
            <Product
              title={title}
              price={price}
              imageUrl={imageUrls[0]}
              createdAt={createdAt}
            />
          </Link>
        ))}
      </div>
      {
        // 로딩중일 때 로딩 스피너를 보여줌
        isLoading && (
          <div className="text-center mt-2">
            <Spinner />
          </div>
        )
      }
      {!isLastPage && products.length > 0 && products.length < 100 && (
        <div ref={ref}></div>
      )}
    </div>
  )
}
