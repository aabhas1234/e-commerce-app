import React, { useEffect, useState } from 'react'
import { UseCart } from '../../contexts/cart_context'
import { User } from '../../contexts/usercontext';
const cart = () => {

    const { map1 } = UseCart();
    const [payload, setpayload] = useState({});
    const [flag, setflag] = useState(false);
    const {addtocart, removefromcart, total }=UseCart();
    const {getdata}=User();
    const handler1=(key,obj)=>{
        obj.name=key;
        addtocart(obj);
        alert ("Product just added to the cart , you can check for updates on the cart page!!");
      };
    
    const handler2=(key,obj)=>{
        obj.name=key
        removefromcart(obj);
        alert ("Product just removed from the cart , you can check for updates on the cart page!!");
      };

    const handler3=async ()=>{
        const arr= Array.from(map1.keys());
    

        const final= arr.map((ele)=>{
            console.log(ele);
            return ({
            name: ele,
            price : map1.get(ele).price,
            quantity: map1.get(ele).quantity
        })});
        console.log(final);
         const res= await fetch (`http://localhost:5000/api/buyerorder`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                products:final
            })

        });
        const response = await res.json();
        alert(response.message);

    };


    const fetch_details = async () => {
            console.log(getdata());
            setpayload(getdata());
            setflag(true);
    }

    useEffect(() => {
        console.log("hello");
        fetch_details();
        console.log("hello1");
    }, []);


    return (
        <>

            <div className='font-bold text-gray-600 text-[2rem] text-center mt-2 mb-7 '> Welcome to the Cart Page </div>
            {
                flag ? <div className='flex gap-[10rem] pl-2'>
                    <div className='grid p-3 gap-y-2 h-fit bg-gray-500 text-white rounded-md  grid-cols-3 grid-rows-[repeat(auto-fit, 1fr)] '>
                        <div className='text-center font-bold bg-gray-600 m-2  p-2 rounded-md text-white  flex items-center justify-center'>Product</div>
                        <div className='text-center font-bold bg-gray-600 m-2 p-2 rounded-md text-white  flex items-center justify-center'>Quantity</div>
                        <div className='text-center font-bold bg-gray-600 m-2 p-2 rounded-md text-white  flex items-center justify-center'>Price Total</div>
                        {
                            [...map1].map(([key, obj]) => (<><div className='text-left '>{key}</div>
                                <div className='text-center flex items-center justify-center gap-2'><button onClick={()=>(handler1(key,obj))} className='text-black rounded-md w-4 h-fit p-[0.1rem] font-bold bg-white'>+</button >{obj.quantity}<button onClick={()=>(handler2(key,obj))} className='text-black rounded-md h-fit w-4 p-[0.1rem] font-bold bg-white'>-</button></div>
                                <div className='text-center flex items-center justify-center'>${obj.quantity * obj.price}</div>
                            </>))
                        }
                    </div>

                    <div className='border-2 border-gray-400 rounded-md p-3 bg-gray-500 text-white'>
                        <div className='text-center font-bold text-[1.5rem]'>Order Info</div>
                        <div className='text-center' >
                            <div className='bg-gray-600 p-2 rounded-md mb-2 text-white font-bold'>Email: {payload.email}</div>
                            <div className='bg-gray-600 p-2 rounded-md mb-2 text-white font-bold'>Address : {payload.address}</div>
                            <div className='bg-gray-600 p-2 rounded-md mb-2 text-white font-bold'>Pincode : {payload.pincode}</div>
                            <div className='bg-gray-600 p-2 rounded-md mb-2 text-white font-bold'>State : {payload.state}</div>
                            <div className='gap-2 rounded-md mb-2 p-2 font-bold bg-gray-600' >Your Total is : ${total} </div>
                            <button onClick={handler3} className='bg-white  rounded-md p-0.5 text-black font-bold hover:bg-gray-400  active:scale-110 transition'>Pay Now</button>
                        </div>
                    </div>
                </div> : <div>Loading....</div>
            }
        </>

    )
}

export default cart;