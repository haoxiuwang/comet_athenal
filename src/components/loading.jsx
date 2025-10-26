
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
// import LeafIcon from "@mui/icons-material/Eco"; // 可以换成你的枫叶图标

export default function ElegantLoading() {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center h-screen bg-black/20 ${true||"bg-gradient-to-b from-orange-50/90 to-red-100/90"}`}>
      {/* 枫叶旋转动画 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
        }}
        className="p-4 bg-white/70 rounded-full shadow-lg"
      >
        {/* <LeafIcon sx={{ fontSize: 48, color: "#e57373" }} /> */}
        <img className="w-8 h-8" src="./icon.png" />
      </motion.div>

      {/* Loading 文本 */}
      <div className="mt-6 flex flex-col items-center">
        {/* <CircularProgress
          size={32}
          sx={{
            color: "#e57373",
            marginBottom: "12px",
          }}
        /> */}
        <p className="text-gray-700 font-medium text-lg tracking-wide">
          加载中，请稍候...
        </p>
      </div>
    </div>
  );
}
