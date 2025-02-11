import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const { user,updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photoUrl = form.photoUrl.value;
        updateUserProfile(name, photoUrl)
        .then(() => {
            toast.success('Profile Updated Successfully')
            form.reset();
            navigate('/profile')
        })
    }
    return (
        <div className="w-full my-20 max-w-lg mx-auto p-4 rounded-md shadow sm:p-8 bg-orange-900">
            <h1 className=" text-4xl md:ml-0 ml-2 font-bold text-center text-white">Update Profile</h1>
            <div className='max-w-screen-md mt-10 '>
                <form onSubmit={handleUpdateProfile} className="space-y-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="Name" className="block text-sm">Name</label>
                            <input type="text" name="name" id="name" defaultValue={user.displayName} className="w-full text-black px-3 py-2 border rounded-md" fdprocessedid="zp9mzl" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label htmlFor="photoUrl" className="text-sm">PhotoUrl</label>
                            </div>
                            <input type="url" name="photoUrl" defaultValue={user.photoURL} id="photoUrl" className="w-full px-3 text-black py-2 border rounded-md" fdprocessedid="ilhtzj" />
                        </div>
                    </div>
                    <div className='mb-6'>
                        <button className='btn w-full tracking-wide  bg-transparent  text-white border hover:bg-amber-600 hover:border-amber-600 border-amber-500'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;