import React from 'react';
import Slider from '../components/Slider';
import FeaturedFoods from '../components/FeaturedFoods';
import { Link } from 'react-router-dom';
import Volunteers from '../components/Volunteers';

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
                    <div className='min-h-[400px] text-center flex flex-col justify-center items-center bg-[#E67E22] mt-20 rounded-xl'>
                        <h2 className='md:text-5xl text-3xl text-white font-bold text-center'>Don’t miss out on the Latest News</h2>
                        <p className='md:text-xl text-base mt-3 text-gray-100'>We won’t spam you and we respect your privacy.</p>
                        <form className='mt-4'>
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="text" className="grow border-none focus:ring-0 " placeholder="Your email" />
                                <button type="button" className="btn rounded-l-none btn-warning text-white -mr-5">Subscribe</button>
                            </label>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;