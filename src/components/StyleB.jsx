import { useState } from "react"
import SwipeContainer from "./SwipeContainer"
export default function StyleB({ctx}) {
    let index = ctx.book.current_subtitle_index
    if(!index)
    index = ctx.book.current_subtitle_index = 0
    const text = ctx.book.subtitles[index].text
  return (
    
      <SwipeContainer 
        {...{
            onClick:()=>ctx.dispatch({type:"play_or_pause_subtitle"}),
            onSwipeUp:()=>ctx.dispatch({type:"to_next_subtitle",payload:true}),
            onSwipeDown:()=>ctx.dispatch({type:"to_next_subtitle",payload:false}),
            // onSwipeLeft:()=>setA("向左滑动"),
            // onSwipeRight:()=>setA("向右滑动"),
            
            className:` fixed inset-0 flex place-items-center place-content-center p-2 ]`
        }}
      > 
        <img className="z-[-1] absolute top-0 left-0 w-full h-full object-fit object-cover" src={ctx.book.cover}/>
        <div className="bg-white wrap-anywhere">{text}</div>
      </SwipeContainer>
      
  )
}