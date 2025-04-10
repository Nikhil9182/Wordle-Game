import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Board from "./assets/components/Board";

function App() {
  const [correctWord, setCorrectWord] = useState("");
  const [validWords, setValidWords] = useState(new Set());

  const [darkMode, setDarkMode] = useState(() => {
    // Check if dark mode preference is stored
    const savedMode = localStorage.getItem("darkMode");
    // Return true if explicitly set to "true", or if user prefers dark mode
    return (
      savedMode === "true" ||
      (savedMode === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  const [keyboardOnly, setKeyboardOnly] = useState(() => {
    // Check if keyboard only preference is stored
    const savedPreference = localStorage.getItem("keyboardOnly");
    return savedPreference === "true" || false;
  });

  // Generate random title styles for WORDLE
  const [letterStyles, setLetterStyles] = useState([]);

  useEffect(() => {
    // Generate random letter tile styles on initial load
    const styles = [
      "letter-tile-empty",
      "letter-tile-correct",
      "letter-tile-present",
      "letter-tile-absent",
    ];
    const randomStyles = Array(6)
      .fill()
      .map(() => {
        const randomIndex = Math.floor(Math.random() * styles.length);
        return styles[randomIndex];
      });
    setLetterStyles(randomStyles);
  }, []);

  useEffect(() => {
    // Add or remove the dark-mode class on the document body
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    // Save preference to localStorage
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    // Save keyboard only preference to localStorage
    localStorage.setItem("keyboardOnly", keyboardOnly);
  }, [keyboardOnly]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleKeyboardOnly = () => {
    setKeyboardOnly((prevMode) => !prevMode);
  };

  const checkIfValidWord = (currentGuess) => {
    return currentGuess.length === 5;
  };

  const checkIfLost = (guessIndex) => {
    return guessIndex === 5;
  };

  const fetchNewWord = async () => {
    try {
      const response = await fetch("words.txt");
      if (!response.ok) {
        throw new Error("Failed to load words.");
      }
      const text = await response.text();
      processWordList(text);
    } catch (error) {
      console.error("Error loading words:", error);
    }
  };

  const processWordList = (text) => {
    const words = text
      .trim()
      .split("\n")
      .map((word) => word.trim().toUpperCase());

    if (words.length > 0) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setValidWords(new Set(words));
      setCorrectWord(randomWord);
    }
  };

  useEffect(() => {
    fetchNewWord();
  }, []);

  const letters = ["W", "O", "R", "D", "L", "E"];

  return (
    <Router>
      <div className="app-container">
        <header className="game-header">
          <div className="logo-tiles">
            {letters.map((letter, index) => (
              <div
                key={index}
                className={`letter-tile ${
                  letterStyles[index] || "letter-tile-empty"
                }`}
              >
                {letter}
              </div>
            ))}
          </div>
        </header>
        <Board
          correctWord={correctWord}
          checkValidWord={checkIfValidWord}
          checkIfLost={checkIfLost}
          fetchNewWord={fetchNewWord}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          keyboardOnly={keyboardOnly}
          toggleKeyboardOnly={toggleKeyboardOnly}
        />
      </div>
    </Router>
  );
}

export default App;
