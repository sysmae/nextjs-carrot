import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import Text from '@/components/common/Text'
import {
  addRecentKeyword,
  clearRecentKeyword,
  getRecentKeywords,
} from '@/utils/localstorage'

type Props = {
  handleClose: () => void
}

export default function Recent({ handleClose }: Props) {
  const router = useRouter()

  const [recents, setRecents] = useState<string[]>([])

  useEffect(() => {
    const recents = getRecentKeywords()
    setRecents(recents)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 overflow-hidden flex-1">
        <div className="border-b border-red-500 pb-1 mb-2">
          <Text size="sm" color="red" weight="bold">
            최근 검색어
          </Text>
        </div>
        {recents.length === 0 ? (
          <div className="h-full flex justify-center items-center">
            <Text color="grey" size="sm">
              최근 검색어가 없습니다
            </Text>
          </div>
        ) : (
          recents.map((recent, index) => (
            <Text
              key={index}
              size="sm"
              className="block my-1 truncate cursor-pointer"
              onClick={() => {
                addRecentKeyword(recent)
                router.push(`/search?query=${encodeURIComponent(recent)}`)
                // handleClose()
              }}
            >
              {recent}
            </Text>
          ))
        )}
      </div>
      <div className="bg-gray-100 flex justify-between items-center h-8 px-2">
        <Text size="sm" className="cursor-pointer" onClick={clearRecentKeyword}>
          검색어 전체삭제
        </Text>
        <Text size="sm" className="cursor-pointer" onClick={handleClose}>
          닫기
        </Text>
      </div>
    </div>
  )
}
