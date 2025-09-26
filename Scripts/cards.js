// 1. Define the complete JSON data structure
const CROP_DATA = {
  availableCrops: [
    {
      name: "Tomatoes",
      icon: "🍅",
      category: "Vegetables",
      season: "Year-round",
      production: "High",
      exportStatus: "Major Export",
      description:
        "Jordan's most successful crop, grown in greenhouses and open fields",
      yield: "45-65 tons/ha",
      regions: ["Jordan Valley", "Highlands", "Desert Areas"],
    },
    {
      name: "Olives",
      icon: "🫒",
      category: "Fruits",
      season: "Sep-Nov",
      production: "High",
      exportStatus: "Traditional Export",
      description:
        "Historic crop with over 18 million olive trees across Jordan",
      yield: "8-12 tons/ha",
      regions: ["Northern Jordan", "Central Highlands", "Ajloun"],
    },
    {
      name: "Citrus Fruits",
      icon: "🍊",
      category: "Fruits",
      season: "Nov-Mar",
      production: "Medium",
      exportStatus: "Export",
      description:
        "Oranges, lemons, and grapefruits grown mainly in Jordan Valley",
      yield: "25-35 tons/ha",
      regions: ["Jordan Valley", "Ghor Region"],
    },
    {
      name: "Cucumbers",
      icon: "🥒",
      category: "Vegetables",
      season: "Oct-May",
      production: "High",
      exportStatus: "Major Export",
      description:
        "High-value crop grown extensively in protected environments",
      yield: "80-120 tons/ha",
      regions: ["Jordan Valley", "Desert Agriculture"],
    },
    {
      name: "Wheat",
      icon: "🌾",
      category: "Cereals",
      season: "Nov-Jun",
      production: "Medium",
      exportStatus: "Import Needed",
      description: "Rain-fed wheat production in northern and central regions",
      yield: "1.5-3 tons/ha",
      regions: ["Mafraq", "Irbid", "Karak"],
    },
    {
      name: "Barley",
      icon: "🌾",
      category: "Cereals",
      season: "Nov-Jun",
      production: "Medium",
      exportStatus: "Local Use",
      description: "Drought-resistant crop used primarily for animal feed",
      yield: "1-2.5 tons/ha",
      regions: ["Eastern Desert", "Mafraq", "Karak"],
    },
  ],
  rareCrops: [
    {
      name: "Saffron",
      icon: "🌺",
      category: "Spices",
      rarity: "Extremely Rare",
      challenge: "Climate adaptation",
      description:
        "Experimental cultivation in highland areas with promising results",
      potential: "High-value niche market",
      regions: ["Ajloun Highlands", "Tafila"],
    },
    {
      name: "Quinoa",
      icon: "🌱",
      category: "Grains",
      rarity: "Rare",
      challenge: "Market development",
      description: "Drought-resistant superfood being tested in arid regions",
      potential: "Health food market",
      regions: ["Eastern Desert", "Azraq"],
    },
    {
      name: "Dragon Fruit",
      icon: "🐲",
      category: "Exotic Fruits",
      rarity: "Very Rare",
      challenge: "Climate control",
      description: "Greenhouse cultivation trials showing promising results",
      potential: "Premium export market",
      regions: ["Jordan Valley (Controlled Environment)"],
    },
    {
      name: "Truffles",
      icon: "🍄",
      category: "Fungi",
      rarity: "Extremely Rare",
      challenge: "Natural occurrence",
      description: "Wild desert truffles found seasonally after rainfall",
      potential: "Luxury culinary market",
      regions: ["Eastern Desert", "Badia Region"],
    },
  ],
  cropStatistics: {
    cropVarieties: "150+",
    foodSelfSufficiency: "85%",
    exportCrops: "12",
    agriculturalGDP: "₹2.1B",
  },
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

  const renderCrops = (container, data, isRare = false) => {
    const html = data
      .map((crop) => {
        if (isRare) {
          return `
                        <div class="card-item">
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
          return `
                        <div class="card-item">
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

  // Render the initial data
  renderCrops(availableCropsContainer, availableCrops);
  renderCrops(rareCropsContainer, rareCrops, true);

  // Set initial state (show available crops and mark the tab as active)
  availableCropsContainer.style.display = "grid";
  rareCropsContainer.style.display = "none";
  availableCropsBtn.classList.add("active");

  // Event Listeners for Tab Switching
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
