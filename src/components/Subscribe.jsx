import axios from "axios";
import toast from "react-hot-toast";

const Subscribe = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/subscribe`, {email})
                if(response.data.insertedId){
                    toast.success("You have successfully subscribed your email")
                }
            } catch (error) {
                toast.error("Error submitting email:", error);
            }
    };

    return (
        <div className='min-h-[400px] text-center flex flex-col justify-center items-center bg-[#E67E22] mt-20 rounded-xl'>
            <h2 className='md:text-5xl text-3xl text-white font-bold text-center'>Don’t miss out on the Latest News</h2>
            <p className='md:text-xl text-base mt-3 text-gray-100'>We won’t spam you and we respect your privacy.</p>
            <form onSubmit={handleSubmit} className='mt-4'>
                <label className="input input-bordered mx-4 md:mx-0 flex items-center gap-2">
                    <input type="email" name="email" className="grow w-full border-none focus:ring-0 " placeholder="Your email" />
                    <button type="submit" className="btn rounded-l-none btn-warning text-white -mr-5">Subscribe</button>
                </label>
            </form>
        </div>
    );
};

export default Subscribe;