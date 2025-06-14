// import {connect} from "@/dbconfig/dbconfig";
// import { NextRequest, NextResponse } from "next/server";
// import User from "@/models/userModel";



// connect()


// export async function POST(request: NextRequest){

//     try {
//         const reqBody = await request.json()
//         const {token} = reqBody
//         console.log(token);

//         const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

//         if (!user) {
//             return NextResponse.json({error: "Invalid token"}, {status: 400})
//         }
//         console.log(user);

//         user.isVerified = true;
//         user.verifyToken = undefined;
//         user.verifyTokenExpiry = undefined;
//         await user.save();
        
//         return NextResponse.json({
//             message: "Email verified successfully",
//             success: true
//         })


//     } catch (error:any) {
//         return NextResponse.json({error: error.message}, {status: 500})
//     }

// }

import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    console.log("Verification API called");
    
    // Ensure database connection
    await connect();
    console.log("Database connected");
    
    const body = await request.json();
    const { token } = body;
    
    console.log("Received token:", token);
    console.log("Token length:", token?.length);

    if (!token) {
      console.log("No token provided");
      return NextResponse.json(
        { error: "No token provided" },
        { status: 400 }
      );
    }

    console.log("Searching for user with token...");
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    console.log("User found:", user ? "Yes" : "No");
    
    if (!user) {
      // Let's also check if there's a user with this token but expired
      const expiredUser = await User.findOne({ verifyToken: token });
      console.log("Expired user found:", expiredUser ? "Yes" : "No");
      
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    console.log("Updating user verification status...");
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    
    console.log("User verification completed successfully");

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    console.error("Verification API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
