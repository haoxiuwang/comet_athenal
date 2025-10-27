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

import useplayer_for_progress_bar from "../libs/useplayer_for_progress_bar"

export default function FooterBar({ctx}) {
  useplayer_for_progress_bar(ctx)
  const player = ctx.player.current
  const chapter = ctx.book.chapters[ctx.book.current_chapter_index]
  
  
  const chapter_time_length = chapter.end-chapter.start
  const progress = (player.currentTime)/(player.duration)*100
  const progress2 = 100*(player.currentTime-chapter.start)/chapter_time_length
  
  const loopMode = ctx.player.loop_mode   
  
  return (
    
    <div 
      
      className={`bg-gradient-to-b from-transparent to-indigo-500 fixed bottom-0 inset-x-0 z-50  p-2`}>
      {/* 顶部细进度条 */}
      {true||(<div
        ref={ctx.bar}
        className="w-full bg-white/80 backdrop-blur-lg border-t border-gray-200 shadow-[0_-2px_6px_rgba(0,0,0,0.05)] flex flex-col"
        onClick={(e)=>ctx.dispatch({type:"change_player_progress",payload:e})}
      >     
        <LinearProgress
            variant="determinate"

            value={progress}
            sx={{
              height: 2,
              // borderRadius: 4,
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#2a14ecff",
              },
              backgroundColor: "#fff",
            }}
        />
      </div>)}
   
      {/* 控制区域 */}
      {false||(
        <Box className="flex text-white items-center justify-center gap-4 py-2 ">
        <Tooltip title="回到章的开始">
          <IconButton 
           
            onClick={()=>ctx.dispatch({type:"change_chapter",payload:ctx.book.chapters[ctx.book.current_chapter_index]})}
            color="inherit">
            <FirstPageIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="上一章">
          <IconButton
            onClick={()=>ctx.dispatch({type:"change_chapter",payload:"previous"})}
            color="inherit">
            <SkipPreviousIcon />
          </IconButton>
        </Tooltip>

        <IconButton
          onClick={()=>ctx.dispatch({type:"play_or_pause"})}
          sx={{
            backgroundColor: "#fff",
            color: "primary",
            "&:hover": { backgroundColor: "#fff" },
          }}
        >
          {!player.paused ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>

        <Tooltip title="下一章">
          <IconButton
            onClick={()=>ctx.dispatch({type:"change_chapter",payload:"next"})}
            color="inherit">
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
          <IconButton 
            className={!loopMode?"opacity-50":""}
            onClick={()=>ctx.dispatch({type:"play_loop_mode"})} 
            color="inherit">
            {!loopMode ? <LoopIcon />:loopMode==1?<RepeatOneIcon /> : <LoopIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      )}
       <div
        ref={ctx.bar2}
        className="relative w-full  h-10 flex place-items-center"
        onClick={(e)=>ctx.dispatch({type:"change_player_progress_chapter",payload:e})}
      >     
        {true||(<LinearProgress
            variant="determinate"

            value={progress2}
            sx={{
              height: 2,
              // borderRadius: 4,
              "& .MuiLinearProgress-bar": {
                backgroundColor: "tranparent",
              },
              backgroundColor: "transparent",
            }}
        />)}
     
        <div style={{width:progress2+"%"}} className={` h-[1px] bg-white `}></div>
  
     
      </div>
    </div>
  
  )
}