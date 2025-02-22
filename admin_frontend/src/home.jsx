import { useState } from 'react'
import productsimages from './utilities/products.svg'
import categoriesimages from './utilities/categories.svg'
import Orders from './utilities/orders.svg'
import Admins from './utilities/admins.svg'
import Settings from './utilities/settings.svg'
import logout from './utilities/logout.svg'
import dashboard from './utilities/dashboard.svg'
import SideMenu from './side_menu.jsx'
import './App.css'

const home = () => {

    let [count, setcount] = useState(0);
    const handler = (c) => {
        setcount(c);
    }
    return (
        <div className='flex'>
            <div className=''>
                <div className='text-lg m-1.5 text-left'>Ecommerce Admin</div>
                <div className='mr-12 p-1.5 '>
                    <button className='m-1 flex my-3 ' onClick={() => handler(1)}  >
                        <img className='w-5 h-5 m-1 mr-3' src={dashboard}></img>
                        <p className='text-lg font-sans font-bold'>Dashboard</p>
                    </button>
                    <button className='m-1 flex my-3' onClick={() => handler(2)}>
                        <img className='w-5 h-5 m-1 mr-3' src={productsimages}></img>
                        <p className='text-lg'>Products</p>
                    </button>
                    <button className='m-1 flex my-3' onClick={() => handler(3)}>
                        <img className='w-5 h-5 m-1 mr-3' src={categoriesimages}></img>
                        <p className='text-lg'>Categories</p>
                    </button>
                    <button className='m-1 flex my-3' onClick={() => handler(4)}>
                        <img className='w-5 h-5 m-1 mr-3' src={Orders}></img>
                        <p className='text-lg'>Orders</p>
                    </button>
                    <button className='m-1 flex my-3' onClick={() => handler(5)}>
                        <img className='w-5 h-5 m-1 mr-3' src={Admins}></img>
                        <p className='text-lg'>Admins</p>
                    </button>
                    <button className='m-1 flex my-3' onClick={() => handler(6)}>
                        <img className='w-5 h-5 m-1 mr-3' src={Settings}></img>
                        <p className='text-lg'>Settings</p>
                    </button>
                    <button className='m-1 flex my-3' onClick={() => handler(7)}>
                        <img className='w-5 h-5 m-1 mr-3' src={logout}></img>
                        <p className='text-lg'>Logout</p>
                    </button>
                </div>

            </div>
            <div className=' items-start m-1.5 '>
                <div className='text-lg text-left font-sans  '>Hello, admin_name</div>
                <SideMenu className='border-2 border-black ' count={count} />
            </div>


        </div>

    )
}

export default home