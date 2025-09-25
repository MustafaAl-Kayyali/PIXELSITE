const plants = [
  {
    name: "Rosemary",
    scientific_name: "Rosmarinus officinalis",
    type: ["Common", "Herb"],
    category: ["Medicinal/Culinary"],
    bloom_season: "Spring-Summer",
    economic_value: "Medium",
    primary_uses: [
      "Culinary seasoning",
      "Medicinal tea",
      "Essential oils",
      "Ornamental",
    ],
    found_in: ["Mediterranean Belt", "Central Highlands", "Northern Jordan"],
  },
  {
    name: "Wild Thyme (Za'atar)",
    scientific_name: "Thymus vulgaris",
    type: ["Common", "Herb"],
    category: ["Culinary/Medicinal"],
    bloom_season: "Spring-Early Summer",
    economic_value: "High",
    primary_uses: [
      "Traditional spice blend",
      "Medicinal preparations",
      "Tea",
      "Antibacterial",
    ],
    found_in: ["Central Highlands", "Northern Mountains", "Desert Margins"],
  },
  {
    name: "White Wormwood (Shiyh)",
    scientific_name: "Artemisia herba-alba",
    type: ["Wild", "Herb"],
    category: ["Medicinal"],
    bloom_season: "Summer-Autumn",
    economic_value: "Medium",
    primary_uses: [
      "Medicinal tea for stomach ailments",
      "Traditional medicine",
      "Antiseptic",
    ],
    found_in: ["Jordanian Deserts", "Eastern Badia"],
  },
  {
    name: "Sage (Maramia)",
    scientific_name: "Salvia spp.",
    type: ["Wild", "Herb"],
    category: ["Culinary/Medicinal"],
    bloom_season: "Spring-Summer",
    economic_value: "High",
    primary_uses: [
      "Herbal tea",
      "Traditional medicine for digestion",
      "Flavoring",
    ],
    found_in: ["Northern and Central Highlands", "Mediterranean regions"],
  },
  {
    name: "Chamomile (Babunij)",
    scientific_name: "Matricaria aurea",
    type: ["Wild", "Herb"],
    category: ["Medicinal"],
    bloom_season: "Spring",
    economic_value: "Medium",
    primary_uses: [
      "Herbal tea for calming and stomach issues",
      "Antioxidant",
      "Traditional remedy for skin diseases",
    ],
    found_in: ["Throughout Jordan, especially in the Northern Badia"],
  },
  {
    name: "Wild Mallow (Khubbayzeh)",
    scientific_name: "Malva sylvestris",
    type: ["Wild", "Herb"],
    category: ["Edible/Medicinal"],
    bloom_season: "Spring",
    economic_value: "Medium",
    primary_uses: [
      "Cooked as a vegetable/stew",
      "Traditional remedy for colds and inflammation",
    ],
    found_in: [
      "Widespread in fields and disturbed areas",
      "Central Jordan Desert",
    ],
  },
  {
    name: "Wild Mint (Na'na' Barri)",
    scientific_name: "Mentha longifolia",
    type: ["Wild", "Herb"],
    category: ["Culinary/Medicinal"],
    bloom_season: "Summer",
    economic_value: "Medium",
    primary_uses: [
      "Herbal tea",
      "Flavoring for food and drinks",
      "Remedy for stomach pain and allergies",
    ],
    found_in: ["Wet areas", "Wadi Rum", "Near springs and wadis"],
  },
  {
    name: "Sumac (Summaq)",
    scientific_name: "Rhus coriaria",
    type: ["Wild", "Shrub/Herb"],
    category: ["Culinary/Medicinal"],
    bloom_season: "Summer",
    economic_value: "High",
    primary_uses: [
      "Spice from dried berries",
      "Medicinal tea for digestive issues",
    ],
    found_in: ["Hilly regions", "Mediterranean Belt"],
  },
];

