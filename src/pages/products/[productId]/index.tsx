import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import ProductImage from './_components/ProductImage'

import Button from '@/components/common/Button'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import { getProduct } from '@/repository/products/getProduct'

import 'dayjs/locale/ko'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const productId = context.query.productId as string

  const { data: product } = await getProduct(productId)
  return {
    props: {
      product,
    },
  }
}

dayjs.extend(relativeTime).locale('ko')

export default function ProductDetail({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const handleLike = () => {
    alert('찜하기')
  }
  const handleChat = () => {
    alert('문의하기')
  }
  const handlePurchase = () => {
    alert('바로구매')
  }
  return (
    <Wrapper>
      <Container>
        <div className="flex gap-6 my-6">
          <div className="w-96 h-96 shrink-0">
            <ProductImage imageUrls={product.imageUrls} />
          </div>
          <div
            className="flex flex-col justify-between flex-1"
            style={{ minWidth: 0 }}
          >
            <div>
              <div className="truncate">
                <Text size="4xl" weight="bold">
                  {product.title}
                </Text>
              </div>
              <div className="my-6">
                <Text size="3xl" weight="light">
                  {product.price.toLocaleString()}
                </Text>
                <Text size="xl" weight="light">
                  원
                </Text>
              </div>
              <div className="border-t border-gray-500 py-4 flex gap-1 items-center">
                <Text color="grey" className="flex items-center">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '1.25rem' }}
                  >
                    schedule
                  </span>
                  {dayjs(product.createdAt).fromNow()}
                </Text>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                color="grey"
                fullWidth
                className="flex justify-center items-center gap-1"
                onClick={() => handleLike()}
              >
                <span
                  style={{ fontSize: '1rem' }}
                  className="material-symbols-outlined"
                >
                  favorite
                </span>
                <Text color="white">찜</Text>
              </Button>
              <Button
                color="orange"
                fullWidth
                className="flex justify-center items-center gap-1"
                onClick={() => handleChat()}
              >
                <span
                  style={{ fontSize: '1rem' }}
                  className="material-symbols-outlined"
                >
                  chat_bubble
                </span>
                <Text color="white">문의하기</Text>
              </Button>
              <Button
                color="red"
                fullWidth
                className="flex justify-center items-center gap-1"
                onClick={() => handlePurchase()}
              >
                <Text color="white">바로구매</Text>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Wrapper>
  )
}
