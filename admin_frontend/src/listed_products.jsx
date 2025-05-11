import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useProvider } from './createcontext.jsx';

const listed_products = () => {
    const navigate=useNavigate();
    const [res, setres] = useState([]);
    const [flag, setflag] = useState(false);
    const root = import.meta.env.VITE_ROOT_URL;
    const fetch_details=useProvider();
    //console.log(root);
    const handler1=(value)=>{
        console.log(value.name);
        navigate('/addnewproduct', {state:{productname: value.name, productdescription: value.description, productprice: value.price}});
    }


    const fetch_products = async () => {
        console.log("ok");
        //localStorage.getItem("authtoken")
        let token = localStorage.getItem("authtoken");
        const payload=await fetch_details();
        const result = await fetch(`${root}/listedproducts`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify({
                payload: payload,
            })
        })
               
        console.log("hello");
        if (result.status != 401) {
            let final = await result.json();
            setres(final);
            setflag(true);
            console.log("oknot");
        }
        else
            navigate('/');
        
    }
    useEffect(() => {
        console.log("ok1");
        fetch_products();
    }, []);

    return (
        <div>
            {flag === false ? <div>Loading...</div> :

                res.map((val) => (
                    <div className='flex space-x-3 w-fit p-2 rounded-xl my-2 bg-gray-600 border-2 '>
                        <div className='font-bold text-white'>{val.name}</div>
                        <div className='flex space-x-1'>
                            <button className='bg-white text-black p-1 rounded-md' onClick={()=>{handler1(val)}}>Edit</button>
                            <div className='bg-white text-black p-1 rounded-md'>Delete</div>
                        </div>
                    </div>
                ))
            }

        </div>

    )
}

export default listed_products