import React, { useState, useEffect } from "react";
import { Card, CardContent, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";



export default function FooterSearch({ctx}) {
  
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md z-50">
      <div className="max-w-3xl mx-auto px-4 py-3">
        {/* 搜索输入框 */}
        <div className="flex items-center space-x-2">
          <SearchIcon className="text-gray-500" />
          <TextField
            variant="standard"
            placeholder="Search..."
            fullWidth
            value={ctx.searched_text}
            onChange={(e) => ctx.dispatch({type:"on_search_input_change",payload:e.target.value})}
            InputProps={{
              disableUnderline: true,
              className: "text-lg",
            }}
          />
        </div>

        {/* 结果列表 */}
        {ctx.searched_books.length > 0 && (
          <Paper
            elevation={3}
            className="mt-3 max-h-60 overflow-y-auto rounded-2xl border border-gray-100"
          >
            <List dense>
              {ctx.searched_books.map((book,index) => (
                <ListItem
                  key={item.id}
                  button
                  className="hover:bg-gray-50 transition-colors duration-150"
                  onClick={(e)=>ctx.dispatch({type:"open_book",payload:item})}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={book.cover}
                      alt={book.title}
                      variant="rounded"
                      sx={{ width: 40, height: 40 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={book.title}
                    primaryTypographyProps={{ className: "text-gray-800" }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </div>
    </div>
  );
}
