import React from 'react';
import './Timer.css';

const Timer = ({ timeRemaining, isActive }) => {
  const getTimerClassName = () => {
    let className = 'timer';
    if (timeRemaining <= 10 && isActive) {
      className += ' warning';
    }
    if (timeRemaining <= 5 && isActive) {
      className += ' critical';
    }
    if (!isActive) {
      className += ' inactive';
    }
    return className;
  };

  const formatTime = (seconds) => {
    return seconds.toString().padStart(2, '0');
  };

  return (
    <div className={getTimerClassName()}>
      <div className="timer-icon">⏱️</div>
      <div className="timer-text">
        <span className="timer-value">{formatTime(timeRemaining)}</span>
        <span className="timer-label">seconds</span>
      </div>
      {timeRemaining <= 10 && isActive && (
        <div className="timer-warning">Hurry up!</div>
      )}
    </div>
  );
};

export default Timer;
