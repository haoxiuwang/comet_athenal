import { unpackPackFile } from "../../pack/unpack"
import { navigate } from "../../router/useRouter"


export function open_delete_book(ctx,book) {

    ctx.delete_book = book
}
export async function delete_book(ctx,book){
    await ctx.db.delete("audios",book.id)
    await ctx.db.delete("books",book.id)
    ctx.delete_book = null
    
}
export function cancel_delete_book(ctx) {
    ctx.delete_book = null
    
}

export function navigate_to(ctx,href) {
  navigate(href)
}
export async function open_book(ctx,book){
    ctx.book = book
    try {
      const {blob} = await ctx.db.get("audios",book.id)
      ctx.player.current.src = URL.createObjectURL(blob)
      navigate("/article")
    } catch (error) {
      console.log({db:ctx.db.db});
      
    }
    
}
export function open_addbook_dialoge(ctx){
    ctx.input.current.click()
}
export function on_search_input_change(ctx,text) {    
    ctx.searched_text = text
    ctx.searched_books = text==""?[]: ctx.books.filter((book)=>new RegExp(`${text}`,"img").test(book.title))
    
}
export function add_book(ctx) {
    ctx.input.current.click()
}
export async function add_book_input_onchange(ctx,file){

    const arrayBuffer = await file.arrayBuffer();
    let files = await unpackPackFile(arrayBuffer);
    files = files.map(f => {  
        return new File([f.data], f.name, {
            type: f.type || "application/octet-stream",
            lastModified: Date.now(),
        });
    });
    
    files = files.reduce((last,file)=>{
        const name = file.name.split(".")[0]  
        last[name] = file
        return last
    },{})
    
    let book = await files["data"].text()
    book = JSON.parse(book);
    book["texts"] = await files["texts"].text()
    book.cover = files["cover"]
    let audio = files["audio"]
    book.subtitles = srtToArray(book.texts)
    book.chapters = build_chapters(book.subtitles)
    book["add_time"] = Date.now()

    
    try {
        await ctx.db.add("audios",{id:book.id,blob:audio})
        await ctx.db.add("books",book)  
        book.cover = URL.createObjectURL(book.cover)
        ctx.books.push(book)  
    } catch (error) {
        console.log("save:",{error});        
    }
    
    
    
}

/**
 * 将 SRT 字幕文本解析为对象数组
 * @param {string} srtText - SRT 文件的完整内容
 * @returns {Array<{ start, end, start_str, end_str, text }>}
 */
export function srtToArray(srtText) {
  if (!srtText) return [];

  // 统一换行符格式
  const blocks = srtText
    .replace(/\r/g, "")
    .trim()
    .split(/\n\s*\n/);

  // 解析每个字幕块
  const result = blocks
    .map(block => {
      const lines = block.split("\n").map(l => l.trim());
      if (lines.length < 2) return null;

      // 时间行
      const timeLine = lines[1].includes("-->") ? lines[1] : lines[0];
      const match = timeLine.match(
        /(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/
      );
      if (!match) return null;

      const start_str = match[1];
      const end_str = match[2];
      const start = srtTimeToSeconds(start_str);
      const end = srtTimeToSeconds(end_str);

      // 文字部分（跳过数字和时间行）
      const textLines = lines.filter(
        l => !/^\d+$/.test(l) && !l.includes("-->")
      );
      const text = textLines.join("\n").trim();

      return { start, end, start_str, end_str, text };
    })
    .filter(Boolean);

  // 修正结束时间：使用下一条字幕的开始时间
  for (let i = 0; i < result.length - 1; i++) {
    result[i].end = result[i + 1].start;
    result[i].end_str = secondsToSrtTime(result[i].end);
  }

  return result;
}

/**
 * 将 SRT 时间字符串转为秒
 * @param {string} srtTime e.g. "00:01:23,456"
 */
function srtTimeToSeconds(srtTime) {
  const [h, m, rest] = srtTime.split(":");
  const [s, ms] = rest.split(",");
  return (
    parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s) + parseInt(ms) / 1000
  );
}

/**
 * 将秒数转回 SRT 时间格式
 */
function secondsToSrtTime(sec) {
  const h = Math.floor(sec / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((sec % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  const ms = Math.floor((sec * 1000) % 1000)
    .toString()
    .padStart(3, "0");
  return `${h}:${m}:${s},${ms}`;
}

function build_chapters(subtitles){
    const chapters = subtitles.reduce((chapters,sub,i)=>{        
        sub.index = i
        if(/^chapter/img.test(sub.text)){
            
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
    return chapters
}
