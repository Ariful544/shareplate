import moment from "moment";
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "../hooks/UseAuth";

const FoodDetails = () => {
    const singleFood = useLoaderData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    if (!singleFood || !user) {
        return <div>Loading...</div>;
    }

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleRequestFood = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const additional_notes = formData.get("additional_notes");

        if (!additional_notes.trim()) {
            return toast.error("Please provide additional notes.");
        }

        const requestData = {
            food_id: singleFood._id,
            food_name: singleFood.food_name,
            food_image: singleFood.food_image,
            donator_email: singleFood.donator_email,
            donator_name: singleFood.donator_name,
            user_email: user.email,
            requested_date: moment().format("YYYY-MM-DD"),
            pickup_location: singleFood.pickup_location,
            expire_date: singleFood.expired_datetime,
            additional_notes,
            status: "requested",
        };

        try {
            const postResponse = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/request-food`,
                requestData
            );

            if (postResponse.data.insertedId) {
                toast.success("Food requested successfully.");

                await axios.patch(
                    `${import.meta.env.VITE_BASE_URL}/change-status/${singleFood._id}`
                );

                handleCloseModal();
                navigate("/my-foods-request");
            } else {
                toast.error("Failed to request food. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while processing your request.");
        }
    };

    return (
        <>
            <div className="my-10 max-w-screen-lg text-gray-700 mx-auto backdrop-sepia-0 bg-white/30 border-2 rounded-2xl">
                <div className="bg-base-100">
                    <figure className="flex flex-col justify-center">
                        <img
                            className="w-full rounded-t-lg h-[350px] object-cover"
                            src={singleFood.food_image}
                            alt={singleFood.food_name}
                        />
                    </figure>
                    <div className="p-4">
                        <div className="space-y-2">
                            <h3 className="text-3xl font-semibold text-black">
                                {singleFood.food_name}
                            </h3>
                            <p className="font-medium">
                                <span className="text-primary">Location: </span>
                                {singleFood.pickup_location}
                            </p>
                            <p className="text-base font-semibold text-black/60">
                                <span className="text-primary">Description: </span>
                                {singleFood.additional_notes}
                            </p>
                            <p className="text-lg font-normal">
                                <span className="text-primary">Quantity: </span>
                                {singleFood.food_quantity} {singleFood.food_quantity_type}
                            </p>
                            <p className="text-lg font-normal">
                                <span className="text-primary">Expire Date: </span>
                                {moment(singleFood.expired_datetime).format("YYYY-MM-DD")}
                            </p>
                            <p className="text-lg font-normal">
                                <span className="text-primary">Donator Name: </span>
                                {singleFood.donator_name}
                            </p>
                            <button className="border mt-4 text-green-600 bg-green-50 text-xs font-medium border-green-500 px-4 py-2 rounded-3xl">
                                {singleFood.status}
                            </button>
                            <div className="flex items-center justify-end gap-6 mt-4">
                                {
                                    singleFood.status === "available" ? <button
                                        onClick={handleShowModal}
                                        className="btn bg-[#E67E22] px-6 hover:bg-primary text-white"
                                    >
                                        Request for food
                                    </button> :
                                        <button
                                            onClick={handleShowModal} disabled
                                            className="btn bg-[#E67E22] px-6 hover:bg-primary text-white"
                                        >
                                            Request for food
                                        </button>
                                }
                            </div>
                        </div>
                    </div>
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
                                <form onSubmit={handleRequestFood} className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="food_name" className="block text-sm">Food Name</label>
                                        <input type="text" defaultValue={singleFood.food_name} disabled name="food_name" id="food_name" className="disabled:hover:cursor-not-allowed w-full px-3 py-2 border rounded-md text-gray-700" fdprocessedid="zp9mzl" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="food_image" className="block text-sm">Food Image</label>
                                        <input type="url" defaultValue={singleFood.food_image} disabled name="food_image" id="food_image" className="disabled:hover:cursor-not-allowed w-full px-3 py-2 border rounded-md text-gray-700" fdprocessedid="zp9mzl" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="food_id" className="block text-sm">Food ID</label>
                                        <input type="text" defaultValue={singleFood._id} disabled name="food_id" id="food_id" className="disabled:hover:cursor-not-allowed w-full px-3 py-2 border rounded-md text-gray-700" fdprocessedid="zp9mzl" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="donator_email" className="block text-sm">Food Donator email</label>
                                        <input type="email" defaultValue={singleFood.donator_email} disabled name="donator_email" id="donator_email" className="disabled:hover:cursor-not-allowed w-full px-3 py-2 border rounded-md text-gray-700" fdprocessedid="zp9mzl" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="donator_name" className="block text-sm">Food Donator Name</label>
                                        <input type="text" defaultValue={singleFood.donator_name} disabled name="donator_name" id="donator_name" className="disabled:hover:cursor-not-allowed w-full px-3 py-2 border rounded-md text-gray-700" fdprocessedid="zp9mzl" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="user_email" className="block text-sm">User email</label>
                                        <input type="email" defaultValue={user?.email} disabled name="user_email" id="user_email" className="disabled:hover:cursor-not-allowed w-full px-3 py-2 border rounded-md text-gray-700" fdprocessedid="zp9mzl" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="requested_date" className="block text-sm">Request Date</label>
                                        <input type="text" defaultValue={moment(Date.now()).format("YYYY-MM-DD")} disabled name="requested_date" id="requested_date" className="disabled:hover:cursor-not-allowed w-full px-3 py-2 border rounded-md text-gray-700" fdprocessedid="zp9mzl" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="pickup_location" className="block text-sm">Pickup Location</label>
                                        <input type="text" defaultValue={singleFood.pickup_location} disabled name="pickup_location" id="pickup_location" className="disabled:hover:cursor-not-allowed w-full px-3 py-2 border rounded-md text-gray-700" fdprocessedid="zp9mzl" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="expire_date" className="block text-sm">Expire Date</label>
                                        <input type="date" defaultValue={singleFood.expired_datetime} disabled name="expire_date" id="expire_date" className="disabled:hover:cursor-not-allowed w-full px-3 py-2 border rounded-md text-gray-700" fdprocessedid="zp9mzl" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="additional_notes" className="block text-sm">Additional Notes</label>
                                        <textarea
                                            name="additional_notes"
                                            className="w-full px-3 py-2 border text-black rounded-md"
                                            placeholder="e.g., Stored in a cool place"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white py-3 font-medium rounded-lg text-sm px-5 text-center bg-[#E67E22] hover:bg-primary"
                                    >
                                        added to My request foods
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

export default FoodDetails;
