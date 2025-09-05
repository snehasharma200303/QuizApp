import React from 'react';
import './Question.css';

const Question = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  answerLocked, 
  showCorrectAnswer 
}) => {
  const handleOptionClick = (index) => {
    if (!answerLocked) {
      onAnswerSelect(index);
    }
  };

  const getOptionClassName = (index) => {
    let className = 'option';
    
    if (selectedAnswer === index) {
      className += ' selected';
    }
    
    if (answerLocked && showCorrectAnswer) {
      if (index === question.correctAnswer) {
        className += ' correct';
      } else if (selectedAnswer === index && index !== question.correctAnswer) {
        className += ' incorrect';
      }
    }
    
    if (answerLocked) {
      className += ' locked';
    }
    
    return className;
  };

  return (
    <div className="question-container">
      <h2 className="question-text">{question.question}</h2>
      
      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={getOptionClassName(index)}
            onClick={() => handleOptionClick(index)}
            disabled={answerLocked}
            aria-label={`Option ${index + 1}: ${option}`}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="option-text">{option}</span>
            {answerLocked && showCorrectAnswer && index === question.correctAnswer && (
              <span className="correct-indicator">✓</span>
            )}
            {answerLocked && showCorrectAnswer && selectedAnswer === index && index !== question.correctAnswer && (
              <span className="incorrect-indicator">✗</span>
            )}
          </button>
        ))}
      </div>

      {answerLocked && showCorrectAnswer && (
        <div className="answer-feedback">
          {selectedAnswer === question.correctAnswer ? (
            <p className="feedback correct-feedback">
              <span className="feedback-icon">🎉</span>
              Correct! Well done!
            </p>
          ) : (
            <p className="feedback incorrect-feedback">
              <span className="feedback-icon">❌</span>
              {selectedAnswer === null ? 'Time\'s up! ' : 'Incorrect. '}
              The correct answer was: <strong>{question.options[question.correctAnswer]}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
