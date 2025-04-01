import React from "react";

const SettingsModal = ({
  isOpen,
  onClose,
  isDarkMode,
  toggleDarkMode,
  keyboardOnly,
  toggleKeyboardOnly,
}) => {
  if (!isOpen) return null;

  return (
    <div className="instructions-modal" style={{ zIndex: 300 }}>
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
                {isDarkMode ? (
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
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                  </svg>
                )}
                <span className="font-medium text-lg">
                  {isDarkMode ? "Dark Mode" : "Light Mode"}
                </span>
              </div>
              <button
                onClick={toggleDarkMode}
                className="settings-toggle relative inline-flex h-8 w-16 items-center rounded-md transition-colors focus:outline-none ml-4"
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
              Change the appearance of the game
            </p>
          </div>

          {/* Keyboard Input Only Setting */}
          <div className="setting-row pb-2 border-b border-gray-200 dark:border-gray-700">
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
                    d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v9.75c0 .83.67 1.5 1.5 1.5h13.5c.83 0 1.5-.67 1.5-1.5V5.25c0-.83-.67-1.5-1.5-1.5H5.25c-.83 0-1.5.67-1.5 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium text-lg">
                  On-Screen Keyboard Only
                </span>
              </div>
              <button
                onClick={toggleKeyboardOnly}
                className="settings-toggle relative inline-flex h-8 w-16 items-center rounded-md transition-colors focus:outline-none ml-4"
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
              Use only the on-screen keyboard (disables physical keyboard)
            </p>
          </div>

          {/* Hard Mode Setting */}
          <div className="setting-row">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
                </svg>
                <span className="font-medium text-lg">Hard Mode</span>
              </div>
              <button
                className="settings-toggle relative inline-flex h-8 w-16 items-center rounded-md transition-colors focus:outline-none ml-4"
                style={{
                  backgroundColor: "var(--toggle-off-bg)",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                  border: "2px solid var(--tile-border-empty)",
                }}
              >
                <span
                  className="inline-block h-6 w-6 transform rounded-md transition-transform translate-x-1"
                  style={{
                    backgroundColor: "var(--toggle-handle-color)",
                    boxShadow: "0 1px 2px var(--toggle-handle-shadow)",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                ></span>
              </button>
            </div>
            <p className="text-sm opacity-70">
              Must use revealed hints in subsequent guesses (coming soon)
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
