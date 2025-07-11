import React, { useState, useEffect, useRef } from "react";
import "./SpeedReader.css";

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
  }, [running, wpm, words.length]);

  const handleStartPause = () => setRunning((r) => !r);
  const handleRestart = () => {
    setRunning(false);
    setIndex(0);
  };

  return (
    <div className="speed-reader-container">
      <div className="speed-reader-card">
        {/* Word Display Box */}
        <div className="word-display-container">
          <div className="word-display">
            {words[index] || "Ready to read..."}
          </div>
          <div className="word-progress">
            Word {index + 1} of {words.length}
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((index + 1) / words.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="controls-container">
          <button
            onClick={handleStartPause}
            className={`control-button start-pause-button ${running ? 'pause' : 'start'}`}
          >
            {running ? "Pause" : "Start"}
          </button>
          <button
            onClick={handleRestart}
            className="control-button restart-button"
          >
            Restart
          </button>
        </div>

        {/* Speed Control */}
        <div className="speed-control">
          <label className="speed-label">
            Words Per Minute: {wpm}
          </label>
          <div className="speed-slider-container">
            <span className="speed-min">100</span>
            <input
              type="range"
              min="100"
              max="800"
              value={wpm}
              onChange={(e) => setWpm(Number(e.target.value))}
              className="speed-slider"
            />
            <span className="speed-max">800</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpeedReader;