import React, { useEffect, useState } from 'react'
import { UseCart } from './contexts/cart_context';
import { useNavigate } from 'react-router-dom';
const App = () => {

  const navigate= useNavigate();

  let [categories, setcategories]=useState([]);
  let [map1,setmap1]=useState(new Map());
  let [flag,setflag]=useState(false);

  const {addtocart, removefromcart }=UseCart();

  const handler1=(obj)=>{
    addtocart(obj);
    alert ("Product just added to the cart , you can check for updates on the cart page!!");
  };

  const handler2=()=>{
    navigate('/cart')
  }

  //`http://localhost:5000/api/categories`
  const fetch_categories=async()=>{
    //console.log("heyaa");
    const response=await fetch(`http://localhost:5000/api/getcategories`,{
      method:'GET',
      headers:{
        "Content-Type": "application/json",
      },
    })
    const result=await response.json();
    setcategories(result);
    //console.log(result);
    let final=await Promise.all(result.map((res)=>fetch(`http://localhost:5000/api/getproductsfromcategories/${res}`,{method:'GET'}).then((res)=>res.json()).then((data)=>{
      return {key:res, value :data };
    })));
    //console.log(final);
    setmap1((prevmap)=>{
      let map2=new Map(prevmap);
      final.forEach(({key,value})=>{
        let arr=map2.get(key)||[];
        arr.push(...value);
        map2.set(key,arr)
      })
      return map2;
    })
    setflag(true);
    
  }

  useEffect(()=>{
    if(!flag) fetch_categories();

  },[]);

  return (
    <div className='p-3'>
      {/* headers */}
      <div >
        <div className='flex gap-[40rem]'>
        <div className='bg-black text-white p-1'>E-commerce</div>
        <div className='flex gap-3 text-white'>
          <button className='bg-black p-1 rounded-md'>Home</button>
          <button className='bg-black p-1 rounded-md'>Account</button>
          <button onClick={handler2} className='bg-black p-1 rounded-md'>Cart</button>
          <button className='bg-black p-1 rounded-md'>Signout</button>
        </div>
        </div>
        
      {/* headers end */}
         
        {flag? categories.map((category)=>(
          <div className='text-black bg-gray-400 p-5 my-4 rounded-md'>
              <h1 className='font-bold text-white mb-2'>
                {category.toUpperCase()}
              </h1>
              <div className='flex gap-4'>
              { 
                map1.get(category)?.map((obj)=>(<div   className='p-4 rounded-md bg-gray-600'>
                  <img className='w-[10rem] h-[10rem] rounded-md' src={obj.imageurls[0]} alt="Cloudinary Image"/>
                  <div className='flex justify-center text-center text-white'>Name: {obj.name}</div>
                  <div>
                    <div className='flex justify-center text-center text-white'>Price: ${obj.price}</div>
                    <button onClick={()=>(handler1(obj))} className='flex justify-center text-center bg-black w-full rounded-md text-white'>Add to Cart</button>
                  </div>
                </div>))
              }
              </div>
          </div>
        )): <div>Loading...</div>}
      </div>

    </div>
  )
}

export default App;
