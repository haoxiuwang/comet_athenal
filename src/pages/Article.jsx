import StyleA from "../components/StyleA"
import StyleB from "../components/StyleB.jsx"
import ArticleTopBar from "../components/ArticleTopBar.jsx"
import ArticleFooter from "../components/ArticleFooter.jsx"
import { Box, Container } from "@mui/material";
import SwipeContainer from "../components/SwipeContainer.jsx";
import { Swipe } from "@mui/icons-material";
import {navigate} from "../libs/router/useRouter.js"

import { useEffect } from "react";
import { setStorage } from "../libs/storage.js";
export default function Article({ctx}) {
    let Main = /stylea/img.test(ctx.path)?StyleA:StyleB
    let font_size = ctx.article_font_size
    font_size=font_size==0?"text-xl":font_size==1?"text-2xl":"text-3xl"

 
   
    useEffect(()=>{
        return ()=>{
            if(!ctx.book){
                ctx.navigate("/")
            }
            ctx.dispatch({type:"save_to_local_storage"})
        }
    },[])

    ctx.book = ctx.book??ctx.books?ctx.books[0]:null
    if(ctx.book)
    return(
        <Box
            className="bg-purple-100"
              sx={{
                // bgcolor: "#f4efe7",
                minHeight: "100vh",
                py: 4,               
                fontFamily: "serif",
              }}
            >
              <Container maxWidth="md">
                <SwipeContainer
                    {...{
                        
                        onSwipeLeft:()=>{
                            ctx.dispatch({type:"article_font_size"})
                        },
                        onSwipeRight:()=>{
                            ctx.dispatch({type:"switch_article_style"})                           
                        },
                        className:"fixed inset-x-0 top-0 flex place-items-center place-content-center z-50"
                    }}
                >
                    <ArticleTopBar {...{ctx}}/>
                </SwipeContainer>
                    
                <main className={font_size}>
                    <Main {...{ctx}}/>
                </main>
                {false||<ArticleFooter {...{ctx}}/>}
            </Container>    
        </Box>
    )
}