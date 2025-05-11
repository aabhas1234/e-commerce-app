import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Header from './components/header';
import bg from '../public/bg.jpg'
const App = () => {

  return (
    <div className="h-screen w-full  relative before:absolute before:bg-black before:opacity-80 before:inset-0  bg-[url('./bg.jpg')] border-black  border-2  mx-auto bg-cover bg-center bg-repeat shadow-[inset_0px_0px_10px_30px_rgba(0,0,0,0.3)]">
      {/* headers */}
        <Header/>
        {/* headers end */}
        {/* <div className='w-full h-1 bg-gray-200 my-2'></div> */}
        <Outlet/>
    </div>
  )
}

export default App;
