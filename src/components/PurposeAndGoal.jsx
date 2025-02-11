import React from 'react';
import img from '../assets/images/foodSharing.jpg';
const PurposeAndGoal = () => {
    return (
        <div>
            <div className='space-y-6'>
                <h2 className='text-5xl text-gray-700 font-bold text-center'>PURPOSE AND GOAL</h2>
                <p className='text-base'>The SharePlate Food Community of Practice is a space for national and regional organizations <br></br> to connect, learn, resource share.</p>
            </div>
            <div className="card grid md:grid-cols-2 grid-cols-1 lg:card-side my-20 bg-base-100 shadow-xl">
                <figure>
                    <img
                        src={img}
                        className='w-full object-cover h-[500px]'
                        alt="food sharing" />
                </figure>
                <div className="card-body leading-10">
                    <p>PURPOSE: The SharePlate Food Community of Practice is a space for national and regional organizations to connect, learn, resource share, and take collective actions in support of local communities as they reimagine and rebuild their food systems to thrive.</p>
                    <p>GOAL: BIPOC communities have equitable access and consume nutritious food — doing this will also address barriers faced by other marginalized communities.</p>
                </div>
            </div>
        </div>
    );
};

export default PurposeAndGoal;