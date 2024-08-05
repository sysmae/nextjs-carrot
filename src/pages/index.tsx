import { useEffect, useState } from 'react'

import JggtLayout from '@/components/layout/JggtLayout'
import { getProduct } from '@/repository/products/getProduct'
import { Product } from '@/types'

export default function Home() {
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    getProduct('1').then((res) => {
      setProduct(res.data)
    })
  }, [])
  return (
    <JggtLayout>
      <div>Sample Prodcut</div>
      {product && (
        <div>
          {JSON.stringify(product)}
          <div>{product.title}</div>
          <div>{product.price}</div>
          <div>{product.address}</div>
          <div>{product.description}</div>
          <div>
            {product.imageUrls.map((url) => (
              <img key={url} src={url} />
            ))}
          </div>
          <div>{product.isChangeable ? '교환 가능' : '교환 불가능'}</div>
          <div>{product.isUsed ? '중고' : '새상품'}</div>
          <div>{product.tags?.join(', ')}</div>
          <div>{product.createdAt}</div>
          <div>{product.createdBy}</div>
          <div>{product.purchaseBy}</div>
        </div>
      )}
    </JggtLayout>
  )
}
