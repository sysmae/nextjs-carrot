import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect, useState } from 'react'

import ShopProfileImage from '@/components/common/ShopProfileImage'
import Spinner from '@/components/common/Spinner'
import Text from '@/components/common/Text'
import { getShop } from '@/repository/shops/getShop'
import { Shop } from '@/types'
import { getMockShopData } from '@/utils/mock'

import 'dayjs/locale/ko'

type Props = {
  contents: string
  createdBy: string
  createdAt: string
}

dayjs.extend(relativeTime).locale('ko')

const ReviewItem = ({ contents, createdBy, createdAt }: Props) => {
  const [reviewer, setReviewer] = useState<Shop>(getMockShopData())
  useEffect(() => {
    ;(async () => {
      const { data } = await getShop(createdBy)
      setReviewer(data)
    })()
  }, [createdBy])

  if (!reviewer)
    return (
      <div className="flex my-2 py-2">
        <div className="flex justify-center items-center w-full h-32 border border-dashed">
          <Spinner />
        </div>
      </div>
    )

  return (
    <div className="flex my-2 py-2">
      <ShopProfileImage imageUrl={reviewer.imageUrl || undefined} />
      <div className="flex-1 ml-4 border-b pb-2 w-0">
        <div className="flex justify-between">
          <div className="truncate pr-1">
            <Text size="sm" color="grey">
              {reviewer.name}
            </Text>
          </div>
          <div className="shrink-0">
            <Text size="sm" color="grey">
              {dayjs(createdAt).fromNow()}
            </Text>
          </div>
        </div>
        <div className="py-2">{contents}</div>
      </div>
    </div>
  )
}

export default ReviewItem
