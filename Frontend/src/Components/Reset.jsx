import React, {useState} from 'react'
import { auth } from '../Firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useNavigate } from 'react-router'
const Reset = () => {
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState('')  
    const navigate = useNavigate()
    
    const ResetPassWord = () => {
        
        try {
            sendPasswordResetEmail(auth, email) 
            console.log('Password reset email sent')
            setSuccess('Password reset email sent')
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
        
    }

  return (
    <div className='w-full h-[100vh] justify-center items-center flex flex-col gap-[10px]'>
        {success && <p className='text-green-500'>{success}</p>}
        <p className='text-sm font-extralight'>Reset Password</p> 
        <input type='email' placeholder='Enter your email'
             
             value={email}
             onChange={(e) => setEmail(e.target.value)}
         className='border-[0.5px] border-slate-200 w-[40%] rounded h-10 p-[10px]' />
        <button className='text-center bg-slate-700 hover:bg-slate-900 hover:shadow-md rounded w-[40%] text-white p-[10px] mt-[10px]' onClick={ResetPassWord}>Reset</button>
    </div>
  )
}

export default Reset