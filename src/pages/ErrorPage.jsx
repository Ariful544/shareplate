import React from 'react';
import errorImg from '../assets/404.gif'

const ErrorPage = () => {
    return (
        <div className="max-w-screen-2xl h-[700px]">
              <img className='w-full h-full object-cover' src={errorImg} alt="" />
        </div>
    );
};

export default ErrorPage;