import StyleA from "../components/StyleA"
import StyleB from "../components/StyleB.jsx"
import ArticleTopBar from "../components/ArticleTopBar.jsx"
import ArticleFooter from "../components/ArticleFooter.jsx"
import { Box, Container } from "@mui/material";
import SwipeContainer from "../components/SwipeContainer.jsx";
import { Swipe } from "@mui/icons-material";
import {navigate} from "../libs/router/useRouter.js"
export default function Article({ctx}) {
    let Main = ctx.path=="/article/styleb"?StyleB:StyleA
  
   
    return(
        <Box
              sx={{
                bgcolor: "#f4efe7",
                minHeight: "100vh",
                py: 4,               
                fontFamily: "serif",
              }}
            >
              <Container maxWidth="md">
                <SwipeContainer
                    {...{
                        
                        onSwipeLeft:()=>{
                            ctx.dispatch({type:"switch_article_style"})
                        },
                        onSwipeRight:()=>{
                            ctx.dispatch({type:"switch_article_style"})                           
                        },
                        className:"fixed inset-x-0 top-0 flex place-items-center place-content-center z-50"
                    }}
                >
                    <ArticleTopBar />
                </SwipeContainer>
                    
                <Main {...{ctx}}/>
                <ArticleFooter {...{ctx}}/>
            </Container>    
        </Box>
    )
}