export default function MUIList(){
   
        const mod = index % 4;

        // Square Cards (1st and 2nd)
        if (mod === 0 || mod === 1) {
          return (
         
            <Card  
              key={index}
              onClick={()=>ctx.dispatch({type:"open_book",payload:book})}              
              onContextMenu={(e)=>ctx.dispatch({type:"delete_book",payload:book})}
          
              className="aspect-square overflow-hidden shadow-md rounded-2xl relative"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <CardContent className="absolute bottom-0 bg-black/50 text-white w-full">
                <Typography variant="subtitle1">{book.title}</Typography>
              </CardContent>
            </Card>
          
            
          );
        }

        // Third card: text + image vertically stacked
        if (mod === 2) {
          return (
          
           <div 
            onClick={()=>ctx.dispatch({type:"open_book",payload:book})}
            onContextMenu={(e)=>ctx.dispatch({type:"delete_book",payload:book})}
            
            key={index} 
            className="rounded bg-black/60 col-span-2 grid grid-cols-2 gap-4 p-4"
           >
            <div className="aspect-square overflow-hidden relative">
              <div className="absolute bottom-0 text-white w-full">
                <Typography variant="subtitle1">{book.title}</Typography>
              </div>
            </div>
            <Card className="aspect-square overflow-hidden shadow-md rounded-2xl relative">
              <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
            </Card>
          </div>
        
          );
        }

        // Fourth card: wide rectangular, spans two rows
        if (mod === 3) {
          return (
          
            <Card
              key={index}
              onClick={()=>ctx.dispatch({type:"open_book",payload:book})}
              onContextMenu={(e)=>ctx.dispatch({type:"delete_book",payload:book})}
              className="col-span-2 row-span-2 aspect-square overflow-hidden shadow-lg rounded-2xl relative"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <CardContent className="absolute bottom-0 bg-black/50 text-white w-full">
                <Typography variant="h6">{book.title}</Typography>
              </CardContent>
            </Card>
         
          );
        }

        return null;
      
} 