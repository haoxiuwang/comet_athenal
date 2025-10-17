export default function StyleA({ctx}) {
  const subtitles = ctx.book.sutitles
  const current_subtitle_index = ctx.book.current_subtitle_index
  return (
    <div className="flex flex-col space-y-4">
      {
        subtitles.map(({text,start,end},i)=>(
          <p 
            onClick={()=>ctx.dispatch({type:"play_or_pause_subtitle",payload:i})} 
            className={`${current_subtitle_index==i?"text-blue-400 font-bold":""}`} key={i}>{text}</p>
        ))
      }
    </div>
  )
}

