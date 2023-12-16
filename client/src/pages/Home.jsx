import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatSection from '../components/ChatSection';
import oldChat from '../components/oldChat';
import { useLocation } from 'react-router-dom';

function Home() {
  const location=useLocation();
  console.log(location.pathname);

  return (
    <div className='w-ful flex h-[100vh]'>
      <div className='w-1/5 bg-black'>
        <Sidebar />
      </div>
      <div className='w-4/5'>
        <ChatSection /> 
      </div>
    </div>
  )
}

export default Home
