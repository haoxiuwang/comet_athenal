import fs from "fs"
let pages = fs.readdirSync("src/pages")
pages = pages.filter((page)=>page.endsWith(".jsx"))
            .map((page)=>page.split(".jsx")[0])

let content = pages.map((page)=>`import ${page[0].toUpperCase()+page.slice(1)} from "./pages/${page}.jsx"`).join("\n")+"\n\n"

pages = pages.reduce((last,page)=>{
    last = `${last}'/${page=="Index"?"":page.toLowerCase()}':${page},`   
return last
},"")

content = `
import useRouter from "./router/useRouter"

${content}
export default function Component({ctx}){
    const path = useRouter()
    if(!path)return ""
    let _path = ctx.path = !path.endsWith("/")?path:path.slice(0,path.length-1)
    if(_path==""){
        _path = ctx.path = "/"
    }        
    const pages = {${pages}}
    
    let Page = pages[_path]
    if(!Page){
        const p = _path.indexOf("/",1)
        _path = p>-1? _path.slice(0,p):_path 
        Page = pages[_path]   
    }
    
    return <Page {...{ctx}}/>
}
`
fs.writeFileSync("./src/Comp.jsx",content)

