import React from 'react';
import Slider from '../components/Slider';
import FeaturedFoods from '../components/FeaturedFoods';
import { Link } from 'react-router-dom';
import Volunteers from '../components/Volunteers';
import Subscribe from '../components/Subscribe';

const Home = () => {
   
    return (
        <div>
            <header>
                <Slider />
            </header>
            <main className='my-20 text-gray-700'>
                <div>
                    <FeaturedFoods />
                    <div className='text-center mt-8'>
                        <Link to="/available-foods" className='btn bg-[#E67E22] px-6 hover:bg-primary text-white'>Show all</Link>
                    </div>
                    <div className='text-center mt-28'>
                        <Volunteers />
                    </div>
                   <Subscribe/>
                </div>
            </main>
        </div>
    );
};

export default Home;