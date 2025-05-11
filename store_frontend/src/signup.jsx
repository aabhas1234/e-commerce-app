import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, lime, purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
const signup = () => {

    const navigate = useNavigate();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [address, setaddress] = useState("");
    const [state, setstate] = useState("");
    const [pincode, setpincode] = useState(0);

    const theme = createTheme({
        palette: {
            primary: {
                main: blue[500]
            }
        },
    });

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

    const handler7 = (e) => {
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
                "pincode": pincode,
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
        <div className='relative bg-blue-50 mx-auto rounded-2xl p-3 w-fit '>
            <ThemeProvider theme={theme}>
                <div className='font-bold text-black mx-auto w-fit'>WELCOME TO THE SIGNUP PAGE</div>
                <div className='grid grid-cols-3 '>
                    <div className='my-3 flex justify-center items-center'>
                        <TextField className='mx-auto w-1/2' id="outlined-basic" label="Email" variant="outlined" color="primary"  onChange={handler1} />
                    </div>
                    <div className='my-3 flex justify-center items-center'>
                        <TextField className='mx-auto w-1/2' id="outlined-basic" label="Address" variant="outlined" onChange={handler5} />
                    </div>
                    <div className='my-3 flex justify-center items-center'>
                        <TextField className='mx-auto w-1/2' id="outlined-basic" label="State" variant="outlined" onChange={handler6} />
                    </div>
                    <div className='my-3 flex justify-center items-center'>
                        <TextField className='mx-auto w-1/2' id="outlined-basic" label="Pincode" variant="outlined" onChange={handler7} />
                    </div>
                    <div className='my-3 flex justify-center items-center'>
                        <TextField className='mx-auto w-1/2' id="outlined-basic" label="Password" variant="outlined" onChange={handler2} />
                    </div>
                </div>
                <br />

                <div className='mx-auto w-fit'>
                    <Button className='rounded-md mx-auto' variant="contained" onClick={handler4}>Signup</Button>
                </div>

            </ThemeProvider>

        </div>
    )
}

export default signup