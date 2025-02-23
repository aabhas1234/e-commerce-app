import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Authentication = () => {

    const navigate=useNavigate();

    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");

    const handler1 = (e) => {
            setemail(e.target.value);
     };
    const handler2 = (e) => {
        setpassword(e.target.value);
     };
     const handler3=async()=>{
        console.log("hey");
            const res=await fetch(`http://localhost:5000/api/signin`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    "email": email,
                    "password":password
                })
            });
            let result = await res.json();
            console.log(result.token);
            localStorage.setItem("authtoken", result.token);
            navigate(result.redirect,{replace:true});
     }

     const handler4= async()=>{
        console.log("heyaa");
        const res=await fetch(`http://localhost:5000/api/signup`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "email": email,
                "password":password
            })
        });
        console.log("ok");
    const res1=await res.json();
        console.log(res1);
     }
    return (
        <div className='h-96 bg-blue-700 border-black rounded-md border-2 w-fit mx-auto '>

            <div className='text-center text-white'>
                LogIn/SignUp

            </div>
            <div className=''>
                <div className='m-6 text-left'>
                    <label htmlFor='email' className='mr-4 text-white'>Email:</label>
                    <input type='email' name='email' id='email' className='rounded-md' onChange={handler1}></input>
                </div>
                <div className='m-6 text-left'>
                    <label htmlFor='password ' className='mr-4 text-white' >Password:</label>
                    <input type='password' name='password' id='password' className='rounded-md' onChange={handler2}></input>
                </div>

            </div>
            <div>
                <button className='text-white bg-blue-950 p-2 m-4 rounded-md' onClick={handler3}>login</button>
                <button className='text-white bg-blue-950 p-2 rounded-md' onClick={handler4}>Signup</button>
            </div>
           
        </div>
    )
}

export default Authentication;