// Scripts/nightMode.js

// --- Constants ---
const body = document.body;
const modeToggleIcon = document.getElementById("mode-toggle-icon");
const MODE_KEY = "mode";
const DARK_MODE_CLASS = "dark-mode";

// ----------------------------------------------------------------------
// Main Functions
// ----------------------------------------------------------------------

/**
 * Applies the styles for a given mode by adding/removing a class on the body.
 * This function MUST be accessible globally to be called by app.js.
 * @param {string} mode - The mode to apply, either "light" or "dark"
 */
/**
 * Applies the styles for a given mode by adding/removing a class on the body.
 * This function is used externally by every HTML page upon load.
 */
function applyStyles(mode) {
    const body = document.body;
    const modeToggleIcon = document.getElementById("mode-toggle-icon");
    const DARK_MODE_CLASS = "dark-mode";

    if (mode === "dark") {
        body.classList.add(DARK_MODE_CLASS);
        if (modeToggleIcon) {
            modeToggleIcon.textContent = "☀️"; // Sun for light mode switch
        }
    } else {
        body.classList.remove(DARK_MODE_CLASS);
        if (modeToggleIcon) {
            modeToggleIcon.textContent = "🌙"; // Moon for dark mode switch
        }
    }
}
// 💡 CRITICAL: Expose the function to the global window object.
window.applyStyles = applyStyles; 
// MAKE THE FUNCTION GLOBAL SO app.js CAN CALL IT LATER
window.applyStyles = applyStyles; 


/**
 * Toggles the mode, saves the choice, and applies styles
 */
function toggleMode() {
    const isDarkMode = body.classList.contains(DARK_MODE_CLASS);
    const newMode = isDarkMode ? "light" : "dark";

    applyStyles(newMode);
    localStorage.setItem(MODE_KEY, newMode);
}

// ----------------------------------------------------------------------
// Initial Load
// ----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    if (modeToggleIcon) {
        // 1. Set the initial mode when the page loads
        const savedMode = localStorage.getItem(MODE_KEY);
        let initialMode = "light"; 

        if (savedMode) {
            initialMode = savedMode;
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            initialMode = "dark";
        }

        applyStyles(initialMode);

        // 2. Add the click event listener to the toggle button
        modeToggleIcon.addEventListener("click", toggleMode);
    } else {
        console.error("Mode toggle icon element not found.");
    }
});