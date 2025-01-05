import React from 'react';
import { Link } from 'react-router-dom';

const FoodCard = ({ food }) => {
   const {food_image,food_name,additional_notes,_id,food_quantity,food_quantity_type} = food;
    return (
        <div className="card bg-base-100 text-gray-700 shadow-xl">
            <figure>
                <img className='w-full h-72 object-cover'
                    src={food_image}
                    alt={food_name} />
            </figure>
            <div className="card-body overflow-x-hidden">
                <h2 className="card-title text-gray-900">{food_name}</h2>
                <p className='text-wrap'>{additional_notes}</p>
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <p className="text-lg font-semibold text-gray-600">Quantity: {food_quantity} {food_quantity_type}</p>
                    </div>
                    <Link to={`/food/${_id}`} className='btn bg-[#E67E22] px-6 hover:bg-primary text-white'>View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;