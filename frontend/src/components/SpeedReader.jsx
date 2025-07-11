import React, { useState, useEffect, useRef } from "react";

function SpeedReader({ words }) {
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [wpm, setWpm] = useState(300);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setIndex((i) => (i < words.length - 1 ? i + 1 : i));
      }, 60000 / wpm);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running, wpm]);

  const handleStartPause = () => setRunning((r) => !r);
  const handleRestart = () => {
    setRunning(false);
    setIndex(0);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 w-full max-w-xl">
      <div className="text-6xl font-mono font-bold text-center h-32 transition-all duration-200 ease-in-out">
        {words[index]}
      </div>

      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={handleStartPause}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded"
        >
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleRestart}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded"
        >
          Restart
        </button>
      </div>

      <div className="mt-6 w-full max-w-md">
        <label className="block mb-2 font-medium">Words Per Minute (WPM): {wpm}</label>
        <input
          type="range"
          min="100"
          max="800"
          value={wpm}
          onChange={(e) => setWpm(Number(e.target.value))}
          className="w-full accent-blue-500"
        />
      </div>
    </div>
  );
}

export default SpeedReader;
