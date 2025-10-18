import { useEffect, useState } from "react";
export default function App() {
    
    const [_,refresh] = useState(false)
    useEffect(()=>{
        refresh(true)
    },[])
    console.log(Date.now());
    return(<button className="fixed top-0 left-0 bg-black text-white z-[100000]" onClick={()=>ctx.refresh()}>
            {Date.now()}
        </button>)
}