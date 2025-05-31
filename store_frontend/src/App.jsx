import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import Landing_page from './landing_page.jsx';
import Authentication from './components/Auth_and_Baseroute/Authentication.jsx'
import Signin from './components/Auth_and_Baseroute/signin.jsx'
import Signup from './components/Auth_and_Baseroute/signup.jsx'
import Account from './components/HomeComponents/account.jsx'
import { Cartprovider } from './contexts/cart_context.jsx';
import Cards_home from './components/HomeComponents/cards_home.jsx';
import Cart from './components/HomeComponents/cart.jsx';
import Home_auth from './components/Auth_and_Baseroute/home_auth.jsx';
import Home from './components/HomeComponents/home.jsx';
import { usercontext as Usercontext } from './contexts/usercontext.jsx';
function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing_page />,
      children: [
        {
          path: "",
          element: <Authentication />,
          children: [
            {
              path: 'signin',
              element: <Signin />
            },
            {
              path: 'signup',
              element: <Signup />
            },
            {
              path: "",
              element: <Home_auth />
            }

          ]
        },


      ]
    },
    {
      path: "/home",
      element: <Home />,
      children: [
        {
          path: "",
          element: <Cards_home />
        },
        {
          path: "cart",
          element: <Cart />
        },
      ]
    }
  ])

  return (
    <Cartprovider>
      <Usercontext>
        <RouterProvider router={router} />
      </Usercontext>
    </Cartprovider>

  )
}

export default App;