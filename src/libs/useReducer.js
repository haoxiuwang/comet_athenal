import { useState } from "react"

export default function useReducer(reducer,init){
    const [ctx] = useState(init?init:{})
    const [_,refresh] = useState(false)
    ctx.refresh = ()=>{refresh(_=>!_)}
    ctx.refreshAsync = ()=>{
        setTimeout(()=>{ctx.refresh()})
    }
    ctx.dispatch = async (action)=>{
        await reducer(ctx,action)
        ctx.refresh()
    }
    return ctx
}