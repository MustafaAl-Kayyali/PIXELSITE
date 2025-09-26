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

// --- Function to display data on the page (English Labels) ---
function displayDiseases(data) {
  const diseasesContainer = document.getElementById("diseases-container");

  if (Array.isArray(data) && diseasesContainer) {
    diseasesContainer.innerHTML = data
      .map((disease) => {
        // Date formatting (using 'en-US' locale)
        const dateDisplay = disease.date_recorded
          ? `<p><strong>Recorded Date:</strong> ${new Date(
              disease.date_recorded
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}</p>`
          : "";

        // Handing array fields and joining them into strings
        const scientificName = Array.isArray(disease.scientific_name)
          ? disease.scientific_name.join(", ")
          : disease.scientific_name;
        const affectedCrops = Array.isArray(disease.affected_crops)
          ? disease.affected_crops.join(", ")
          : disease.affected_crops;
        const symptoms = Array.isArray(disease.symptoms)
          ? disease.symptoms.join(", ")
          : disease.symptoms;
        const prevention = Array.isArray(disease.prevention)
          ? disease.prevention.join(". ")
          : disease.prevention;
        const treatmentOptions = Array.isArray(disease.treatment_options)
          ? disease.treatment_options.join(". ")
          : disease.treatment_options;

        return `<div class="disease">
          <h3>${disease.disease_name}</h3>
          ${dateDisplay}
          <p><strong>Scientific Name:</strong> ${scientificName}</p>
          <p><strong>Type:</strong> ${disease.type}</p>
          <p><strong>Commonality:</strong> ${disease.commonality}</p>
          <p><strong>Affected Crops:</strong> ${affectedCrops}</p>
          <p><strong>Symptoms:</strong> ${symptoms}</p>
          <p><strong>Prevention:</strong> ${prevention}</p>
          <p><strong>Treatment Options:</strong> ${treatmentOptions}</p>
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
        // Translate error messages
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
