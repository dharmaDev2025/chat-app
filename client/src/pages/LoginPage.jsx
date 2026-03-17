import React, { useState } from 'react'
import assets from '../assets/assets'

const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign up")
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();


    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return;
    }

    
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'
      >

        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          {isDataSubmitted&&(
             <img onClick={()=>setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />

          )}
         
        </h2>

        {/* Full Name */}
        {currState === "Sign up" && !isDataSubmitted && (
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className='p-2 border border-gray-500 rounded-md focus:outline-none'
            placeholder='Full Name'
            required
          />
        )}

        {/* Email + Password */}
        {!isDataSubmitted && (
          <>
            <input
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder='Email address'
              value={email}
              required
              className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />

            <input
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder='Password'
              value={password}
              required
              className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </>
        )}

        {/* Bio */}
        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            placeholder='Provide a short bio'
            required
          />
        )}

        {/* Button */}
        <button
          type='submit'
          className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'
        >
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        {/* Terms */}
        <div className='flex items-center gap-2 text-sm text-gray-400'>
          <input type="checkbox" required />
          <p>Agree to the terms of use and privacy policy</p>
        </div>

        {/* Toggle Login/Signup */}
        <p className='text-sm text-center'>
          {currState === "Sign up" ? "Already have an account?" : "Create a new account?"}
          <span
            onClick={() => {
              setCurrState(currState === "Sign up" ? "Login" : "Sign up")
              setIsDataSubmitted(false)
            }}
            className='text-indigo-400 cursor-pointer ml-2'
          >
            {currState === "Sign up" ? "Login here" : "Sign up"}
          </span>
        </p>

      </form>

    </div>
  )
}

export default LoginPage