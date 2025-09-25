const date = [
  {
    name: "Drip Irrigation",
    description: "Precise water delivery directly to plant roots",
    efficiency: "90–95%",
    coverage: "45%",
    advantages: [
      "Water savings up to 50% compared to traditional methods",
      "Reduced weed growth and disease spread",
      "Improved crop yields and quality",
      "Suitable for all terrain types",
    ],
    challenges: [
      "Higher initial investment costs",
      "Requires regular maintenance",
      "Risk of dogging in emitters",
    ],
  },
  {
    name: "Sprinkler Systems",
    description: "Overhead water distribution mimicking natural rainfall",
    efficiency: "75-85%",
    coverage: "30%",
    advantages: [
      "Good for large-scale farming operations",
      "Effective for cooling crops in hot weather",
      "Can be automated with timers",
      "Lower labor requirements",
    ],
    challenges: [
      "Water loss due to evaporation",
      "Wind interference affects distribution",
      "Higher energy consumption",
    ],
  },
  {
    name: "Smart Irrigation",
    description: "IoT-based automated irrigation with sensors",
    efficiency: "95-98%",
    coverage: "15%",
    advantages: [
      "Real-time soil moisture monitoring",
      "Weather-based irrigation scheduling",
      "Remote control and monitoring",
      "Optimal water and energy usage",
    ],
    challenges: [
      "High technology and setup costs",
      "Requires technical expertise",
      "Dependent on reliable internet connectivity",
    ],
  },
  {
    name: "Surface Irrigation",
    description: "Traditional gravity-fed water distribution",
    efficiency: "45–65%",
    coverage: "10%",
    advantages: [
      "Low initial investment",
      "Simple operation and maintenance",
      "No energy requirements",
      "Suitable for certain soil types",
    ],
    challenges: [
      "High water consumption",
      "Uneven water distribution",
      "Soil erosion risks",
      "Labor intensive",
    ],
  },
];
  const irrigationContainer = document.querySelector(".irrigation-container");

  // Dynamically generate the HTML for each irrigation system
  irrigationContainer.innerHTML = date
    .map(
      (irrigation) => `
                <div class="irrigation-card">
                    <h3>${irrigation.name}</h3>
                    <p>${irrigation.description}</p>
                    <p><strong>Efficiency:</strong> ${irrigation.efficiency}</p>
                    <p><strong>Coverage:</strong> ${irrigation.coverage}</p>
                    <button class="toggle-btn">View Details</button>
                    <div class="details-container" style="display: none;">
                        <p class="advantages-label"><strong>Advantages:</strong></p>
                        <ul class="advantages-list">
                            ${irrigation.advantages
                              .map((advantage) => `<li>${advantage}</li>`)
                              .join("")}
                        </ul>
                        <p class="challenges-label"><strong>Challenges:</strong></p>
                        <ul class="challenges-list">
                            ${irrigation.challenges
                              .map((challenge) => `<li>${challenge}</li>`)
                              .join("")}
                        </ul>
                    </div>
                </div>
            `
    )
    .join("");

  // Add event listeners to each button to toggle details
  document.querySelectorAll(".toggle-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".irrigation-card");
      const details = card.querySelector(".details-container");

      // First, close all other open cards
      document
        .querySelectorAll(".details-container")
        .forEach((otherDetails) => {
          if (
            otherDetails !== details &&
            otherDetails.style.display === "block"
          ) {
            otherDetails.style.display = "none";
            const otherButton =
              otherDetails.parentElement.querySelector(".toggle-btn");
            otherButton.textContent = "View Details";
          }
        });

      // Then, toggle the details of the card that was clicked
      if (details.style.display === "none") {
        details.style.display = "block";
        button.textContent = "Hide Details";
      } else {
        details.style.display = "none";
        button.textContent = "View Details";
      }
    });
  });