/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const Slide = ({ image, description,title }) => {
  return (
    <div
      className='w-full bg-center bg-cover h-[38rem]'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className='flex items-center justify-center w-full h-full bg-gray-900/70'>
        <div className='text-center'>
          <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
            {title}
          </h1>
          <br />
          <p className='text-white'>{description}</p>
          <br />
          <Link
            to='/add-food'
            className='w-full px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform rounded-md lg:w-auto bg-[#E67E22] hover:bg-primary'
          >
            Add Food
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Slide
