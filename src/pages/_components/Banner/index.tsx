import { faker } from '@faker-js/faker'
import { Carousel } from 'react-responsive-carousel'

import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function Banner() {
  return (
    <Carousel
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      className="my-8"
    >
      {Array.from({ length: 3 })
        .map(() => faker.image.imageUrl())
        .map((url) => (
          <div key={url} className="h-96">
            <img src={url} alt="" className="h-full w-full" />
          </div>
        ))}
    </Carousel>
  )
}
