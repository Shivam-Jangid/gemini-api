'use client'
import React, { useState } from "react";
import axios from "axios";
export default function OpenChat(){
    const [prompt, setPrompt] = useState("");  
    const [data,setdata] = useState("");   
    const [loading, setloading] = useState(false);  
    async function sendData(){
        try{
            setloading(true)
            const response:any = await axios.post('/api/geminiapi',{prompt});
            setdata(response.data.result);
        }
        catch(err){
            console.log(err);
        }   
        finally{
            setloading(false);
        }
    } 
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="font-mono text-base text-emerald-400 font-semibold pb-20 mx-20">
                {data?`AI : ${data}`:""}
            </div>
            <div>
                {loading && <div className="font-mono text-base text-emerald-400 font-semibold pb-20">Loading...</div>}
            </div>
            <h1 className="text-2xl pb-7 font-mono">Ask Me Anything</h1>
            <div className="flex justify-center w-full mx-10 h-10">
            <input className="font-mono outline outline-1 outline-white rounded-lg p-2 w-1/2 mr-7 bg-transparent focus:outline-1 focus:shadow-[0_0_8px_1px] "
            onChange={(e)=>{setPrompt(e.target.value)}}
            type="text" placeholder="Message Me" />   
            <button className="transition-all bg-blue-500 text-white rounded-lg py-2 px-8 hover:text-bold hover:bg-blue-600 hover:shadow-[0_2px_7px_2px_rgb(71,85,105)]"
            onClick={sendData}
            >Send</button>
            </div>
        </div>
    )
}