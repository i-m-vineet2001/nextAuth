"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyEmailContent() {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    console.log("VerifyEmail page loaded");
    console.log("Token from URL:", token);
    
    const verifyEmail = async () => {
      if (!token) {
        console.log("No token found in URL");
        setError("No verification token provided.");
        setLoading(false);
        return;
      }

      try {
        console.log("Starting verification for token:", token);
        
        const res = await fetch("/api/users/verifyemail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        
        console.log("API Response status:", res.status);
        const data = await res.json();
        console.log("API Response data:", data);
        
        if (res.ok && data.success) {
          console.log("Verification successful");
          setVerified(true);
        } else {
          console.log("Verification failed:", data.error);
          setError(data.error || "Verification failed");
        }
      } catch (err: any) {
        console.error("Verification error:", err);
        setError("Network error occurred");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-8">Email Verification</h1>
      
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        {loading && (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Verifying Email</h2>
            <p className="text-gray-600">Please wait...</p>
          </div>
        )}

        {!loading && verified && (
          <div>
            <div className="text-green-500 text-6xl mb-4">✅</div>
            <h2 className="text-xl font-semibold mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-6">Your email has been verified successfully.</p>
            <Link 
              href="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Go to Login
            </Link>
          </div>
        )}

        {!loading && error && (
          <div>
            <div className="text-red-500 text-6xl mb-4">❌</div>
            <h2 className="text-xl font-semibold mb-2">Verification Failed</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <Link 
              href="/signup" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Sign Up Again
            </Link>
          </div>
        )}
      </div>
      
      {/* Debug info */}
      <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
        <p><strong>Token:</strong> {token || 'No token'}</p>
        <p><strong>Loading:</strong> {loading.toString()}</p>
        <p><strong>Verified:</strong> {verified.toString()}</p>
        <p><strong>Error:</strong> {error || 'None'}</p>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-xl">Loading...</div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
