import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()  
        const {prompt} = reqBody;
        const model = genAI.getGenerativeModel({model:"gemini-pro"});
        const result = await model.generateContent(prompt);
        const finalResult = result.response.text();
        return NextResponse.json({result:finalResult, success:true});
    } catch (error) {
        return NextResponse.json({result:error} , {status:500});       
    }
   
}