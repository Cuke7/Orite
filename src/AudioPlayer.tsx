import AudioControls from "./AudioControls";

const AudioPlayer = ({ setPlaying, track, isPlaying, onPlayPauseClick, changeSong, musicLoading, currentTime, duration, seekTo }) => {
    if (track) {
        return (
            <div className="mt-8 flex-1 flex justify-start">
                <div className="avatar">
                    <div className="w-48 rounded-xl">
                        <img src={track.artwork} />
                    </div>
                </div>
                <div className="ml-8 justify-between flex-col flex flex-1">
                    <div>
                        <div className="text-white font-bold">{track.title}</div>
                        <div className="text-gray">{track.artist}</div>
                    </div>
                    <AudioControls isPlaying={isPlaying} onPlayPauseClick={setPlaying} changeSong={changeSong} musicLoading={musicLoading} currentTime={currentTime} duration={duration} seekTo={seekTo}></AudioControls>
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default AudioPlayer;
