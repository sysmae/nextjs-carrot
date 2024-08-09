import Link from 'next/link'
import { useState, useEffect } from 'react'

import Spinner from '@/components/common/Spinner'
import Text from '@/components/common/Text'
import { getMe } from '@/repository/me/getMe'
import { getShopLikeCount } from '@/repository/shops/getShopLikeCount'

const Likes = () => {
  const [likeCount, setLikeCount] = useState<number>()

  useEffect(() => {
    ;(async () => {
      const {
        data: { shopId },
      } = await getMe()

      if (shopId === null) {
        setLikeCount(0)
        return
      }
      const { data: likeCount } = await getShopLikeCount(shopId)
      setLikeCount(likeCount)
    })()
  }, [])

  return (
    <div className="border border-black bg-white p-2 flex flex-col items-center">
      <Text size="xs">찜한 상품</Text>
      {likeCount === undefined ? (
        <div className="mt-1">
          <Spinner />
        </div>
      ) : (
        // <Link href={!shopId ? '#' : `/shops/${shopId}/likes`}>
        <Text size="xs" color="grey" className="flex gap-1 items-center mt-1">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '0.725rem' }}
          >
            favorite
          </span>
          {likeCount}
        </Text>
        // </Link>
      )}
    </div>
  )
}

export default Likes
