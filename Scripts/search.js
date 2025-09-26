// --- Data used for search lookup (Simplified from CROP_DATA and PLANT_DATA) ---
const CROP_NAMES = [
  "Tomatoes", "Olives", "Citrus Fruits", "Potatoes", "Wheat", "Barley",
  "Grapes", "Stone Fruits", "Peppers", "Cucumbers", "Avocados", "Quinoa",
  "Saffron", "Teff", "Rare Date Palms"
];

const PLANT_NAMES = [
  "Rosemary", "Wild Thyme (Za'atar)", "Desert Sage", "Black Iris (National Flower)",
  "Jordan Almond", "Medicinal Chamomile", "Rock Rose", "White Broom",
  "Juniperus phoenicea", "Quercus coccifera", "Origanum syriacum"
];

// Combine all search targets with their respective pages
const SEARCH_TARGETS = [
    ...CROP_NAMES.map(name => ({ name: name, page: "Crops.html" })),
    ...PLANT_NAMES.map(name => ({ name: name, page: "Plants.html" })),
];

// ----------------------------------------------------------------------
// NEW: Levenshtein Distance Algorithm for Fuzzy Search
// Returns the distance (number of edits) between two strings
// ----------------------------------------------------------------------
function getLevenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    // Increment along the first column of each row
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // Increment along the first row
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // Substitution
                    matrix[i][j - 1] + 1,     // Insertion
                    matrix[i - 1][j] + 1      // Deletion
                );
            }
        }
    }

    return matrix[b.length][a.length];
}


document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('site-search-form');
    const searchInput = document.getElementById('site-search-input');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const query = searchInput.value.trim();

            if (!query) {
                alert("Please enter a crop or plant name to search.");
                return;
            }

            const normalizedQuery = query.toLowerCase();
            let bestMatch = null;
            let minDistance = Infinity;
            const FUZZY_THRESHOLD = 3; // Maximum allowed distance for a 'close' match

            // Find the best match using Levenshtein distance
            SEARCH_TARGETS.forEach(target => {
                const distance = getLevenshteinDistance(normalizedQuery, target.name.toLowerCase());
                
                if (distance < minDistance) {
                    minDistance = distance;
                    bestMatch = target;
                }
            });

            // If the best match is within the acceptable threshold, use it
            if (minDistance <= FUZZY_THRESHOLD) {
                const redirectUrl = `${bestMatch.page}#search=${encodeURIComponent(bestMatch.name)}`;
                window.location.href = redirectUrl;
            } else {
                // If no sufficiently close match is found
                alert(`Could not find a close match for "${query}". The closest match was "${bestMatch.name}" (Distance: ${minDistance}). Please check your spelling.`);
            }
        });
    }
});