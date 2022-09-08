import Loader from "./Loader";
import { PlayIcon, ForwardIcon, BackwardIcon, PauseIcon } from "@heroicons/react/24/outline";
const AudioControls = ({ isPlaying, onPlayPauseClick, changeSong, musicLoading, currentTime, duration, seekTo }) => {
    if (musicLoading) {
        return (
            <div className="m-auto">
                <Loader className="w-8 h-8 text-neutral animate-spin fill-secondary" />
            </div>
        );
    } else {
        return (
            <div className="flex flex-col justify-between flex-1">
                <div className="flex justify-around my-auto">
                    <button onClick={() => changeSong(false)}>
                        <BackwardIcon className="h-12 text-secondary" />
                    </button>
                    {isPlaying ? (
                        <button onClick={() => onPlayPauseClick(false)}>
                            <PauseIcon className="h-12 text-secondary" />
                        </button>
                    ) : (
                        <button onClick={() => onPlayPauseClick(true)}>
                            <PlayIcon className="h-12 text-secondary" />
                        </button>
                    )}
                    <button onClick={() => changeSong(true)}>
                        <ForwardIcon className="h-12 text-secondary" />
                    </button>
                </div>
                <div className="">
                    <input type="range" min="0" max={duration} className="range range-secondary range-xs" value={currentTime} onChange={seekTo} />

                    <div className="w-full flex justify-between text-white">
                        <div>{formatTime(currentTime)}</div>
                        <div>{formatTime(duration)}</div>
                    </div>
                </div>
            </div>
        );
    }
};

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    minutes = Number(minutes >= 10 ? minutes : "0" + minutes);
    seconds = Math.floor(seconds % 60);
    seconds = seconds >= 10 ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
}

export default AudioControls;
