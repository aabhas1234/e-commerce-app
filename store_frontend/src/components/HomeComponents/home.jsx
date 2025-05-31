import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../header';
const home = () => {
  return (
    <div className="bg-blue-50 relative">
      {/* headers */}
        <Header />
        {/* headers end */}
        {/* <div className='w-full h-1 bg-gray-200 my-2'></div> */}
        <Outlet/>
    </div>
  )
}

export default home