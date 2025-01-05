import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/UseAuth';

const Profile = () => {
    const {user} = useAuth();
    return (
        <div className="w-full my-20 max-w-lg mx-auto p-4 rounded-md shadow sm:p-8 bg-orange-900">
            <div className='max-w-screen-lg mt-10 text-left text-white'>
                <h1 className="text-4xl font-bold text-amber-500 text-center capitalize">{user ? `Welcome, ${user.displayName}` : "Guest"}</h1>
                <p className='font-bold text-xl mt-4 '>Name: <span className='text-amber-500'>{user && user.displayName}</span></p>
                <p className='font-bold text-xl mt-4 '>Email : <span className='text-amber-500'> {user && user.email}</span></p>
                <div className=''>
                    <p className='font-bold text-xl mt-4 mb-4 '>Profile Photo:</p><img className='w-40 h-40 border-2 object-cover border-amber-500 p-2' src={user && user.photoURL} alt="" />
                </div>
                <div className='mb-6 mt-10'>
                    <Link to="/update_profile" className='btn w-full tracking-wide  bg-transparent  text-white border hover:bg-amber-600 hover:border-amber-600 border-amber-500'>UPDATE PROFILE</Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;