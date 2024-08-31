import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  const path = useLocation()
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [path])

  return (
    <>
        <Navbar />
        <Outlet />
        <ToastContainer />
    </>
  )
}

export default MainLayout
