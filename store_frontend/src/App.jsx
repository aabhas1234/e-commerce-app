import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './home.jsx';
import Authentication from './Authentication.jsx'
import Signin from './signin.jsx'
import Signup from './signup.jsx'
import Account from './account.jsx'
import { Cartprovider } from './contexts/cart_context.jsx';
import Cart from './cart.jsx';
function App() {

  return (
    <Cartprovider>
      <Router >
        <Routes>
          <Route path='/' element={<Authentication />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/account' element={<Account />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
        </Routes>
      </Router>
    </Cartprovider>

  )
}

export default App;