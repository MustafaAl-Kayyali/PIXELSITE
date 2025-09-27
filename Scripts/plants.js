// 1. Define the main data structure as a single object
const PLANT_DATA = {
    availablePlants: [{
        name: "Rosemary",
        scientificName: "Rosmarinus officinalis",
        type: "Herb",
        category: "Medicinal/Culinary",
        abundance: "Common",
        regions: ["Mediterranean Belt", "Central Highlands", "Northern Jordan"],
        uses: [
            "Culinary seasoning",
            "Medicinal tea",
            "Essential oils",
            "Ornamental",
        ],
        bloomSeason: "Spring-Summer",
        harvestTime: "Year-round",
        conservationStatus: "Stable",
        economicValue: "Medium",
        icon: "🌿",
    }, {
        name: "Wild Thyme (Za'atar)",
        scientificName: "Thymus vulgaris",
        type: "Herb",
        category: "Culinary/Medicinal",
        abundance: "Common",
        regions: ["Central Highlands", "Northern Mountains", "Desert Margins"],
        uses: [
            "Traditional spice blend",
            "Medicinal preparations",
            "Tea",
            "Natural preservative",
        ],
        bloomSeason: "Spring-Early Summer",
        harvestTime: "Spring",
        conservationStatus: "Stable",
        economicValue: "High",
        icon: "🌱",
    }, {
        name: "Desert Sage",
        scientificName: "Artemisia herba-alba",
        type: "Shrub",
        category: "Medicinal",
        abundance: "Common",
        regions: ["Eastern Desert", "Badia Region", "Wadi Areas"],
        uses: [
            "Traditional medicine",
            "Animal feed",
            "Soil conservation",
            "Natural pesticide",
        ],
        bloomSeason: "Autumn",
        harvestTime: "Autumn-Winter",
        conservationStatus: "Stable",
        economicValue: "Low",
        icon: "🌾",
    }, {
        name: "Common Mallow",
        scientificName: "Malva neglecta",
        type: "Herb",
        category: "Edible/Medicinal",
        abundance: "Common",
        regions: ["Urban Areas", "Agricultural Fields", "Wastelands"],
        uses: [
            "Leafy vegetable",
            "Medicinal poultices",
            "Traditional remedies",
            "Wildlife food",
        ],
        bloomSeason: "Spring-Autumn",
        harvestTime: "Spring-Early Summer",
        conservationStatus: "Stable",
        economicValue: "Low",
        icon: "🥬",
    }, {
        name: "Wild Mint",
        scientificName: "Mentha longifolia",
        type: "Herb",
        category: "Culinary/Medicinal",
        abundance: "Moderate",
        regions: ["Water Sources", "Wadis", "Jordan Valley"],
        uses: [
            "Tea preparation",
            "Culinary garnish",
            "Digestive aid",
            "Natural cooling",
        ],
        bloomSeason: "Summer",
        harvestTime: "Summer",
        conservationStatus: "Stable",
        economicValue: "Medium",
        icon: "🌿",
    }, {
        name: "Caper Bush",
        scientificName: "Capparis spinosa",
        type: "Shrub",
        category: "Culinary",
        abundance: "Moderate",
        regions: ["Rocky Areas", "Ancient Walls", "Limestone Cliffs"],
        uses: [
            "Pickled flower buds",
            "Traditional cuisine",
            "Medicinal uses",
            "Ornamental",
        ],
        bloomSeason: "Spring-Summer",
        harvestTime: "Early Summer",
        conservationStatus: "Stable",
        economicValue: "High",
        icon: "🌸",
    }, ],
    rarePlants: [{
        name: "Black Iris",
        scientificName: "Iris nigricans",
        type: "Flower",
        category: "National Symbol",
        rarity: "Protected",
        regions: ["Central Highlands", "Northern Mountains"],
        threats: ["Habitat loss", "Over-collection", "Climate change"],
        conservationEfforts: [
            "Protected areas designation",
            "Cultivation programs",
            "Public awareness",
        ],
        significance: "National flower of Jordan",
        bloomSeason: "Early Spring",
        status: "Vulnerable",
        icon: "🌺",
    }, {
        name: "Jordan River Iris",
        scientificName: "Iris jordana",
        type: "Flower",
        category: "Endemic",
        rarity: "Extremely Rare",
        regions: ["Jordan Valley", "Water Sources"],
        threats: [
            "Water scarcity",
            "Habitat degradation",
            "Agricultural expansion",
        ],
        conservationEfforts: [
            "Seed banking",
            "Habitat restoration",
            "Research programs",
        ],
        significance: "Endemic species to Jordan",
        bloomSeason: "Spring",
        status: "Critically Endangered",
        icon: "🏺",
    }, {
        name: "Desert Rose",
        scientificName: "Adenium obesum",
        type: "Succulent",
        category: "Ornamental",
        rarity: "Rare",
        regions: ["Southern Desert", "Wadi Rum", "Rocky Outcrops"],
        threats: ["Collection pressure", "Tourism impact", "Climate variability"],
        conservationEfforts: [
            "Cultivation in botanical gardens",
            "Sustainable harvesting",
            "Ecotourism",
        ],
        significance: "Desert ecosystem indicator",
        bloomSeason: "Spring-Summer",
        status: "Near Threatened",
        icon: "🌹",
    }, {
        name: "Sinai Broom",
        scientificName: "Retama raetam",
        type: "Shrub",
        category: "Desert Specialist",
        rarity: "Uncommon",
        regions: ["Eastern Desert", "Wadi Systems"],
        threats: ["Overgrazing", "Land degradation", "Drought"],
        conservationEfforts: [
            "Grazing management",
            "Restoration projects",
            "Community involvement",
        ],
        significance: "Soil stabilization and wildlife habitat",
        bloomSeason: "Spring",
        status: "Declining",
        icon: "🌿",
    }, ],
    conservationSummary: {
        plantSpecies: "2,500+",
        endemicSpecies: "120",
        protectedAreas: "15",
        conservationSuccess: "85%",
    },
};

