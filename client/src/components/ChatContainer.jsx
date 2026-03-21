import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import toast from "react-hot-toast";

const ChatContainer = () => {

  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();
  const [input, setInput] = useState("");

  // Send text message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    await sendMessage({ text: input.trim() });
    setInput("");
  }

  // Send image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };

    reader.readAsDataURL(file);
  }

  // Fetch messages when user changes
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  // Auto scroll to latest message
  useEffect(() => {
    setTimeout(() => {
      scrollEnd.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [messages]); // ✅ FIXED

  return selectedUser ? (
    <div className='h-full relative'>

      {/* Top bar */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={selectedUser.profilePic || assets.avatar_icon} className='w-8 rounded-full' />

        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          {selectedUser.fullName}

          {onlineUsers.includes(selectedUser._id) && (
            <span className='w-2 h-2 rounded-full bg-green-500'></span>
          )}
        </p>

        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          className='md:hidden max-w-7'
        />

        <img
          src={assets.help_icon}
          alt=''
          className='max-md:hidden max-w-5'
        />
      </div>

      {/* Messages */}
      <div className='flex flex-col h-[calc(100%-160px)] overflow-y-auto p-3 pb-6'>

        {messages.map((msg, index) => (   // ✅ FIXED

          <div
            key={index}
            className={`flex items-end gap-2 ${
              msg.senderId === authUser._id ? "justify-end" : "justify-start"
            }`}
          >

            {/* Avatar */}
            <img
              src={
                msg.senderId === authUser._id
                  ? authUser?.profilePic || assets.avatar_icon
                  : selectedUser?.profilePic || assets.avatar_icon
              }
              className='w-7 rounded-full'
            />

            {/* Message */}
            {msg.image ? (
              <img
                src={msg.image}
                alt=''
                className='max-w-[200px] max-h-[200px] object-cover rounded-lg'
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] text-sm rounded-lg break-all text-white ${
                  msg.senderId === authUser._id
                    ? 'bg-violet-500 rounded-br-none'
                    : 'bg-gray-700 rounded-bl-none'
                }`}
              >
                {msg.text}
              </p>
            )}

            {/* Time */}
            <p className='text-xs text-gray-400'>
              {formatMessageTime(msg.createdAt)}
            </p>

          </div>

        ))}

        {/* Scroll Target */}
        <div ref={scrollEnd}></div>

      </div>

      {/* Input */}
      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-black/20'>

        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
            type='text'
            placeholder='Send a message'
            className='flex-1 text-sm p-3 outline-none text-white bg-transparent'
          />

          <input
            onChange={handleSendImage}
            type='file'
            id='image'
            accept='image/png,image/jpeg'
            hidden
          />

          <label htmlFor='image'>
            <img
              src={assets.gallery_icon}
              className='w-5 mr-2 cursor-pointer'
            />
          </label>

        </div>

        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          className='w-7 cursor-pointer'
        />

      </div>

    </div>

  ) : (

    <div className='h-full flex flex-col items-center justify-center text-gray-500 bg-white/10'>
      <img src={assets.logo_icon} className='max-w-16' />
      <p className='text-lg text-white'>Chat anytime, anywhere</p>
    </div>

  )
}

export default ChatContainer;