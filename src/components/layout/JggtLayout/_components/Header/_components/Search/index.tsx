import React, { useState } from 'react'

export default function Search() {
  const [search, setSearch] = useState<string>('')
  return (
    <div className="relative flex-1">
      <div className="w-full border-2 border-red-500 px-4 py-2">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="상품명, 상점명 입력"
            className="w-full text-sm font-light outline-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="flex justify-center items-center">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>
    </div>
  )
}
