import React from 'react'
import Signin from '../../signin'
import Signup from '../../signup'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const home_auth = () => {

    const theme = createTheme({
        palette: {
            primary: {
                main:blue[500]
            }
        },
    });

    const navigate = useNavigate();
    const handler1 = () => {
        navigate('/signin');
    }

    const handler2 = () => {
        navigate('/signup');
    }


    return (
        <ThemeProvider theme={theme}>

            <div className='flex gap-2 justify-center items-center mt-[12rem]'>
                <Button onClick={handler1} variant="contained" color="primary">Signin</Button>
                <Button onClick={handler2} variant="contained" color="primary">Signup</Button>
            </div>

        </ThemeProvider>

    )
}

export default home_auth