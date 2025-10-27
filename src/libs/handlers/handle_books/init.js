import IDB from "../../indexeddb-promise"
import {loadStorage} from "../../storage"
import { setStorage } from "../../storage"

/**
 * 去掉 Date 对象中的毫秒
 * @param {Date} date 原始 Date 对象
 * @returns {Date} 新的 Date 对象，毫秒归零
 */


export default async function init(ctx) {   
    ctx.player.loop_mode = 0        
    //init indexeddb
    ctx.db = new IDB("athenal",1,{ audios: { keyPath: 'id' }, books: { keyPath: 'id' } })
    
    // load data from localstorage
    
    let {last,font_size,loop_mode,registered} = loadStorage(["last","font_size","loop_mode","registered"],ctx)
   
    
    if(!registered){
        const time = new Date().toString()
        registered = {
            default:false,
            time,
            code: (new Date(time).getTime()/1000+"").slice(6)           
        }
        setStorage("registered",registered)
    }
    ctx.registered = registered
    
    if(font_size)ctx.article_font_size = font_size.default
    if(Number.isNaN(ctx.article_font_size) )ctx.article_font_size = 0
    if(loop_mode)ctx.player.loop_mode = loop_mode.default
    if(Number.isNaN(ctx.player.loop_mode))ctx.player.loop_mode = 0
    //load books from db
    ctx.books = await ctx.db.getAll("books")
    
    if(!ctx.books)      
        return
    
    ctx.books.map((book)=>{
        book.current_chapter_index = 0              
        book.current_subtitle_index = 0
        book.cover = URL.createObjectURL(book.cover)
    })
    
    
    console.log({last});
    
    if(!last||!last.book)      
        return
    
    last.time = last.time==undefined?0:last.time
    
    ctx.book = ctx.books.find((_book)=>_book.id==last.book)
    if(!ctx.book)        
        return
  
    //load last
    const {blob} = await ctx.db.get("audios",ctx.book.id)    
    if(!blob)    
        return
    
    const audio_src = URL.createObjectURL(blob)
    ctx.player.current.src = audio_src
   
    if(last.time)
    ctx.player.current.currentTime = last.time    
  
}
