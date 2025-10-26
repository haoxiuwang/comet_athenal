import React, { useEffect } from "react";
// import FooterSearch from "../components/FooterSearch.jsx";
import {Zoom,Tooltip,Fab, Card, CardContent, Box, Container, Typography } from "@mui/material";
import FooterSearch from "../components/FooterSearch";
import NowPlayingBar from "../components/NowPlayingBar"
import FABAddBook from "../components/FABAddBook"
import Link from "../libs/router/Link" 
import AddIcon from "@mui/icons-material/Add";
import DeleteConfirmDialog from "../components/delete_book_dialog";
import { navigate } from "../libs/router/useRouter";
// import ElegentLoading from "../components/loading"
import PI from "../components/PI";


export default function Home({ctx}) {
  console.log("refresh");
  
  useEffect(()=>{
    if(ctx.books)
      ctx.refresh()
  },[ctx.books])
  if(ctx.books){
    ctx.books.sort((a,b)=>{
      const r = b.add_time-a.add_time
      console.log(r)
      return r
    })
  }
  return (
    <Box 
      className="bg-purple-100"
      sx={{        
        minHeight: "100vh",
        px: 0,
        py:10,
        fontFamily: "serif",
      }}
    >
     
      <Container className={`transition-opacity duration-[2s] opacity-${ctx.registered?.default?100:0}`} maxWidth="md">
        <Typography
          className="text-purple-900"
          variant="h5"
          sx={{ mb: 2, fontWeight: 600 }}
        >
          Hi, <i>Everyone</i>
        </Typography>
        {ctx.delete_book&&<DeleteConfirmDialog {...{ctx}}/>}
        <FABAddBook {...{ctx}}/>
        {ctx.book&&(<NowPlayingBar {...{ctx}}/>)}
        <Card
          className="bg-white/20"
          sx={{          
            borderRadius: 4,
            p: 2,
            mb: 3,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <Typography className="text-black/95" variant="h6" sx={{ fontWeight: 600 }}>
            Where there is a WILL, there must be a WAY!
          </Typography>
          <Typography
            className="text-black/70"
            variant="body2"
            sx={{ mt: 1, fontWeight: 500 }}
          >
           From the developer
          </Typography>
        </Card>
    <div className={"grow grid grid-cols-2 gap-4 p-4"}>
      
      {!ctx.books||ctx.books.length==0?
      (<div className="className={`bg-cover aspect-square select-none rounded-[20px] overflow-hidden aspect-square border-2 border-white relative bg-purple-200 col-span-2 flex place-items-center p-2 place-content-center `}">
        点击右下方的枫叶🍁添加第一部📚AUDIOBOOK🎧
      </div>)
      :ctx.books.map((book, index) =><PI key={index} {...{ctx,book,i:index}}/> )}
    </div>
    <FooterSearch {...{ctx}}/>
  </Container>
</Box>
  );
}
