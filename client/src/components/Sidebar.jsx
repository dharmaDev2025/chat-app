import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Sidebar = () => {

  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages   // ✅ FIX added
  } = useContext(ChatContext);

  const { logout, onlineUsers } = useContext(AuthContext);

  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // ✅ FIX: Safe filtering
  const filteredUsers = input
    ? (users || []).filter((user) =>
        user.fullName?.toLowerCase().includes(input.toLowerCase())
      )
    : (users || []);

 useEffect(() => {
  getUsers();
}, [onlineUsers]); //  re-fetch when users change

  return (
    <div className="bg-[#8185B2]/10 p-5 rounded-r-xl text-white h-full flex flex-col">

      {/* Top */}
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo} className="max-w-40" alt="Logo" />

          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              className="max-h-5 cursor-pointer"
              alt="Menu"
            />

            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
              <p
                onClick={() => navigate('/profile')}
                className="cursor-pointer hover:text-purple-400"
              >
                Edit Profile
              </p>

              <hr className="my-2 border-t border-gray-500" />

              <p
                onClick={logout}
                className="cursor-pointer text-sm hover:text-purple-400"
              >
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-[#282142] rounded-full flex items-center gap-2 py-2 px-4 mt-5">
          <img src={assets.search_icon} alt="Search" className="w-3" />

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="bg-transparent outline-none text-white text-xs flex-1"
            placeholder="Search user..."
          />
        </div>
      </div>

      {/* Users */}
      <div className="flex-1 overflow-y-auto flex flex-col space-y-2">

        {filteredUsers.map((user) => (

          <div
            key={user._id}
            onClick={() => {
              setSelectedUser(user);

              // ✅ FIX: reset unseen count safely
              setUnseenMessages(prev => ({
                ...prev,
                [user._id]: 0
              }));
            }}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer ${
              selectedUser?._id === user._id ? 'bg-[#282142]/50' : ''
            }`}
          >

            <img
              src={user?.profilePic || assets.avatar_icon}
              className="w-[35px] rounded-full"
              alt={user.fullName}
            />

            <div className="flex flex-col leading-5">
              <p>{user.fullName}</p>

              {onlineUsers?.includes(user._id) ? (
                <span className="text-green-400 text-xs">Online</span>
              ) : (
                <span className="text-neutral-400 text-xs">Offline</span>
              )}
            </div>

            {/* Unseen messages */}
            {unseenMessages?.[user._id] > 0 && (
              <p className="absolute top-4 right-4 text-xs h-5 flex items-center justify-center rounded-full bg-violet-500/50 px-2">
                {unseenMessages[user._id]}
              </p>
            )}

          </div>

        ))}

      </div>
    </div>
  );
};

export default Sidebar;