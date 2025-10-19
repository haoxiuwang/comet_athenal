import { useState } from "react"
import SwipeContainer from "./SwipeContainerB"
export default function StyleB({ctx}) {
    const index = ctx.book.current_subtitle_index
    const text = ctx.book.subtitles[index].text
  return (
    
      <SwipeContainer 
        {...{
            onClick:()=>ctx.dispatch({type:"play_or_pause"}),
            onSwipeUp:()=>ctx.dispatch({type:"to_next_subtitle",payload:true}),
            onSwipeDown:()=>ctx.dispatch({type:"to_next_subtitle",payload:false}),
            // onSwipeLeft:()=>setA("向左滑动"),
            // onSwipeRight:()=>setA("向右滑动"),
            className:"fixed inset-0 flex place-items-center place-content-center"
        }}
      > 
        {text}
      </SwipeContainer>
      
  )
}