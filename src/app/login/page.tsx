
"use client";

import React,{ useState ,useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const [loading, setLoading] = React.useState(false);
  const onLogin = async () => {
    try {
          setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error);
            const errorMessage = error.response?.data?.error || error.message || "Login failed";
            toast.error(errorMessage);
        } finally{
        setLoading(false);
        }
    }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0) {
        setButtonDisabled(false);
    } else{
        setButtonDisabled(true);
    }
}, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-orange-400 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          {loading ? "Processing" : "Login"}
        </h2>

        <input
          id="email"
          type="email"
          name="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-black"
        />

        <input
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-black"
        />

        <button
          onClick={onLogin}
          disabled={buttonDisabled || loading}
          className={`w-full font-semibold py-2 px-4 rounded-md transition duration-200 ${
            buttonDisabled || loading 
              ? "bg-gray-400 text-gray-700 cursor-not-allowed" 
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {loading ? "Processing..." : buttonDisabled ? "Fill all fields" : "Login"}
        </button>
        <p className="text-center text-sm text-gray-600 text-shadow-black mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
