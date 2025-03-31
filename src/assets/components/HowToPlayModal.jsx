import React from "react";

const HowToPlayModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="instructions-modal">
      <div className="instructions-content">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">How to Play Wordle</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <p>Guess the 5-letter word in 6 tries.</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Each guess must be a valid 5-letter word.</li>
            <li>
              The color of the tiles will change to show how close your guess
              was.
            </li>
          </ul>

          <div className="mt-4">
            <p className="font-semibold mb-2">Examples:</p>

            <div className="mb-3">
              <div className="flex gap-1 mb-1">
                <div className="w-10 h-10 flex items-center justify-center bg-green-500 text-white font-bold rounded">
                  W
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold rounded">
                  O
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold rounded">
                  R
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold rounded">
                  D
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold rounded">
                  S
                </div>
              </div>
              <p className="text-sm">
                The letter <span className="font-bold">W</span> is in the word
                and in the correct spot.
              </p>
            </div>

            <div className="mb-3">
              <div className="flex gap-1 mb-1">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold rounded">
                  P
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-yellow-500 text-white font-bold rounded">
                  I
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold rounded">
                  L
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold rounded">
                  O
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold rounded">
                  T
                </div>
              </div>
              <p className="text-sm">
                The letter <span className="font-bold">I</span> is in the word
                but in the wrong spot.
              </p>
            </div>

            <div className="mb-3">
              <div className="flex gap-1 mb-1">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold rounded">
                  V
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold rounded">
                  A
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold rounded">
                  G
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white font-bold rounded">
                  U
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold rounded">
                  E
                </div>
              </div>
              <p className="text-sm">
                The letter <span className="font-bold">U</span> is not in the
                word.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 w-full"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default HowToPlayModal;
