import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/UseAuth";
import AvailableFoodCard from "../components/AvailableFoodCard";

const AvailableFoods = () => {
    const { user } = useAuth();
    const [foods, setFoods] = useState([]);
    const [search, setSearch] = useState("");
    const [sortByDate, setSortByDate] = useState("desc");
    const [isThreeColumns, setIsThreeColumns] = useState(true);
    const toggleLayout = () => {
        setIsThreeColumns(!isThreeColumns);
    }
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/available-foods?sort=${sortByDate}`)
            .then(result => {
                setFoods(result.data);
            })
    }, [sortByDate])
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/search-food?search=${search}`)
            .then(result => {
                setFoods(result.data);
            });
    }, [search])
    return (
        <div className="py-10 text-gray-700">
            <div className="max-w-screen-sm mx-auto">
                <form>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" onChange={(e) => setSearch(e.target.value)} className="grow border-none focus:ring-0 " placeholder="type food name" />
                        <button type="button" className="btn btn-warning rounded-l-none text-white -mr-4">Search</button>
                    </label>
                </form>
            </div>
            <div className="flex justify-between mt-10  items-center">
                <div className="flex md:flex-row flex-col justify-center items-center gap-4">
                    <h1 className="md:text-4xl mt-4 md:mt-0 text-xl font-semibold">Available Foods</h1>
                    <button onClick={toggleLayout} className='btn hidden md:block text-xs md:text-base  text-gray-100 bg-[#E67E22] hover:bg-primary'>Change Layout</button>
                </div>
                <div className="flex">
                    <div className="flex  items-center gap-1">
                        <div className="mt-6">
                            <p className="font-medium">Sort By Expire Date </p>
                        </div>
                        <div>
                            <select onChange={(e) => setSortByDate(e.target.value)} className="w-full mt-7 px-3 py-2 border rounded-md text-gray-700">
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`grid ${isThreeColumns ? "md:grid-cols-3" : "md:grid-cols-2"} grid-cols-1 mt-8 gap-6`}>
                {
                    foods.map(food => (
                        <AvailableFoodCard key={food._id} food={food} />
                    ))
                }
            </div>
        </div>
    );
};

export default AvailableFoods;