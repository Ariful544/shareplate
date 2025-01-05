import toast from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';
import useAuth from '../hooks/UseAuth';

const AddFood = () => {
    const { user } = useAuth();
    const [foodQuantityType, setFoodQuantityType] = useState("Kg");
    const handleAddFoodForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const food_name = formData.get('food_name');
        const food_quantity = parseFloat(formData.get('food_quantity'));
        const food_quantity_type = foodQuantityType;
        const pickup_location = formData.get('pickup_location');
        const expired_datetime = formData.get('expired_datetime');
        const food_image = formData.get('food_image');
        const additional_notes = formData.get('additional_notes')
        if (!food_name || !food_quantity || !pickup_location || !expired_datetime || !food_image || !additional_notes || !foodQuantityType) {
            return toast.error('Please fill all the fields');
        }
        const foodData = {
            food_name,
            food_quantity,
            food_quantity_type,
            pickup_location,
            expired_datetime,
            food_image,
            additional_notes,
            donator_email: user?.email,
            donator_name: user?.displayName,
            donator_image: user?.photoURL || "",
            status: 'available',
        };
        axios.post(`${import.meta.env.VITE_BASE_URL}/add-food`, foodData,{
            withCredentials: true,
        })
            .then(result => {
                if (result.data.insertedId) {
                    toast.success('Food added successfully');
                    e.target.reset();
                }
            })
    }
    return (
        <div className="w-full my-20 max-w-lg mx-auto p-4 rounded-md shadow sm:p-8 bg-orange-900">
            <h2 className="mb-3 text-4xl font-semibold text-center">Add your food</h2>
            <div className="flex items-center w-full my-4">
                <hr className="w-full dark:text-gray-600" />
                <p className="px-3">X</p>
                <hr className="w-full dark:text-gray-600" />
            </div>
            <form onSubmit={handleAddFoodForm} className="space-y-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="food_name" className="block text-sm">Name</label>
                        <input type="text" name="food_name" id="food_name" placeholder="e.g., Fresh Bread" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 text-gray-700" fdprocessedid="zp9mzl" required />
                    </div>
                    <div className='flex justify-between items-center space-x-4'>
                        <div className="space-y-2 flex-1">
                            <label htmlFor="food_quantity" className="block text-sm">Quantity</label>
                            <input type="text" name="food_quantity" id="food_quantity" placeholder="e.g., 5 " className="w-full px-3 py-2 border rounded-md dark:border-gray-300 text-gray-700" fdprocessedid="zp9mzl" required />
                        </div>
                        <div className="space-y-2">
                        <select onChange={e =>setFoodQuantityType(e.target.value) }  id="food_quantity" className="w-full mt-7 px-3 py-2 border rounded-md text-gray-700" required>
                            <option  value="kg" selected>Kg</option>
                            <option value="pieces">Pieces</option>
                            <option value="liters">liters</option>
                            <option value="servings">servings</option>
                        </select>
                    </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="pickup_location" className="block text-sm">Pickup Location</label>
                        <input type="text" name="pickup_location" id="pickup_location" placeholder="e.g., 123 Main St" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 text-gray-700" fdprocessedid="zp9mzl" required />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="expired_datetime" className="block text-sm">Expiration Date</label>
                        <input type="date" name="expired_datetime" id="expired_datetime" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 text-gray-700" fdprocessedid="zp9mzl" required />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="food_image" className="block text-sm">Food Image</label>
                        <input type="url" name="food_image" id="food_image" placeholder='image url' className="w-full px-3 py-2 border rounded-md dark:border-gray-300 text-gray-700" fdprocessedid="zp9mzl" required />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="additional_notes" className="block text-sm">Additional Notes</label>
                        <textarea
                            name="additional_notes"
                            className="w-full px-3 py-2 border text-gray-700 rounded-md"
                            placeholder="e.g., Stored in a cool place"
                        ></textarea>
                    </div>
                </div>
                <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-primary text-white hover:bg-[#E67E22]" fdprocessedid="jz968">Submit</button>
            </form>
        </div>
    );
};

export default AddFood;