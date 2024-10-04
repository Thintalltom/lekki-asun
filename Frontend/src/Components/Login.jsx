import React, { useState } from "react";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const[error, setError]=useState('')
  // Sign in with email and password
  const navigate=useNavigate()
  const loginWithEmailPassword = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      navigate('/history')
      console.log("User logged in:", user);
    } catch (error) {
      console.error("Error logging in:", error);
      setError('Invalid email or password')
    }
  };

  const changeShow = () => {
    setShow(!show);
  }

  return (
    <div>
      <div className="flex justify-between w-[100%] h-screen">
        <div className="bg-red-500 w-[50%] h-screen">
            <img src='https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className="w-screen h-screen" />
        </div>
        <div className=" w-[50%] h-screen flex  flex-col ">
           
           <div className=" flex justify-center items-center h-[40%]">
           <FaUserCircle className="text-[800%] text-center" />
           </div>
           
        
          
          <p className="text-center">Login as Admin</p>
    {error && <p className="text-red-600 text-xs text-center mt-[10px]">{error}</p>}
          <div className="flex flex-col items-center p-[20px]">
         
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="border-[0.5px] border-slate-200 w-[80%] rounded h-10 p-[10px]"
              placeholder="Email"
            />{" "}
            <br />
            
            <input
              type={show ? 'password' : 'text'}
              onChange={(e) => setPassword(e.target.value)}
              className="border-[0.5px] border-slate-200 w-[80%] rounded h-10 p-[10px]"
              placeholder="Password"
            />
            <p className="cursor-pointer w-[80%] text-right" onClick={changeShow}>{show ? 'show ' : 'hide '}</p>
            <br />
            <button
              onClick={loginWithEmailPassword}
              className="text-center bg-slate-700 hover:bg-slate-900 hover:shadow-md rounded w-[40%] text-white p-[10px]"
            >
              Login
            </button>
          </div>

    <Link to='/reset'>
    <p className="text-xs text-red-500 p-[10px] font-extralight">Reset Password?</p>
    </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
