import axios from "axios";
import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
const MyFoods = () => {
    const { user } = useAuth();
    const navigate = useNavigate()
    const [myAddedFoods, setMyAddedFoods] = useState([]);
    const [myAddedFood, setMyAddedFood] = useState([]);
    const [foodQuantityType, setFoodQuantityType] = useState("kg");
    const [showModal, setShowModal] = useState(false);
    const handleShowModel = (id) => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/manage-my-food/${id}`,{
            withCredentials: true,
        })
            .then((result) => {
                setMyAddedFood(result.data)
                setShowModal(true)
            });
    };
    const handleCloseModal = () => setShowModal(false);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/manage-my-foods?email=${user?.email}`,{
            withCredentials: true,
        })
            .then(res => {
                setMyAddedFoods(res.data)
            })
    }, [user?.email]);
    // update single food item
    const handleUpdateForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const food_name = formData.get('food_name');
        const food_quantity = parseFloat(formData.get('food_quantity'));
        const food_quantity_type = foodQuantityType;
        const pickup_location = formData.get('pickup_location');
        const expired_datetime = formData.get('expire_date');
        const food_image = formData.get('food_image');
        const additional_notes = formData.get('additional_notes')
        if (!food_name || !food_quantity || !pickup_location || !expired_datetime || !food_image || !additional_notes || !foodQuantityType) {
            return toast.error('Please fill all the fields, especially check quantity type.');
        }
        const foodData = {
            food_name,
            food_quantity,
            food_quantity_type,
            pickup_location,
            expired_datetime,
            food_image,
            additional_notes,
        }
        axios.patch(`${import.meta.env.VITE_BASE_URL}/update-food/${myAddedFood._id}`, foodData,{
            withCredentials: true,
        })
        .then(()=>{
            toast.success("Updated food successfully")
            setShowModal(false)
            navigate('/available-foods')
        })
    }
    const handleDeleteFood = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_BASE_URL}/delete-food/${id}`,{
                    withCredentials: true,
                })
                    .then((result) => {
                        if (result.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your food has been deleted.",
                                icon: "success",
                            });
                            const remainingFoods = myAddedFoods.filter(food => food._id !== id);
                            setMyAddedFoods(remainingFoods);
                        }
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong while deleting the food.",
                            icon: "error",
                        });
                    });
            }
        });
    };

    return (
        <>
            <div className='my-14'>
                <div className='flex items-center gap-4'>
                    <h1 className='text-gray-700 font-bold text-3xl mt-4'>My Added foods </h1>
                    <button className="border mt-4 text-green-600 bg-green-50 text-base font-semibold border-green-500 px-4 py-2 rounded-3xl">{myAddedFoods.length} items </button>
                </div>
                <div className="overflow-x-auto mt-10">
                    <Table hoverable>
                        <TableHead className="text-gray-800 text-base">
                            <TableHeadCell>Food name</TableHeadCell>
                            <TableHeadCell>Image</TableHeadCell>
                            <TableHeadCell>Food quantity</TableHeadCell>
                            <TableHeadCell>Pickup location</TableHeadCell>
                            <TableHeadCell>Action</TableHeadCell>
                        </TableHead>
                        <TableBody className="divide-y">
                            {
                                myAddedFoods.map(myAddedFood => <TableRow key={myAddedFood._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {myAddedFood.food_name}
                                    </TableCell>
                                    <TableCell>
                                        <img className="w-20 h-20 rounded-lg object-cover" src={myAddedFood.food_image} alt="" />
                                    </TableCell>
                                    <TableCell>
                                        <button className="px-3 py-1 border-2 border-primary bg-orange-100 text-gray-800 rounded-3xl">{myAddedFood.food_quantity} {myAddedFood.food_quantity_type}</button>
                                    </TableCell>
                                    <TableCell className="text-gray-800">
                                        {myAddedFood.pickup_location}
                                    </TableCell>
                                    <TableCell>
                                        <button onClick={() => handleShowModel(myAddedFood._id)} className="font-medium text-white btn bg-info hover:bg-info mr-3">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDeleteFood(myAddedFood._id)} className="font-medium text-white btn hover:bg-orange-500 bg-orange-500">
                                            Delete
                                        </button>
                                    </TableCell>
                                </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>

            {showModal && (
                <div
                    id="authentication-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-screen-lg">
                        <div className="bg-orange-900 rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 border-b rounded-t">
                                <p></p>
                                <button
                                    onClick={handleCloseModal}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 max-h-[80vh] overflow-y-auto">
                                <form onSubmit={handleUpdateForm} className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="food_name" className="block text-sm">Food Name</label>
                                        <input type="text" defaultValue={myAddedFood.food_name} name="food_name" id="food_name" className="w-full px-3 py-2 border rounded-md text-gray-700" fdprocessedid="zp9mzl" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="food_image" className="block text-sm">Food Image</label>
                                        <input type="url" defaultValue={myAddedFood.food_image} name="food_image" id="food_image" className=" w-full px-3 py-2 border rounded-md text-gray-700" fdprocessedid="zp9mzl" required />
                                    </div>
                                    <div className="flex justify-between items-center space-x-4">
                                        <div className="space-y-2 flex-1">
                                            <label htmlFor="food_quantity" className="block text-sm">Quantity</label>
                                            <input
                                                type="text"
                                                defaultValue={myAddedFood.food_quantity}
                                                name="food_quantity"
                                                id="food_quantity"
                                                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 text-gray-700"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="food_quantity_type" className="block text-sm">Quantity Type</label>
                                            <select
                                                defaultValue={myAddedFood.food_quantity_type}
                                                onChange={(e) => setFoodQuantityType(e.target.value)}
                                                id="food_quantity_type"
                                                className="w-full px-3 py-2 border rounded-md text-gray-700"
                                                required
                                            >
                                                <option value="kg">Kg</option>
                                                <option value="pieces">Pieces</option>
                                                <option value="liters">Liters</option>
                                                <option value="servings">Servings</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="pickup_location" className="block text-sm">Pickup Location</label>
                                        <input type="text" defaultValue={myAddedFood.pickup_location} name="pickup_location" id="pickup_location" className="w-full px-3 py-2 border rounded-md text-gray-700" fdprocessedid="zp9mzl" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="expire_date" className="block text-sm">Expire Date</label>
                                        <input type="date" defaultValue={myAddedFood.expired_datetime} name="expire_date" id="expire_date" className=" w-full px-3 py-2 border rounded-md text-gray-700" fdprocessedid="zp9mzl" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="additional_notes" className="block text-sm">Additional Notes</label>
                                        <textarea
                                            name="additional_notes"
                                            defaultValue={myAddedFood.additional_notes}
                                            className="w-full px-3 py-2 border text-black rounded-md"
                                            placeholder="e.g., Stored in a cool place"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white py-3 font-medium rounded-lg text-sm px-5 text-center bg-[#E67E22] hover:bg-primary"
                                    >
                                        Update my food
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyFoods;