import useReducer  from "./libs/useReducer";
import reducer from "./libs/reducer"
import Comp from "./Comp.jsx";
import useInit from "./libs/useInit.js";

import { useEffect, useState } from "react";
export default function App() {
    
    const ctx = useReducer(reducer,{
            player:{current:null},
            bar:{current:null},
            input:{current:null},
            searched_text:"",
            searched_books:[]
        }
    )
    useInit(ctx)
    
    
    return (
    <div>
       
        <Comp {...{ctx}} />
        <audio 
            onEnded = {()=>ctx.dispatch({type:"onended"})}
            onTimeUpdate={()=>ctx.dispatch({type:"app_ontimeupdate"})} 
            className="hidden" 
            ref={ctx.player}
            
        />
        <input 
            ref={ctx.input}
            type="file"
            onChange={(e)=>ctx.dispatch({type:"add_book_input_onchange",payload:e.target.files[0]})}
            className="hidden"
        />
    </div>
    )
}
function usePlayer(ctx) {

    useEffect(()=>{
        const p = ctx.player.current
        if(p)return
        const fn = ()=>ctx.dispatch({type:"app_ontimeupdate"})
        p.ontimeupdate = fn
        return ()=>{p.ontimeupdate = null}
    },[ctx.player.current])
}
/*
ctx = {
    searched_text,
    searched_books[book],
    last:{
        book_index,
        subtitle_index
    },
    books:[
        player{
            current,
            loop_mode[0,1,2]//0:none,1:one,2:all
        },
        book{
        id,
        cover,
        texts
        subtitles:[
            subtitle{
                start,
                end,
                start_str,
                end_str,
                title
            }
        ],
        current_subtitles,
        current_subtitle_index,
        current_chapter
        chapters:[
            chapter{
                index,
                start,
                end,
                title
            }
        ],
        }
    ],

    book,    
    path,

}

*/