// 2. Extract arrays for easier use
const commonPlants = PLANT_DATA.availablePlants;
const protectedPlants = PLANT_DATA.rarePlants;

/**
 * Helper function to scroll to the highlighted card and remove the highlight/hash.
 */
const handleScrollAndHighlight = () => {
    // Select the card element with the highlighting class
    const cardElement = document.querySelector(`.plant-card.highlight-search`);

    if (cardElement) {
        // Scroll the highlighted card into the center of the viewport
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
        }, 300); // Small delay to ensure rendering is complete
    }
};

/**
 * Renders the plant cards into the specified container.
 * Includes logic to apply highlighting if a search term is found in the URL.
 */
const renderPlants = (container, data, isProtected = false) => {
    // 1. Get search term from URL
    const hash = window.location.hash.substring(1);
    const searchParams = new URLSearchParams(hash);
    const searchTerm = searchParams.get('search')?.toLowerCase();

    // 2. Define match function
    const matchesSearch = (plant) => {
        if (!searchTerm) return false;
        // Check if the card name includes the search term, or the search term includes the card name
        const nameLower = plant.name.toLowerCase();
        return nameLower.includes(searchTerm) || searchTerm.includes(nameLower);
    };

    const html = data
        .map((plant) => {
            // 3. Check for match and determine the card class
            const isMatch = matchesSearch(plant);
            const cardClass = `plant-card ${isMatch ? 'highlight-search' : ''}`;

            if (isProtected) {
                // Rare/Protected Plant Structure (UPDATED: Added ${cardClass} to the main div)
                return `<div class="${cardClass}">
                    <h4 class="card-title">${plant.icon} ${plant.name}</h4>
                    <p class="card-subtitle">${plant.scientificName}</p>
                    <ul class="card-details">
                        <li><b>Status:</b> ${plant.status} (${plant.rarity})</li>
                        <li><b>Significance:</b> ${plant.significance}</li>
                        <li><b>Main Threats:</b> ${plant.threats.join(", ")}</li>
                        <li><b>Conservation Efforts:</b> ${plant.conservationEfforts.join(
                            ", "
                        )}</li>
                    </ul>
                </div>`;
            } else {
                // Common Plant Structure (UPDATED: Added ${cardClass} to the main div)
                return `<div class="${cardClass}">
                    <h4 class="card-title">${plant.icon} ${plant.name}</h4>
                    <p class="card-subtitle">${plant.scientificName}</p>
                    <ul class="card-details">
                        <li><b>Uses:</b> ${plant.uses.join(", ")}</li>
                        <li><b>Found In:</b> ${plant.regions.join(", ")}</li>
                    </ul>
                </div>`;
            }
        })
        .join("");
    container.innerHTML = html;
};

// Setup for Plants section tabs
const plantsCommonBtn = document.getElementById("common-plants-btn");
const plantsRareBtn = document.getElementById("rare-plants-btn");
const plantsCommonContainer = document.getElementById(
    "common-plants-container"
);
const plantsRareContainer = document.getElementById("rare-plants-container");

/**
 * Toggles the visibility and 'active' class for the Common and Rare Plant tabs/containers.
 */
const togglePlants = (showCommon) => {
    // Toggle 'active' class on list items for styling
    plantsCommonBtn.classList.toggle("active", showCommon);
    plantsRareBtn.classList.toggle("active", !showCommon);

    // Toggle container visibility
    plantsCommonContainer.style.display = showCommon ? "grid" : "none";
    plantsRareContainer.style.display = showCommon ? "none" : "grid";
};

/**
 * Initializes the page by rendering data, checking for a search term,
 * switching tabs if necessary, and performing scroll/highlight.
 */
const autoSwitchAndScroll = () => {
    // 1. Render data first to make the cards available in the DOM for searching
    renderPlants(plantsCommonContainer, commonPlants, false);
    renderPlants(plantsRareContainer, protectedPlants, true);

    const hash = window.location.hash.substring(1);
    const searchParams = new URLSearchParams(hash);
    const searchTerm = searchParams.get('search')?.toLowerCase();

    // If no search term, ensure the default (Common Plants) tab is active
    if (!searchTerm) {
        togglePlants(true);
        return;
    }

    // 2. Check which list contains the search term
    const isRare = protectedPlants.some(plant => {
        const nameLower = plant.name.toLowerCase();
        return nameLower.includes(searchTerm) || searchTerm.includes(nameLower);
    });

    // 3. Switch tabs if necessary (togglePlants(false) shows rare, togglePlants(true) shows common)
    togglePlants(!isRare);

    // 4. Perform scroll and remove hash
    handleScrollAndHighlight();
};


document.addEventListener("DOMContentLoaded", () => {
    if (!plantsCommonContainer || !plantsRareContainer || !plantsCommonBtn || !plantsRareBtn) {
        console.error("One or more required elements are missing from the DOM.");
        return;
    }

    // Run initialization, which handles initial render, search, and tab-switching
    autoSwitchAndScroll();

    // Keep existing event listeners for manual tab switching
    plantsCommonBtn.addEventListener("click", () => {
        togglePlants(true);
    });

    plantsRareBtn.addEventListener("click", () => {
        togglePlants(false);
    });
});