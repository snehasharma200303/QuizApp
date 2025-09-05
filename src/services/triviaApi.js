// Open Trivia DB API service
const TRIVIA_API_BASE_URL = 'https://opentdb.com/api.php';

// Add category mapping for better question variety
const CATEGORIES = {
  general: 9,
  science: 17,
  computers: 18,
  mathematics: 19,
  sports: 21,
  geography: 22,
  history: 23,
  politics: 24,
  art: 25,
  celebrities: 26,
  animals: 27
};

export const fetchTriviaQuestions = async (amount = 10, difficulty = 'mixed', category = 'general') => {
  try {
    let url = `${TRIVIA_API_BASE_URL}?amount=${amount}&type=multiple`;
    
    // Add category if specified
    if (category && CATEGORIES[category]) {
      url += `&category=${CATEGORIES[category]}`;
    }
    
    if (difficulty !== 'mixed') {
      url += `&difficulty=${difficulty}`;
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.response_code !== 0) {
      throw new Error('Failed to fetch questions from Trivia API');
    }

    // Normalize API data to match our local JSON format
    const normalizedQuestions = data.results.map((apiQuestion, index) => {
      const correctAnswerText = decodeHtml(apiQuestion.correct_answer);
      const incorrectAnswers = apiQuestion.incorrect_answers.map(decodeHtml);
      const allOptions = shuffleArray([...incorrectAnswers, correctAnswerText]);
      
      return {
        id: index + 1,
        question: decodeHtml(apiQuestion.question),
        options: allOptions,
        correctAnswer: allOptions.findIndex(option => option === correctAnswerText),
        difficulty: apiQuestion.difficulty
      };
    });

    return normalizedQuestions;
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    throw error;
  }
};

// Utility function to decode HTML entities
const decodeHtml = (html) => {
  if (!html) return '';
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

// Utility function to shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
