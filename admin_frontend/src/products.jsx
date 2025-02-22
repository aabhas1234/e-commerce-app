import React from 'react'
import { useNavigate} from 'react-router-dom'
import Listed_products from './listed_products';
const products = () => {
  const navigate=useNavigate();
  const handler1=()=>{
    
        navigate('/addnewproduct',{state:{productname:"", productprice:"", productdescription:""}});
  }

  return (
    <div className='text-left mt-3 p-1.5'>
        <button className='h-10 w-36 text-center rounded appearance-none block bg-blue-700 text-white my-1.5' onClick={handler1}>Add New Product</button>
        <div className='text-lg font-bold'>
          Listed Products
        </div>
        <Listed_products/>
    </div>

  )
}

export default products