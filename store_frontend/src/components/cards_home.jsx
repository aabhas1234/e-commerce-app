import React, { useEffect, useState } from 'react'
import { UseCart } from '../contexts/cart_context';

const cards_home = () => {
    

  let [categories, setcategories] = useState([]);
  let [map1, setmap1] = useState(new Map());
  let [flag, setflag] = useState(false);

  const { addtocart, removefromcart } = UseCart();

  const handler1 = (obj) => {
    addtocart(obj);
    alert("Product just added to the cart , you can check for updates on the cart page!!");
  };


  //`http://localhost:5000/api/categories`
  const fetch_categories = async () => {
    //console.log("heyaa");
    const response = await fetch(`http://localhost:5000/api/getcategories`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
    const result = await response.json();
    // console.log(result);
    setcategories(result);
    //console.log(result);
    let final = await Promise.all(result.map((res) => fetch(`http://localhost:5000/api/getproductsfromcategories/${res}`, { method: 'GET' }).then((res) => res.json()).then((data) => {
      return { key: res, value: data };
    })));
    //console.log(final);
    setmap1((prevmap) => {
      let map2 = new Map(prevmap);
      final.forEach(({ key, value }) => {
        let arr = map2.get(key) || [];
        arr.push(...value);
        map2.set(key, arr)
      })
      return map2;
    })
    setflag(true);

  }

  useEffect(() => {
    if (!flag) fetch_categories();

  }, []);

  return (
    <>
    {flag ? categories.map((category) => (
          <div className='text-black bg-white p-5 my-4 rounded-md'>
            <h1 className='font-bold text-black mb-2'>
              {category.toUpperCase()}
            </h1>
            <div className='flex gap-4'>
              {
                map1.get(category)?.map((obj) => (<div className='p-4 rounded-md bg-gray-200 font-bold '>
                  <img className='w-[10rem] h-[10rem] rounded-md margin-x-auto' src={obj.imageurls[0]} alt="Cloudinary Image" />
                  <div className='flex justify-center text-center text-black'>Name: {obj.name}</div>

                  <div className='flex justify-center text-center text-black'>Price: ${obj.price}</div>
                  <button onClick={() => (handler1(obj))} className='flex justify-center text-center bg-white w-full rounded-md text-black cursor-pointer hover:scale-105 transition'>Add to Cart</button>

                </div>))
              }
            </div>
          </div>
        )) : <div>Loading...</div>}
    </>
  )
}

export default cards_home