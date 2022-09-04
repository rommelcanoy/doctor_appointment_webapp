import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';

function App() {


  return (
    <div className="h-screen border flex flex-col bg-gray-100">
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <div className='flex justify-end px-5 py-3 bg-white'>
          <div className='flex gap-5'>
            <Link to="/login" className='hover:text-blue-700'>Login</Link>
            <Link to="/Register" className='hover:text-blue-700'>Register</Link>
          </div>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
