
    // components/TopBar.jsx
import { Typography,Avatar, Badge,IconButton, Menu, MenuItem } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import {useState} from "react"
import SwipeContainer from "./SwipeContainer"
export default function ArticleTopBar({ctx}) {
  
  
  // components/TopBar.jsx
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }


  
  
  return (
    <div className="w-full bg-white shadow-md select-none  flex items-center p-2 space-x-2">
      {/* 左侧 Avatar */}
    <Avatar 
      onClick={()=>ctx.dispatch({type:"navigate_to",payload:"/"})}
      src={ctx.book?.cover} 
      className={`w-10 h-10 ${ctx.player.current?.paused?"":"animate-spin"}`}
      />

      {/* 中间两行 */}
      
     
      <div className="overflow-x-hidden grow">
        <Typography
        sx={{
          display: "inline-block",
          px: 2,
          animation: "scroll-left 10s linear infinite",
          "@keyframes scroll-left": {
            "0%": { transform: "translateX(100%)" },
            "100%": { transform: "translateX(-100%)" },
          },
        }}
      >
        🌟 {ctx.book.title} 🌟
      </Typography> 
      </div>

      {/* 右侧 Menu */}
      <div>
         <IconButton
          aria-label="menu"
          onClick={handleClick}
          className="text-gray-700 hover:text-black"
        >
          <Badge
            badgeContent={ctx.book.current_chapter_index}
            overlap="circular"
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#2563eb", // Tailwind 蓝色-600
                color: "white",
              },
            }}
          >
            <MenuIcon />
          </Badge>
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {ctx.book.chapters.map((chapter, idx) => {
        
            
            return (           
            
            <MenuItem key={idx} onClick={(e)=>{
              handleClose(e)
              ctx.dispatch({type:"change_chapter",payload:chapter})
            }}>
              <div className={ctx.book.current_chapter_index==chapter.index?"underline":""}>Chapter {chapter.index}</div>
            </MenuItem>
          )
          })}
        </Menu>
      </div>
    </div>
  )
}
