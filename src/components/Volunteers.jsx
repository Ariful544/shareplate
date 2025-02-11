import React from 'react';
import volunteer1 from '../assets/images/volunteer1.jpg'
import volunteer2 from '../assets/images/volunteer2.jpg'
import volunteer3 from '../assets/images/volunteer3.jpg'

const Volunteers = () => {
    return (
        <div className=''>
            <div className='space-y-6'>
                <h2 className='md:text-5xl text-3xl text-gray-700 font-bold text-center'>OUR VOLUNTEERS</h2>
                <p className='text-base'>Join our community of food enthusiasts to share delicious meals, build connections, and<br></br> spread happiness one plate at a time.</p>
            </div>
            <div className='grid md:grid-cols-3 grid-cols-1 my-20 gap-6'>
                <div className="card bg-base-100 shadow-xl">
                    <figure>
                        <img className='w-full h-[250px] object-cover'
                            src={volunteer1}
                            alt="" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold">Alice Johnson</h2>
                        <p className='text-left'>Alice, our Community Ambassador, connects local businesses with our food sharing platform to reduce food waste and build community unity</p>
                        <div className="card-actions justify-end">
                            <button className="btn bg-[#E67E22] px-6 hover:bg-primary text-white">Read More</button>
                        </div>
                    </div>
                </div>
                {/* volunteer2 */}
                <div className="card bg-base-100 shadow-xl">
                    <figure>
                        <img className='w-full h-[250px] object-cover'
                            src={volunteer2}
                            alt="" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold">David Martinez</h2>
                        <p className='text-left'>David, our Community Ambassador, connects local businesses with our food sharing platform to reduce food waste and build community unity</p>
                        <div className="card-actions justify-end">
                            <button className="btn bg-[#E67E22] px-6 hover:bg-primary text-white">Read More</button>
                        </div>
                    </div>
                </div>
                {/* volunteer3 */}
                <div className="card bg-base-100 shadow-xl">
                    <figure>
                        <img className='w-full h-[250px] object-cover'
                            src={volunteer3}
                            alt="" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold">Michael Chen</h2>
                        <p className='text-left'>Michael, our Food Safety Officer, safeguards the health and well-being of our community by ensuring food shared on our platform.</p>
                        <div className="card-actions justify-end">
                            <button className="btn bg-[#E67E22] px-6 hover:bg-primary text-white">Read More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Volunteers;