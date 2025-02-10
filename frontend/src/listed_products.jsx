import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const listed_products = () => {
    const navigate=useNavigate();
    const [res, setres] = useState([]);
    const [flag, setflag] = useState(false);
    const root = import.meta.env.VITE_ROOT_URL;
    //console.log(root);
    const handler1=(value)=>{
        console.log(value.name);
        navigate('/addnewproduct', {state:{productname: value.name, productdescription: value.description, productprice: value.price}});
    }


    const fetch_products = async () => {
        console.log("ok");
        //localStorage.getItem("authtoken")
        let token = localStorage.getItem("authtoken");
        const result = await fetch(`${root}/listedproducts`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
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
                    <div className='flex space-x-3 my-2 border-black border-2 '>
                        <div>{val.name}</div>
                        <div className='flex space-x-1'>
                            <button className='bg-blue-600 p-1' onClick={()=>{handler1(val)}}>Edit</button>
                            <div className='bg-blue-600 p-1'>Delete</div>
                        </div>
                    </div>
                ))
            }

        </div>

    )
}

export default listed_products