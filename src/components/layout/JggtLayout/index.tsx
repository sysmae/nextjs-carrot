import { ReactNode } from 'react'

import Header from './_components/Header'
import UserInfo from './_components/UserInfo'

interface Props {
  children: ReactNode
}

export default function JggtLayout({ children }: Props) {
  return (
    <div style={{ minWidth: 1000 }}>
      <UserInfo />
      <Header />
      <main
        style={{
          minHeight: 'calc(100vh - 28px - 108px - 65px)',
        }}
      >
        {children}
      </main>
    </div>
  )
}
