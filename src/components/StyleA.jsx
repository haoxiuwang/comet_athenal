export default function StyleA({ctx}) {

  console.log(ctx.player.current.paused,"paused:");
  
  const _index = ctx.book.current_subtitle_index
  if(!ctx.book.current_subtitles)
  ctx.book.current_subtitles = ctx.book.subtitles.filter((sub,index)=>Math.abs(sub.index-_index<20))
  const subtitles = ctx.book.current_subtitles
  return (
    <div className="flex flex-col space-y-4">
      {
        subtitles.map(({text,start,end},i)=>(
          <p 
            onClick={()=>ctx.dispatch({type:"play_or_pause_subtitle",payload:i})} 
            className={`${_index==i?"text-blue-400 font-bold":""}`} key={i}>{text}</p>
        ))
      }
    </div>
  )
}

