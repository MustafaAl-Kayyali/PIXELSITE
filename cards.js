// 1. Define the complete JSON data structure
const CROP_DATA = {
    availableCrops: [{
        name: "Tomatoes",
        icon: "🍅",
        category: "Vegetables",
        season: "Year-round",
        production: "High",
        exportStatus: "Major Export",
        description: "Jordan's most successful crop, grown in greenhouses and open fields",
        yield: "45-65 tons/ha",
        regions: ["Jordan Valley", "Highlands", "Desert Areas"],
    }, {
        name: "Olives",
        icon: "🫒",
        category: "Fruits",
        season: "Sep-Nov",
        production: "High",
        exportStatus: "Traditional Export",
        description: "Historic crop with over 18 million olive trees across Jordan",
        yield: "8-12 tons/ha",
        regions: ["Northern Jordan", "Central Highlands", "Ajloun"],
    }, {
        name: "Citrus Fruits",
        icon: "🍊",
        category: "Fruits",
        season: "Nov-Mar",
        production: "Medium",
        exportStatus: "Export",
        description: "Oranges, lemons, and grapefruits grown mainly in Jordan Valley",
        yield: "25-35 tons/ha",
        regions: ["Jordan Valley", "Ghor Region"],
    }, {
        name: "Cucumbers",
        icon: "🥒",
        category: "Vegetables",
        season: "Oct-May",
        production: "High",
        exportStatus: "Major Export",
        description: "High-value crop grown extensively in protected environments",
        yield: "80-120 tons/ha",
        regions: ["Jordan Valley", "Desert Agriculture"],
    }, {
        name: "Wheat",
        icon: "🌾",
        category: "Cereals",
        season: "Nov-Jun",
        production: "Medium",
        exportStatus: "Import Needed",
        description: "Rain-fed wheat production in northern and central regions",
        yield: "1.5-3 tons/ha",
        regions: ["Mafraq", "Irbid", "Karak"],
    }, {
        name: "Barley",
        icon: "🌾",
        category: "Cereals",
        season: "Nov-Jun",
        production: "Medium",
        exportStatus: "Local Use",
        description: "Drought-resistant crop used primarily for animal feed",
        yield: "1-2.5 tons/ha",
        regions: ["Eastern Desert", "Mafraq", "Karak"],
    }, ],
    rareCrops: [{
        name: "Saffron",
        icon: "🌺",
        category: "Spices",
        rarity: "Extremely Rare",
        challenge: "Climate adaptation",
        description: "Experimental cultivation in highland areas with promising results",
        potential: "High-value niche market",
        regions: ["Ajloun Highlands", "Tafila"],
    }, {
        name: "Quinoa",
        icon: "🌱",
        category: "Grains",
        rarity: "Rare",
        challenge: "Market development",
        description: "Drought-resistant superfood being tested in arid regions",
        potential: "Health food market",
        regions: ["Eastern Desert", "Azraq"],
    }, {
        name: "Dragon Fruit",
        icon: "🐲",
        category: "Exotic Fruits",
        rarity: "Very Rare",
        challenge: "Climate control",
        description: "Greenhouse cultivation trials showing promising results",
        potential: "Premium export market",
        regions: ["Jordan Valley (Controlled Environment)"],
    }, {
        name: "Truffles",
        icon: "🍄",
        category: "Fungi",
        rarity: "Extremely Rare",
        challenge: "Natural occurrence",
        description: "Wild desert truffles found seasonally after rainfall",
        potential: "Luxury culinary market",
        regions: ["Eastern Desert", "Badia Region"],
    }, ],
    cropStatistics: {
        cropVarieties: "150+",
        foodSelfSufficiency: "85%",
        exportCrops: "12",
        agriculturalGDP: "₹2.1B",
    },
};

// Helper function to handle highlighting and scrolling after a search
const handleScrollAndHighlight = () => {
    // Scroll the highlighted card into the center of the viewport
    const cardElement = document.querySelector(`.card-item.highlight-search`);
    if (cardElement) {
        setTimeout(() => {
            cardElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            // Remove highlight and clean hash from URL after a few seconds
            setTimeout(() => {
                cardElement.classList.remove('highlight-search');
                // Use history.replaceState to clean the hash without reloading the page
                history.replaceState(null, null, window.location.pathname + window.location.search);
            }, 5000);
        }, 300);
    }
};


