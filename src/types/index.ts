export type Product = {
  id: string
  title: string
  price: number
  address: string
  description: string
  imageUrls: string[]
  isChangeable: boolean
  isUsed: boolean
  tags: string[] | null
  createdAt: string
  createdBy: string
  purchaseBy: string | null
}

export type Shop = {
  id: string
  name: string
  imageUrl: string | null
  introduce: string | null
  createdAt: string
}
