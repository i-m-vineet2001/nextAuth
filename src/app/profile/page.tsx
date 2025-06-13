"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    email: "",
    _id: ""
  });
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/me');
      console.log(res.data);
      setData(res.data.data);
    } catch (error: any) {
      console.log(error.message);
      toast.error("Failed to fetch user data");
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-orange-400 p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-black mb-4">
            Loading...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-orange-400 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-black mb-4">
          Profile
        </h1>
        <hr className="border-black mb-6" />

        <div className="text-black space-y-4">
          <p>
            <span className="font-semibold">User ID:</span> {data._id ? <Link href={`/profile/${data._id}`} className="text-blue-600 hover:underline">{data._id}</Link> : "Loading..."}
          </p>
          <p>
            <span className="font-semibold">Username:</span> {data.username || "Loading..."}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {data.email || "Loading..."}
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}


// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function UserProfilePage({ userId }: { userId: string }) {
//   const router = useRouter();
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     _id: "",
//     isVerified: false,
//     isAdmin: false,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const getUserById = async () => {
//     try {
//       const res = await axios.get("/api/users/me");

//       // Check if the requested ID matches the current user's ID
//       if (res.data.data._id === userId) {
//         setUserData(res.data.data);
//       } else {
//         setError(
//           "User not found or you don't have permission to view this profile"
//         );
//       }
//     } catch (error: any) {
//       console.log(error.message);
//       setError("Failed to fetch user data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getUserById();
//   }, [userId]);

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
//         <div className="bg-orange-400 p-8 rounded-lg shadow-md w-full max-w-md">
//           <h1 className="text-2xl font-bold text-center text-black mb-4">
//             Loading User Profile...
//           </h1>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
//         <div className="bg-red-400 p-8 rounded-lg shadow-md w-full max-w-md">
//           <h1 className="text-2xl font-bold text-center text-black mb-4">
//             Error
//           </h1>
//           <p className="text-center text-black mb-4">{error}</p>
//           <Link
//             href="/profile"
//             className="block w-full bg-blue-500 text-white text-center font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
//           >
//             Back to Profile
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="bg-orange-400 p-8 rounded-lg shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold text-center text-black mb-4">
//           User Profile Details
//         </h1>
//         <hr className="border-black mb-6" />

//         <div className="text-black space-y-4">
//           <p>
//             <span className="font-semibold">User ID:</span> {userData._id}
//           </p>
//           <p>
//             <span className="font-semibold">Username:</span> {userData.username}
//           </p>
//           <p>
//             <span className="font-semibold">Email:</span> {userData.email}
//           </p>
//           <p>
//             <span className="font-semibold">Verified:</span>{" "}
//             {userData.isVerified ? "Yes" : "No"}
//           </p>
//           <p>
//             <span className="font-semibold">Admin:</span>{" "}
//             {userData.isAdmin ? "Yes" : "No"}
//           </p>
//         </div>

//         <div className="mt-6">
//           <Link
//             href="/profile"
//             className="block w-full bg-blue-500 text-white text-center font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
//           >
//             Back to Main Profile
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