const renderCrops = (container, data, isRare = false) => {
    // 1. Get search term from URL
    const hash = window.location.hash.substring(1);
    const searchParams = new URLSearchParams(hash);
    const searchTerm = searchParams.get('search')?.toLowerCase();

    // 2. Define match function
    const matchesSearch = (cropName) => {
        if (!searchTerm) return false;
        // Check if the card name includes the search term, or the search term includes the card name
        const nameLower = cropName.toLowerCase();
        return nameLower.includes(searchTerm) || searchTerm.includes(nameLower);
    };

    const html = data
        .map((crop) => {
            // 3. Check for match and determine the card class
            const isMatch = matchesSearch(crop.name);
            const cardClass = isMatch ? 'card-item highlight-search' : 'card-item';

            if (isRare) {
                // Rare Crop HTML (UPDATED: Added ${cardClass} to the main div)
                return `
                        <div class="${cardClass}">
                            <h3>${crop.icon} ${crop.name}</h3>
                            <p class="description">${crop.description}</p>
                            <ul>
                                <li><b>Category:</b> ${crop.category}</li>
                                <li><b>Rarity:</b> ${crop.rarity}</li>
                                <li><b>Main Challenge:</b> ${
                                    crop.challenge
                                }</li>
                                <li><b>Market Potential:</b> ${
                                    crop.potential
                                }</li>
                                <li><b>Regions:</b> ${crop.regions.join(
                                    ", "
                                )}</li>
                            </ul>
                        </div>`;
            } else {
                // Available Crop HTML (UPDATED: Added ${cardClass} to the main div)
                return `
                        <div class="${cardClass}">
                            <h3>${crop.icon} ${crop.name}</h3>
                            <p class="description">${crop.description}</p>
                            <ul>
                                <li><b>Category:</b> ${crop.category}</li>
                                <li><b>Season:</b> ${crop.season}</li>
                                <li><b>Production:</b> ${crop.production} (${
                                    crop.yield
                                })</li>
                                <li><b>Export Status:</b> ${
                                    crop.exportStatus
                                }</li>
                                <li><b>Regions:</b> ${crop.regions.join(
                                    ", "
                                )}</li>
                            </ul>
                        </div>`;
            }
        })
        .join("");
    container.innerHTML = html;
};


document.addEventListener("DOMContentLoaded", () => {
    // Extract the data arrays
    const availableCrops = CROP_DATA.availableCrops;
    const rareCrops = CROP_DATA.rareCrops;

    // Get the DOM elements
    const availableCropsContainer = document.getElementById(
        "available-crops-container"
    );
    const rareCropsContainer = document.getElementById("rare-crops-container");
    const availableCropsBtn = document.getElementById("available-crops");
    const rareCropsBtn = document.getElementById("rare-crops");

    if (
        !availableCropsContainer ||
        !rareCropsContainer ||
        !availableCropsBtn ||
        !rareCropsBtn
    ) {
        console.error("One or more required elements are missing from the DOM.");
        return;
    }

    // Logic to auto-switch tabs, render, and highlight if a search is active
    const autoSwitchAndScroll = () => {
        // 1. Render data first to make the cards available in the DOM for searching
        renderCrops(availableCropsContainer, availableCrops, false);
        renderCrops(rareCropsContainer, rareCrops, true);

        const hash = window.location.hash.substring(1);
        const searchParams = new URLSearchParams(hash);
        const searchTerm = searchParams.get('search')?.toLowerCase();

        // If no search term, simply ensure the default tab is active and stop
        if (!searchTerm) {
            availableCropsContainer.style.display = "grid";
            rareCropsContainer.style.display = "none";
            availableCropsBtn.classList.add("active");
            rareCropsBtn.classList.remove("active");
            return;
        }

        // 2. Check which list contains the search term
        const isRare = rareCrops.some(crop => {
            const nameLower = crop.name.toLowerCase();
            return nameLower.includes(searchTerm) || searchTerm.includes(nameLower);
        });

        // 3. Switch tabs if necessary
        if (isRare) {
            availableCropsContainer.style.display = "none";
            rareCropsContainer.style.display = "grid";
            availableCropsBtn.classList.remove("active");
            rareCropsBtn.classList.add("active");
        } else {
            availableCropsContainer.style.display = "grid";
            rareCropsContainer.style.display = "none";
            availableCropsBtn.classList.add("active");
            rareCropsBtn.classList.remove("active");
        }

        // 4. Perform scroll and remove hash
        handleScrollAndHighlight();
    };

    // Run on page load
    autoSwitchAndScroll();

    // Re-attach event listeners for manual tab switching
    availableCropsBtn.addEventListener("click", () => {
        availableCropsContainer.style.display = "grid";
        rareCropsContainer.style.display = "none";
        availableCropsBtn.classList.add("active");
        rareCropsBtn.classList.remove("active");
    });

    rareCropsBtn.addEventListener("click", () => {
        availableCropsContainer.style.display = "none";
        rareCropsContainer.style.display = "grid";
        rareCropsBtn.classList.add("active");
        availableCropsBtn.classList.remove("active");
    });
});