import React, { useEffect, useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const [chats, setChats] = useState([]);
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem('chatPosts'));
    if (storedChats) setChats(storedChats);
  }, []);

  return (
    <div className="flex items-start p-1 flex-col gap-1">
      <div className="flex items-center gap-2 p-2 hover:bg-[#00000c] hover:w-full cursor-pointer rounded-md py-4">
        <IoMdAddCircle className="text-white" size={25} />
        <Link to='/' className="text-white text-lg font-nunito font-extrabold">New Chat</Link>
      </div>
      <div className="text-gray-400 text-xs font-candara mt-3 font-thin pl-2">Recent Chats</div>
      <div className="flex cursor-pointer rounded-md flex-col w-full pl-2 gap-1">
        {chats.map((chat, index) => (
          chat.question && (
            <Link
              to={`/c/${chat.id}`}
              key={index}
              className={`text-white text-xs hover:bg-gray-600 hover:w-full rounded-md p-2 font-nunito ${location.pathname === `/c/${chat.id}` && 'bg-gray-600'}
              `}
            >
              {chat?.question?.slice(0, 30)}
            </Link>
          )
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
