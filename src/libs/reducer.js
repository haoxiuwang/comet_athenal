import { 
        navigate_to,    
        open_addbook_dialoge,
        add_book,
        add_book_input_onchange,
        open_book,
        open_delete_book,
        delete_book,
        cancel_delete_book,
        on_search_input_change        
    } from "./handlers/handle_books"
import init from "./handlers/handle_books/init"
import {
    switch_article_style,
    play_or_pause,
    play_loop_mode,
    change_chapter,
    play_or_pause_subtitle,
    app_onended,
    app_ontimeupdate,
    to_next_subtitle,
    change_player_progress  
} from "./handlers/handle_article"

 
export default async function reducer(ctx,action){
    const actions = {       
        init,
        navigate_to,
        open_addbook_dialoge,
        add_book,
        add_book_input_onchange,
        open_book,
        open_delete_book,
        delete_book,
        cancel_delete_book,
        on_search_input_change,
        //
        switch_article_style,
        play_or_pause,
        play_loop_mode,
        change_chapter,
        play_or_pause_subtitle,
        app_onended,
        app_ontimeupdate,
        to_next_subtitle,
        change_player_progress   
    }
    
    
    const handler = actions[action.type]
    await handler(ctx,action.payload)
}