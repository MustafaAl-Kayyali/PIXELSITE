const FALLBACK_DATA = [
  {
    disease_name: "Grapevine Trunk Diseases (GTDs)",
    scientific_name: ["Diplodia seriata", "Neofusicoccum parvum"],
    type: "Fungal",
    commonality: "Common",
    affected_crops: ["Grapevines"],
    symptoms: [
      "Dieback of branches",
      "Cankers (sunken, dead areas on the trunk or branches)",
    ],
    prevention: [
      "Pruning with sterilized tools",
      "Avoiding pruning during wet weather",
      "Applying wound protectants",
    ],
    treatment_options: [
      "Removing and destroying infected wood",
      "Applying fungicides",
    ],
    date_recorded: "2024-01-01",
  },
  {
    disease_name: "Rhizoctonia Stem Canker and Black Scurf",
    scientific_name: "Rhizoctonia solani",
    type: "Fungal",
    commonality: "Common",
    affected_crops: ["Potatoes"],
    symptoms: [
      "Stem cankers (brown to black lesions on the stem)",
      "Black scurf on tubers (small, black, hard masses)",
    ],
    prevention: [
      "Planting certified disease-free seed potatoes",
      "Crop rotation",
      "Proper soil drainage",
    ],
    treatment_options: [
      "Fungicide seed treatments",
      "Biological control agents",
    ],
    date_recorded: "2024-02-15",
  },
  {
    disease_name: "Crown Gall",
    scientific_name: "Agrobacterium tumefaciens",
    type: "Bacterial",
    commonality: "Common",
    affected_crops: [
      "Almond",
      "Apple",
      "Apricot",
      "Cherry",
      "Peach",
      "Grapevine",
    ],
    symptoms: [
      "Galls (tumor-like growths) on the roots and lower stems",
      "Stunted growth",
      "Reduced plant vigor",
    ],
    prevention: [
      "Purchasing disease-free nursery stock",
      "Avoiding mechanical injury to the plant roots and crown",
    ],
    treatment_options: [
      "Biological control using non-pathogenic bacteria",
      "Pruning and destroying galls",
    ],
    date_recorded: "2024-04-10",
  },
  {
    disease_name: "Soft Rot",
    scientific_name: "Pectobacterium carotovorum",
    type: "Bacterial",
    commonality: "Common",
    affected_crops: ["Potatoes", "Cucumbers", "Cabbage", "Tomatoes"],
    symptoms: [
      "Water-soaked lesions on the plant tissue",
      "Soft, mushy rot with a foul smell",
      "Stem and root decay",
    ],
    prevention: [
      "Avoiding overhead irrigation",
      "Improving air circulation",
      "Proper handling to avoid physical damage",
    ],
    treatment_options: [
      "No effective chemical treatment",
      "Focus on prevention and sanitation",
    ],
    date_recorded: "2024-06-25",
  },
  {
    disease_name: "Tomato Speck",
    scientific_name: "Pseudomonas syringae pv. tomato",
    type: "Bacterial",
    commonality: "Common",
    affected_crops: ["Tomatoes"],
    symptoms: [
      "Small, dark specks with a yellow halo on leaves",
      "Raised specks on fruit",
      "Leaf yellowing and dropping",
    ],
    prevention: [
      "Using certified disease-free seeds",
      "Removing infected plant debris",
      "Practicing crop rotation",
    ],
    treatment_options: ["Copper-based bactericides"],
    date_recorded: "2024-03-20",
  },
];

const DISEASES_KEY = "plantDiseasesData";

// to display data on the page
function displayDiseases(data) {
  const diseasesContainer = document.getElementById("diseases-container");

  if (Array.isArray(data) && diseasesContainer) {
    diseasesContainer.innerHTML = data
      .map((disease) => {
        // to display the date
        const dateDisplay = disease.date_recorded
          ? `<p><strong>Recorded Date:</strong> ${new Date(
              disease.date_recorded
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}</p>`
          : "";

        // to display the scientific name
        const scientificName = Array.isArray(disease.scientific_name)
          ? disease.scientific_name.join(", ")
          : disease.scientific_name;

        // to display the affected crops
        const affectedCrops = Array.isArray(disease.affected_crops)
          ? disease.affected_crops.join(", ")
          : disease.affected_crops;

        return `<div class="disease">
          <h3>${disease.disease_name}</h3>
          ${dateDisplay}
          <p><strong>Scientific Name:</strong> ${scientificName}</p>
          <p><strong>Type:</strong> ${disease.type}</p>
          <p><strong>Commonality:</strong> ${disease.commonality}</p>
          <p><strong>Affected Crops:</strong> ${affectedCrops}</p>
          <p><strong>Symptoms:</strong></p>
          <ul>${disease.symptoms
            .map((symptom) => `<li>${symptom}</li>`)
            .join("")}</ul>
          <p><strong>Prevention:</strong></p>
          <ul>${disease.prevention
            .map((item) => `<li>${item}</li>`)
            .join("")}</ul>
          <p><strong>Treatment Options:</strong></p>
          <ul>${disease.treatment_options
            .map((option) => `<li>${option}</li>`)
            .join("")}</ul>
        </div>`;
      })
      .join("");
  } else if (diseasesContainer) {
    diseasesContainer.innerHTML =
      "<p>Sorry, no disease data available to display.</p>";
  }
}

function loadDiseasesData() {
  const cachedData = localStorage.getItem(DISEASES_KEY);

  if (cachedData) {
    console.log("Loading data from localStorage.");
    try {
      const data = JSON.parse(cachedData);
      displayDiseases(data);
      return;
    } catch (e) {
      console.error("Error parsing cached data, fetching from network.", e);
    }
  }

  console.log("Fetching data from the network.");
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} (File not found or network issue)`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data fetched successfully.");

      try {
        localStorage.setItem(DISEASES_KEY, JSON.stringify(data));
      } catch (e) {
        console.warn("Could not save data to localStorage:", e);
      }
      displayDiseases(data);
    })
    .catch((error) => {
      console.error("Fetch failed. Using fallback data:", error.message);

      displayDiseases(FALLBACK_DATA);

      const diseasesContainer = document.getElementById("diseases-container");
      if (diseasesContainer) {
        const errorMessage = error.message.includes("Failed to fetch")
          ? "Connection failed. Displaying cached/temporary data."
          : `An error occurred: ${error.message}`;

        diseasesContainer.insertAdjacentHTML(
          "beforebegin",
          `<p style="color: red; text-align: center;">${errorMessage}</p>`
        );
      }
    });
}

loadDiseasesData();
