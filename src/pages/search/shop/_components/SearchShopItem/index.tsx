import React, { useEffect, useState } from 'react'

import Shop from '@/components/common/Shop'
import Spinner from '@/components/common/Spinner'
import { getShopFollowerCount } from '@/repository/shops/getShopFollowerCount'
import { getShopProductCount } from '@/repository/shops/getShopProductCount'

type Props = {
  id: string
  name: string
  profileImageUrl?: string
}

const SearchShopItem = ({ id, name, profileImageUrl }: Props) => {
  const [followerCount, setFollowerCount] = useState<number | undefined>()
  const [productCount, setProductCount] = useState<number | undefined>()

  useEffect(() => {
    ;(async () => {
      const [{ data: followerCount }, { data: productCount }] =
        await Promise.all([getShopFollowerCount(id), getShopProductCount(id)])

      setFollowerCount(followerCount)
      setProductCount(productCount)
    })()
  }, [id])

  if (followerCount === undefined || productCount === undefined) {
    return (
      <div className="border border-gray-300 h-28 flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="border border-gray-300">
      <Shop
        type="row"
        name={name}
        productCount={productCount}
        followerCount={followerCount}
        profileImageUrl={profileImageUrl}
      />
    </div>
  )
}

export default SearchShopItem
