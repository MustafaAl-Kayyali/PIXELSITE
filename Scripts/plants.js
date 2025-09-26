// Sample Data (Needed for rendering)
const commonPlants = [
  {
    name: "Olive Tree",
    scientific_name: "Olea europaea",
    primary_uses: ["Oil", "Table fruit", "Wood"],
    found_in: ["Mediterranean Climate Zones", "Ajloun", "Jerash"],
  },
  {
    name: "Thyme",
    scientific_name: "Thymus vulgaris",
    primary_uses: ["Culinary spice", "Medicinal tea"],
    found_in: ["Rocky Hillsides", "Dry Steppes"],
  },
];

const protectedPlants = [
  {
    name: "Black Iris (National Flower)",
    scientific_name: "Iris nigricans",
    status: ["Endemic", "Vulnerable"],
    significance: "National symbol; vital for local insect diversity.",
    main_threats: ["Habitat loss", "Overgrazing"],
    conservation_efforts: ["Protected reserves", "Seed banks"],
  },
  {
    name: "Jordan Almond",
    scientific_name: "Prunus amygdalus var. amara",
    status: ["Rare", "Culturally significant"],
    significance: "Used in traditional cuisine and festivals.",
    main_threats: ["Water scarcity", "Pest infestation"],
    conservation_efforts: [
      "Drip irrigation projects",
      "Disease-resistant rootstocks",
    ],
  },
];

// Render sections
const renderPlants = (container, data, isProtected = false) => {
  const html = data
    .map((plant) => {
      // NOTE: Using a generic card structure, you would need to define
      // styles for classes like 'bg-white', 'shadow-sm', 'text-green-700'
      // in your 'style.css' if not using a framework.
      if (isProtected) {
        return `<div class="plant-card">
                  <h4 class="card-title">${plant.name}</h4>
                  <p class="card-subtitle">${plant.scientific_name}</p>
                  <ul class="card-details">
                      <li><b>Status:</b> ${plant.status.join(", ")}</li>
                      <li><b>Significance:</b> ${plant.significance}</li>
                      <li><b>Main Threats:</b> ${plant.main_threats.join(
                        ", "
                      )}</li>
                      <li><b>Conservation Efforts:</b> ${plant.conservation_efforts.join(
                        ", "
                      )}</li>
                  </ul>
              </div>`;
      } else {
        return `<div class="plant-card">
                  <h4 class="card-title">${plant.name}</h4>
                  <p class="card-subtitle">${plant.scientific_name}</p>
                  <ul class="card-details">
                      <li><b>Uses:</b> ${plant.primary_uses.join(", ")}</li>
                      <li><b>Found In:</b> ${plant.found_in.join(", ")}</li>
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

// FIX: Modified togglePlants to use 'active' class (defined in CSS) and inline style for display
const togglePlants = (showCommon) => {
  // Toggle 'active' class on list items for styling
  plantsCommonBtn.classList.toggle("active", showCommon);
  plantsRareBtn.classList.toggle("active", !showCommon);

  // Toggle container visibility using inline style (setting to 'grid' to match plants-container CSS)
  plantsCommonContainer.style.display = showCommon ? "grid" : "none";
  plantsRareContainer.style.display = showCommon ? "none" : "grid";
};

plantsCommonBtn.addEventListener("click", () => {
  togglePlants(true);
});

plantsRareBtn.addEventListener("click", () => {
  togglePlants(false);
});

// INITIALIZATION: Render data and set initial state on load
document.addEventListener("DOMContentLoaded", () => {
  // 1. Render the data into the containers
  renderPlants(plantsCommonContainer, commonPlants, false);
  renderPlants(plantsRareContainer, protectedPlants, true);

  // 2. Set the initial visibility (common plants visible)
  togglePlants(true);
});
