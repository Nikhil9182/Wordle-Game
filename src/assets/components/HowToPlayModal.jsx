import React from "react";

const HowToPlayModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="instructions-modal" style={{ zIndex: 400 }}>
      <div className="instructions-content" style={{ maxWidth: "450px" }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">How to Play Wordle</h2>
          <button
            onClick={onClose}
            className="hover:text-gray-700 text-xl transition-colors"
            style={{ color: "var(--text-color)" }}
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
                <div className="letter-tile letter-tile-correct w-9 h-9 flex items-center justify-center rounded font-bold">
                  W
                </div>
                <div className="letter-tile letter-tile-empty w-9 h-9 flex items-center justify-center rounded font-bold">
                  E
                </div>
                <div className="letter-tile letter-tile-empty w-9 h-9 flex items-center justify-center rounded font-bold">
                  A
                </div>
                <div className="letter-tile letter-tile-empty w-9 h-9 flex items-center justify-center rounded font-bold">
                  R
                </div>
                <div className="letter-tile letter-tile-empty w-9 h-9 flex items-center justify-center rounded font-bold">
                  Y
                </div>
              </div>
              <p className="text-sm">
                <strong>W</strong> is in the word and in the correct spot.
              </p>
            </div>

            <div className="mb-3">
              <div className="flex gap-1 mb-1">
                <div className="letter-tile letter-tile-empty w-9 h-9 flex items-center justify-center rounded font-bold">
                  P
                </div>
                <div className="letter-tile letter-tile-present w-9 h-9 flex items-center justify-center rounded font-bold">
                  I
                </div>
                <div className="letter-tile letter-tile-empty w-9 h-9 flex items-center justify-center rounded font-bold">
                  L
                </div>
                <div className="letter-tile letter-tile-empty w-9 h-9 flex items-center justify-center rounded font-bold">
                  O
                </div>
                <div className="letter-tile letter-tile-empty w-9 h-9 flex items-center justify-center rounded font-bold">
                  T
                </div>
              </div>
              <p className="text-sm">
                <strong>I</strong> is in the word but in the wrong spot.
              </p>
            </div>

            <div className="mb-3">
              <div className="flex gap-1 mb-1">
                <div className="letter-tile letter-tile-empty w-9 h-9 flex items-center justify-center rounded font-bold">
                  V
                </div>
                <div className="letter-tile letter-tile-empty w-9 h-9 flex items-center justify-center rounded font-bold">
                  A
                </div>
                <div className="letter-tile letter-tile-empty w-9 h-9 flex items-center justify-center rounded font-bold">
                  G
                </div>
                <div className="letter-tile letter-tile-absent w-9 h-9 flex items-center justify-center rounded font-bold">
                  U
                </div>
                <div className="letter-tile letter-tile-empty w-9 h-9 flex items-center justify-center rounded font-bold">
                  E
                </div>
              </div>
              <p className="text-sm">
                <strong>U</strong> is not in the word.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded text-white font-medium"
              style={{ backgroundColor: "var(--blue-button)" }}
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlayModal;
