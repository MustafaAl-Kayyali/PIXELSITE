document.addEventListener("DOMContentLoaded", () => {
  const jordanianCrops = [
    {
      name: "Olives",
      yield: "High",
      season: "Autumn (October–November)",
      growingRegion: ["Irbid", "Ajloun", "Jerash", "Madaba", "Karak"],
      importImportance: "Local use",
      productionLevel: "High production",
      relatedHabitat: "Deciduous Oak Habitat",
    },
    {
      name: "Wheat",
      yield: "Medium",
      season: "Harvested in Spring (May–June)",
      growingRegion: ["Northern plains", "Jordan Valley", "Mafraq"],
      importImportance: "Major import",
      productionLevel: "Medium production",
      relatedHabitat: "Jordan Valley Habitat",
    },
    {
      name: "Barley",
      yield: "Medium",
      season: "Harvested in Spring (May–June)",
      growingRegion: ["Steppe regions", "Mafraq", "Karak"],
      importImportance: "Major import",
      productionLevel: "Medium production",
      relatedHabitat: "Shrubs and Bushes Habitat",
    },
    {
      name: "Tomatoes",
      yield: "High",
      season: "Year-round in greenhouses; peak in Summer–Autumn",
      growingRegion: ["Jordan Valley", "Karak", "Mafraq"],
      importImportance: "Local use & export",
      productionLevel: "High production",
      relatedHabitat: "Jordan Valley Habitat",
    },
    {
      name: "Cucumbers",
      yield: "High",
      season: "Spring–Autumn",
      growingRegion: ["Jordan Valley", "Azraq"],
      importImportance: "Local use",
      productionLevel: "High production",
      relatedHabitat: "Aquatic Plant Habitat",
    },
    {
      name: "Citrus Fruits (Oranges, Lemons)",
      yield: "Medium",
      season: "Winter (November–March)",
      growingRegion: ["Jordan Valley", "Ghor Safi"],
      importImportance: "Local use & export",
      productionLevel: "Medium production",
      relatedHabitat: "Jordan Valley Habitat",
    },
    {
      name: "Grapes",
      yield: "Medium",
      season: "Summer (June–August)",
      growingRegion: ["Madaba", "Karak", "Tafilah"],
      importImportance: "Local use",
      productionLevel: "Medium production",
      relatedHabitat: "Deciduous Oak Habitat",
    },
    {
      name: "Dates",
      yield: "High",
      season: "Autumn (September–November)",
      growingRegion: ["Jordan Valley", "Dead Sea area"],
      importImportance: "Export",
      productionLevel: "High production",
      relatedHabitat: "Jordan Valley and Dead Sea Habitat",
    },
    {
      name: "Barhi Bananas",
      yield: "Low",
      season: "Year-round (peak in Summer)",
      growingRegion: ["Jordan Valley"],
      importImportance: "Local import supplement",
      productionLevel: "Low production",
      relatedHabitat: "Jordan Valley Habitat",
    },
    {
      name: "Medicinal & Aromatic Plants (Thyme, Sage, Chamomile)",
      yield: "Low",
      season: "Spring–Summer",
      growingRegion: ["Ajloun", "Jerash", "Madaba"],
      importImportance: "Local use",
      productionLevel: "Low production",
      relatedHabitat: "Juniper & Shrubs Habitat",
    },
  ];

  const rareRisingPlants = [
    {
      name: "Saffron",
      category: "Spices",
      rarity: "Extremely Rare",
      description:
        "Experimental cultivation in highland areas with promising results",
      mainChallenge: "Climate adaptation",
      marketPotential: "High-value niche market",
      trialRegions: ["Ajloun Highlands", "Tafila"],
    },
    {
      name: "Quinoa",
      category: "Grain",
      rarity: "Rare",
      description:
        "Introduced for food security, grown successfully in arid and semi-arid lands",
      mainChallenge: "Limited farmer experience",
      marketPotential: "Global demand for superfoods",
      trialRegions: ["Mafraq", "Jordan Valley"],
    },
    {
      name: "Avocado",
      category: "Fruit",
      rarity: "Rising",
      description:
        "Expanding cultivation in warm lowland regions with growing consumer demand",
      mainChallenge: "High water requirements",
      marketPotential: "Strong export and local market",
      trialRegions: ["Jordan Valley", "Ghor areas"],
    },
    {
      name: "Dragon Fruit (Pitaya)",
      category: "Fruit",
      rarity: "Rare",
      description:
        "Exotic fruit tested in experimental farms with positive market feedback",
      mainChallenge: "Adaptation to desert heat",
      marketPotential: "Premium exotic export",
      trialRegions: ["Jordan Valley"],
    },
  ];

  const availableCropsContainer = document.getElementById(
    "available-crops-container"
  );
  const rareCropsContainer = document.getElementById("rare-crops-container");
  const availableCropsBtn = document.getElementById("available-crops");
  const rareCropsBtn = document.getElementById("rare-crops");

  // Check if all elements exist before proceeding
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
                <h3>${crop.name}</h3>
                <p><b>Category:</b> ${crop.category}</p>
                <p><b>Rarity:</b> ${crop.rarity}</p>
                <p><b>Description:</b> ${crop.description}</p>
                <p><b>Main Challenge:</b> ${crop.mainChallenge}</p>
                <p><b>Market Potential:</b> ${crop.marketPotential}</p>
                <p><b>Trial Regions:</b> ${crop.trialRegions.join(", ")}</p>
            </div>`;
        } else {
          return `
            <div class="card-item">
                <h3>${crop.name}</h3>
                <p><b>Season:</b> ${crop.season}</p>
                <p><b>Growing Region:</b> ${crop.growingRegion.join(", ")}</p>
                <p><b>Import Importance:</b> ${crop.importImportance}</p>
                <p><b>Production Level:</b> ${crop.productionLevel}</p>
                <p><b>Related Habitat:</b> ${crop.relatedHabitat}</p>
            </div>`;
        }
      })
      .join("");
    container.innerHTML = html;
  };

  renderCrops(availableCropsContainer, jordanianCrops);
  renderCrops(rareCropsContainer, rareRisingPlants, true);

  availableCropsBtn.addEventListener("click", () => {
    availableCropsContainer.style.display = "grid"; // Use grid to match CSS
    rareCropsContainer.style.display = "none";
    availableCropsBtn.classList.add("active"); // Add active class to clicked tab
    rareCropsBtn.classList.remove("active"); // Remove from other tab
  });

  rareCropsBtn.addEventListener("click", () => {
    availableCropsContainer.style.display = "none";
    rareCropsContainer.style.display = "grid"; // Use grid to match CSS
    rareCropsBtn.classList.add("active"); // Add active class to clicked tab
    availableCropsBtn.classList.remove("active"); // Remove from other tab
  });
});
