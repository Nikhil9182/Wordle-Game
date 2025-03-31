import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import Board from "./assets/components/Board";

function App() {
  const [correctWord, setCorrectWord] = useState("");
  const [validWords, setValidWords] = useState(new Set());

  const checkIfValidWord = (currentGuess) => {
    return validWords.has(currentGuess);
  };

  const checkIfLost = (guessIndex) => {
    return guessIndex === 4;
  };

  const fetchNewWord = async () => {
    try {
      const response = await fetch("/words.txt");
      if (!response.ok) throw new Error("Failed to load words.");

      const text = await response.text();
      const words = text
        .trim()
        .split("\n")
        .map((word) => word.trim().toUpperCase());

      if (words.length > 0) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setValidWords(new Set(words));
        setCorrectWord(randomWord);
      }
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  useEffect(() => {
    fetchNewWord();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Board
          correctWord={correctWord}
          checkValidWord={checkIfValidWord}
          checkIfLost={checkIfLost}
          fetchNewWord={fetchNewWord}
        />
      </div>
    </Router>
  );
}

export default App;
