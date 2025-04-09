import { NextRequest, NextResponse } from "next/server";
import  { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
    try {
        const {email, password} = await request.json()

        if(!email || !password) {
            return NextResponse.json({error: "Invalid Data"}, {status: 422})
        }

        await connectToDatabase()

        const existingUser = await User.findOne({email: email})
        if(existingUser) {
            return NextResponse.json({error: "Email is already registered"}, {status: 400}) 
        }
        await User.create({email: email, password: password})
        return NextResponse.json({message: "User Registered Successfully"}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "Failed to register user"}, {status: 500})
    }
}
