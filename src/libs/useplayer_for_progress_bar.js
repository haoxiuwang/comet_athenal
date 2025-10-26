import {useState,useEffect} from "react"
export default function useplayer_for_progress_bar(ctx) {
  const [_,refresh] = useState(false)
  useEffect(()=>{
    const player = ctx.player.current
    const on_time_update = ()=>{      
      refresh(_=>!_)
    }
   
    
    player.addEventListener("timeupdate",on_time_update)
    return ()=>{
      player.removeEventListener("timeupdate",on_time_update)
    }
  },[])

}