import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './home.jsx';
import Add_new_products from './add_new_products.jsx'
import Authentication from './Authentication.jsx'
function App() {

  return (
    <Router >
        <Routes>
                <Route path='/' element={<Authentication/>}></Route>
                <Route path='/home' element={<Home/>}></Route>
                <Route path='/addnewproduct' element={<Add_new_products/>}></Route>
        </Routes>
    </Router>
  )
}

export default App;