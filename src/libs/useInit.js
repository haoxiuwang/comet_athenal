import { useEffect } from "react";

export default function useInit(ctx){
    useEffect(()=>{
        ctx.dispatch({type:"init"})        
    },[])    
}