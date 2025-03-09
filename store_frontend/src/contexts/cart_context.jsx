import { useContext, createContext, useState } from "react";

const Cartcontext = createContext();

export const Cartprovider=({children})=>{

    const [map1,setmap1]=useState(new Map());

    const addtocart= ( obj)=>{
            setmap1((prevmap)=>{
                const newmap= new Map(prevmap);
                newmap.set(obj.name, {price : obj.price,
                    quantity: (prevmap.get(obj.name)?.quantity??0) +1,
                })
                return newmap;
            })
    }
    const removefromcart = (obj)=>{
        setmap1((prevmap)=>{
            const newmap= new Map(prevmap);
            if(prevmap.get(obj.name)?.quantity>1)
            {
                newmap.set(obj.name, {price : obj.price,
                    quantity: (prevmap.get(obj.name)?.quantity)-1,
                })
               
            }
            else
            {
                newmap.delete(obj.name);
            }

            return newmap;
        })
    } 

    return (<Cartcontext.Provider value={{addtocart, removefromcart, map1}}>
        {children}
    </Cartcontext.Provider>)
}

export const UseCart= ()=>{return useContext(Cartcontext)};