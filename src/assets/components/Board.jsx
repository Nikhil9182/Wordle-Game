import React, { useState, useEffect } from "react";
import Keyboard from "./Keyboard";
import HowToPlayModal from "./HowToPlayModal";
import Settings from "./Settings";

const Board = ({
  correctWord,
  checkValidWord,
  checkIfLost,
  fetchNewWord,
  darkMode,
  toggleDarkMode,
  keyboardOnly,
  toggleKeyboardOnly,
  hardMode,
  toggleHardMode,
}) => {
  // States
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [gameState, setGameState] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(Array(5).fill("")));
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessIndex, setGuessIndex] = useState(0);
  const [usedLetters, setUsedLetters] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showKeyboardOnlyMessage, setShowKeyboardOnlyMessage] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(null);
  const [requiredLetters, setRequiredLetters] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [gameWonInHardMode, setGameWonInHardMode] = useState(false);

  // Briefly show keyboard-only message when toggled on
  useEffect(() => {
    if (keyboardOnly) {
      setShowKeyboardOnlyMessage(true);
      const timer = setTimeout(() => {
        setShowKeyboardOnlyMessage(false);
      }, 3000); // Show message for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [keyboardOnly]);

  const getLetterStyle = (word, letter, index) => {
    if (!correctWord || word[0] === "") return "letter-tile letter-tile-empty";
    if (correctWord[index] === letter) return "letter-tile letter-tile-correct";
    if (correctWord.includes(letter)) return "letter-tile letter-tile-present";
    return "letter-tile letter-tile-absent";
  };

  const updateLetterStatuses = (guess) => {
    const newUsedLetters = { ...usedLetters };
    const newRequiredLetters = [...requiredLetters];

    // First mark correct letters
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      if (correctWord[i] === letter) {
        newUsedLetters[letter] = "correct";

        // For hard mode, add correctly positioned letters to requirements
        if (
          hardMode &&
          !newRequiredLetters.some(
            (item) => item.letter === letter && item.index === i
          )
        ) {
          newRequiredLetters.push({ letter, index: i, status: "correct" });
        }
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

        // For hard mode, add present letters to requirements
        if (
          hardMode &&
          !newRequiredLetters.some(
            (item) => item.letter === letter && item.status === "present"
          )
        ) {
          newRequiredLetters.push({ letter, index: -1, status: "present" });
        }
      } else if (!newUsedLetters[letter]) {
        newUsedLetters[letter] = "absent";
      }
    }

    setUsedLetters(newUsedLetters);
    if (hardMode) {
      setRequiredLetters(newRequiredLetters);
    }
  };

  const handleKeyDown = (event) => {
    // Skip if keyboard only mode is enabled
    if (keyboardOnly) return;

    if (hasWon || hasLost) return;
    if (guessIndex >= 6) return;

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
    if (guessIndex >= 6) return;

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

  const isValidHardModeGuess = (guess) => {
    if (!hardMode || requiredLetters.length === 0) return true;

    const guessArray = guess.split("");

    // Check if all required letters are present in the guess
    for (const required of requiredLetters) {
      if (required.status === "correct") {
        // If it's a correctly positioned letter, it must be in the same position
        if (guessArray[required.index] !== required.letter) {
          setGameState(
            `Must use ${required.letter} in position ${required.index + 1}`
          );
          return false;
        }
      } else if (required.status === "present") {
        // If it's a present letter, it must be included somewhere in the guess
        if (!guessArray.includes(required.letter)) {
          setGameState(`Guess must include ${required.letter}`);
          return false;
        }
      }
    }

    return true;
  };

  const submitGuess = () => {
    // First check if it's a valid word
    if (!checkValidWord(currentGuess)) {
      setGameState("❌ Must be 5 letters!");
      return;
    }

    // Check if it's already been entered
    if (!checkIfAlreadyEntered(currentGuess)) {
      setGameState("Word already used!");
      return;
    }

    // Process valid guess
    const newGuesses = [...guesses];
    newGuesses[guessIndex] = currentGuess.split("");
    setGuesses(newGuesses);

    // Update letter statuses for keyboard
    updateLetterStatuses(currentGuess);

    setGuessIndex(guessIndex + 1);
    setCurrentGuess("");

    // Check if won
    if (currentGuess === correctWord) {
      setGameState("Amazing!");
      setHasWon(true);
      setShowConfetti(true);
      return;
    }

    if (checkIfLost(guessIndex)) {
      setHasLost(true);
      setGameState(`You Lost 💀 The word was: ${correctWord}`);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, guessIndex, hasWon, hasLost, correctWord, keyboardOnly]);

  return (
    <div className="game-container">
      {/* Controls section */}
      <div className="controls-section">
        <div className="relative">
          <button
            onClick={() => setShowHowToPlay(true)}
            className="settings-button"
            aria-label="How to Play"
            onMouseEnter={() => setTooltipVisible("howToPlay")}
            onMouseLeave={() => setTooltipVisible(null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            {tooltipVisible === "howToPlay" && (
              <div className="tooltip">How to Play</div>
            )}
          </button>
        </div>
        <div className="relative">
          <Settings
            isDarkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            keyboardOnly={keyboardOnly}
            toggleKeyboardOnly={toggleKeyboardOnly}
            gameActive={guessIndex > 0 && !hasWon && !hasLost}
            onMouseEnter={() => setTooltipVisible("settings")}
            onMouseLeave={() => setTooltipVisible(null)}
            tooltipVisible={tooltipVisible === "settings"}
            showSettings={showSettings}
            setShowSettings={setShowSettings}
          />
        </div>
      </div>

      {/* How to Play Modal */}
      <HowToPlayModal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
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

      {hasWon && !showSettings && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-30 overflow-hidden">
          <div
            className="p-4 sm:p-6 rounded-lg shadow-lg text-center pointer-events-auto max-w-xs sm:max-w-sm mx-auto"
            style={{
              backgroundColor: "var(--modal-bg)",
              color: "var(--text-color)",
            }}
          >
            <h2
              className="text-xl sm:text-2xl font-bold mb-3"
              style={{ color: "var(--correct-bg)" }}
            >
              Congratulations!
            </h2>
            <p className="text-base sm:text-lg mb-2">You guessed the word:</p>
            <div className="flex justify-center gap-1 sm:gap-2 mb-4">
              {correctWord.split("").map((letter, index) => (
                <div
                  key={index}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center text-base sm:text-lg font-bold uppercase animate-bounce"
                  style={{
                    backgroundColor: "var(--correct-bg)",
                    color: "white",
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <p className="text-sm sm:text-base mb-2">
              You got it in {guessIndex} {guessIndex === 1 ? "try" : "tries"}!
            </p>
          </div>
        </div>
      )}

      <div className="game-status">
        {gameState && (
          <div className="text-lg sm:text-xl font-bold text-center w-full">
            {gameState.toUpperCase()}
          </div>
        )}
        {hardMode && !gameState && !hasWon && !hasLost && (
          <div
            className="text-sm font-medium text-center w-full"
            style={{ color: "var(--present-bg)" }}
          >
            HARD MODE ACTIVE
          </div>
        )}
      </div>

      <div className="game-board-wrapper">
        <div className="game-board">
          {guesses.map((word, i) => (
            <div key={i} className="flex gap-1 sm:gap-1.5">
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
                      className={`w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-md
                    flex items-center justify-center text-base sm:text-base md:text-lg font-bold uppercase tile-flip
                    ${
                      i < guessIndex
                        ? getLetterStyle(word, letter, j)
                        : "letter-tile letter-tile-empty"
                    }`}
                      style={{
                        animationDelay: i < guessIndex ? `${j * 0.15}s` : "0s",
                      }}
                    >
                      {letter}
                    </div>
                  );
                })}
            </div>
          ))}
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
