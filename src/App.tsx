import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { PlayIcon, ForwardIcon, BackwardIcon, PauseIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";
import AudioPlayer from "./AudioPlayer";
// import AudioControls from "./AudioControls";

let testURl = "https://www.youtube.com/playlist?list=PLY80CRqvcxEUByZ_P9DzXmsL5HLgx5rw4";

function App() {
    // const [duration, setDuration] = useState(0);
    // const [isPlaying, setPlaying] = useState(false);

    const [playlistUrl, setplayListUrl] = useState(testURl);
    const [playlist, setPlayList] = useState([]);
    const [track, setTrack] = useState({});
    const [songIndex, setSongIndex] = useState(0);
    const [playlistLoading, setPlaylistLoading] = useState(false);
    const [musicLoading, setMusicLoading] = useState(false);

    const changeSong = (forward: boolean) => {
        const index = songIndex;
        if (forward) {
            if (songIndex < playlist.length - 1) {
                addTrackUrl(playlist[index + 1]);
                setSongIndex(index + 1);
            }
        }
    };

    // Get playlist object from server, set the loaders and set the first track
    const fetchPlaylist = async () => {
        setPlaylistLoading(true);
        let data = await axios.get("/.netlify/functions/getPlaylist?id=" + playlistUrl);
        if (data.status == 201) {
            console.error(data.data);
            setPlaylistLoading(false);
            return;
        } else {
            let playlist = data.data;
            setPlayList(playlist);
            setPlaylistLoading(false);
            setSongIndex(0);
            addTrackUrl(playlist[0]);
        }
    };

    const addTrackUrl = async (pseudoTrack) => {
        setMusicLoading(true);
        let data = await axios.get("/.netlify/functions/getUrl?id=" + pseudoTrack.videoId);
        let musicUrl = data.data.url;
        pseudoTrack.url = musicUrl;
        setTrack(pseudoTrack);
        setMusicLoading(false);
    };

    return (
        <div data-theme="halloween" className="h-screen flex flex-col justify-center items-center">
            <div className="lg:w-1/3 w-full px-4">
                <div className="w-full flex justify-between items-center">
                    <input className="flex-1 text-white sm:text-xl bg-transparent border-2 rounded-lg border-accent hover:border-accent-focus p-2 outline-none font-mono" value={playlistUrl} onChange={(e) => setplayListUrl(e.target.value)} type="text" placeholder="Enter a youtube playlist url" />
                    {playlistLoading ? (
                        <div className="mx-4">
                            <Loader className="w-8 h-8 text-neutral animate-spin fill-primary" />
                        </div>
                    ) : (
                        <button className="bg-primary hover:bg-secondary text-white font-bold rounded-lg p-2 sm:p-3 ml-4" onClick={fetchPlaylist} type="button">
                            Rock on!
                        </button>
                    )}
                </div>
                {/* <AudioPlayer track={track} setPlaying={setPlaying} isPlaying={isPlaying} onPlayPauseClick={setPlaying} changeSong={changeSong} musicLoading={musicLoading} currentTime={currentTime} duration={audio.duration ? audio.duration : 200} seekTo={seekTo}></AudioPlayer> */}
                <AudioPlayer track={track} musicLoading={musicLoading} changeSong={changeSong}></AudioPlayer>
            </div>
        </div>
    );
}

export default App;
