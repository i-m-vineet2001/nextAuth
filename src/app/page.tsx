// import Image from "next/image";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <div className="text-center sm:text-left">
//           <h1 className="text-3xl font-bold mb-4">Welcome to Next.js Authentication App</h1>
//           <p className="text-lg mb-6">A full-stack authentication system with MongoDB and JWT</p>

//           <div className="flex gap-4 mb-6">
//             <Link
//               href="/login"
//               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
//             >
//               Login
//             </Link>
//             <Link
//               href="/signup"
//               className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors"
//             >
//               Sign Up
//             </Link>
//             <Link
//               href='/profile'
//               className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors"
//             >
//               Profile
//             </Link>
//           </div>
//         </div>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed && parsed._id) setUserId(parsed._id);
      } catch (e) {
        console.error("Failed to parse user:", e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-black dark:via-neutral-900 dark:to-neutral-800 p-6 sm:p-12 flex flex-col justify-center items-center text-center font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-3xl bg-white dark:bg-neutral-900 p-10 rounded-2xl shadow-2xl flex flex-col items-center gap-8">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={160}
          height={38}
          priority
        />
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Welcome to the Next.js Auth App
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          A full-stack authentication system with MongoDB, JWT, and Next.js
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all"
          >
            Sign Up
          </Link>
          <Link
            href={userId ? `/profile/${userId}` : "/login"}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-all"
          >
            Profile
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <a
            className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all"
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/vercel.svg" alt="Vercel" width={20} height={20} />
            Deploy Now
          </a>
          <a
            className="flex items-center gap-2 px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            📚 Read Docs
          </a>
        </div>
      </main>

      <footer className="mt-10 text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-6 justify-center">
        <a
          className="hover:underline"
          href="https://nextjs.org/learn"
          target="_blank"
        >
          Learn
        </a>
        <a
          className="hover:underline"
          href="https://vercel.com/templates"
          target="_blank"
        >
          Examples
        </a>
        <a
          className="hover:underline"
          href="https://nextjs.org"
          target="_blank"
        >
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
