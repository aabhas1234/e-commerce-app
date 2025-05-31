import React, { useEffect, useState } from 'react'
import Card from '../../materialUicomponents/card';
import { useNavigate } from 'react-router-dom';
const cards_home = () => {
    
  const navigate = useNavigate();
  let [categories, setcategories] = useState([]);
  let [map1, setmap1] = useState(new Map());
  let [flag, setflag] = useState(false);


  //`http://localhost:5000/api/categories`
  const fetch_categories = async () => {
    //console.log("heyaa");
    const response = await fetch(`http://localhost:5000/api/getcategories`, {
      method: 'GET',
      credentials:'include',
      headers: {
        "Content-Type": "application/json",
      },
    })
    const result = await response.json();
    if(response.status!=200)
    {
      alert(result.message);
      navigate('/');
      return ;
    }
    
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
    {flag ? categories.map((category,index) => (
          <div key={index} className='text-black  p-5 my-4 mx-3 rounded-md'>
            <h1 className='font-bold text-black mb-2'>
              {category.toUpperCase()}
            </h1>
            <div className='flex gap-4'>
              {
                map1.get(category)?.map((obj) => (<Card obj={obj}/>))
              }
            </div>
          </div>
        )) : <div>Loading...</div>}
    </>
  )
}

export default cards_home