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
