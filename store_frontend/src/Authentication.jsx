import React, { useState } from 'react'
import bg from '../public/bg.jpg'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
const Authentication = () => {

   
   
    return (
        <div className="flex flex-col justify-center items-center mt-12  ">   
       
        <div className='relative before:absolute before:bg-blue-50 before:opacity-15 before:rounded-2xl before:inset-0 h-[25rem] p-5 '>
            <div className='font-bold text-white  w-fit relative mx-auto p-3 '>WELCOME TO AABHAS'S ECOMMERCE STORE, Already a registered buyer then signin else signup required !!</div>
            <Outlet/>
        </div>
        

        </div>
    )
}

export default Authentication;