import React, { useState, useEffect, useRef } from "react";

function SpeedReader({ words }) {
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [wpm, setWpm] = useState(300);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => Math.min(prev + 1, words.length - 1));
      }, 60000 / wpm);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running, wpm]);

  const handleStartPause = () => setRunning((prev) => !prev);
  const handleRestart = () => {
    setRunning(false);
    setIndex(0);
  };

  return (
    <div className="text-center mt-8">
      <div className="text-5xl font-mono h-20">{words[index]}</div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <button onClick={handleStartPause}>
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={handleRestart}>Restart</button>
        <input
          type="range"
          min="100"
          max="800"
          value={wpm}
          onChange={(e) => setWpm(Number(e.target.value))}
        />
        <span>{wpm} WPM</span>
      </div>
    </div>
  );
}

export default SpeedReader;
