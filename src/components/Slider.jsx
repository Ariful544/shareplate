// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from './Slide'

import bgimg1 from '../assets/images/carousel1.webp'
import bgimg2 from '../assets/images/carousel2.jpg'
import bgimg3 from '../assets/images/carousel3.jpg'

export default function Slider() {
  return (
    <div className='container py-10 mx-auto'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            title='Fight Food Waste Together'
            description = "Every meal matters. Contribute to reducing food waste by donating surplus food and supporting those who need it most."
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            title='Create a Caring Community'
            description ="Build stronger bonds with your neighbors by sharing food and fostering a culture of generosity and kindness."
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            title='Share Surplus, Spread Smiles'
            description ="Turn your extra food into a blessing for someone in need. Join our community to make sharing easy, impactful, and meaningful."
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
