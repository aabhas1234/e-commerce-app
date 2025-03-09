import React, { useEffect, useState } from 'react'
import { UseCart } from './contexts/cart_context'
const cart = () => {

    const { map1 } = UseCart();
    const [payload, setpayload] = useState({});
    const [flag, setflag] = useState(false);
    const fetch_details = async () => {

        const token = localStorage.get("authtoken");
        const res = await fetch(`http://localhost:5000/api/gettoken_buyer`, {
            method: GET,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })



        if (res.status !== 500) {
            const response = await res.json();
            const res1 = await fetch(`http://localhost:5000/api/getbuyerdetails`, {
                method: POST,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            })
            const payload_final = await res1.json();
            setpayload(payload_final);
            setflag(true);
        }
        else {
            const response = await res.json();
            alert(response.message);
        }



    }

    useEffect(() => {
        fetch_details();
    }, []);


    return (
        <>
            {
                flag ? <div>
                    <div className='grid grid-cols-3 grid-rows-[repeat(auto-fit, 1fr)] '>
                        <div>Product</div>
                        <div>Quantity</div>
                        <div>Price Total</div>
                        {
                            [...map1].map(([key, obj]) => (<><div>obj.name</div>
                                <div>obj.quantity</div>
                                <div>{obj.quantity * obj.price}</div>
                            </>))
                        }
                    </div>

                    <div>
                        <div>Order Info</div>
                        <div>
                            <div>Email : ${payload.email}</div>
                            <div>State : ${payload.state}</div>
                        </div>
                    </div>
                </div> : <div>Loading....</div>
            }
        </>

    )
}

export default cart;