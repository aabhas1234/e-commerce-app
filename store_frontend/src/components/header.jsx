import React from 'react'
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const header = () => {
    const navigate = useNavigate();

    const theme = createTheme({
        palette: {
            primary: {
                main: blue[500]
            }
        },
    });
    const handler1 = () => {
        if(!localStorage.getItem("authtoken"))
            alert("Please signin First!!");
        navigate('/home');
    }
    const handler2 = () => {
        navigate('/home/cart')
    }

    return (
        <div className='flex justify-between font-sans font-bold p-2  relative'>
            <div className='bg-blue-900 text-white p-2 rounded-lg '>E-commerce</div>
            <ThemeProvider theme={theme}>
                <div className='flex gap-3 text-black'>
                    <Button onClick={handler1} variant="contained" startIcon={<HomeIcon/>} color="primary">Home</Button>
                    <Button variant="contained" color="primary" startIcon={<AccountBoxIcon/>}>Account</Button>
                    <Button onClick={handler2} variant="contained" startIcon={<ShoppingCartIcon/>} color="primary">Cart</Button>
                    <Button variant="contained" color="primary" startIcon={<LogoutIcon/>}>Signout</Button>
                </div>
            </ThemeProvider>

        </div>)
}
export default header