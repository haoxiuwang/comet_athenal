import { useState } from "react"

export default function useReducer(reducer,init){
    const [ctx] = useState(init?init:{})
    const [_,refresh] = useState(false)
    ctx.dispatch = (action)=>reducer(ctx,action)
    ctx.refresh = ()=>refresh(_=>!_)
    return ctx
}