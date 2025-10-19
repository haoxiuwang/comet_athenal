import { useEffect } from "react"

export default function StyleA({ctx}) {

  
  
  const _index = ctx.book.current_subtitle_index
  if(!ctx.book.current_subtitles)
  ctx.book.current_subtitles = ctx.book.subtitles.filter((sub,index)=>Math.abs(sub.index-_index<20))
  const subtitles = ctx.book.current_subtitles
  useEffect(()=>{
    const element = document.querySelector(`#sub_${_index}`)
    if(!element)return
    element.scrollIntoView({
    behavior: "smooth", // 平滑滚动
    block: "center",    // 垂直方向居中 ("start" | "center" | "end" | "nearest")
    inline: "center"    // 水平方向居中
  });
  })
  return (
    <div className="flex flex-col space-y-4">
      {
        subtitles.map(({text,start,end,index},i)=>(
          <p 
            id={`sub_${index}`}
            onClick={()=>ctx.dispatch({type:"play_or_pause_subtitle",payload:i})} 
            className={`${_index==i?"text-blue-400 font-bold":""}`} 
            key={i}>{text}</p>
        ))
      }
    </div>
  )
}

