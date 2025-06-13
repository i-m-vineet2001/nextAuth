"use client";
import React,{ useState ,useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';



export default function SignupPage() {
  const router = useRouter()

  const [user, setUser] = React.useState({
    
    email: "",
    password: "",
    username: ""
  });

  const [buttonDisabled,  setbuttonDisabled] = React.useState(false);

  const [loading,setLoading] = React.useState(false)

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      // const response = await axios.post(
      //   "http://localhost:3001//api/users/signup",user
      // );
    

      
      console.log("sighnup success",response.data);
      toast.success("sighnup successfull");
      router.push("/login");
    } catch (error:any) {
      console.log("signup failed", error);
      const errorMessage = error.response?.data?.error || error.message || "Signup failed";
      toast.error(errorMessage);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);
  


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-orange-400 p-8 rounded-lg shadow-md w-full max-w-md">
        {/* <h1>{loading ? "Processing" : "Signup"}</h1> */}

        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          {loading ? "Processing" : "signup"}
        </h2>
        <label htmlFor="username">username</label>
        <input
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Full Name"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-black"
        />

        <label htmlFor="email">email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-black"
        />

        <label htmlFor="password">password</label>
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-black"
        />

        <button
          onClick={onSignup}
          disabled={buttonDisabled || loading}
          className={`w-full font-semibold py-2 px-4 rounded-md transition duration-200 ${
            buttonDisabled || loading 
              ? "bg-gray-400 text-gray-700 cursor-not-allowed" 
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {loading ? "Processing..." : buttonDisabled ? "Fill all fields" : "Sign Up"}
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          All ready have account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
