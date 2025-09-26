const technologies = [
  {
    id: 1,
    name: "Vertical Farming",
    status: "pilot",
    statusText: "Pilot Phase",
    description:
      "Multi-story growing systems maximizing crop yield per square meter",
    adoptionRate: "15%",
    investment: "$2.5M",
    benefits: [
      "Precision irrigation scheduling",
      "Early disease detection",
      "Optimal harvest timing",
      "Data-driven decisions",
      "95% less water usage",
      "365-day growing season",
      "No pesticides required",
      "10x higher yield per m²",
    ],
    challenges: [],
    implementationLocations: [
      "Jordan Valley",
      "Northern Plains",
      "Amman Jordan Valley",
    ],
  },
  {
    id: 2,
    name: "IoT Smart Sensors",
    status: "expanding",
    statusText: "Expanding",
    description:
      "Network of sensors monitoring soil, weather, and crop conditions in real-time",
    adoptionRate: "35%",
    investment: "$86.0K",
    benefits: [],
    challenges: [
      "Network connectivity issues",
      "Sensor maintenance",
      "Data interpretation skills",
      "Initial setup costs",
      "Technical expertise required",
    ],
    implementationLocations: [],
  },
  {
    id: 3,
    name: "Hydroponic Systems",
    status: "growing",
    statusText: "Growing",
    description: "Soilless cultivation using nutrient-rich water solutions",
    adoptionRate: "25%",
    investment: "$1.2M",
    benefits: [
      "90% water efficiency",
      "Faster plant growth",
      "Consistent quality",
      "Year-round production",
    ],
    challenges: [],
    implementationLocations: [
      "Desert Agriculture Areas",
      "Controlled Environments",
    ],
  },
  {
    id: 4,
    name: "Climate Control",
    status: "established",
    statusText: "Established",
    description: "Automated greenhouse climate management systems",
    adoptionRate: "60%",
    investment: "$3.1M",
    benefits: [
      "Optimal growing conditions",
      "Extended growing seasons",
      "Weather protection",
      "Improved crop quality",
    ],
    challenges: [
      "Energy costs",
      "System complexity",
      "Maintenance requirements",
    ],
    implementationLocations: ["Jordan Valley", "Highland Greenhouses"],
  },
];

const technologyContainer = document.querySelector(".technology");

// Function to update button icons
function updateButtonIcons() {
  document.querySelectorAll(".toggle-btn").forEach((btn) => {
    const detailsContainer = btn
      .closest(".technology-card")
      .querySelector(".details-container");
    const img = btn.querySelector("img");

    if (detailsContainer.style.display === "block") {
      img.src =
        "https://cdn4.iconfinder.com/data/icons/navigation-40/24/chevron-up-512.png";
      img.alt = "Arrow Up";
    } else {
      img.src =
        "https://cdn4.iconfinder.com/data/icons/navigation-40/24/chevron-down-256.png";
      img.alt = "Arrow Down";
    }
  });
}

// Function to close all cards
function closeAllCards() {
  document.querySelectorAll(".details-container").forEach((container) => {
    container.style.display = "none";
  });
}

// Create the cards
technologyContainer.innerHTML = technologies
  .map(
    (technology) => `
    <div class="technology-card">
      <h3>${technology.name} <span class="status-badge status-${
      technology.status
          }">${technology.statusText}</span></h3>
    <h5>${technology.status}</h6>
      <button class="toggle-btn">
        <img src="https://cdn4.iconfinder.com/data/icons/navigation-40/24/chevron-down-256.png" width="20" height="20" alt="Arrow Down">
      </button>
      
      <p>${technology.description}</p>
      <p><strong>Adoption Rate:</strong> ${technology.adoptionRate}</p>
      <p><strong>Investment:</strong> ${technology.investment}</p>
      <div class="details-container" style="display: none;">
        <p class="benefits-label"><strong>Benefits:</strong></p>
        ${
          technology.benefits.length > 0
            ? `<ul class="benefits-list">${technology.benefits
                .map((benefit) => `<li>${benefit}</li>`)
                .join("")}</ul>`
            : '<p class="empty-message">No benefits recorded</p>'
        }
        <p class="challenges-label"><strong>Challenges:</strong></p>
        ${
          technology.challenges.length > 0
            ? `<ul class="challenges-list">${technology.challenges
                .map((challenge) => `<li>${challenge}</li>`)
                .join("")}</ul>`
            : '<p class="empty-message">No challenges recorded</p>'
        }
        ${
          technology.implementationLocations.length > 0
            ? `<p><strong>Implementation Locations:</strong> ${technology.implementationLocations.join(
                ", "
              )}</p>`
            : ""
        }
      </div>
    </div>
  `
  )
  .join("");

// Add event listeners to buttons
document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const detailsContainer =
      this.closest(".technology-card").querySelector(".details-container");

    // If the card is open, close it
    if (detailsContainer.style.display === "block") {
      detailsContainer.style.display = "none";
    } else {
      // First close all other cards
      closeAllCards();
      // Then open the selected card
      detailsContainer.style.display = "block";
    }

    // Update button icons
    updateButtonIcons();
  });
});