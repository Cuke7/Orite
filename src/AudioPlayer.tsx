// import AudioControls from "./AudioControls";
import Loader from "./Loader";
import { PlayIcon, ForwardIcon, BackwardIcon, PauseIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";

const AudioPlayer = ({ track, musicLoading, changeSong }) => {
    // Internal component
    const AudioControls = () => {
        if (musicLoading || internalLoading) {
            return (
                <div className="mx-auto">
                    <Loader className="w-12 h-12 text-neutral animate-spin fill-secondary" />
                </div>
            );
        } else {
            return (
                <div className="flex flex-col justify-between">
                    <div className="flex justify-around">
                        <button onClick={() => changeSong(false)}>
                            <BackwardIcon className="h-12 text-secondary" />
                        </button>
                        {isPlaying ? (
                            <button onClick={() => setPlaying(false)}>
                                <PauseIcon className="h-12 text-secondary" />
                            </button>
                        ) : (
                            <button onClick={() => setPlaying(true)}>
                                <PlayIcon className="h-12 text-secondary" />
                            </button>
                        )}
                        <button onClick={() => changeSong(true)}>
                            <ForwardIcon className="h-12 text-secondary" />
                        </button>
                    </div>
                    {/* <div className="">
                        <input type="range" min="0" max={duration} className="range range-secondary range-xs" value={currentTime} onChange={seekTo} />

                        <div className="w-full flex justify-between text-white">
                            <div>{formatTime(currentTime)}</div>
                            <div>{formatTime(duration)}</div>
                        </div>
                    </div> */}
                </div>
            );
        }
    };

    // Audio element
    const audio = useRef(null);

    // State
    const [isPlaying, setPlaying] = useState(false);
    // const [currentTime, setCurrentTime] = useState(0);
    // const [duration, setDuration] = useState(0);
    const [internalLoading, setInternalLoading] = useState(false);

    useEffect(() => {
        if (track) {
            console.log("Track changed", track);
            audio.current.ref = track.url;
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

    // const timeUpdate = (event) => {
    //     setCurrentTime(event.target.currentTime);
    // };

    // const seekTo = (e) => {
    //     console.log(e);
    //     audio.current.currentTime = e.target.value;
    // };

    // if (track) {
    return (
        <div className="mt-8 flex-1 flex justify-start rounded-3xl bg-opacity-5 bg-primary">
            <div className="avatar w-1/3">
                <div className="w-full rounded-xl">
                    <img src={track.artwork ? track.artwork : "/bird.png"} />
                </div>
            </div>
            <div className="justify-around flex-col flex flex-1 mx-8">
                <div className="">
                    <div className="text-white font-bold">{track.title ? track.title : "No song loaded"}</div>
                    <div className="text-gray">{track.artist ? track.artist : "No artist loaded"}</div>
                </div>
                <AudioControls></AudioControls>
            </div>
            <audio style={{ display: "none" }} src={track.url} ref={audio} controls className="mt-12" autoPlay onCanPlayThrough={() => setPlaying(true)}></audio>
        </div>
    );
    // } else {
    //     return <div></div>;
    // }
};

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    minutes = Number(minutes >= 10 ? minutes : "0" + minutes);
    seconds = Math.floor(seconds % 60);
    seconds = seconds >= 10 ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
}

export default AudioPlayer;
