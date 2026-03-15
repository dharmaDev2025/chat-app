import React, { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils';

const ChatContainer = ({selectedUser,setSelectedUser}) => {

  const scrollEnd = useRef();

  // Auto scroll to last message
  useEffect(()=>{
    setTimeout(()=>{
      scrollEnd.current?.scrollIntoView({behavior:"auto"})
    },50)
  },[messagesDummyData, selectedUser])

  return selectedUser ? (
    <div className='h-full relative'>
      
      {/* Top bar */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={assets.profile_martin} className='w-8 rounded-full'/>

        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          Martin Jhonshon
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
        </p>

        <img
          onClick={()=>setSelectedUser(null)}
          src={assets.arrow_icon}
          className='md:hidden max-w-7'
        />

        <img
          src={assets.help_icon}
          alt=''
          className='max-md:hidden max-w-5'
        />
      </div>

      {/* Chat messages */}
      <div className='flex flex-col h-[calc(100%-160px)] overflow-y-auto p-3 pb-6'>

        {messagesDummyData.map((msg,index)=>(
          
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${
              msg.senderId!='680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'
            }`}
          >

            {/* Image message */}
            {msg.image ? (
              <img
                src={msg.image}
                alt=''
                className='max-w-[200px] max-h-[200px] object-cover rounded-lg mb-8'
              />
            ) : (

              /* Text message */
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                  msg.senderId==='680f50e4f10f3cd28382ecf9'
                    ? 'rounded-br-none'
                    : 'rounded-bl-none'
                }`}
              >
                {msg.text}
              </p>

            )}

            {/* Avatar + Time */}
            <div className='text-center text-xs'>
              <img
                src={
                  msg.senderId==='680f50e4f10f3cd28382ecf9'
                    ? assets.avatar_icon
                    : assets.profile_martin
                }
                alt=""
                className='w-7 rounded-full'
              />

              <p className='text-gray-500'>
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>

          </div>

        ))}

        {/* Scroll target */}
        <div ref={scrollEnd}></div>

      </div>

      {/* Chat input */}
      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-black/20'>

        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
          <input
            type='text'
            placeholder='Send a message'
            className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400 bg-transparent'
          />

          <input
            type='file'
            id='image'
            accept='image/png,image/jpeg'
            hidden
          />

          <label htmlFor='image'>
            <img
              src={assets.gallery_icon}
              alt=""
              className='w-5 mr-2 cursor-pointer'
            />
          </label>

        </div>

        <div>
          <img
            src={assets.send_button}
            alt=""
            className='w-7 cursor-pointer'
          />
        </div>

      </div>

    </div>

  ) : (

    <div className='h-full flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img src={assets.logo_icon} alt="" className='max-w-16'/>
      <p className='text-lg font-medium text-white'>
        Chat anytime, anywhere
      </p>
    </div>

  )
}

export default ChatContainer