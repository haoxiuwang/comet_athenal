import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function CuteUnlockScreen({ ctx }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
    
    
  // 固定时间（不随时间变化）
  const mountTimestamp = ctx.registered.time

  

  const handleUnlock = () => {
    if (!code || code.trim().length < 4) {
      setError("请输入至少4位的解锁码 💬");
      return;
    }
    if (code!=ctx.registered.code)
    {
      setError(`您的解锁码不正确，请再试试！ 💬`);
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUnlocked(true);
      
    }, 1800);
  };

  if (false||unlocked)
    return (
      <Unlock {...{ctx}}/>
    );
  
  return (
    <div className="fixed inset-0">
      <img src="./bg_unlock.jpeg" className="absolute inset-0 w-full h-full object-cover" />
      <Box
      className="bg-black/80"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",   
        position: "relative",
        overflow: "hidden",
        color: "#333",
      }}
    >
      {/* 可爱漂浮SVG */}
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          opacity: 0.3,
          zIndex: 0,
        }}
      >
        <defs>
          <radialGradient id="star" fx="50%" fy="50%" r="50%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        {[...Array(25)].map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 100 + "%"}
            cy={Math.random() * 100 + "%"}
            r={Math.random() * 2 + 1}
            fill="url(#star)"
          >
            <animate
              attributeName="cy"
              values="0%;100%;0%"
              dur={`${2 + Math.random() * 4}s`}
              repeatCount="indefinite"
              begin={`${Math.random()}s`}
            />
          </circle>
        ))}
      </svg>

      <Paper
        elevation={8}
        sx={{
          position: "relative",
          zIndex: 1,
          p: 5,
          borderRadius: 4,
          textAlign: "center",
          bgcolor: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          maxWidth: 400,
          width: "90%",
        }}
      >
        {/* <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: "#6c63ff",
            fontFamily: "'Comic Neue', cursive",
          }}
        >
          ✨ 解锁应用 ✨
        </Typography> */}

        <Typography variant="body2" sx={{ mb: 2 }}>
          
请发送下面内容领取解锁码 🕓
        </Typography>

        <Alert
          severity="info"
          sx={{
            bgcolor: "rgba(108,99,255,0.1)",
            color: "#6c63ff",
            mb: 2,
            fontSize: "0.85rem",
          }}
        >
        {mountTimestamp||"Sun Oct 26 2025 00:15:22 GMT-0400 (Eastern Daylight Saving Time)"}          
        </Alert>

        <Stack spacing={2}>
          <TextField
            label="输入你的解锁码"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{
              sx: {
                borderRadius: 3,
                backgroundColor: "rgba(255,255,255,0.7)",
              },
            }}
          />
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#6c63ff",
              color: "white",
              fontWeight: 700,
              borderRadius: 3,
              boxShadow: "0 4px 14px rgba(108,99,255,0.4)",
              "&:hover": { bgcolor: "#7a6cff" },
              py: 1.2,
            }}
            onClick={handleUnlock}
            disabled={loading}
          >
            {loading ? "正在解锁..." : "立即解锁 🚀"}
          </Button>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </Stack>

        <Typography
          variant="caption"
          sx={{
            mt: 3,
            display: "block",
            color: "#555",
            fontStyle: "italic",
          }}
        >
          清除缓存或更换设备后需重新申请解锁哦 💌
        </Typography>
      </Paper>
    </Box>
    </div>
  );
}

function Unlock({ctx}) {
  useEffect(()=>{
    let timer = setTimeout(() => {
      ctx.dispatch({type:"unlocked"})
    }, 3000);

  },[])
  return (<Box
        className="bg-purple-100 relative"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",          
          color: "#333",
        }}
      >
        <div className="absolute inset-0 flex place-items-center place-content-center"><CircularProgress color="secondary" size={80} sx={{ mb: 3 }} /></div>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          正在验证你的解锁码...
        </Typography>
      </Box>)
}