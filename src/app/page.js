"use client"
import React, { useEffect, useState } from "react";
import { signIn } from 'next-auth/react';

export default  function Home() {
//////////////////////////////////////////////////////////////////////////////////////////
  const [latitude, setlatitude]=useState(0);
  const [longitude, setlongitude]=useState(0);
  const [address, setaddress]=useState("");
  const apikey= "f25045a3bfba42e5b061e8490742f01e";
    useEffect(()=>{
      if ('geolocation' in navigator) {
        const watchId =navigator.geolocation.watchPosition(
          (position) => {
            setlatitude(position.coords.latitude);
            setlongitude(position.coords.longitude);   
          },
          (error) => {
            // Error callback
            console.error('Error occurred:', error.message);
          }
        );}   
    },[])
    useEffect(()=>{
      console.log(address);
    },[address])
    useEffect(()=>{
      if (latitude !== 0 && longitude !== 0) {
        const fetchAddress = async () => {
          const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${apikey}`;
          try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results && data.results.length > 0) {
              setaddress(data.results[0].formatted);
            } else {
              console.error("No address results found");
            }
          } catch (error) {
            console.error('Error fetching address:', error);
          }
        };
        fetchAddress();
    }}
      ,[latitude,longitude])
//////////////////////////////////////////////////////////////////////////////////////////
  const [data,setdata]=useState([]);
  const [path1 ,setpath]=useState("");
  useEffect(
    ()=>{
    async function fetch1()
    { 
      try {
        const response = await fetch('/api/getdata');
        const res = await response.json();
        setdata([...res]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetch1();
    },[])
    useEffect(()=>{
      if (data.length > 0 ) {
        let ind= Math.floor(Math.random() * (Math.floor(data.length)-1));
        setpath(data[1].path);
      }
    },[data])
  return (
   <div className="">
    <div className="flex bg-gray-900 gap-7 text-white">
      <img src="/images/logo2.png" className="w-24 h-16 rounded-full bg-center"></img>
      <div>
          <div>Delivering To</div>
          <div>{address}</div>
      </div>
      <button onClick={() => signIn()} className="bg-white text-black">Sign In</button>
    </div>
    <div>
     <img src={path1}>
     </img>
    </div>
   </div>
  );
}
