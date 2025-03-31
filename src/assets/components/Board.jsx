import React, { useState, useEffect } from "react";
import Keyboard from "./Keyboard";

const Board = ({ correctWord, checkValidWord, checkIfLost, fetchNewWord }) => {
  // States
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [gameState, setGameState] = useState("");
  const [guesses, setGuesses] = useState(Array(5).fill(Array(5).fill("")));
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessIndex, setGuessIndex] = useState(0);
  const [usedLetters, setUsedLetters] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);

  const getLetterStyle = (word, letter, index) => {
    if (!correctWord || word[0] === "")
      return "bg-white border-2 border-gray-300";
    if (correctWord[index] === letter)
      return "bg-green-500 text-white border-2 border-green-600";
    if (correctWord.includes(letter))
      return "bg-yellow-500 text-white border-2 border-yellow-600";
    return "bg-gray-400 text-white border-2 border-gray-500";
  };

  const updateLetterStatuses = (guess) => {
    const newUsedLetters = { ...usedLetters };

    // First mark correct letters
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      if (correctWord[i] === letter) {
        newUsedLetters[letter] = "correct";
      }
    }

    // Then check for present letters (but not already marked correct)
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      if (
        correctWord[i] !== letter &&
        correctWord.includes(letter) &&
        newUsedLetters[letter] !== "correct"
      ) {
        newUsedLetters[letter] = "present";
      } else if (!newUsedLetters[letter]) {
        newUsedLetters[letter] = "absent";
      }
    }

    setUsedLetters(newUsedLetters);
  };

  const handleKeyDown = (event) => {
    if (hasWon || hasLost) return;
    if (guessIndex >= 5) return;

    setGameState("");
    let key = event.key.toUpperCase();

    if (key.match(/^[A-Z]$/) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    } else if (key === "BACKSPACE" && currentGuess.length > 0) {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (key === "ENTER" && currentGuess.length === 5) {
      submitGuess();
    }
  };

  const handleKeyboardPress = (key) => {
    if (hasWon || hasLost) return;
    if (guessIndex >= 5) return;

    setGameState("");

    if (key.match(/^[A-Z]$/) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    } else if (key === "BACKSPACE" && currentGuess.length > 0) {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (key === "ENTER" && currentGuess.length === 5) {
      submitGuess();
    }
  };

  const checkIfAlreadyEntered = (currentGuess) => {
    let guess = currentGuess.split("");
    for (let i = 0; i <= guessIndex; i++) {
      if (guesses[i].every((val, index) => val === guess[index])) return false;
    }
    return true;
  };

  const submitGuess = () => {
    if (checkValidWord(currentGuess) && checkIfAlreadyEntered(currentGuess)) {
      const newGuesses = [...guesses];
      newGuesses[guessIndex] = currentGuess.split("");
      setGuesses(newGuesses);

      // Update letter statuses for keyboard
      updateLetterStatuses(currentGuess);

      setGuessIndex(guessIndex + 1);
      setCurrentGuess("");

      if (currentGuess === correctWord) {
        setGameState("You Won 🏆");
        setHasWon(true);
        setShowConfetti(true);

        // Hide confetti after 7 seconds
        setTimeout(() => {
          setShowConfetti(false);
        }, 7000);

        return;
      }

      if (checkIfLost(guessIndex)) {
        setHasLost(true);
        setGameState(`You Lost 💀 The word was: ${correctWord}`);
      }
    } else {
      setGameState("❌ Not Valid!");
    }
  };

  const resetGame = () => {
    setHasWon(false);
    setHasLost(false);
    setGameState("");
    setGuesses(Array(5).fill(Array(5).fill("")));
    setCurrentGuess("");
    setGuessIndex(0);
    setUsedLetters({});
    fetchNewWord();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, guessIndex, hasWon, hasLost, correctWord]);

  return (
    <div className="game-container bg-gray-100">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                borderRadius: Math.random() > 0.5 ? "50%" : "0",
              }}
            ></div>
          ))}
        </div>
      )}

      {hasWon && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40 overflow-hidden">
          <div className="bg-white bg-opacity-70 p-4 sm:p-6 rounded-lg shadow-lg text-center pointer-events-auto max-w-xs sm:max-w-sm mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-3">
              Congratulations!
            </h2>
            <p className="text-base sm:text-lg mb-2">You guessed the word:</p>
            <div className="flex justify-center gap-1 sm:gap-2 mb-4">
              {correctWord.split("").map((letter, index) => (
                <div
                  key={index}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 text-white rounded-md flex items-center justify-center text-base sm:text-lg font-bold uppercase animate-bounce"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <p className="text-sm sm:text-base">
              You got it in {guessIndex} {guessIndex === 1 ? "try" : "tries"}!
            </p>
          </div>
        </div>
      )}

      <div className="game-status">
        {gameState && (
          <div className="text-lg sm:text-xl font-bold text-gray-800 text-center w-full">
            {gameState.toUpperCase()}
          </div>
        )}
      </div>

      <div className="game-board-wrapper">
        <div className="game-board">
          {guesses.map((word, i) => (
            <div key={i} className="flex gap-1 sm:gap-2">
              {Array(5)
                .fill(0)
                .map((_, j) => {
                  const letter =
                    i < guessIndex
                      ? word[j]
                      : i === guessIndex && j < currentGuess.length
                      ? currentGuess[j]
                      : "";
                  return (
                    <div
                      key={j}
                      className={`w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-md
                    flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold uppercase
                    ${
                      i < guessIndex
                        ? getLetterStyle(word, letter, j)
                        : "bg-white border-2 border-gray-300"
                    }`}
                    >
                      {letter}
                    </div>
                  );
                })}
            </div>
          ))}

          {/* Replay Button - Appears when game ends */}
          {(hasWon || hasLost) && (
            <div className="flex justify-center mt-4">
              <button
                onClick={resetGame}
                className="px-5 py-2 bg-blue-500 text-white text-base sm:text-lg font-bold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                🔄 Play Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Virtual Keyboard */}
      <div className="keyboard-container">
        <Keyboard onKeyPress={handleKeyboardPress} usedLetters={usedLetters} />
      </div>
    </div>
  );
};

export default Board;
