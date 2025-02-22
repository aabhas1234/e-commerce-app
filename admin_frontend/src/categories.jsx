import React, { useEffect, useRef } from 'react'
import { useState } from 'react';

const Categories = () => {


  const [flag,setflag]=useState(false);
  const [cn,setcn]=useState("");
  const [kn,setkn]=useState("");
  const [vn,setvn]=useState("");

  const post_data= async()=>{
    
    await fetch(`http://localhost:5000/api/categories`,{
      method: 'POST',           
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({
              categoryName:cn,
              propertyKey:kn,
              propertyValue:vn
              })
            });
  }
  const handler5=()=>{
    if(cn!="" && vn!="" && kn!="")
    post_data();
    else
    alert("fill in the required values ");
  }
 
  const handler1 =(event)=>{
    let temp=event.target.value;
    setTimeout(()=>{setcn(temp)},1000);
  }
  ////////////////
  const handler2 =(event)=>{
    let temp=event.target.value;
    setTimeout(()=>{setkn(temp)},1000);
  }
  const handler3 =()=>{
   setflag(!flag)
  }
  const handler4 =(event)=>{
    let temp=event.target.value;
    setTimeout(()=>{setvn(temp)},1000);
  }
  ////////////////////
  return (
    <div className='text-left   mt-3 p-1.5'>
      <div className='text-2xl text-left underline font-bold' >Categories</div>
      <div className='m-2'>
          <div className=' text-xl  text-left font-bold'>
            Create New Category   
          </div>
          <input className=' text-left border-black  border-2' placeholder='Category Name' type='text'  onChange={handler1}></input>
      </div>
      <div className='m-2 text-left'>
          <div className=' text-xl  text-left font-bold'>
           Properties
          </div>
          <button className='h-10 w-36 text-center rounded appearance-none block bg-blue-700 text-white my-1.5' onClick={handler3} >
            Add New Property
          </button>
          {flag?
          (<div className='flex '>
              <input onChange={handler2} className='mr-4 border-2 border-black' type='text' placeholder='enter property key '>
              </input>
              <input onChange={handler4}  className='ml-4 border-2 border-black'  type='text' placeholder='enter property value'>
              </input>
          </div>):null}
      </div>
      <button className='ml-2 h-8 w-11 text-center rounded appearance-none block bg-blue-700 text-white' onClick={handler5}>Save</button>
          
    </div>
  )
}

export default Categories