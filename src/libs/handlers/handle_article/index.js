import { setStorage } from "../../storage"
import { navigate } from "../../router/useRouter"
import { save_to_local_storage } from "../handle_books"
export function article_font_size(ctx) {
    console.log("font_size:",ctx.article_font_size);
    ctx.article_font_size++
    if(ctx.article_font_size==3)ctx.article_font_size = 0   
    setStorage("font_size",ctx.article_font_size)
    console.log("font_size:",ctx.article_font_size);
    
}
export function switch_article_style(ctx) { 
    
    const href = ctx.path.indexOf("styleb") > -1 ? "/article/stylea" : "/article/styleb"
    console.log(href);
    navigate(href)
}

export async function play_or_pause(ctx) {
    const player = ctx.player.current;
    if(player.paused){
        await player.play()            
        return
    }    
    player.pause()
}


export function play_loop_mode(ctx) {
    let m = ctx.player.loop_mode
    m = ctx.player.loop_mode = ++m==3?0:m
    setStorage("loop_mode",m)
       
}

export async function change_chapter(ctx, to) {
   
    
    // if (ctx.book.chapters.length == 1) return
    let player = ctx.player.current
    !player.paused&&player.pause()
    let index = ctx.book.current_chapter_index
    let current_chapter
    switch (to) {
        case "previous":            
            ctx.book.current_chapter_index = --index<0?0:index
            current_chapter = ctx.book.chapters[ctx.book.current_chapter_index]
            break;
        case "next":
            ctx.book.current_chapter_index = ++index==ctx.book.chapters.length?index-1:index            
            current_chapter = ctx.book.chapters[ctx.book.current_chapter_index]
            break;
        default:
            current_chapter = to
            break;
    }
    
    player.play()
    player.currentTime = current_chapter.start


}

export async function play_or_pause_subtitle(ctx, subtitle_index) {

    const player = ctx.player.current;
    if(player.paused){
        await player.play()   
        if (subtitle_index)
            ctx.book.current_subtitle_index = subtitle_index
        player.currentTime = ctx.book.subtitles[ctx.book.current_subtitle_index].start
        return
    }    
    player.pause()

}
export function app_onended(ctx) {
    if (ctx.player.loop_mode == 2)
        player.currentTime = 0
}
export function app_ontimeupdate(ctx) {
    
    const p = ctx.player.current
    const current_time = p.currentTime
    const index = ctx.book.current_subtitle_index
    let _index = ctx.book.subtitles.find((sub) => {
        return (current_time >= sub.start) && (current_time <= sub.end)
    })?.index
    if (index == _index) return
    
    
    const {first_subtitle_index,last_subtitle_index} = ctx.book.chapters[ctx.book.current_chapter_index]
    
    
    if(ctx.player.loop_mode==1&&_index==last_subtitle_index){       
        
        p.currentTime = ctx.book.subtitles[first_subtitle_index].start
        return
    }
    const current_chapter = ctx.book.chapters.find((chapter) => current_time >= chapter.start && current_time <= chapter.end)
    
    if(current_chapter)ctx.book.current_chapter_index = current_chapter.index
    ctx.book.current_subtitle_index = _index
    ctx.book.current_subtitles = ctx.book.subtitles.filter((sub, index) => sub.index - _index < 20)

    ctx.refresh()
}
export function to_next_subtitle(ctx, next) {
    let index = ctx.book.current_subtitle_index
    let len = ctx.book.subtitles.length
    if (next) {
        if (index++ == len)
            return
    }
    else {
        if (index-- == -1)
            return
    }
    const player = ctx.player.current
    player.currentTime = ctx.book.subtitles[index].start
    player.paused && player.play()

}
export function change_player_progress(ctx, e) {
    const player = ctx.player.current
    const bar = ctx.bar.current

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // 点击位置相对于进度条左边的偏移
    const ratio = clickX / rect.width; // 点击比例
    const newTime = ratio * player.duration;
    console.log({ newTime });

    player.currentTime = newTime;
}
export function change_player_progress_chapter(ctx, e) {
    const player = ctx.player.current
    const bar = ctx.bar2.current
    const chapter = ctx.book.chapters[ctx.book.current_chapter_index]
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // 点击位置相对于进度条左边的偏移
    const ratio = clickX / rect.width; // 点击比例
    const chapter_time_length = chapter.end-chapter.start
    const newTime = ratio * (chapter_time_length)+chapter.start;
    console.log({ratio,chapter_time_length,start:chapter.start});
    
    console.log({newTime});
    
    player.currentTime = newTime;
}