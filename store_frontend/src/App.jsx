import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import Landing_page from './landing_page.jsx';
import Authentication from './Authentication.jsx'
import Signin from './signin.jsx'
import Signup from './signup.jsx'
import Account from './account.jsx'
import { Cartprovider } from './contexts/cart_context.jsx';
import Cards_home from './components/cards_home.jsx';
import Cart from './cart.jsx';
import Home_auth from './components/auth_components/home_auth.jsx';
import Home from './home.jsx';
function App() {

  const router= createBrowserRouter([
    {
      path:'/',
      element:<Landing_page/>,
      children:[
        {
          path:"",
          element:<Authentication/>,
          children:[
            {
              path:'signin',
              element:<Signin/>
            },
            {
              path:'signup',
              element:<Signup/>
            },
            {
              path:"",
              element:<Home_auth/>
            }
            
          ]
        },
       
       
      ]
    },
    {
      path:"/home",
      element:<Home/>,
      children:[
        {
          path:"",
          element:<Cards_home/>
        },
        {
          path:"cart",
          element:<Cart/>
        },
      ]
    }
  ])

  return (
    <Cartprovider>
      <RouterProvider router={router} />
    </Cartprovider>

  )
}

export default App;