// Data used for search lookup
const CROP_NAMES = [
  "Tomatoes",
  "Olives",
  "Citrus Fruits",
  "Potatoes",
  "Wheat",
  "Barley",
  "Grapes",
  "Stone Fruits",
  "Peppers",
  "Cucumbers",
  "Avocados",
  "Quinoa",
  "Saffron",
  "Teff",
  "Rare Date Palms",
];

const PLANT_NAMES = [
  "Rosemary",
  "Wild Thyme (Za'atar)",
  "Desert Sage",
  "Black Iris (National Flower)",
  "Jordan Almond",
  "Medicinal Chamomile",
  "Rock Rose",
  "White Broom",
  "Juniperus phoenicea",
  "Quercus coccifera",
  "Origanum syriacum",
];

// Combine all search targets with their respective pages
const SEARCH_TARGETS = [
  ...CROP_NAMES.map((name) => ({
    name: name,
    page: "Crops.html",
    category: "crop",
  })),
  ...PLANT_NAMES.map((name) => ({
    name: name,
    page: "Plants.html",
    category: "plant",
  })),
];

// Levenshtein Distance Algorithm for Fuzzy Search
function getLevenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // Substitution
          matrix[i][j - 1] + 1, // Insertion
          matrix[i - 1][j] + 1 // Deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// Get top suggestions based on fuzzy matching
function getTopSuggestions(query, limit = 5) {
  const normalizedQuery = query.toLowerCase();
  const suggestions = SEARCH_TARGETS.map((target) => ({
    ...target,
    distance: getLevenshteinDistance(
      normalizedQuery,
      target.name.toLowerCase()
    ),
  }));

  return suggestions.sort((a, b) => a.distance - b.distance).slice(0, limit);
}

// Show search modal with results or suggestions
function showSearchModal(
  title,
  message,
  suggestions = [],
  onSuggestionClick = null
) {
  const modal = document.getElementById("search-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");
  const suggestionsList = document.getElementById("suggestions-list");
  const actionBtn = document.getElementById("modal-action-btn");

  modalTitle.textContent = title;
  modalMessage.textContent = message;

  // Clear previous suggestions
  suggestionsList.innerHTML = "";

  if (suggestions.length > 0) {
    suggestionsList.style.display = "block";
    suggestions.forEach((suggestion) => {
      const li = document.createElement("li");
      li.textContent = `${suggestion.name} (${suggestion.category})`;
      li.onclick = () => {
        if (onSuggestionClick) {
          onSuggestionClick(suggestion);
        }
        closeSearchModal();
      };
      suggestionsList.appendChild(li);
    });
    actionBtn.textContent = "Try Again";
  } else {
    suggestionsList.style.display = "none";
    actionBtn.textContent = "OK";
  }

  modal.style.display = "block";
}

// Close search modal
function closeSearchModal() {
  document.getElementById("search-modal").style.display = "none";
}

// Handle search functionality
function handleSearch(query) {
  if (!query) {
    showSearchModal(
      "Search Required",
      "Please enter a crop or plant name to search.",
      []
    );
    return;
  }

  const normalizedQuery = query.toLowerCase();
  const FUZZY_THRESHOLD = 3;

  // First, try exact match
  const exactMatch = SEARCH_TARGETS.find(
    (target) => target.name.toLowerCase() === normalizedQuery
  );

  if (exactMatch) {
    const redirectUrl = `${exactMatch.page}#search=${encodeURIComponent(
      exactMatch.name
    )}`;
    window.location.href = redirectUrl;
    return;
  }

  // Then try partial match
  const partialMatch = SEARCH_TARGETS.find(
    (target) =>
      target.name.toLowerCase().includes(normalizedQuery) ||
      normalizedQuery.includes(target.name.toLowerCase())
  );

  if (partialMatch) {
    const redirectUrl = `${partialMatch.page}#search=${encodeURIComponent(
      partialMatch.name
    )}`;
    window.location.href = redirectUrl;
    return;
  }

  // Finally, try fuzzy matching
  const topSuggestions = getTopSuggestions(query, 5);
  const bestMatch = topSuggestions[0];

  if (bestMatch.distance <= FUZZY_THRESHOLD) {
    showSearchModal(
      "Did you mean?",
      `We found a close match for "${query}". Did you mean one of these?`,
      topSuggestions.slice(0, 3),
      (suggestion) => {
        const redirectUrl = `${suggestion.page}#search=${encodeURIComponent(
          suggestion.name
        )}`;
        window.location.href = redirectUrl;
      }
    );
  } else {
    // No close matches found
    const randomSuggestions = SEARCH_TARGETS.sort(
      () => Math.random() - 0.5
    ).slice(0, 5);

    showSearchModal(
      "No Results Found",
      `Sorry, we couldn't find "${query}" in our database. Here are some popular items you might be interested in:`,
      randomSuggestions,
      (suggestion) => {
        const redirectUrl = `${suggestion.page}#search=${encodeURIComponent(
          suggestion.name
        )}`;
        window.location.href = redirectUrl;
      }
    );
  }
}

// Progress bar functionality
function updateProgressBar() {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  document.getElementById("scroll-progress-bar").style.width = scrolled + "%";
  document.getElementById("progress-text").textContent =
    Math.round(scrolled) + "%";
}

// Dark mode functionality
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  document.getElementById("mode-toggle-icon").textContent = isDark
    ? "☀️"
    : "🌙";

  // Save preference
  localStorage.setItem("darkMode", isDark);
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Search form
  const searchForm = document.getElementById("site-search-form");
  const searchInput = document.getElementById("site-search-input");

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchInput.value.trim();
      handleSearch(query);
    });
  }

  // Progress bar
  window.addEventListener("scroll", updateProgressBar);

  // Dark mode toggle
  const modeToggle = document.getElementById("mode-toggle-icon");
  if (modeToggle) {
    modeToggle.addEventListener("click", toggleDarkMode);
  }

  // Load dark mode preference
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    document.getElementById("mode-toggle-icon").textContent = "☀️";
  }

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("search-modal");
    if (event.target === modal) {
      closeSearchModal();
    }
  });
});
