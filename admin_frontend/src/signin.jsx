import { useState } from 'react';
import React from 'react'
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
        const res = await fetch(`http://localhost:5000/api/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });
        // console.log(res);
        if (res.status === 200) {
            let result = await res.json();
            //console.log(res.status);
            localStorage.setItem("authtoken", result.token);
            navigate(result.redirect, { replace: true });
        }
        else {
            let result = await res.text();
            alert(result);
        }
    }

    return (
        <div className='bg-gray-900 p-4 rounded-md flex flex-col items-center justify-center '>
            <div className='m-6 text-left w-fit'>
                <label htmlFor='email' className='mr-4 text-white'>Email:</label>
                <input type='email' name='email' id='email' className='rounded-md' onChange={handler1}></input>
            </div>

            {/* Password Input */}
            <div className='m-6 text-left w-fit'>
                <label htmlFor='password' className='mr-4 text-white'>Password:</label>
                <input type='password' name='password' id='password' className='rounded-md' onChange={handler2}></input>
            </div>

            {/* Login Button */}
            <button className='text-white bg-blue-950 p-2 m-4 rounded-md' onClick={handler3}>Login</button>
        </div>
    )
}

export default signin;