import IDB from "@/libs/indexeddb-promise"
import {loadStorage} from "@/libs/storage"
export default async function init(ctx) {   
    ctx.player.loop_mode = 0        
    //init indexeddb
    ctx.db = new IDB("athenal",1,{ audios: { keyPath: 'id' }, books: { keyPath: 'id' } })
    
    // load data from localstorage
    await loadStorage(["last"],ctx)
    
    //load books from db
    ctx.books = await ctx.db.getAll("books")
  
    
    ctx.books.map((book)=>{
        book.current_chapter_index = 0
        book.current_chapter = book.current_chapter?book.current_chapter:book.chapters[0]        
        book.current_subtitle_index = 0
        book.cover = URL.createObjectURL(book.cover)
    })
   
    
    if(!ctx.books)      
        return
    
    if(!ctx.last||ctx.last.id||!ctx.last.time)      
        return
    
    ctx.book = ctx.books.find((_book)=>_book.id==ctx.last.id)
    if(!ctx.book)        
        return
    
    //load last
    const {blob} = await ctx.db.get("audios",ctx.last.book_id)    
    if(!blob)    
        return
    
    const audio_src = URL.createObjectURL(blob)
    ctx.player.current.src = audio_src
   
    if(ctx.last.time)
    ctx.player.current.currentTime = ctx.last.time    
  
}
