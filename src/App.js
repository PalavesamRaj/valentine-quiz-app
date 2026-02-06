import { useState } from "react";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "What's your ideal Valentine's Day date?",
      options: [
        "Romantic dinner at a fancy restaurant",
        "Cozy movie night at home",
        "Adventure outdoors",
        "Concert or live event",
      ],
    },
    {
      question: "Your favorite Valentine's gift would be?",
      options: [
        "Flowers and chocolates",
        "Handwritten love letter",
        "Jewelry or perfume",
        "Experience together (trip, activity)",
      ],
    },
    {
      question: "What color represents love to you?",
      options: [
        "Classic Red ❤️",
        "Soft Pink 💗",
        "Deep Purple 💜",
        "Passionate Magenta 💕",
      ],
    },
    {
      question: "Your love language is:",
      options: [
        "Words of Affirmation",
        "Quality Time",
        "Physical Touch",
        "Acts of Service",
      ],
    },
  ];

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const getResult = () => {
    return "You're a Romantic Dreamer! 💕 You believe in grand gestures and heartfelt moments.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-rose-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-5xl font-bold text-center text-pink-600 mb-8 drop-shadow-lg">
          💝 Valentine's Day💝
        </h1>

        {!showResult ? (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 transform transition-all duration-500 hover:scale-[1.02]">
            <div className="text-center text-pink-600 font-semibold mb-6">
              Question {currentQuestion + 1} of {questions.length}
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-rose-600 mb-8 text-center">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-medium py-4 px-6 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-rose-600 text-center mb-6">
              Your Valentine's Personality!
            </h2>

            <div className="bg-pink-50 rounded-2xl p-6 mb-8">
              <p className="text-xl md:text-2xl text-pink-600 font-semibold text-center">
                {getResult()}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-rose-600 mb-4">
                Your Answers:
              </h3>
              <div className="space-y-3">
                {answers.map((answer, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <span className="font-bold text-pink-600">
                      Q{index + 1}:
                    </span>
                    <span className="ml-2 text-gray-700">{answer}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={resetQuiz}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Take Quiz Again 🔄
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
