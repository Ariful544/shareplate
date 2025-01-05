import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const FeaturedFoods = () => {
    // const [foods, setFoods] = useState([]);
    const [isThreeColumns, setIsThreeColumns] = useState(true);
    const toggleLayout = () => {
        setIsThreeColumns(!isThreeColumns);
    }
    const {data:foods, isPending} = useQuery({
        queryKey: ['foods'],
        queryFn: async ()=>{
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/featured-food`);
            return res.data;
        }
    });
    if(isPending){
        return <span className="loading loading-bars loading-lg"></span>
    }
    // useEffect(() => {
    //     axios.get(`${import.meta.env.VITE_BASE_URL}/featured-food`)
    //         .then(res => {
    //             setFoods(res.data)
    //         })

    // }, []);

    
    return (
        <div className='text-gray-700'>
            <div className='flex flex-col space-y-4 justify-center items-center'>
                <h2 className='text-5xl font-bold text-center'>Featured Foods</h2>
                <p className='text-center text-lg mt-4'>Explore the best foods in the world</p>
                <button onClick={toggleLayout} className='btn text-gray-100 bg-[#E67E22] hover:bg-primary'>Change Layout</button>
            </div>
            <div className={`grid ${isThreeColumns ? "md:grid-cols-3" : "md:grid-cols-2"} grid-cols-1 mt-8 gap-6`}>
                {
                    foods?.map(food => (
                        <FoodCard key={food._id} food={food} />
                    ))
                }
            </div>
        </div>
    );
};

export default FeaturedFoods;