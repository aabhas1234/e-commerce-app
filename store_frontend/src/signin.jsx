import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const signin = () => {

    const navigate = useNavigate();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const handler1 = (e) => {
        setemail(e.target.value);
    };
    const handler2 = (e) => {
        setpassword(e.target.value);
    };

    const handler3 = async () => {
        console.log("hey");
        const res = await fetch(`http://localhost:5000/api/signin_buyer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });
        
        const result=await res.json();
        alert(result.message);
        
        if(result.token)
        {    
            localStorage.setItem("authtoken", result.token);
            navigate(result.redirect, { replace: true });
        }
    }


    return (
         <div className='bg-gray-700 p-3 text-center'>
            <div className='m-6 text-left'>
                <label htmlFor='email' className='mr-4 text-white'>Email:</label>
                <input type='email' name='email' id='email' className='rounded-md' onChange={handler1}></input>
            </div>
            <div className='m-6 text-left'>
                <label htmlFor='password ' className='mr-4 text-white' >Password:</label>
                <input type='password' name='password' id='password' className='rounded-md' onChange={handler2}></input>
            </div>
            <button className='text-white bg-blue-950 p-2 m-4 rounded-md' onClick={handler3}>login</button>
        </div>
    )
}

export default signin;