import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from '@mui/material';

/**
 * DeleteConfirmDialog
 * props:
 *  - open: 是否显示
 *  - book: { id, title } 要删除的书
 *  - onClose(): 关闭对话框
 *  - onConfirm(id): 确认删除时回调
 */
export default function DeleteConfirmDialog({ ctx }) {
    const open = Boolean(ctx.delete_book), book = ctx.delete_book
    const [input, setInput] = useState('');

    const handleConfirm = () => {
        if (input.trim() === String(book.id)) { 
            ctx.dispatch({type:"delete_book"},book)
        }
    };

  const handleClose = () => {   
    ctx.dispatch({type:"cancel_delete_book"})
  };

  const match = input.trim() === String(book.id);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle color="error">确认删除</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 1 }}>
          你确定要删除以下图书吗？
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
          {book?.title}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          为确认删除，请输入该书的 ID： <strong>{book?.id}</strong>
        </Typography>
        <TextField
          fullWidth
          label="输入书的ID"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>ctx.dispatch({type:"cancel_delete_book"})}>取消</Button>
        <Button
          onClick={handleConfirm}
          color="error"
          variant="contained"
          disabled={!match}
        >
          删除
        </Button>
      </DialogActions>
    </Dialog>
  );
}
