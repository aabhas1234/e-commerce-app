import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Authentication = () => {

    const navigate = useNavigate();

    const handler1 = () => {
        navigate('/signin');
    }

    const handler2 = () => {
        navigate('/signup');
    }

    return (
        <div className='h-96 relative bg-slate-900  border-black rounded-md border-2  mx-auto gap-3 '>

            <div className='font-bold text-white '>Welcoming Admin to Aabhas's Ecommerce , Please Signup or Signin to continue</div>
            <div className='flex absolute top-1/2 w-full justify-center items-center my-auto gap-3'>
                <button className='p-2  bg-gray-600 text-white hover:bg-black active:scale-110 transition rounded-md' onClick={handler1}>Sigin</button>
                <button className='p-2  bg-gray-600 text-white hover:bg-black active:scale-110 transition rounded-md' onClick={handler2}>Signup</button></div>
        </div>
    )
}

export default Authentication;