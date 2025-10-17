import React from "react";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

export default function NowPlayingBar({ctx}) {
  if (!ctx.book) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-sm font-medium z-50 shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between py-1 px-3">
        {/* 左侧图标 + 歌曲名 */}
        <div className="flex items-center space-x-2 min-w-0">
          <MusicNoteIcon sx={{ fontSize: 18 }} />
          <span className="truncate">Now Playing: <strong>{ctx.book.title}</strong></span>
        </div>

        {/* 右侧操作区 */}
        <div className="flex items-center space-x-1">
          <IconButton
            size="small"
            color="inherit"
            onClick={(e) => ctx.dispatch({type:"",payload:e})}
          >
            {!ctx.audio.current.paused ? (
              <PauseIcon sx={{ fontSize: 20, color: "white" }} />
            ) : (
              <PlayArrowIcon sx={{ fontSize: 20, color: "white" }} />
            )}
          </IconButton>

          <IconButton
            size="small"
            color="inherit"
            onClick={(e) => ctx.dispatch({type:"play_or_pause"})}
          >
            <OpenInNewIcon sx={{ fontSize: 18, color: "white" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
