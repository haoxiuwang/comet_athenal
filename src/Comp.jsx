
import useRouter from "./libs/router/useRouter.js"

import Article from "./pages/Article.jsx"
import Index from "./pages/Index.jsx"
import Test from "./pages/Test.jsx"


export default function Component({ctx}){
    const path = useRouter()
    if(!path)return ""
    let _path = ctx.path = !path.endsWith("/")?path:path.slice(0,path.length-1)
    if(_path==""){
        _path = ctx.path = "/"
    }        
    const pages = {'/article':Article,'/':Index,'/test':Test,}
    
    let Page = pages[_path]
    if(!Page){
        const p = _path.indexOf("/",1)
        _path = p>-1? _path.slice(0,p):_path 
        Page = pages[_path]   
    }
    
    return <Page {...{ctx}}/>
}
