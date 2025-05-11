import React from 'react'
import { useState } from 'react';
const signup = () => {


    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [name, setname] = useState("");
    const handler1 = (e) => {
        setemail(e.target.value);
    };
    const handler2 = (e) => {
        setpassword(e.target.value);
    };
    const handler3 = (e) => {
        setname(e.target.value);
    };

    const handler4 = async () => {
        console.log("heyaa");
        if (email != "" && name != "" && password != "") {
            const res = await fetch(`http://localhost:5000/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name
                })
            });

            console.log("ok");
            const res1 = await res.text();
            alert(res1);
        }
        else
        {
            alert("Bakchodi mt kr laudee!!");
        }
       
    }

    return (
        <div className='bg-gray-900 p-4 rounded-md flex flex-col items-center justify-center '>
            <div className='m-6 text-left'>
                <label htmlFor='name' className='mr-4 text-white' >Name:</label>
                <input type='text' name='name' id='name' className='rounded-md' onChange={handler3}></input>
            </div>
            <div className='m-6 text-left'>
                <label htmlFor='email' className='mr-4 text-white'>Email:</label>
                <input type='email' name='email' id='email' className='rounded-md' onChange={handler1}></input>
            </div>
            <div className='m-6 text-left'>
                <label htmlFor='password ' className='mr-4 text-white' >Password:</label>
                <input type='password' name='password' id='password' className='rounded-md' onChange={handler2}></input>
            </div>
            <button className='text-white bg-blue-950 p-2 rounded-md' onClick={handler4}>Signup</button>

        </div>
    )
}

export default signup