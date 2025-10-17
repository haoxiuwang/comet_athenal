import NowPlayingBar from "../components/NowPlayingBar"
export default function Test() {
    const song = { title: "Get followed on social media", img: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=60" }
    return <NowPlayingBar {...{song,onClick:()=>alert("onclick!")}}/>
}