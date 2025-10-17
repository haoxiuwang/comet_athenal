import { navigate } from "./useRouter";
export default function Link({href,onClick,className,children,...others}) {
    return <button onClick={async(e)=>{
        if (onClick) 
            if (await onClick()) return
        
        navigate(href)
    }} {...others} className={`cursor-pointer ${className}`}>{children}</button>
}