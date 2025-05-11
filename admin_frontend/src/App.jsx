import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './home.jsx';
import Add_new_products from './add_new_products.jsx'
import Authentication from './Authentication.jsx'
import Signin from './signin.jsx';
import Signup from './signup.jsx';
import { ContextProvider } from './createcontext.jsx';
function App() {

  return (
    <ContextProvider>
      <Router >
        <Routes>
                <Route path='/' element={<Authentication/>}></Route>
                <Route path='/home' element={<Home/>}></Route>
                <Route path='/addnewproduct' element={<Add_new_products/>}></Route>
                <Route path='/signin' element={<Signin/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
    </Router> 
    </ContextProvider>
    
  )
}

export default App;