import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './home.jsx';
import Authentication from './Authentication.jsx'
function App() {

  return (
    <Router >
        <Routes>
                <Route path='/' element={<Authentication/>}></Route>
                <Route path='/home' element={<Home/>}></Route>
        </Routes>
    </Router>
  )
}

export default App;