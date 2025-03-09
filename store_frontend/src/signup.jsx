import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const signup = () => {

    const navigate = useNavigate();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [address,setaddress]= useState("");
    const [state, setstate]=useState("");
    const [pincode,setpincode]=useState(0);

    const handler1 = (e) => {
        setemail(e.target.value);
    };
    const handler2 = (e) => {
        setpassword(e.target.value);
    };

    const handler5 = (e) => {
        setaddress(e.target.value);
    };

    const handler6 = (e) => {
        setstate(e.target.value);
    };
    
    const handler7= (e) => {
        setpincode(e.target.value);
    };


    const handler4 = async () => {
        console.log("heyaa");
        const res = await fetch(`http://localhost:5000/api/signup_buyer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "pincode":pincode,
                "state": state,
                "address": address
            })
        });
        console.log("ok");
        const res1 = await res.text();
        alert(res1);
        console.log(res1);
    }

    return (
        <div className='bg-gray-700 p-3'>
            <div className='font-bold text-white mx-auto w-fit'>WELCOME TO THE SIGNUP PAGE</div>
            <div className='m-6 text-left'>
            <label htmlFor='email' className='mr-4 text-white'>Email:</label>
            <input type='email' name='email' id='email' className='rounded-md bg-gray-400' onChange={handler1}></input>
            </div>
            <div className='m-6 text-left'>
            <label htmlFor='address' className='mr-4 text-white'>Address:</label>
            <input type='text' name='address' id='address' className='rounded-md  bg-gray-400' onChange={handler5}></input>
            </div>
            <div className='m-6 text-left'>
            <label htmlFor='State' className='mr-4 text-white'>State:</label>
            <input type='text' name='State' id='State' className='rounded-md  bg-gray-400' onChange={handler6}></input>
            </div>
            <div className='m-6 text-left'>
            <label htmlFor='pincode' className='mr-4 text-white'>Pincode:</label>
            <input type='number' name='pincode' id='pincode' className='rounded-md  bg-gray-400' onChange={handler7}></input>
            </div>
            <div className='m-6 text-left'>
                <label htmlFor='password ' className='mr-4 text-white' >Password:</label>
                <input type='password' name='password' id='password' className='rounded-md  bg-gray-400' onChange={handler2}></input>
            </div>
            <button className='text-white bg-blue-950 p-2 rounded-md' onClick={handler4}>Signup</button>
        </div>
    )
}

export default signup