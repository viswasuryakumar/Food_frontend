import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {


  useEffect(()=>{
    if(!Cookies.get('authToken')){
      navigate("/")
    }
  },[])

  const authToken = Cookies.get('authToken');
  const navigate = useNavigate()
  const logout=()=>{
    localStorage.removeItem('user');
    Cookies.remove('authToken');
    navigate("/");
  }

  return (
    <div className='w-full font-semibold text-white flex items-center justify-between px-6 py-2 h-[10vh] bg-emerald-500'>
        <div className=''>
          Food Tracker
        </div>
        <div className='flex gap-x-6'>
            <Link to="/create">Create Item</Link>
            <Link to="/view">View Items</Link>
           
            <span className='cursor-pointer' onClick={logout}>Logout</span>
        </div>
    </div>
  )
}

export default Navbar
