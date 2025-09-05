import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Results.css';

const Results = ({ score, totalQuestions, userAnswers, onRestart, highScores }) => {
  const navigate = useNavigate();
  const answeredQuestions = userAnswers.length;
  const percentage = Math.round((score / answeredQuestions) * 100);
  const completionPercentage = Math.round((answeredQuestions / totalQuestions) * 100);

  const handleRestart = () => {
    onRestart();
    navigate('/');
  };

  const getScoreMessage = () => {
    if (percentage >= 90) return { message: "Excellent! You're a React expert!", emoji: "🏆" };
    if (percentage >= 80) return { message: "Great job! You have strong React knowledge!", emoji: "🎉" };
    if (percentage >= 70) return { message: "Good work! Keep practicing!", emoji: "👍" };
    if (percentage >= 60) return { message: "Not bad! Room for improvement!", emoji: "📚" };
    return { message: "Keep studying! You'll get better!", emoji: "💪" };
  };

  const scoreMessage = getScoreMessage();

  return (
    <div className="results-container">
      <div className="results-content">
        <div className="score-summary">
          <h1 className="results-title">Quiz Complete!</h1>
          <div className="score-circle">
            <div className="score-text">
              <span className="score-number">{score}</span>
              <span className="score-total">/{answeredQuestions}</span>
            </div>
            <div className="percentage">{percentage}%</div>
          </div>
          {answeredQuestions < totalQuestions && (
            <div className="completion-info">
              <p>Quiz completed early: {answeredQuestions} of {totalQuestions} questions answered ({completionPercentage}% complete)</p>
            </div>
          )}
          <div className="score-message">
            <span className="score-emoji">{scoreMessage.emoji}</span>
            <p>{scoreMessage.message}</p>
          </div>
        </div>

        <div className="detailed-results">
          <h2>Detailed Results</h2>
          <div className="results-list">
            {userAnswers.map((answer, index) => (
              <div key={answer.questionId} className={`result-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="result-header">
                  <span className="question-number">Q{index + 1}</span>
                  <span className={`result-status ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                    {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                </div>
                
                <div className="result-question">
                  <p>{answer.question}</p>
                </div>
                
                <div className="result-answers">
                  <div className="answer-row">
                    <span className="answer-label">Your answer:</span>
                    <span className={`answer-text ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                      {answer.skipped 
                        ? 'Skipped'
                        : answer.selectedAnswer !== null 
                        ? `${String.fromCharCode(65 + answer.selectedAnswer)}. ${answer.options[answer.selectedAnswer]}`
                        : 'No answer (Time up)'
                      }
                    </span>
                  </div>
                  
                  {!answer.isCorrect && (
                    <div className="answer-row">
                      <span className="answer-label">Correct answer:</span>
                      <span className="answer-text correct">
                        {String.fromCharCode(65 + answer.correctAnswer)}. {answer.options[answer.correctAnswer]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="results-actions">
          <button className="restart-btn" onClick={handleRestart}>
            Take Quiz Again
          </button>
          <button className="home-btn" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>

        <div className="performance-stats">
          <div className="stat">
            <span className="stat-value">{score}</span>
            <span className="stat-label">Correct</span>
          </div>
          <div className="stat">
            <span className="stat-value">{totalQuestions - score}</span>
            <span className="stat-label">Incorrect</span>
          </div>
          <div className="stat">
            <span className="stat-value">{percentage}%</span>
            <span className="stat-label">Accuracy</span>
          </div>
        </div>

        {highScores && highScores.length > 0 && (
          <div className="high-scores-section">
            <h3>High Scores</h3>
            <div className="high-scores-list">
              {highScores.slice(0, 5).map((highScore, index) => (
                <div key={highScore.timestamp} className={`high-score-item ${index === 0 ? 'best-score' : ''}`}>
                  <span className="score-rank">#{index + 1}</span>
                  <span className="score-details">
                    {highScore.score}/{highScore.totalQuestions} ({highScore.percentage}%)
                  </span>
                  <span className="score-date">{highScore.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
