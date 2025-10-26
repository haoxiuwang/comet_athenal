import { useEffect } from "react";
import {navigate} from "./router/useRouter"
export default function useInit(ctx){
    useEffect(()=>{
        ctx.navigate = navigate
        ctx.dispatch({type:"init"})        
    },[])    
}