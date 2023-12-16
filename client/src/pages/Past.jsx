import React from 'react'
import Sidebar from '../components/Sidebar'
import OldChat from '../components/OldChat';
import { useLocation } from 'react-router-dom';

function Past() {
  const location = useLocation();
  console.log("lpathname");

  return (
    <div className='w-ful flex h-[100vh]'>
      <div className='w-1/5 bg-black'>
        <Sidebar />
      </div>
      <div className='w-4/5'>
        <OldChat />
      </div>
    </div>
  )
}

export default Past
