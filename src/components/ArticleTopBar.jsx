
    // components/TopBar.jsx
import { Avatar, Badge,IconButton, Menu, MenuItem } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import {useState} from "react"
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
    <div className="w-full bg-white shadow-md  flex items-center justify-between">
      {/* 左侧 Avatar */}
    <Avatar 
      onClick={()=>ctx.dispatch({type:"navigate_to",payload:"/"})}
      src={ctx.book?.cover} 
      className={`w-10 h-10 ${ctx.player.current.paused?"":"animate-spin"}`}
      />

      {/* 中间两行 */}
      <div className="flex flex-col items-center">
        <span className="font-semibold text-lg">{ctx.book.title}</span>        
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
          {ctx.book.chapters.map((chapter, idx) => (
            <MenuItem key={idx} onClick={(e)=>{
              handleClose(e)
              ctx.dispatch({type:"change_chapter",payload:chapter})
            }}>
              <div className={ctx.book.current_chapter==chapter?"underline":""}>Chapter {chapter.index}</div>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  )
}
