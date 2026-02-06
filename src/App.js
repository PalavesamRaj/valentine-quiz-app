import { useState } from "react";

function App() {
  const [showGreeting, setShowGreeting] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showReaction, setShowReaction] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);

  const questions = [
    {
      type: "multiple",
      question: "What is our best memories with us?",
      options: [
        "Candle Night Dinner",
        "Music Concept Night Bus Travel",
        "Nov 02",
        "Wayanad Travel",
      ],
      correctAnswer: "Music Concept Night Bus Travel",
      wrongReaction: "❌ Oops! Try to remember our special moment! 💭",
      reaction: "HOW YOU REMEMBER! 💕",
    },
    {
      type: "multiple",
      question: "Tell me where do you want to travel next?",
      options: ["Ooty", "Kodikanal", "Wonderla-(Kerala)", "North Side"],
      reaction: "Hamayya! Noted. 📝✈️",
    },
    {
      type: "multiple",
      question: "When did you first kiss for me?",
      options: ["Sep 12", "Nov 02", "Aug 16", "I Don't remember 😅"],
      correctAnswer: "Sep 12",
      wrongReaction: "❌ How could you forget our first kiss? 😢",
      reaction: "❤️ That moment changed everything!",
    },
    {
      type: "yesno",
      question: "Will you be my Valentine?",
      options: ["Yes ❤️", "No"],
      wrongReaction:
        "❌ Invalid choice.\nSystem has detected you are already my Valentine. 💕",
      reaction:
        "🎉 Yay! You're My Valentine! 🎊\n\nThank you for making my day special! ❤️",
    },
    {
      type: "photo",
      question: "Where did we click this photo?",
      options: ["candle light dinner", "home", "Our First Pic", "Bus Travel"],
      correctAnswer: "candle light dinner",
      wrongReaction: "❌ Look at the photo again! 💭",
      reaction: "📸 Perfect memory! 💕",
      defaultPhoto: "/Screenshot 2026-02-02 121324.png",
    },
  ];

  const handleAnswer = (answer) => {
    setSelectedOption(answer);

    const currentQ = questions[currentQuestion];

    // Special handling for Yes/No question (Question 4)
    if (currentQ.type === "yesno") {
      if (answer === "No") {
        setShowReaction(currentQ.wrongReaction);
        setTimeout(() => {
          setShowReaction(null);
          setSelectedOption(null);
        }, 2500);
        return;
      } else if (answer === "Yes ❤️") {
        setShowReaction(currentQ.reaction);
      }
    } else {
      // Check if answer is correct for questions with correctAnswer
      if (currentQ.correctAnswer) {
        if (answer !== currentQ.correctAnswer) {
          // Wrong answer - show wrong reaction and don't proceed
          setShowReaction(currentQ.wrongReaction);
          setTimeout(() => {
            setShowReaction(null);
            setSelectedOption(null);
          }, 2500);
          return;
        }
      }
      // Correct answer or no validation needed
      setShowReaction(currentQ.reaction);
    }

    // Wait for reaction, then move to next
    setTimeout(() => {
      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);
      setShowReaction(null);
      setSelectedOption(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setShowGreeting(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setShowReaction(null);
    setSelectedOption(null);
    setUploadedPhoto(null);
  };

  const startQuiz = () => {
    setShowGreeting(false);
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-400 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 30 + 20}px`,
            }}
          >
            {["💕", "💗", "💖", "💝", "❤️", "🌹"][Math.floor(Math.random() * 6)]}
          </div>
        ))}
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Greeting Screen */}
        {showGreeting ? (
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center">
            <div className="mb-6 animate-bounce">
              <div className="text-9xl mb-4">💝</div>
              <div className="text-6xl">🌹</div>
            </div>
            
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-purple-600 mb-6 animate-pulse">
              Happy Valentine's Day!
            </h1>
            
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 mb-8">
              <p className="text-2xl text-gray-800 mb-4 font-semibold">
                My Dearest Love 💕
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                On this special day, I want to celebrate our beautiful journey together.
                Every moment with you is a treasure, every memory a precious gem.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                I've prepared a special quiz just for you, filled with our memories
                and dreams. Let's relive our beautiful moments together! ✨
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center justify-center gap-2 text-pink-600">
                <span className="text-2xl">💖</span>
                <span className="text-lg font-semibold">With All My Love</span>
                <span className="text-2xl">💖</span>
              </div>
            </div>

            <button
              onClick={startQuiz}
              className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 hover:from-pink-600 hover:via-red-600 hover:to-purple-600 text-white font-bold py-5 px-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 text-xl"
            >
              Start Our Love Quiz 💕
            </button>
          </div>
        ) : !showResult ? (
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
            {/* Score bar */}
            <div className="bg-gradient-to-r from-pink-200 to-purple-200 p-4 text-center">
              <div className="text-purple-800 font-bold text-lg">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>

            {/* Question card */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center leading-tight">
                {currentQ.question}
              </h2>

              {/* Photo display for photo questions */}
              {currentQ.type === "photo" && (
                <div className="mb-6">
                  {/* Photo display */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-64 h-64 bg-gradient-to-br from-pink-300 to-purple-300 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                        <img
                          src={currentQ.defaultPhoto}
                          alt="Our Memory"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Heart overlay */}
                      <div className="absolute top-2 right-2">
                        <div className="text-4xl animate-pulse">❤️</div>
                      </div>
                      {/* Decorative hearts */}
                      <div className="absolute -bottom-2 -left-2 text-3xl animate-bounce">
                        💕
                      </div>
                      <div className="absolute -top-2 -left-2 text-2xl animate-pulse">
                        ✨
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, index) => {
                  const isSelected = selectedOption === option;
                  const isYesNoQuestion = currentQ.type === "yesno";
                  const isYes = option === "Yes ❤️";
                  const isNo = option === "No";

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      disabled={showReaction !== null}
                      className={`
                        w-full py-4 px-6 rounded-2xl font-semibold text-lg
                        transition-all duration-300 transform
                        ${
                          isYesNoQuestion && isYes
                            ? "bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600 shadow-lg shadow-green-200"
                            : ""
                        }
                        ${
                          isYesNoQuestion && isNo
                            ? "bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600 shadow-lg shadow-red-200"
                            : ""
                        }
                        ${
                          !isYesNoQuestion
                            ? "bg-gradient-to-r from-pink-100 to-purple-100 text-gray-800 hover:from-pink-200 hover:to-purple-200 border-2 border-pink-200"
                            : ""
                        }
                        ${
                          isSelected ? "scale-95 opacity-50" : "hover:scale-105"
                        }
                        disabled:cursor-not-allowed
                      `}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Reaction overlay */}
              {showReaction && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
                  <div className="bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 p-8 rounded-3xl shadow-2xl max-w-md mx-4 animate-bounce-in">
                    <div className="text-center">
                      <div className="text-5xl mb-4">
                        {showReaction.includes("❌") || showReaction.includes("Invalid") ? "❌" : "✨"}
                      </div>
                      <p className="text-2xl font-bold text-gray-800 whitespace-pre-line">
                        {showReaction}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4 animate-bounce">💝</div>
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
                🎉 Quiz Complete! 🎉
              </h2>
              <p className="text-xl text-gray-700">
                You completed all {questions.length} questions!
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold text-purple-800 mb-4 text-center">
                Thank you for being my Valentine! 💕
              </h3>
              <p className="text-center text-gray-700 text-lg mb-3">
                Every moment with you is special ❤️
              </p>
              <p className="text-center text-gray-600 italic">
                "You are my today and all of my tomorrows" 🌹
              </p>
            </div>

            <button
              onClick={resetQuiz}
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 hover:from-pink-600 hover:via-purple-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 text-lg"
            >
              Play Again 🔄
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  );
}

export default App;