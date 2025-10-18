import React, { useEffect } from "react";
// import FooterSearch from "../components/FooterSearch.jsx";
import {Zoom,Tooltip,Fab, Card, CardContent, Box, Container, Typography } from "@mui/material";
import FooterSearch from "../components/FooterSearch";
import NowPlayingBar from "../components/NowPlayingBar"
import FABAddBook from "../components/FABAddBook"
import Link from "../libs/router/Link" 
import AddIcon from "@mui/icons-material/Add";
import DeleteConfirmDialog from "../components/delete_book_dialog";


export default function Home({ctx}) {
 
  useEffect(()=>{
    if(ctx.books)
      ctx.refresh()
  },[ctx.books])
  return (
    <Box 
      sx={{
        bgcolor: "#f4efe7",
        minHeight: "100vh",
        px: 4,
        py:8,
        fontFamily: "serif",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h5"
          sx={{ mb: 2, color: "#2f3e2f", fontWeight: 600 }}
        >
          Have a Good Day, <i>Everyone</i>
        </Typography>
        {ctx.delete_book&&<DeleteConfirmDialog {...{ctx}}/>}
        <FABAddBook {...{ctx}}/>
        {ctx.book&&(<NowPlayingBar {...{ctx}}/>)}
        <Card
          sx={{
            bgcolor: "#fffefb",
            borderRadius: 4,
            p: 2,
            mb: 3,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <Typography variant="h6" sx={{ color: "#2f3e2f", fontWeight: 600 }}>
            This app is helping you with interesting books!
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#3a5f3a", mt: 1, fontWeight: 500 }}
          >
            Manage history
          </Typography>
        </Card>
    <div className="grow grid grid-cols-2 gap-4 p-4">
      
      {ctx.books&&ctx.books.map((book, index) => {
        const mod = index % 4;

        // Square Cards (1st and 2nd)
        if (mod === 0 || mod === 1) {
          return (
          <Link key={index} 
            onClick={async(e)=>{
              ctx.book = book
              console.log(ctx,"ctx");
              
            }} href="/article"
            onContextMenu={(e)=>ctx.dispatch({type:"open_delete_book",payload:book})}
          >
            <Card              
              className="aspect-square overflow-hidden shadow-md rounded-2xl relative"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <CardContent className="absolute bottom-0 bg-black/50 text-white w-full">
                <Typography variant="subtitle1">{book.title}</Typography>
              </CardContent>
            </Card>
          </Link>
            
          );
        }

        // Third card: text + image vertically stacked
        if (mod === 2) {
          return (
          <Link key={index} 
            onClick={async(e)=>{
              ctx.book = book
            }}
            href="/article"
            onContextMenu={(e)=>ctx.dispatch({type:"delete_book",payload:book})}
          >
           <div key={index} className="rounded bg-black/60 col-span-2 grid grid-cols-2 gap-4 p-4">
            <div className="aspect-square overflow-hidden relative">
              <div className="absolute bottom-0 text-white w-full">
                <Typography variant="subtitle1">{book.title}</Typography>
              </div>
            </div>
            <Card className="aspect-square overflow-hidden shadow-md rounded-2xl relative">
              <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
            </Card>
          </div>
        </Link>
          );
        }

        // Fourth card: wide rectangular, spans two rows
        if (mod === 3) {
          return (
          <Link key={index} 
            onClick={async(e)=>{
              ctx.book = book
            }}
            href="/article"
            onContextMenu={(e)=>ctx.dispatch({type:"delete_book",payload:book})}
          >
            <Card
              key={index}
              className="col-span-2 row-span-2 aspect-square overflow-hidden shadow-lg rounded-2xl relative"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <CardContent className="absolute bottom-0 bg-black/50 text-white w-full">
                <Typography variant="h6">{book.title}</Typography>
              </CardContent>
            </Card>
          </Link>
          );
        }

        return null;
      })}
    </div>
    <FooterSearch {...{ctx}}/>
  </Container>
</Box>
  );
}
