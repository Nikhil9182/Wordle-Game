import React from "react";

const SettingsModal = ({
  isOpen,
  onClose,
  isDarkMode,
  toggleDarkMode,
  keyboardOnly,
  toggleKeyboardOnly,
  gameActive,
}) => {
  if (!isOpen) return null;

  return (
    <div className="instructions-modal" style={{ zIndex: 400 }}>
      <div className="instructions-content" style={{ maxWidth: "450px" }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Game Settings</h2>
          <button
            onClick={onClose}
            className="hover:text-gray-700 text-xl transition-colors"
            style={{ color: "var(--text-color)" }}
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Dark Mode Setting */}
          <div className="setting-row">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium text-lg">Dark Mode</span>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`settings-toggle relative inline-flex h-8 w-16 items-center rounded-md transition-colors focus:outline-none ml-4`}
                style={{
                  backgroundColor: isDarkMode
                    ? "var(--correct-bg)"
                    : "var(--toggle-off-bg)",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                  border: "2px solid",
                  borderColor: isDarkMode
                    ? "var(--correct-border)"
                    : "var(--tile-border-empty)",
                }}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-md transition-transform ${
                    isDarkMode ? "translate-x-9" : "translate-x-1"
                  }`}
                  style={{
                    backgroundColor: "var(--toggle-handle-color)",
                    boxShadow: "0 1px 2px var(--toggle-handle-shadow)",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                ></span>
              </button>
            </div>
            <p className="text-sm opacity-70">
              Toggle between light and dark theme
            </p>
          </div>

          {/* Keyboard Only Setting */}
          <div className="setting-row">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 9a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9A.75.75 0 016 9zM6.75 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h9a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-9zM6 23.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zM5.625 9.75a2.625 2.625 0 116.75 0 2.625 2.625 0 01-6.75 0zM7.5 15.75a.75.75 0 00-1.5 0v2.25c0 .414.336.75.75.75h.75a.75.75 0 000-1.5H7.5v-1.5zm3.75-1.5a.75.75 0 01.75.75v1.5h.75a.75.75 0 010 1.5h-.75v2.25a.75.75 0 01-1.5 0v-6a.75.75 0 01.75-.75zm3 0a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0V18h-.75a.75.75 0 010-1.5h.75v-1.5a.75.75 0 01.75-.75zm4.5 3v2.25c0 .414.336.75.75.75H18a.75.75 0 000-1.5h-.75V18a.75.75 0 00-1.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium text-lg">Keyboard Only</span>
              </div>
              <button
                onClick={toggleKeyboardOnly}
                className={`settings-toggle relative inline-flex h-8 w-16 items-center rounded-md transition-colors focus:outline-none ml-4`}
                style={{
                  backgroundColor: keyboardOnly
                    ? "var(--correct-bg)"
                    : "var(--toggle-off-bg)",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                  border: "2px solid",
                  borderColor: keyboardOnly
                    ? "var(--correct-border)"
                    : "var(--tile-border-empty)",
                }}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-md transition-transform ${
                    keyboardOnly ? "translate-x-9" : "translate-x-1"
                  }`}
                  style={{
                    backgroundColor: "var(--toggle-handle-color)",
                    boxShadow: "0 1px 2px var(--toggle-handle-shadow)",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                ></span>
              </button>
            </div>
            <p className="text-sm opacity-70">
              Disable on-screen keyboard for keyboard-only input
            </p>
          </div>

          <div className="mt-6 text-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded text-white font-medium text-lg"
              style={{
                backgroundColor: "var(--blue-button)",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
