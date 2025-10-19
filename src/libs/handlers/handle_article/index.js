import { setStorage } from "@/libs/storage"
import { navigate } from "@/libs/router/useRouter"
export function switch_article_style(ctx) {
    const href = ctx.path.indexOf("stylea") > -1 ? "/article/styleb" : "/article/stylea"
    navigate(href)
}

export async function play_or_pause(ctx) {
    const player = ctx.player.current;
    if(player.paused)
    await player.play()
    else
        player.pause()
}


export async function play_loop_mode(ctx) {
    const m = ctx.loop_mode
    ctx.loop_mode === "none" ? "all" : m === "all" ? "one" : "none"
}

export async function change_chapter(ctx, to) {
    if (ctx.book.chapters.length == 1) return
    const chapter = ctx.book.current_chapter
    const index = ctx.book.current_chapter.index
    switch (to) {
        case "previous":
            if (index == 0) return
            ctx.book.chapter = ctx.chapters[--index]
            break;
        case "next":
            if (index == ctx.book.chapters.length - 1) return
            ctx.book.chapter = ctx.chapters[++index]
            break;

        default:
            ctx.book.chapter = to
            break;
    }
    const p = ctx.player.current
    p.paused && p.play()
    p.currentTime = ctx.book.chapter.start


}

export async function play_or_pause_subtitle(ctx, subtitle_index) {

    const p = ctx.player.current
    if (subtitle_index)
        ctx.book.current_subtitle_index = subtitle_index
    p.currentTime = ctx.book.subtitles[subtitle_index].start
    await p[p.paused ? "play" : "pause"]()

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
    ctx.book.current_chapter = ctx.book.chapters.find((chapter) => current_time >= chapter.start && current_time <= chapter.end)
    ctx.book.current_subtitle_index = _index
    ctx.book.current_subtitles = ctx.book.subtitles.filter((sub, index) => Math.abs(sub.index - _index < 20))

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