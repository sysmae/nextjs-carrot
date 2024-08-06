import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import AutoComplete from './_components/AutoComplete'
import Recent from './_components/Recent'

import { addRecentKeyword } from '@/utils/localstorage'

export default function Search() {
  const router = useRouter()
  const [search, setSearch] = useState<string>('')
  const [isFocused, setIsFocused] = useState<boolean>(false)
  return (
    <div className="relative flex-1">
      <div className="w-full border-2 border-red-500 px-4 py-2">
        <form
          className="flex justify-between"
          onSubmit={(e) => {
            e.preventDefault()
            //검색어 추가
            addRecentKeyword(search)
            router.push(`/search?query=${encodeURIComponent(search)}`)
          }}
        >
          <input
            type="text"
            placeholder="상품명, 상점명 입력"
            className="w-full text-sm font-light outline-0"
            value={search}
            onFocus={() => setIsFocused(true)}
            onClick={() => setIsFocused(true)}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="flex justify-center items-center">
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>
      </div>
      <div
        className={classNames(
          'absolute w-full bg-white border border-grey-300 mt-2 h-96',
          { hidden: !isFocused },
        )}
      >
        {!search ? (
          <Recent handleClose={() => setIsFocused(false)} />
        ) : (
          <AutoComplete
            handleClose={() => setIsFocused(false)}
            query={search}
          />
        )}
      </div>
    </div>
  )
}
