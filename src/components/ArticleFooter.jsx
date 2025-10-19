import React, { useState, useEffect } from "react"
import {
  IconButton,
  Box,
  Tooltip,
  LinearProgress
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
  const progress = false?80:(player.currentTime)/(player.duration)*100
  
  
  const loopMode = ctx.player.loopMode  
  return (
    <div 
      
      className="fixed bottom-0 inset-x-0 z-50 ">
      {/* 顶部细进度条 */}
      <div
        ref={ctx.bar}
        className="w-full bg-white/80 backdrop-blur-lg border-t border-gray-200 shadow-[0_-2px_6px_rgba(0,0,0,0.05)] flex flex-col"
        onClick={(e)=>ctx.dispatch({type:"change_player_progress",payload:e})}
      >     
        <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#2196f3",
              },
              backgroundColor: "#555",
            }}
        />
      </div>
   
      {/* 控制区域 */}
      {false||(
        <Box className="flex items-center justify-center gap-4 py-2">
        <Tooltip title="回到章的开始">
          <IconButton 
            onClick={()=>ctx.dispatch({type:"change_chapter",payload:ctx.book.current_chapter})}
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
          onClick={()=>ctx.dispatch({type:"play_or_pause"})}
          sx={{
            backgroundColor: "#2563eb",
            color: "white",
            "&:hover": { backgroundColor: "#1e40af" },
          }}
        >
          {!player.paused ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>

        <Tooltip title="下一章">
          <IconButton
            onClick={()=>ctx.dispatch({type:"change_chapter",payload:"next"})}
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
      )}
    </div>
  
  )
}


function usePlayer(ctx) {
  const [_,refresh] = useState(false)
  useEffect(()=>{
    const player = ctx.player.current
    const on_time_update = ()=>{
      refresh(_=>!_)
    }
    player.addEventListener("ontimeupdate",on_time_update)
    return ()=>{
      player.removeEventListener("ontimeupdate",on_time_update)
    }
  },[ctx.player.current])

}