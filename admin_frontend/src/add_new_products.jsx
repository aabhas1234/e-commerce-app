import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const add_new_products = () => {
    const location = useLocation(); 
    const { productname, productprice, productdescription } = location.state || {}; 

    console.log(`${productname}  ${productprice}  ${productdescription}`);
    const [result, setresult] = useState([]);
    const [pn, setpn] = useState(productname);
    const [pd, setpd] = useState(productdescription );
    const [pp, setpp] = useState(productprice);
    const [pc,setpc]=useState("");
    const [result1, setresult1] = useState([]);
    const [result2, setresult2] = useState([]);
    //const [cpc, setcpc] = useState("");
    const [flag, setflag] = useState(false);
    const [flag1, setflag1] = useState(false);
    const [mapdata, setmapdata] = useState(new Map())
    const [imagefiles, setimagefiles]=useState([]);
    const handler1 = (event) => {
        setpn(event.target.value)
    }
    const handler2 = (event) => {
        setpd(event.target.value);
    }
    const handler3 = (event) => {
        setpp(event.target.value);
    }

    const handler4 = async () => {
        const res = await fetch('http://localhost:5000/api/getcategories');
        const data = await res.json();
        setresult(data);

    }
    const handler5 = async (element) => {
        //setselected(element.target.value);

        console.log(`You selected: ${element.target.value}`);
        const res = await fetch(`http://localhost:5000/api/getproperties/${element.target.value}`);
        const data = await res.json();
        setresult1(data);
        console.log(result1);
        setpc(element.target.value);
        if (!flag) {
            console.log("ok");
            const ele1 = document.getElementsByClassName('property1');
            ele1[0].classList.toggle('hidden');
            setflag(true);
        }

    }

    const handler6 = (val, e) => {

        setmapdata((prev) => {
            const newmap = new Map(prev);
            // console.log(`${val} and ${e.target.value}`);
            newmap.set(val, e.target.value);
            return newmap;
        })
    }
    const handleimageupload=(e)=>{
        setimagefiles(e.target.files);   
    }

    const handler7 = async () => {
        const formdata=new FormData();
        for( let i=0;i<imagefiles.length;i++)
        {
            formdata.append("images",imagefiles[i]);
        }
        let response=await fetch(`http://localhost:5000/api/getimageurl`,{
            method:'POST',
            body: formdata
        })
        let imageurls=await response.json();
        let keys = [];
        for (let element of result1) {
            keys.push(element.key);
        }
        console.log(keys);
        const plainObject = Object.fromEntries(mapdata);
        if (pn != "" && pp != 0 && pd != "" && pc != "" && result1.length != 0) {
            await fetch(`http://localhost:5000/api/saveproduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    keys: keys,
                    productname: pn,
                    productprice: pp,
                    productdescription: pd,
                    productcategory: pc,
                    productmap: plainObject,
                    imageurls: imageurls,
                })
            })
        }
        else
            alert("Please choose all the required Fields!! ");
    }

    useEffect(() => {
        handler4();
        setmapdata(new Map());
    }, []);
    return (
        <div className='Addproducts'>
            <div>
                <div className='text-lg mr-3 text-left font-bold'>Enter Product name</div>
                <input className='block border-2 border-black' value={pn} onChange={handler1}></input>
            </div>
            <div>
                <div className='text-lg mr-3 text-left font-bold'>Enter Product Description</div>
                <textarea className='block border-2 border-black' value={pd} placeholder='' onChange={handler2}></textarea>
            </div>
            <div>
                <div className='text-lg mr-3 text-left font-bold'>Enter Product Price </div>
                <input className='block border-2 border-black' value={pp} placeholder='' type='number' onChange={handler3}></input>
            </div>

            <div className='relative text-left my-4'>
                <div className=' text-lg font-bold  mr-1.5 my-1.5' >Choose Product Category</div>


                <div className='dropdown1 my-1.5'>

                    <select className='' onChange={handler5}>
                        <option value="" disabled selected>Select an option...</option>
                        {
                            result.map((element) => (
                                <option value={element} className='rounded-md border-2 text-white bg-gray-600'>{element}</option>
                            ))
                        }
                    </select>


                    <div className='property1 hidden  '>
                        {
                            result1.map((element) => {
                                return (
                                    <div className=''>
                                        <div className='mr-2 font-bold'>Choose the value of {element.key}</div>
                                        <div>
                                            <select className=' choosingproperty ' onChange={(e) => handler6(element.key, e)}>
                                                <option value="" disabled selected>
                                                    Choose Value
                                                </option>
                                                {
                                                    element.value.map((element) => (
                                                        <option value={element}>{element}</option>))
                                                }
                                            </select>
                                        </div>
                                    </div>)
                            })
                        }
                    </div>

                </div>
                <div>
                    <input type='file' multiple accept="image/*" placeholder=' Upload Product images' onChange={handleimageupload}></input>
                </div>



            </div>

            <button className='p-1 bg-blue-700 text-white rounded-sm block mt-3' onClick={handler7}>
                Save
            </button>

        </div>
    )
}

export default add_new_products;