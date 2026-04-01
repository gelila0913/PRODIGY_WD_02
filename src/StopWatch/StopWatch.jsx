import React, { useState, useEffect, useRef } from 'react';
import './StopWatch.css';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  // Logic to handle the counting
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Update every 10ms for accuracy
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  // Format time to 00:00:00 (Minutes:Seconds:Milliseconds)
  const formatTime = (ms) => {
    const minutes = ("0" + Math.floor((ms / 60000) % 60)).slice(-2);
    const seconds = ("0" + Math.floor((ms / 1000) % 60)).slice(-2);
    const milliseconds = ("0" + ((ms / 10) % 100)).slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-card">
        <h1 className="stopwatch-title">STOPWATCH</h1>
        
        {/* Main Display */}
        <div className="time-display">
          {formatTime(time)}
        </div>

        {/* Controls */}
        <div className="controls">
          <button 
            className={`btn ${isRunning ? 'btn-pause' : 'btn-start'}`}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? <Pause size={24} /> : <Play size={24} />}
            {isRunning ? "Pause" : "Start"}
          </button>

          <button className="btn btn-lap" onClick={handleLap} disabled={!isRunning && time === 0}>
            <Timer size={24} /> Lap
          </button>

          <button className="btn btn-reset" onClick={handleReset}>
            <RotateCcw size={24} /> Reset
          </button>
        </div>

        {/* Lap History */}
        {laps.length > 0 && (
          <div className="laps-section">
            <h3>Lap Times</h3>
            <div className="laps-list">
              {laps.map((lapTime, index) => (
                <div key={index} className="lap-item">
                  <span>Lap {index + 1}</span>
                  <span>{formatTime(lapTime)}</span>
                </div>
              )).reverse()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;