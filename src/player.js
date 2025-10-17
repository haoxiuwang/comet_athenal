import { useRef, useState, useEffect } from 'react';

export default function Player() {
  const [audio, setAudio] = useState(null);
  const [player, setPlayer] = useState(null);
  const [init, setInit] = useState(false);

  // const [canvas, setCanvas] = useState(null);

  const canvas = useRef(null);
  const input = useRef(null);

useEffect(() => {
  if (!canvas.current) return ;
  let min = Math.min(window.innerHeight,window.innerWidth)
  canvas.current.height = min*0.8
  canvas.current.width = min*0.8
  if (!player) return ;
  player.oncanplay=()=>{
    player.play()
    const duration = player.duration

    player.ontimeupdate = (e)=>{
      let currentTime = player.currentTime
      let angel = currentTime*((Math.PI*2)/duration)
      let r_angel = (Math.PI*2)-angel
      let dot_y = Math.sin(angel)*radius+canvas.current.height / 2
      let dot_x = Math.cos(angel)*radius+canvas.current.width / 2
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, (Math.PI*2)); // 绘制完整的圆
      ctx.strokeStyle = 'black'; // 边框颜色
      ctx.stroke(); // 绘制边框
      ctx.closePath()

      ctx.beginPath();
      ctx.arc(dot_x, dot_y, 5, 0, (Math.PI*2)); // 绘制完整的圆
      ctx.fillStyle = 'green'; // 边框颜色
      ctx.fill(); // 绘制边框
      ctx.closePath()

      ctx.beginPath();
      ctx.arc(x, y, 25, 0, (Math.PI*2)); // 绘制完整的圆
      ctx.strokeStyle = 'red'; // 边框颜色
      ctx.stroke(); // 绘制边框
      ctx.closePath()

      ctx.beginPath();
      ctx.strokeStyle = 'red'; // 十字颜色
      ctx.moveTo(x - crossSize, y); // 起点
      ctx.lineTo(x + crossSize, y); // 终点
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y - crossSize); // 起点
      ctx.lineTo(x, y + crossSize); // 终点
      ctx.stroke();
      ctx.closePath()
      ctx.beginPath();
    }
  }
  const ctx = canvas.current.getContext('2d');
  let width = canvas.current.width
  const x = width / 2; // 圆心X坐标
  const y = width / 2; // 圆心Y坐标
  const radius = width/2-40; // 圆的半径
  const crossSize = 400;
  ctx.arc(x, y, radius, 0, (Math.PI*2)); // 绘制完整的圆
  ctx.strokeStyle = 'black'; // 边框颜色
  ctx.stroke(); // 绘制边框
  ctx.closePath()

  //    2pi/duration = angel/currentTime
  //    angel = currentTime*(2pi/duration)
  //    r_angel = 2pi-angel
  //    y = r_angel*radius
  //    x = r_angel*radius


}, [canvas.current,player]);

return (
  <div className='fixed inset-0 flex place-items-center place-content-center'>
    <input ref={input} className={`hidden`} type='file' placeholder='files' name="files" onChange={(e) => {
      e.preventDefault();
      const file = e.target.files[0];
      const blobUrl = URL.createObjectURL(file);
      const audio = new Audio(blobUrl);
      setPlayer(audio);
      }}
    />

    {
      player?(
        <canvas className={`m-10 border-4 border-black`} ref = {canvas} onClick={(event)=>{
          const rect = canvas.current.getBoundingClientRect(); // 获取canvas的位置信息
          const x = event.clientX - rect.left-canvas.current.width / 2
          const y = event.clientY - rect.top-canvas.current.width / 2
          let line = Math.sqrt(x*x+y*y)
          let radius = canvas.current.width/2-40
          if (line>radius||!player){
            if (player) player.pause()
            input.current.click()
            return ;
          }
          //    y/radius = sin
          //    Math.asin(sin) = angel
          //    2pi/duration = angel/currentTime
          //    angel = currentTime*(2pi/duration)
          //    r_angel = 2pi-angel
          //    y = r_angel*radius
          //    x = r_angel*radius
          const ctx = canvas.current.getContext('2d');
          const duration = player.duration

          if (x>-50&&x<50&&y>-50&&y<50){
            player.paused?player.play():player.pause()
            return ;
          }

          let angel = Math.atan2(y,x)
          if (angel<0) angel = Math.PI*2+angel
          let curTime = angel/(Math.PI*2/duration)
          player.currentTime = curTime
        }}></canvas>
      ):(
        <button onClick={()=>input.current.click()}>Click here to add your music!</button>
      )
    }




  </div>
);

}
