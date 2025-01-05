import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import moment from 'moment';
import useAuth from '../hooks/useAuth';
const FoodsRequest = () => {
    const { user } = useAuth();
    const [requestedFoods, setRequestedFoods] = useState([]);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/requested-foods?email=${user?.email}`,{
            withCredentials: true,
        })
            .then(res => {
                setRequestedFoods(res.data)
                
            })
    }, [user?.email]);

    return (
        <div className='my-14'>
            <div className='flex items-center gap-4'>
                <h1 className='text-gray-700 font-bold text-3xl mt-4'>My requested foods </h1>
                <button className="border mt-4 text-green-600 bg-green-50 text-base font-semibold border-green-500 px-4 py-2 rounded-3xl">{requestedFoods.length} items </button>
            </div>
            <div className="overflow-x-auto mt-10">
                <Table hoverable>
                    <TableHead className='text-gray-800 text-base'>
                        <TableHeadCell className="p-4">
                            <Checkbox />
                        </TableHeadCell>
                        <TableHeadCell>Food name</TableHeadCell>
                        <TableHeadCell>Food Image</TableHeadCell>
                        <TableHeadCell>Pickup Location</TableHeadCell>
                        <TableHeadCell>Donar Name </TableHeadCell>
                        <TableHeadCell>Expire Date</TableHeadCell>
                        <TableHeadCell>Request Date</TableHeadCell>
                    </TableHead>
                    <TableBody className="divide-y">
                        {
                            requestedFoods.map(requestedFood => <TableRow key={requestedFood._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="p-4">
                                    <Checkbox />
                                </TableCell>
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {requestedFood.food_name}
                                </TableCell>
                                <TableCell>
                                    <img className="w-20 h-20 rounded-lg object-cover" src={requestedFood.food_image} alt="" />
                                </TableCell>
                                <TableCell>{requestedFood.pickup_location}</TableCell>
                                <TableCell>{requestedFood.donator_name}</TableCell>
                                <TableCell>{moment(requestedFood.expire_date).format("YYYY-MM-DD")}</TableCell>
                                <TableCell>
                                {moment(requestedFood.requested_date).format("YYYY-MM-DD")}
                                </TableCell>
                            </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default FoodsRequest;