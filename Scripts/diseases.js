// Define the entire JSON object as a single, accessible variable
const DISEASE_DATA = {
  plantDiseases: [
    {
      id: "tomato-blight",
      name: "Tomato Late Blight",
      pathogen: "Phytophthora infestans",
      type: "Fungal",
      severity: "High",
      prevalence: "Common",
      affectedCrops: ["Tomatoes", "Potatoes"],
      symptoms: [
        "Dark brown spots on leaves",
        "White fuzzy growth on leaf undersides",
        "Fruit rot with dark lesions",
        "Stem blackening",
      ],
      prevention: [
        "Use resistant varieties",
        "Improve air circulation",
        "Avoid overhead irrigation",
        "Remove infected plant debris",
      ],
      treatment: [
        "Copper-based fungicides",
        "Biological control agents",
        "Systemic fungicides (early stage)",
        "Crop rotation",
      ],
      economicImpact: "High - can cause 50-100% yield loss",
      seasonality: "Cool, wet conditions (Oct-Mar)",
    },
    {
      id: "powdery-mildew",
      name: "Powdery Mildew",
      pathogen: "Various fungi species",
      type: "Fungal",
      severity: "Medium",
      prevalence: "Common",
      affectedCrops: ["Cucumbers", "Squash", "Tomatoes", "Grapes"],
      symptoms: [
        "White powdery spots on leaves",
        "Yellowing of infected areas",
        "Stunted plant growth",
        "Reduced fruit quality",
      ],
      prevention: [
        "Plant resistant varieties",
        "Ensure proper spacing",
        "Monitor humidity levels",
        "Use drip irrigation",
      ],
      treatment: [
        "Sulfur-based sprays",
        "Baking soda solution",
        "Neem oil applications",
        "Biological fungicides",
      ],
      economicImpact: "Medium - 10-30% yield reduction",
      seasonality: "Warm, dry days with cool nights",
    },
    {
      id: "aphid-infestation",
      name: "Aphid Infestation",
      pathogen: "Various aphid species",
      type: "Insect Pest",
      severity: "Medium",
      prevalence: "Very Common",
      affectedCrops: ["Most vegetables", "Citrus", "Cereals"],
      symptoms: [
        "Curled or distorted leaves",
        "Sticky honeydew on plants",
        "Yellowing foliage",
        "Stunted growth",
      ],
      prevention: [
        "Encourage beneficial insects",
        "Use reflective mulches",
        "Regular plant inspection",
        "Avoid over-fertilization",
      ],
      treatment: [
        "Insecticidal soaps",
        "Ladybug releases",
        "Neem oil sprays",
        "Systemic insecticides (severe cases)",
      ],
      economicImpact: "Medium - indirect damage through virus transmission",
      seasonality: "Spring and fall (mild temperatures)",
    },
    {
      id: "bacterial-wilt",
      name: "Bacterial Wilt",
      pathogen: "Ralstonia solanacearum",
      type: "Bacterial",
      severity: "High",
      prevalence: "Moderate",
      affectedCrops: ["Tomatoes", "Eggplant", "Peppers"],
      symptoms: [
        "Sudden wilting without yellowing",
        "Brown vascular discoloration",
        "Bacterial ooze from cut stems",
        "Plant death within days",
      ],
      prevention: [
        "Use certified disease-free seeds",
        "Improve soil drainage",
        "Practice crop rotation",
        "Disinfect tools regularly",
      ],
      treatment: [
        "Remove infected plants immediately",
        "Copper-based bactericides",
        "Soil solarization",
        "Biological control agents",
      ],
      economicImpact: "Very High - complete crop loss possible",
      seasonality: "Warm, humid conditions (summer)",
    },
    {
      id: "root-rot",
      name: "Root Rot Complex",
      pathogen: "Pythium, Rhizoctonia, Fusarium spp.",
      type: "Fungal",
      severity: "High",
      prevalence: "Common",
      affectedCrops: ["Most crops", "Seedlings particularly vulnerable"],
      symptoms: [
        "Brown, mushy roots",
        "Stunted plant growth",
        "Yellowing lower leaves",
        "Plant wilting despite moist soil",
      ],
      prevention: [
        "Improve soil drainage",
        "Avoid overwatering",
        "Use sterile growing media",
        "Maintain proper soil pH",
      ],
      treatment: [
        "Fungicide soil drenches",
        "Improve drainage systems",
        "Biological soil amendments",
        "Replace affected soil",
      ],
      economicImpact: "High - significant seedling losses",
      seasonality: "Year-round in poorly drained soils",
    },
  ],
  preventionStrategies: [
    /* ... */
  ],
  diseaseManagementImpact: {
    /* ... */
  },
};

// Renders the disease data into HTML cards
function displayDiseases(diseases) {
  const diseasesContainer = document.getElementById("diseases-container");

  if (Array.isArray(diseases) && diseasesContainer) {
    diseasesContainer.innerHTML = diseases
      .map((disease) => {
        const affectedCrops = disease.affectedCrops
          ? disease.affectedCrops.join(", ")
          : "N/A";

        return `<div class="disease-card">
                    <h3>${disease.name}</h3>
                    <p><strong>Pathogen:</strong> <em>${
                      disease.pathogen
                    }</em></p>
                    <p><strong>Type:</strong> ${disease.type}</p>
                    <p><strong>Severity:</strong> ${disease.severity}</p>
                    <p><strong>Prevalence:</strong> ${disease.prevalence}</p>
                    <p><strong>Affected Crops:</strong> ${affectedCrops}</p>
                    <p><strong>Seasonality:</strong> ${disease.seasonality}</p>

                    <h4>Symptoms:</h4>
                    <ul>${disease.symptoms
                      .map((symptom) => `<li>${symptom}</li>`)
                      .join("")}</ul>

                    <h4>Prevention:</h4>
                    <ul>${disease.prevention
                      .map((item) => `<li>${item}</li>`)
                      .join("")}</ul>

                    <h4>Treatment Options:</h4>
                    <ul>${disease.treatment
                      .map((option) => `<li>${option}</li>`)
                      .join("")}</ul>

                    <p class="impact"><strong>Economic Impact:</strong> ${
                      disease.economicImpact
                    }</p>
                </div>`;
      })
      .join("");
  } else if (diseasesContainer) {
    diseasesContainer.innerHTML =
      "<p>Sorry, no disease data available to display.</p>";
  }
}

// Load data from localStorage or set it if not exists
document.addEventListener("DOMContentLoaded", () => {
  let storedData = JSON.parse(localStorage.getItem("diseaseData"));

  if (!storedData) {
    // If nothing in localStorage, save the default data
    localStorage.setItem(
      "diseaseData",
      JSON.stringify(DISEASE_DATA.plantDiseases)
    );
    storedData = DISEASE_DATA.plantDiseases;
  }

  // Pass the array of diseases to the display function
  displayDiseases(storedData);
});
