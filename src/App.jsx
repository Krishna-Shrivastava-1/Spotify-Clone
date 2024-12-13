import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Homepage from './Pages/Homepage/Homepage';
import Login from './Pages/Login/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Config/firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Pages/Profilepage/Profile';
import Searchpage from './Pages/Searcher/Searchpage';
import Songdetail from './Pages/Songdetail/Songdetail';
import loader from '../src/assets/loderr.gif'

const App = () => {
  const [loading, setLoading] = useState(true);
  const [fullname, setfullname] = useState('')
  const [useremail, setuseremail] = useState('')
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (location.pathname === '/') {
          navigate('/home');
        }
      } else {
        if (location.pathname !== '/') {
          navigate('/');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [navigate, location.pathname]);

  if (loading) {
    return (
      <div className='w-full flex items-center justify-center h-screen flex-col select-none'>
        <img className='w-auto' src={loader} alt="" />
        <h1 className="text-2xl font-bold text-white ml-4">Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Login setfullname={setfullname} setuseremail={setuseremail}/>} />
        <Route path='/home' element={<Homepage fullname={fullname} />} />
        <Route path='/profile' element={<Profile useremail={useremail} fullname={fullname} setfullname={setfullname}  />} />
        <Route  path='/searchpage' element={<Searchpage/>} />
        <Route  path='/songdetail/:idsong' element={<Songdetail/>} />
      </Routes>
    </div>
  );
};

export default App;
