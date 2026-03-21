import React, { useContext, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';
import RightSidebar from '../components/RightSidebar';
import { ChatContext } from '../context/ChatContext';


const HomePage = () => {
 const { selectedUser } = useContext(ChatContext);

  return (
    <div className="w-full h-screen sm:px-[5%] sm:py-[2%] bg-[#1E1B2F]">

      {/* Main box container */}
      <div className="backdrop-blur-xl border-2 border-gray-600 rounded-2xl h-full overflow-hidden flex">

        {/* Sidebar */}
        <div className={`${selectedUser ? 'w-1/4' : 'w-1/3'} border-r border-gray-600 overflow-y-auto`}>
          <Sidebar />
        </div>

        {/* Chat Container */}
        <div className={`${selectedUser ? 'flex-1' : 'flex-1'} border-r border-gray-600 overflow-y-auto`}>
          <ChatContainer />
        </div>

        {/* Right Sidebar: only show if selectedUser exists */}
        {selectedUser && (
          <div className="w-1/4 overflow-y-auto">
            <RightSidebar />
          </div>
        )}

      </div>

    </div>
  );
};

export default HomePage;