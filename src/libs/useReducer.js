import { useState } from "react"

export default function useReducer(reducer,init){
    const [ctx] = useState(init?init:{})
    const [_,refresh] = useState(false)
    ctx.refresh = ()=>{console.log("refresh!");refresh(_=>!_)}
    ctx.dispatch = async (action)=>{
        await reducer(ctx,action)
        ctx.refresh()
    }
    return ctx
}