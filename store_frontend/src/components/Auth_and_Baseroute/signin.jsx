import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, lime, purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { User } from '../../contexts/usercontext';



const signin = () => {
    const {setdata} = User();
    const navigate = useNavigate();

    const [email, setemail] = useState("bhadauriaaabhas561@gmail.com");
    const [password, setpassword] = useState("1234");

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
            credentials:'include',
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
        
        if(res.status==200)
        {    
            let {email , pincode , state , address}= result.final;
            
            setdata(email,address,pincode, state);
            navigate(result.redirect, { replace: true });
        }
    }


    return (
         <div className='bg-blue-50  relative p-3 text-center w-1/2 mx-auto mt-[5rem] rounded-md h-fit'>
            <div className='my-3'>
                <TextField className='mx-auto w-1/2' id="outlined-basic" label="Email" variant="outlined" onChange={handler1} />
            </div>
            <div className='my-3'>
                <TextField className='mx-auto w-1/2 ' id="outlined-basic" label="Password" variant="outlined" onChange={handler2} />
            </div>
            <br/>
            <Button className='  rounded-md' variant="contained" onClick={handler3}>Login</Button>
         </div>
    )
}

export default signin;