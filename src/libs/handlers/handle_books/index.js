import unpack from "@/libs/pack/unpack"

export function open_delete_book(ctx,book) {
    ctx.delete_book = book
}
export async function delete_book(ctx,book){
    await ctx.db.delete("audios",book.id)
    await ctx.db.delete("books",book.id)
    ctx.delete_book = null
    ctx.refresh()
}
export function cancel_delete_book(ctx) {
    ctx.delete_book = null
    ctx.refresh()
}


export function open_book(ctx,book){
    ctx.book = book
}
export function open_addbook_dialoge(ctx){
    ctx.input.current.click()
}
export function on_search_input_change(ctx,text) {    
    ctx.searched_text = text
    ctx.searched_books = ctx.books.filter((book)=>book.title.indexOf(text)>-1)
    ctx.refresh()
}
export function add_book(ctx) {
    ctx.input.click()
}
export async function add_book_input_onchange(ctx,file){

    const arrayBuffer = await file.arrayBuffer();
    const files = await unpackPackFile(arrayBuffer);
    let _audio
    const book = files.reduce((book,file)=>{
        if(file.name.indexOf("book")>-1){
            try {
                const text = await file.text();  // 读取文本内容
                const json = JSON.parse(text);   // 解析 JSON
                book = {...book,...json}
            } catch (err) {
                console.error("JSON 解析错误", err);
            }            
        }
        if(file.indexOf("texts")>-1){
            try {
                const texts = await file.text();
                book["texts"] = texts
                
            } catch (err) {
                console.error("file.text", err);
            }            
        }
        if(file.indexOf("audio")>-1)
            _audio = file
        if(file.indexOf("cover")>-1)
            book["cover"] = file
         
        return book
            
    },{})

    book.subtitles = srtToArray(book.texts)
    book.chapters = build_chapters(book.subtitles)
    book["add_time"] = Date.now()
    await ctx.add("audio",{id:book.id,blob:_audio})
    await ctx.add("books",book)  
    ctx.books.push(book)  
    ctx.refresh()
}

function srtToArray(srtText) {
  const subtitles = [];
  // 按空行分割每条字幕
  const blocks = srtText.trim().split(/\r?\n\r?\n/);

  for (const block of blocks) {
    const lines = block.split(/\r?\n/);
    if (lines.length >= 2) {
      // 第二行是时间
      const timeMatch = lines[1].match(/(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/);
      if (timeMatch) {
        const start_str = timeMatch[1];
        const end_str = timeMatch[2];

        function timeStrToSeconds(t) {
          const [h, m, rest] = t.split(':');
          const [s, ms] = rest.split(',');
          return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s) + parseInt(ms) / 1000;
        }

        const start = timeStrToSeconds(start_str);
        const end = timeStrToSeconds(end_str);

        // 剩下的行是字幕文本
        const text = lines.slice(2).join('\n');

        subtitles.push({ start, end, start_str, end_str, text });
      }
    }
  }
  return subtitles;
}
function build_chapters(subtitles){
    const chapters = subtitles.reduce((chapters,sub,i)=>{        
        sub.index = i
        if(sub.indexOf("chapter")==0){
            if(chapters.length>0){
                chapters[chapters.length-1].last_subtitle_index = subtitles[i-1].index
                chapters[chapters.length-1].end = subtitles[i-1].end
            }
            chapters.push(
                {
                    first_subtitle_index:i,
                    start:sub.start,
                    index:chapters.length
                }
            )
        }
            
        return chapters
    },[])
    chapters[chapters.length-1].end = subtitles[subtitles.length-1].end
}
