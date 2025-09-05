import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ onStartQuiz, quizStarted, questionsCount, loading }) => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState('local');
  const [difficulty, setDifficulty] = useState('mixed');

  const handleStartQuiz = async () => {
    await onStartQuiz(dataSource, difficulty);
    navigate('/quiz');
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">React Quiz Challenge</h1>
        <p className="home-description">
          Test your React knowledge with our comprehensive quiz featuring {questionsCount || 10} carefully crafted questions.
          Each question has a 30-second timer, and you'll see your detailed results at the end.
        </p>
        
        <div className="quiz-features">
          <div className="feature">
            <span className="feature-icon">📝</span>
            <span>{questionsCount || 10} Multiple Choice Questions</span>
          </div>
          <div className="feature">
            <span className="feature-icon">⏱️</span>
            <span>30 Seconds Per Question</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📊</span>
            <span>Detailed Results & Analysis</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🎯</span>
            <span>Difficulty Levels: Easy to Hard</span>
          </div>
        </div>

        <div className="quiz-settings">
          <div className="setting-group">
            <label htmlFor="dataSource">Question Source:</label>
            <select 
              id="dataSource"
              value={dataSource} 
              onChange={(e) => setDataSource(e.target.value)}
              disabled={quizStarted || loading}
            >
              <option value="local">Local Questions (React)</option>
              <option value="api">Online Questions (Mixed Topics)</option>
            </select>
          </div>

          {dataSource === 'api' && (
            <div className="setting-group">
              <label htmlFor="difficulty">Difficulty:</label>
              <select 
                id="difficulty"
                value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value)}
                disabled={quizStarted || loading}
              >
                <option value="mixed">Mixed</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          )}
        </div>

        <button 
          className="start-quiz-btn"
          onClick={handleStartQuiz}
          disabled={quizStarted || loading}
        >
          {loading ? 'Loading Questions...' : quizStarted ? 'Quiz in Progress...' : 'Start Quiz'}
        </button>

        <div className="quiz-info">
          <p>
            <strong>Instructions:</strong><br/>
            • Read each question carefully<br/>
            • Select one answer before time runs out<br/>
            • Use navigation buttons to move between questions<br/>
            • Submit when you're ready to see results<br/>
            <br/>
            <strong>Keyboard Shortcuts:</strong><br/>
            • Press 1-4 to select options<br/>
            • Press Enter to submit answer<br/>
            • Press S to skip question
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
