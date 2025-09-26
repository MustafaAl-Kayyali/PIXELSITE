document.addEventListener("DOMContentLoaded", () => {
  // Define the entire JSON data object
  const IRRIGATION_DATA = {
    irrigationSystems: [
      {
        id: "drip",
        title: "Drip Irrigation",
        efficiency: "90-95%",
        coverage: "45%",
        description: "Precise water delivery directly to plant roots",
        advantages: [
          "Water savings up to 50% compared to traditional methods",
          "Reduced weed growth and disease spread",
          "Improved crop yields and quality",
          "Suitable for all terrain types",
        ],
        challenges: [
          "Higher initial investment costs",
          "Requires regular maintenance",
          "Risk of clogging in emitters",
        ],
        color: "blue",
      },
      {
        id: "sprinkler",
        title: "Sprinkler Systems",
        efficiency: "75-85%",
        coverage: "30%",
        description: "Overhead water distribution mimicking natural rainfall",
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
        color: "green",
      },
      {
        id: "smart",
        title: "Smart Irrigation",
        efficiency: "95-98%",
        coverage: "15%",
        description: "IoT-based automated irrigation with sensors",
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
        color: "purple",
      },
      {
        id: "surface",
        title: "Surface Irrigation",
        efficiency: "45-65%",
        coverage: "10%",
        description: "Traditional gravity-fed water distribution",
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
        color: "amber",
      },
    ],
    waterConservationImpact: {
      waterSavings: "40%",
      yieldIncrease: "25%",
      smartAdoption: "60%",
    },
  };

  const irrigationSystems = IRRIGATION_DATA.irrigationSystems;
  const irrigationContainer = document.querySelector(".irrigation-container");

  if (!irrigationContainer) {
    console.error("Irrigation container element not found.");
    return;
  }

  // Dynamically generate the HTML for each irrigation system
  irrigationContainer.innerHTML = irrigationSystems
    .map(
      (irrigation) => `
                <div class="irrigation-card-de ${irrigation.color}">
                    <h3>${irrigation.title}</h3>
                    <p>${irrigation.description}</p>
                    <div class="data-badges">
                        <span class="badge efficiency-badge"><strong>Efficiency:</strong> ${
                          irrigation.efficiency
                        }</span>
                        <span class="badge coverage-badge"><strong>Coverage:</strong> ${
                          irrigation.coverage
                        }</span>
                    </div>

                    <button class="toggle-btn" aria-expanded="false">View Details</button>
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
      const isExpanded = details.style.display === "block";

      // Close all other open cards (accordion behavior)
      document
        .querySelectorAll(".details-container")
        .forEach((otherDetails) => {
          const otherButton =
            otherDetails.parentElement.querySelector(".toggle-btn");
          if (
            otherDetails !== details &&
            otherDetails.style.display === "block"
          ) {
            otherDetails.style.display = "none";
            otherButton.textContent = "View Details";
            otherButton.setAttribute("aria-expanded", "false");
          }
        });

      // Then, toggle the details of the clicked card
      if (isExpanded) {
        details.style.display = "none";
        button.textContent = "View Details";
        button.setAttribute("aria-expanded", "false");
      } else {
        details.style.display = "block";
        button.textContent = "Hide Details";
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
});
