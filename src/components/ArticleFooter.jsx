import React, { useState, useEffect } from "react"
import {
  IconButton,
  Box,
  Tooltip,
} from "@mui/material"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import FirstPageIcon from "@mui/icons-material/FirstPage"
import LoopIcon from "@mui/icons-material/Loop"
import RepeatOneIcon from "@mui/icons-material/RepeatOne"

export default function FooterBar({ctx}) {
  usePlayer(ctx)
  const player = ctx.player.current
  const isPlaying = !player?.paused
  const progress = (player.currentTime-ctx.book.current_chapter.start)/(ctx.book.current_chapter.start-ctx.book.current_chapter.end)*100
  const loopMode = ctx.player.loopMode  
  return (
    <div 
      ref={ctx.bar}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-200 shadow-[0_-2px_6px_rgba(0,0,0,0.05)]"
      onClick={(e)=>ctx.dispatch({type:"change_player_progress",payload:e})}
    >
      {/* 顶部细进度条 */}
      <div
        className="h-[3px] w-full transition-all duration-150"
        
        style={{
          width: `${progress}%`,
          background: `linear-gradient(to right, #2563eb ${progress}%, transparent ${progress}%)`
        }}
      />

      {/* 控制区域 */}
      <Box className="flex items-center justify-center gap-4 py-2">
        <Tooltip title="回到章的开始">
          <IconButton 
            onClick={ctx.dispatch({type:"change_chapter",payload:ctx.book.current_chapter})}
            color="primary">
            <FirstPageIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="上一章">
          <IconButton
            onClick={()=>ctx.dispatch({type:"change_chapter",payload:"previous"})}
            color="primary">
            <SkipPreviousIcon />
          </IconButton>
        </Tooltip>

        <IconButton
          onClick={ctx.dispatch({type:"play_or_pause"})}
          sx={{
            backgroundColor: "#2563eb",
            color: "white",
            "&:hover": { backgroundColor: "#1e40af" },
          }}
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>

        <Tooltip title="下一章">
          <IconButton
            onClick={ctx.dispatch({type:"change_chapter",payload:"next"})}
            color="primary">
            <SkipNextIcon />
          </IconButton>
        </Tooltip>

        <Tooltip
          title={
            loopMode === 0
              ? "循环关闭"
              : loopMode === 2
              ? "循环全部"
              : "单曲循环"
          }
        >
          <IconButton onClick={()=>ctx.dispatch({type:"play_loop_mode"})} color="primary">
            {loopMode === "one" ? <RepeatOneIcon /> : <LoopIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </div>
  )
}


function usePlayer(ctx) {
  const [_,refresh] = useState(false)
  useEffect(()=>{
    const player = ctx.player.current
    player.onupdatetime = ()=>{      
      refresh(_=>!_)
    }
  },[ctx.player.current])

}