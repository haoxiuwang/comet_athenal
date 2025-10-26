import { useState } from "react";
export default function SwipeContainer({
    onSwipeUp,
    onSwipeDown, 
    onSwipeLeft,
    onSwipeRight,
    className,
    children,
    onClick,
    ...others
}) {  
    
    const [_ctx] = useState({})

    const handleSwipe = (e) => {
        const start = _ctx.start;
        const end = e.changedTouches[0];
        const dy = end.screenY - start.screenY;
        const dx = end.screenX - start.screenX;
        const to_vertical = Math.abs(dy)>Math.abs(dx)
        //up and down
        if(to_vertical){
            // 向下滑
            if (dy > 20) {
                onSwipeDown&& onSwipeDown()
                return
            }   
            // 向上滑
            if (dy < -20) {
                onSwipeUp&& onSwipeUp()
                return
            }
        }
        // right
            if (dx > 20) {
                onSwipeRight&&  onSwipeRight()                
                return
            }   
            // left
            if (dx < -20) {
                onSwipeLeft&&  onSwipeLeft()
                return
            }       
        onClick&& onClick()       
    }
    return (
        <div             
            {...others}
            className={className}
            onTouchStart={(e)=>{_ctx.start = e.targetTouches[0]}}
            onTouchEnd={(e)=>{handleSwipe(e)}}
        >
            {children}
        </div>
    )
}


