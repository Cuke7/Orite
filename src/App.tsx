import { useState } from "react";
import axios from "axios";
import { PlayIcon, ForwardIcon, BackwardIcon } from "@heroicons/react/24/outline";

let testURl = "https://www.youtube.com/playlist?list=PLY80CRqvcxEUByZ_P9DzXmsL5HLgx5rw4";

function Player(props) {
    const playlist = props.playlist;

    if (playlist.length > 0) {
        const track = playlist[0];
        return (
            <div className="mt-8 flex-1 flex justify-start">
                <div className="avatar">
                    <div className="w-48 rounded-xl">
                        <img src={track.artwork} />
                    </div>
                </div>
                <div className="ml-8 justify-between flex-col flex">
                    <div>
                        <div className="text-white font-bold">{track.title}</div>
                        <div className="text-gray">{track.artist}</div>
                    </div>
                    <div className="my-auto flex justify-around">
                        <button>
                            <BackwardIcon className="h-12 text-secondary" />
                        </button>
                        <button>
                            <PlayIcon className="h-12 text-secondary" />
                        </button>
                        <button>
                            <ForwardIcon className="h-12 text-secondary" />
                        </button>
                    </div>
                    <input type="range" min="0" max="100" className="range range-primary range-sm" />
                    <div className="w-full flex justify-between text-white">
                        <div>0:00</div>
                        <div>3:44</div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <div className="text-white">No playlist loaded.</div>;
    }
}

function App() {
    const [playlistUrl, setplayListUrl] = useState(testURl);
    const [playlist, setPlayList] = useState([]);

    const fetchPlaylist = async () => {
        console.log("Fetching...");
        let data = await axios.get("/.netlify/functions/getPlaylist?id=" + testURl);
        setPlayList(data.data);
    };

    return (
        <div data-theme="halloween" className="h-screen flex flex-col justify-center items-center">
            <div className="w-1/2">
                <div className="w-full flex justify-between items-center">
                    <input value={playlistUrl} onChange={(e) => setplayListUrl(e.target.value)} type="text" placeholder="Enter a youtube playlist url" className="w-4/5  text-white sm:text-xl bg-transparent border-2 rounded-lg border-accent hover:border-accent-focus p-2 outline-none font-mono" />
                    <button onClick={fetchPlaylist} type="button" className="flex-1 bg-primary hover:bg-secondary text-white font-bold rounded-lg p-2 sm:p-3 ml-4">
                        Rock on!
                    </button>
                </div>
                <Player playlist={playlist} />
            </div>
        </div>
    );
}

export default App;
