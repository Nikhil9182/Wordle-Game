import React from "react";

const Keyboard = ({ onKeyPress, usedLetters }) => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
  ];

  // Get letter status: correct, present, or absent
  const getKeyStatus = (key) => {
    if (!usedLetters || !usedLetters[key]) return "unused";
    return usedLetters[key]; // 'correct', 'present', or 'absent'
  };

  // Style for each key based on its status
  const getKeyStyle = (key) => {
    const status = getKeyStatus(key);

    // Base styles for all keys
    let baseStyle =
      "rounded shadow-md font-bold flex items-center justify-center select-none transition-colors duration-150 touch-manipulation";

    // Status-based styles and colors using CSS variables
    switch (status) {
      case "correct":
        return {
          className: baseStyle,
          style: {
            backgroundColor: "var(--correct-bg)",
            color: "white",
            border: `1px solid var(--correct-border)`,
          },
        };
      case "present":
        return {
          className: baseStyle,
          style: {
            backgroundColor: "var(--present-bg)",
            color: "white",
            border: `1px solid var(--present-border)`,
          },
        };
      case "absent":
        return {
          className: baseStyle,
          style: {
            backgroundColor: "var(--absent-bg)",
            color: "white",
            border: `1px solid var(--absent-border)`,
          },
        };
      default:
        return {
          className: baseStyle,
          style: {
            backgroundColor: "var(--keyboard-bg)",
            color: "var(--keyboard-text)",
            border: `1px solid var(--tile-border-empty)`,
          },
        };
    }
  };

  // Get class for key size - make keys adaptive to screen size
  const getKeySize = (key) => {
    if (key === "ENTER") {
      return "h-14 sm:h-14 text-sm px-1 flex-1 min-w-[60px] max-w-[80px]";
    } else if (key === "⌫") {
      return "h-14 sm:h-14 text-xl px-1 flex-1 min-w-[60px] max-w-[80px]";
    } else {
      return "w-[9vw] h-14 sm:h-14 max-w-[65px]";
    }
  };

  const handleKeyClick = (key) => {
    // Convert ⌫ to BACKSPACE for the handler
    const mappedKey = key === "⌫" ? "BACKSPACE" : key;
    onKeyPress(mappedKey);
  };

  return (
    <div className="w-full max-w-[800px] mx-auto px-1 sm:px-2">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center gap-[4px] md:gap-[6px] mb-[6px] md:mb-[8px]"
        >
          {rowIndex === 1 && (
            <div className="w-[4px] sm:w-[6px] md:w-[10px]"></div>
          )}
          {row.map((key) => {
            const keyStyle = getKeyStyle(key);
            return (
              <button
                key={key}
                className={`${keyStyle.className} ${getKeySize(key)}`}
                style={keyStyle.style}
                onClick={() => handleKeyClick(key)}
              >
                {key}
              </button>
            );
          })}
          {rowIndex === 1 && (
            <div className="w-[4px] sm:w-[6px] md:w-[10px]"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