// Corrected plants2 array
const plants2 = [
  {
    name: "Black Iris",
    scientific_name: "Iris nigricans",
    status: ["Protected", "Vulnerable", "Endemic"],
    significance: "National flower of Jordan",
    main_threats: ["Habitat loss", "Over-collection", "Urban development"],
    conservation_efforts: [
      "Protected areas designation",
      "Cultivation programs",
      "Public awareness",
    ],
    bloom_season: "Early Spring",
    category: "National Symbol",
    habitat: ["Central Highlands", "Northern Mountains"],
  },
  {
    name: "Jordan River Iris",
    scientific_name: "Iris jordana",
    status: ["Extremely Rare", "Critically Endangered", "Endemic"],
    significance: "Endemic species to Jordan",
    main_threats: [
      "Water scarcity",
      "Habitat degradation",
      "Agricultural expansion",
    ],
    conservation_efforts: [
      "Seed banking",
      "Habitat restoration",
      "Research programs",
    ],
    bloom_season: "Spring",
    category: "Endemic",
    habitat: ["Jordan Valley", "Water Sources"],
  },
  {
    name: "Vartanii Iris",
    scientific_name: "Iris vartanii",
    status: ["Rare", "Endemic"],
    significance: "Endemic to the Near East, found in Jordan",
    main_threats: ["Habitat loss", "Over-collection"],
    conservation_efforts: ["Research and documentation"],
    bloom_season: "Winter-Spring",
    category: "Endemic",
    habitat: ["Rocky hills and wadis"],
  },
  {
    name: "Moab Iris",
    scientific_name: "Crocus moabiticus",
    status: ["Endangered", "Endemic"],
    significance: "A rare Crocus species endemic to Jordan",
    main_threats: ["Habitat destruction"],
    conservation_efforts: ["Protected in Mujib Nature Reserve"],
    bloom_season: "Early Spring",
    category: "Endemic",
    habitat: ["Moab region"],
  },
  {
    name: "Juniper Tree",
    scientific_name: "Juniperus phoenicea",
    status: ["Endangered"],
    significance: "Important native forest species",
    main_threats: ["Deforestation", "Urban development"],
    conservation_efforts: [
      "Protection in nature reserves (e.g., Dana)",
      "Reforestation programs",
    ],
    category: "Native Tree",
    habitat: ["Forests and rocky areas above 1300 m", "Tafila Province"],
  },
  {
    name: "Pistachio Tree",
    scientific_name: "Pistacia atlantica",
    status: ["Rare"],
    significance: "Native tree, important for biodiversity",
    main_threats: ["Habitat loss"],
    conservation_efforts: ["Protection in Mujib Nature Reserve"],
    category: "Native Tree",
    habitat: ["Mujib Nature Reserve"],
  },
];

const commonPlantsContainer = document.getElementById(
  "common-plants-container"
);
const rarePlantsContainer = document.getElementById("rare-plants-container");

// Function to render plants into a given container
const renderPlants = (container, data, isProtected = false) => {
  const html = data
    .map((plant) => {
      if (isProtected) {
        return `
                    <div class="plant-item">
                        <h3>${plant.name}</h3>
                        <p><b>Scientific Name:</b> ${plant.scientific_name}</p>
                        <p><b>Status:</b> ${plant.status.join(", ")}</p>
                        <p><b>Significance:</b> ${plant.significance}</p>
                        <p><b>Main Threats:</b> ${plant.main_threats.join(
                          ", "
                        )}</p>
                        <p><b>Conservation Efforts:</b> ${plant.conservation_efforts.join(
                          ", "
                        )}</p>
                        <p><b>Category:</b> ${plant.category}</p>
                        <p><b>Habitat:</b> ${plant.habitat.join(", ")}</p>
                    </div>
                `;
      } else {
        return `
                    <div class="plant-item">
                        <h3>${plant.name}</h3>
                        <p><b>Scientific Name:</b> ${plant.scientific_name}</p>
                        <p><b>Type:</b> ${plant.type.join(", ")}</p>
                        <p><b>Category:</b> ${plant.category.join(", ")}</p>
                        <p><b>Bloom Season:</b> ${plant.bloom_season}</p>
                        <p><b>Economic Value:</b> ${plant.economic_value}</p>
                        <p><b>Primary Uses:</b> ${plant.primary_uses.join(
                          ", "
                        )}</p>
                        <p><b>Found In:</b> ${plant.found_in.join(", ")}</p>
                    </div>
                `;
      }
    })
    .join("");
  container.innerHTML = html;
};

// Render both lists on page load, with rare plants initially hidden via CSS
renderPlants(commonPlantsContainer, plants);
renderPlants(rarePlantsContainer, plants2, true);

// Get the buttons and sections from the DOM
const commonPlantsBtn = document.getElementById("common-plants");
const rarePlantsBtn = document.getElementById("rare-plants");
const commonPlantsSection = document.getElementById("common-plants-container");
const rarePlantsSection = document.getElementById("rare-plants-container");

// Add event listeners to toggle visibility
commonPlantsBtn.addEventListener("click", () => {
  commonPlantsSection.style.display = "block";
  rarePlantsSection.style.display = "none";
});

rarePlantsBtn.addEventListener("click", () => {
  commonPlantsSection.style.display = "none";
  rarePlantsSection.style.display = "block";
});
