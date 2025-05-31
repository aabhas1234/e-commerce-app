import React, { useState } from 'react'
import { createContext, useContext } from 'react'

const UserContext=createContext();

export const usercontext = ({children}) => {

    let [email, setemail]=useState("");
    let [pincode, setpincode]=useState("");
    let [address, setaddress]=useState("");
    let [state, setstate]=useState("");

    const setdata=(email,address,pincode, state)=>{
      console.log("ok");
        setemail(email);
        setaddress(address);
        setpincode(pincode);
        setstate(state);
    }
    const getdata=()=>{
      return {
        email,
        address,
        pincode,
        state
      }
    }

  return (
    <UserContext.Provider value={{getdata, setdata}}>
        {children}
    </UserContext.Provider>
  )
}

export const User= ()=>{return useContext(UserContext)};