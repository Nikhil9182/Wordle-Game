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
      "rounded shadow-sm font-bold flex items-center justify-center select-none transition-colors duration-150 touch-manipulation";

    // Status-based styles
    switch (status) {
      case "correct":
        return `${baseStyle} bg-green-500 text-white border border-green-600`;
      case "present":
        return `${baseStyle} bg-yellow-500 text-white border border-yellow-600`;
      case "absent":
        return `${baseStyle} bg-gray-500 text-white border border-gray-600`;
      default:
        return `${baseStyle} bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300`;
    }
  };

  // Get class for key size - make keys adaptive to screen size
  const getKeySize = (key) => {
    if (key === "ENTER") {
      return "h-9 sm:h-10 text-xs px-1 flex-1 min-w-[30px] max-w-[55px]";
    } else if (key === "⌫") {
      return "h-9 sm:h-10 text-lg px-1 flex-1 min-w-[30px] max-w-[55px]";
    } else {
      return "w-[7vw] h-9 sm:h-10 max-w-[38px]";
    }
  };

  const handleKeyClick = (key) => {
    // Convert ⌫ to BACKSPACE for the handler
    const mappedKey = key === "⌫" ? "BACKSPACE" : key;
    onKeyPress(mappedKey);
  };

  return (
    <div className="w-full max-w-[500px] mx-auto px-1 sm:px-2">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center gap-[3px] md:gap-[4px] mb-[3px] md:mb-[4px]"
        >
          {rowIndex === 1 && (
            <div className="w-[2px] sm:w-[4px] md:w-[8px]"></div>
          )}
          {row.map((key) => (
            <button
              key={key}
              className={`${getKeyStyle(key)} ${getKeySize(key)}`}
              onClick={() => handleKeyClick(key)}
            >
              {key}
            </button>
          ))}
          {rowIndex === 1 && (
            <div className="w-[2px] sm:w-[4px] md:w-[8px]"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
