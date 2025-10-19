export default function SwipeContainer({
    onSwipeUp,
    onSwipeDown,
    onClick,
    className,
    children,
}) {
   
    
    const handleSwipe = (e) => {
        const start = e.target.start;
        const end = e.changedTouches[0].screenY;
        const distance = end - start;

        // 向下滑
        if (distance > 20) {
            onSwipeDown()
        } else {
           
            if(onClick)onClick()
        }    
        

        // 向上滑
        if (distance < -20) {
            onSwipeUp()
        } else {
          
            
            if(onClick)onClick()
        }
       
    }
    return (
        <div 
            className={className}
            onTouchStart={(e)=>{e.target.start = e.targetTouches[0].screenY;}}
            onTouchEnd={(e)=>{handleSwipe(e)}}
        >
            {children}
        </div>
    )
}

