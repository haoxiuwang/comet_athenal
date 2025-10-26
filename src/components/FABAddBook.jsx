import React from "react";
import { Fab, Zoom, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { animate } from "framer-motion";


export default function AddContentButton({ctx}) {
  return (
    
        <Fab
          color="primary"
          aria-label="add"
          onClick={()=>ctx.dispatch({type:"add_book"})}
          sx={{
            position: "fixed",
            bottom: 84,
            right: 24,
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 6px 14px rgba(0,0,0,0.35)",
            },
            transition: "all 0.25s ease",
            zIndex: 1500,
          }}
        >
          <img className={`w-full h-full rounded-full ${ctx.loading?"animate-spin":""}`} src="./logo.png" />
        </Fab>
     
  );
}
