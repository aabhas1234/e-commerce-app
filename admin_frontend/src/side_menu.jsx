import React from 'react'
import Logout from './logout.jsx'
import Products from './products.jsx'
import Orders from './orders.jsx'
import Categories from './categories.jsx'
import Settings from './settings.jsx'
import Admins from './admins.jsx'
import Dashboard from './dashboard.jsx'
import { useState } from 'react'
const side_menu = ({count}) => {
    let menu;
    if(count==1)
    {
        menu=<Dashboard/>
    }
    if(count==2)
    {
        menu=<Products/>
    }
    if(count==3)
    {
        menu=<Categories/>
    }
    if(count==4)
    {
        menu=<Orders/>
    }
    if(count==5)
    {
        menu=<Admins/>
    }
    if(count==6)
    {
        menu=<Settings/>
    }
    if(count==7)
    {
        menu=<Logout/>
    }
  return (
    <div>{menu}</div>
  )
}

export default side_menu