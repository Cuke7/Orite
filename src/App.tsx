import { useState } from "react";

let testURl = "https://www.youtube.com/playlist?list=PLY80CRqvcxEUByZ_P9DzXmsL5HLgx5rw4";

function App() {
    const [playlistUrl, setplayListUrl] = useState(testURl);

    return (
        <div className="h-screen bg-gray-800 flex justify-center items-center">
            <input value={playlistUrl} onChange={(e) => setplayListUrl(e.target.value)} type="text" placeholder="Enter a youtube playlist url" className="w-1/2 sm:1/3 text-white sm:text-xl bg-transparent border-2 rounded-lg border-white p-2 outline-none font-mono" />
            <button type="button" className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold rounded-lg p-2 sm:p-3 mx-4">
                Rock on!
            </button>
        </div>
    );
}

export default App;
