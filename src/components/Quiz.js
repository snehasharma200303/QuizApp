import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from './Question';
import ProgressBar from './ProgressBar';
import Timer from './Timer';
import './Quiz.css';

const Quiz = ({ 
  questions, 
  currentQuestionIndex, 
  onAnswer, 
  onNext, 
  onPrevious, 
  onSkip,
  onFinish,
  userAnswers,
  timeRemaining,
  timerActive 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerLocked, setAnswerLocked] = useState(false);
  const navigate = useNavigate();

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  useEffect(() => {
    setSelectedAnswer(null);
    setAnswerLocked(false);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (timeRemaining === 0 && timerActive) {
      handleTimeUp();
    }
  }, [timeRemaining, timerActive]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (answerLocked) return;
      
      // Number keys 1-4 for selecting options
      if (event.key >= '1' && event.key <= '4') {
        const optionIndex = parseInt(event.key) - 1;
        if (optionIndex < currentQuestion.options.length) {
          handleAnswerSelect(optionIndex);
        }
      }
      
      // Enter to submit answer
      if (event.key === 'Enter' && selectedAnswer !== null) {
        handleAnswerSubmit();
      }
      
      // 'S' key to skip
      if (event.key.toLowerCase() === 's') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedAnswer, answerLocked, currentQuestion]);

  const handleSkip = () => {
    if (!answerLocked) {
      setAnswerLocked(true);
      onSkip();
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    if (!answerLocked) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer !== null && !answerLocked) {
      setAnswerLocked(true);
      onAnswer(selectedAnswer);
    }
  };

  // Prevent rapid clicking and double submissions
  const handleAnswerSelectThrottled = (answerIndex) => {
    if (!answerLocked && selectedAnswer !== answerIndex) {
      handleAnswerSelect(answerIndex);
    }
  };

  const handleTimeUp = () => {
    if (!answerLocked) {
      setAnswerLocked(true);
      onAnswer(null);
    }
  };

  const handleNext = () => {
    if (answerLocked) {
      onNext();
      if (isLastQuestion) {
        setTimeout(() => navigate('/results'), 200);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      onPrevious();
    }
  };

  const handleFinishQuiz = () => {
    // Complete the quiz with current progress
    onFinish(); // This will trigger completeQuiz in App.js
    setTimeout(() => navigate('/results'), 200);
  };

  if (!currentQuestion) {
    return <div className="quiz-loading">Loading quiz...</div>;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-content">
        <div className="quiz-header">
          <ProgressBar 
            current={currentQuestionIndex + 1} 
            total={questions.length} 
          />
          <Timer 
            timeRemaining={timeRemaining}
            isActive={timerActive && !answerLocked}
          />
        </div>
        <Question
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          answerLocked={answerLocked}
          showCorrectAnswer={answerLocked}
        />

        <div className="quiz-actions">
          <div className="navigation-buttons">
            <button
              className="nav-btn prev-btn"
              onClick={handlePrevious}
              disabled={isFirstQuestion}
            >
              Previous
            </button>

            {!answerLocked && selectedAnswer !== null && (
              <button
                className="submit-btn"
                onClick={handleAnswerSubmit}
              >
                Submit Answer
              </button>
            )}

            {!answerLocked && (
              <button
                className="skip-btn"
                onClick={handleSkip}
              >
                Skip Question
              </button>
            )}

            {answerLocked && !isLastQuestion && (
              <button
                className="nav-btn next-btn"
                onClick={handleNext}
              >
                Next Question
              </button>
            )}

            {answerLocked && isLastQuestion && (
              <button
                className="nav-btn next-btn"
                onClick={handleNext}
              >
                Complete Quiz
              </button>
            )}
          </div>

          <div className="finish-section">
            <button
              className="finish-btn"
              onClick={handleFinishQuiz}
            >
              Finish Quiz & View Results
            </button>
            <p className="finish-note">
              You can finish the quiz at any time to see your current progress
            </p>
          </div>
        </div>

        <div className="quiz-footer">
          <p className="question-counter">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <p className="difficulty-indicator">
            Difficulty: <span className={`difficulty ${currentQuestion.difficulty}`}>
              {currentQuestion.difficulty}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
