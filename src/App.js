import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Home from './components/Home';
import questionsData from './data/questions.json';
import { fetchTriviaQuestions } from './services/triviaApi';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highScores, setHighScores] = useState([]);
  const [dataSource, setDataSource] = useState('local'); // 'local' or 'api'
  const [difficulty, setDifficulty] = useState('mixed');

  useEffect(() => {
    loadQuestions();
    
    // Load high scores from localStorage
    const savedHighScores = localStorage.getItem('quizHighScores');
    if (savedHighScores) {
      setHighScores(JSON.parse(savedHighScores));
    }
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (dataSource === 'api') {
        const apiQuestions = await fetchTriviaQuestions(10, difficulty);
        setQuestions(apiQuestions);
      } else {
        if (questionsData && questionsData.length > 0) {
          setQuestions(questionsData);
        } else {
          setError('No questions available. Please try again later.');
        }
      }
      setLoading(false);
    } catch (err) {
      console.error('Error loading questions:', err);
      setError(dataSource === 'api' 
        ? 'Failed to load questions from API. Please check your internet connection or try local questions.' 
        : 'Failed to load quiz questions. Please refresh the page.'
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (timerActive && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0 && timerActive) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeRemaining, timerActive, currentQuestionIndex, userAnswers]);

  const startQuiz = async (selectedDataSource = 'local', selectedDifficulty = 'mixed') => {
    setDataSource(selectedDataSource);
    setDifficulty(selectedDifficulty);
    
    if (selectedDataSource !== dataSource || selectedDifficulty !== difficulty) {
      await loadQuestionsWithSettings(selectedDataSource, selectedDifficulty);
    }
    
    setQuizStarted(true);
    setTimerActive(true);
    setTimeRemaining(30);
  };

  const loadQuestionsWithSettings = async (source, diff) => {
    setLoading(true);
    setError(null);
    
    try {
      if (source === 'api') {
        const apiQuestions = await fetchTriviaQuestions(10, diff);
        setQuestions(apiQuestions);
      } else {
        if (questionsData && questionsData.length > 0) {
          setQuestions(questionsData);
        } else {
          setError('No questions available. Please try again later.');
        }
      }
      setLoading(false);
    } catch (err) {
      console.error('Error loading questions:', err);
      setError(source === 'api' 
        ? 'Failed to load questions from API. Please check your internet connection or try local questions.' 
        : 'Failed to load quiz questions. Please refresh the page.'
      );
      setLoading(false);
    }
  };

  const handleAnswer = (selectedAnswer, isSkipped = false) => {
    if (questions[currentQuestionIndex]) {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      
      const answerData = {
        questionId: currentQuestion.id,
        selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: isSkipped ? false : isCorrect,
        question: currentQuestion.question,
        options: currentQuestion.options,
        skipped: isSkipped
      };

      setUserAnswers(prev => [...prev, answerData]);
      
      if (isCorrect && !isSkipped) {
        setScore(prev => prev + 1);
      }

      setTimerActive(false);
    }
  };

  const handleSkip = () => {
    handleAnswer(null, true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeRemaining(30);
      setTimerActive(true);
    } else {
      completeQuiz();
    }
  };

  const finishQuizEarly = () => {
    completeQuiz();
  };

  const completeQuiz = () => {
    setQuizCompleted(true);
    setTimerActive(false);
    
    // Save high score - use answered questions for percentage calculation
    const answeredQuestions = userAnswers.length;
    const percentage = answeredQuestions > 0 ? Math.round((score / answeredQuestions) * 100) : 0;
    const newScore = {
      score,
      totalQuestions: questions.length,
      answeredQuestions,
      percentage,
      date: new Date().toLocaleDateString(),
      timestamp: Date.now()
    };
    
    const updatedHighScores = [...highScores, newScore]
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 10);
    
    setHighScores(updatedHighScores);
    localStorage.setItem('quizHighScores', JSON.stringify(updatedHighScores));
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimeRemaining(30);
      setTimerActive(true);
    }
  };

  const handleTimeUp = () => {
    if (questions[currentQuestionIndex]) {
      const currentQuestion = questions[currentQuestionIndex];
      const answerData = {
        questionId: currentQuestion.id,
        selectedAnswer: null,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: false,
        question: currentQuestion.question,
        options: currentQuestion.options,
        timeUp: true
      };

      setUserAnswers(prev => [...prev, answerData]);
      setTimerActive(false);
    }
  };


  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setQuizCompleted(false);
    setQuizStarted(false);
    setTimeRemaining(30);
    setTimerActive(false);
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button 
            className="retry-btn" 
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                onStartQuiz={startQuiz}
                quizStarted={quizStarted}
                questionsCount={questions.length}
                loading={loading}
              />
            } 
          />
          <Route 
            path="/quiz" 
            element={
              quizStarted && !quizCompleted && questions.length > 0 ? (
                <Quiz
                  questions={questions}
                  currentQuestionIndex={currentQuestionIndex}
                  onAnswer={handleAnswer}
                  onNext={nextQuestion}
                  onPrevious={previousQuestion}
                  onSkip={handleSkip}
                  onFinish={finishQuizEarly}
                  userAnswers={userAnswers}
                  timeRemaining={timeRemaining}
                  timerActive={timerActive}
                />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/results" 
            element={
              quizCompleted && questions.length > 0 && userAnswers.length > 0 ? (
                <Results
                  score={score}
                  totalQuestions={questions.length}
                  userAnswers={userAnswers}
                  onRestart={restartQuiz}
                  highScores={highScores}
                />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
