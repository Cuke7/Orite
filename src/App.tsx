import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { PlayIcon, ForwardIcon, BackwardIcon, PauseIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";
import AudioPlayer from "./AudioPlayer";
// import AudioControls from "./AudioControls";

let testURl = "https://www.youtube.com/playlist?list=PLY80CRqvcxEUByZ_P9DzXmsL5HLgx5rw4";

function App() {
    // const [duration, setDuration] = useState(0);
    const [isPlaying, setPlaying] = useState(false);
    const [track, setTrack] = useState();
    const [playlistUrl, setplayListUrl] = useState(testURl);
    const [playlist, setPlayList] = useState([]);
    const [playlistLoading, setPlaylistLoading] = useState(false);
    const [musicLoading, setMusicLoading] = useState(false);
    const [songIndex, setSongIndex] = useState(0);
    const audio = useRef(null);

    // When a track is set, change the audio element url
    useEffect(() => {
        if (track) {
            loadMusic(track.videoId);
        }
    }, [track]);

    // When a pause/play is clicked, reflect it on the audio element
    useEffect(() => {
        if (isPlaying) {
            audio.current.play();
        } else {
            audio.current.pause();
        }
    }, [isPlaying]);

    const [currentTime, setCurrentTime] = useState(0);

    const changeSong = (forward) => {
        const index = songIndex;
        if (forward) {
            if (songIndex < playlist.length - 1) {
                setTrack(playlist[index + 1]);
                setSongIndex(index + 1);
            }
        }
    };

    const timeUpdate = (event) => {
        setCurrentTime(event.target.currentTime);
    };

    const seekTo = (e) => {
        console.log(e);
        audio.current.currentTime = e.target.value;
    };

    // Get playlist object from server, set the loaders and set the first track
    const fetchPlaylist = async () => {
        setPlaylistLoading(true);
        let data = await axios.get("/.netlify/functions/getPlaylist?id=" + testURl);
        let playlist = data.data;
        setPlayList(playlist);
        setPlaylistLoading(false);
        setTrack(playlist[0]);
        setSongIndex(0);
    };

    const loadMusic = async (id: string) => {
        setMusicLoading(true);
        let data = await axios.get("/.netlify/functions/getUrl?id=" + id);
        let musicUrl = data.data.url;
        audio.current.src = musicUrl;
        setMusicLoading(false);
    };

    return (
        <div data-theme="halloween" className="h-screen flex flex-col justify-center items-center">
            <div className="w-1/2">
                <div className="w-full flex justify-between items-center">
                    <input value={playlistUrl} onChange={(e) => setplayListUrl(e.target.value)} type="text" placeholder="Enter a youtube playlist url" className="w-4/5 text-white sm:text-xl bg-transparent border-2 rounded-lg border-accent hover:border-accent-focus p-2 outline-none font-mono" />
                    {playlistLoading ? (
                        <div className="mx-4">
                            <Loader className="w-8 h-8 text-neutral animate-spin fill-primary" />
                        </div>
                    ) : (
                        <button onClick={fetchPlaylist} type="button" className="flex-1 bg-primary hover:bg-secondary text-white font-bold rounded-lg p-2 sm:p-3 ml-4">
                            Rock on!
                        </button>
                    )}
                </div>
                <AudioPlayer track={track} setPlaying={setPlaying} isPlaying={isPlaying} onPlayPauseClick={setPlaying} changeSong={changeSong} musicLoading={musicLoading} currentTime={currentTime} duration={audio.duration ? audio.duration : 200} seekTo={seekTo}></AudioPlayer>
            </div>
            <audio ref={audio} controls className="mt-12" autoPlay onCanPlay={() => setPlaying(true)} onTimeUpdate={timeUpdate}></audio>
        </div>
    );
}

export default App;
