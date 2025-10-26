export default function PI({ctx,book,i}) {
    if(ctx.books.length<4)
      return(
      <div 
        style={{backgroundImage:`url(${book.cover})`}}
        className={`bg-cover aspect-square select-none rounded-[20px] text-white overflow-hidden aspect-square border-2 border-white bg-cover relative bg-purple-200 col-span-2`}
        onClick={()=>ctx.dispatch({type:"open_book",payload:book})}              
        onContextMenu={(e)=>{
          e.preventDefault()
          ctx.dispatch({type:"open_delete_book",payload:book})
        }}
        >
          <div className="bg-gradient-to-t p-2 from-black to-transparent absolute inset-0 text-2xl flex flex-col place-content-end">
            {book.title}
          </div>

      </div>)
    return (
        <div    
                     
          style={{
            backgroundImage: i % 4 == 2 ? "" : `url(${book.cover})`,
          }}
          className={`select-none rounded-[20px] border-2 border-white bg-cover relative bg-purple-200 ${
            i % 4 != 2 ? "pt-[100%] text-white" : "pt-[50%]"
          } ${i % 4 > 1 ? "col-span-2" : ""}`}
          
          onClick={()=>ctx.dispatch({type:"open_book",payload:book})}              
          onContextMenu={(e)=>{
            e.preventDefault()
            ctx.dispatch({type:"open_delete_book",payload:book})
          }}
        >
          <div className={`p-2 rounded-[20px] absolute inset-0 ${i % 4 == 2? "grid grid-cols-2 gap-x-4": "bg-gradient-to-t from-black to-transparent flex place-books-end place-content-center"} ${i % 4 == 3 ? "text-2xl" : "text-sm"}`}>
            {i % 4 != 2 ? (
             <div className="flex w-full h-full place-items-end">{book.title}</div> 
            ) : (
              <>
                <div className="flex place-items-end h-full text-black text-left flex place-books-end">
                  {book.title}
                </div>
                <div
                  style={{ backgroundImage: `url(${book.cover})` }}
                  className="rounded-[20px] h-full bg-cover"
                ></div>
              </>
            )}
          </div>
        </div>
    )
}