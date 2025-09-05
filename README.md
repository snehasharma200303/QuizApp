# React Quiz App

A modern, responsive quiz application built with React that features both local and API-based questions, scoring system, and beautiful UI with glass morphism design.

## 🚀 Features

### Core Features
- **Interactive Quiz Interface** - Clean, one-question-at-a-time display
- **Dual Data Sources** - Local JSON questions + Open Trivia DB API integration
- **Score Tracking** - Real-time scoring with detailed results
- **Results Dashboard** - Comprehensive answer review and performance metrics
- **Restart Functionality** - Easy quiz reset and replay

### Advanced Features
- **30-Second Timer** - Auto-locks answers when time expires
- **Progress Tracking** - Visual progress bar and question counter
- **Difficulty Levels** - Easy, Medium, Hard question sets
- **High Score System** - Persistent leaderboard via localStorage
- **Skip Functionality** - Optional question skipping
- **Finish Early** - Complete quiz at any time to view results

### UI/UX Excellence
- **Glass Morphism Design** - Modern translucent interface
- **Custom Background** - Beautiful image background support
- **Responsive Layout** - Works perfectly on desktop and mobile
- **Smooth Animations** - Fade-in effects and button feedback
- **Accessibility** - ARIA labels, keyboard navigation, focus states

## 🛠️ Technical Stack

- **React 18** - Functional components with hooks
- **React Router** - Client-side routing (`/`, `/quiz`, `/results`)
- **CSS3** - Custom styling with glass morphism effects
- **Open Trivia DB API** - External question source
- **localStorage** - Persistent high scores

## 📱 Responsive Design

- Desktop-first design that scales down beautifully
- Mobile-optimized touch interactions
- Flexible layouts for all screen sizes

## 🎮 How to Use

1. **Home Page** - Choose question source (Local/API) and difficulty
2. **Quiz Page** - Answer questions with timer, use navigation buttons
3. **Results Page** - View detailed performance and high scores
4. **Keyboard Shortcuts** - Use 1-4 for options, Enter to submit, S to skip

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/QuizApp.git
cd QuizApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
QuizApp/
├── public/
│   ├── index.html
│   └── background.jpg
├── src/
│   ├── components/
│   │   ├── Home.js & Home.css
│   │   ├── Quiz.js & Quiz.css
│   │   ├── Question.js & Question.css
│   │   ├── Results.js & Results.css
│   │   ├── ProgressBar.js & ProgressBar.css
│   │   └── Timer.js & Timer.css
│   ├── data/
│   │   └── questions.json
│   ├── services/
│   │   └── triviaApi.js
│   ├── App.js & App.css
│   └── index.js
├── package.json
└── README.md
```

## 🎯 Assignment Requirements Fulfilled

### ✅ UI/UX Requirements
- Clean, responsive layout for desktop and mobile
- Single question display with four options
- Prominent navigation buttons (Next, Previous, Skip, Submit, Finish)
- Clear score and progress display
- Modern Inter font family

### ✅ Core Features
- 10 multiple-choice questions from API or local JSON
- Single question rendering with 4 options
- Required answer selection before progression
- Complete score tracking system
- Detailed results page with answer review
- Restart quiz functionality

### ✅ Technical Requirements
- React functional components with hooks (useState, useEffect)
- Effective props usage for data passing
- Custom CSS styling with advanced effects
- Proper state flow management
- React Router implementation

### ✅ Bonus Features (All Implemented)
- 30-second timer per question
- Progress indicator (bar + counter)
- Difficulty levels (easy/medium/hard)
- Persistent high scores via localStorage
- Subtle animations and transitions
- Full accessibility support

## 🌐 API Integration

The app integrates with [Open Trivia Database](https://opentdb.com/) for dynamic question loading:
- Multiple categories available
- Difficulty level selection
- Proper error handling and fallbacks
- Data normalization for consistent UI

## 🎨 Design Features

- **Glass Morphism UI** - Translucent components with backdrop blur
- **Custom Background** - Support for custom background images
- **Smooth Animations** - CSS transitions and fade effects
- **Modern Typography** - Inter font for excellent readability
- **Color-Coded Feedback** - Visual indicators for correct/incorrect answers

## 🔧 Error Handling

- Network failure fallbacks
- Empty data validation
- Loading states and error messages
- Rapid click prevention
- Page refresh protection

## 📊 Performance

- Optimized React components
- Efficient state management
- Minimal re-renders
- Fast loading times
- Smooth animations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Open Trivia Database for providing free quiz questions
- React team for the amazing framework
- Modern CSS techniques for glass morphism effects

---

**Built with ❤️ using React**
