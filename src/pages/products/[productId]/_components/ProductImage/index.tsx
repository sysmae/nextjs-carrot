import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
type Props = {
  imageUrls: string[]
}

export default function ProductImage({ imageUrls }: Props) {
  return (
    <Carousel infiniteLoop showThumbs={false} showStatus={false}>
      {imageUrls.map((url) => (
        <img src={url} key={url} alt="" className="h-96 w-96" />
      ))}
    </Carousel>
  )
}
