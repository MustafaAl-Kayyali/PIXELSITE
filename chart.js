// The new data structure with categories
const agricultureData = [
  {
    name: "Farming Methods",
    children: [
      { name: "Irrigated Agriculture", value: 45, color: "#2ecc71" },
      { name: "Rain-fed Agriculture", value: 35, color: "#3498db" },
      { name: "Greenhouse Farming", value: 15, color: "#f1c40f" },
      { name: "Vertical Farming", value: 5, color: "#9b59b6" },
    ],
  },
  {
    name: "Major Crop Production",
    children: [
      { name: "Vegetables", value: 40, color: "#2ecc71" },
      { name: "Fruits", value: 30, color: "#e67e22" },
      { name: "Cereals", value: 20, color: "#f1c40f" },
      { name: "Legumes", value: 10, color: "#e74c3c" },
    ],
  },
  {
    name: "Agricultural Water Usage",
    children: [
      { name: "Drip Irrigation", value: 50, color: "#2ecc71" },
      { name: "Sprinkler Systems", value: 30, color: "#3498db" },
      { name: "Surface Irrigation", value: 15, color: "#f1c40f" },
      { name: "Micro-irrigation", value: 5, color: "#9b59b6" },
    ],
  },
];

const chartContainer = document.getElementById("chart-container");
const chartTitle = document.getElementById("chart-title-text");
const tabs = document.querySelectorAll(".tab");

// Function to render the chart for a given data set
function renderChart(data) {
  // Clear the previous chart
  chartContainer.innerHTML = "";

  // Render the new bars
  data.forEach((item) => {
    const barItem = document.createElement("div");
    barItem.classList.add("bar-item");

    const labelDiv = document.createElement("div");
    labelDiv.classList.add("bar-label");
    labelDiv.innerHTML = `<span>${item.name}</span><span>${item.value}%</span>`;
    barItem.appendChild(labelDiv);

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");

    const progressFill = document.createElement("div");
    progressFill.classList.add("progress-fill");
    progressFill.style.backgroundColor = item.color;
    progressFill.style.width = "0%";

    progressBar.appendChild(progressFill);
    barItem.appendChild(progressBar);
    chartContainer.appendChild(barItem);

    // Animate the fill
    setTimeout(() => {
      progressFill.style.width = `${item.value}%`;
    }, 200);
  });
}

// Function to handle tab clicks
function handleTabClick(event) {
  // Remove 'active' class from all tabs
  tabs.forEach((tab) => tab.classList.remove("active"));

  // Add 'active' class to the clicked tab
  event.currentTarget.classList.add("active");

  const categoryName = event.currentTarget.getAttribute("data-category");

  // Find the corresponding data and render the chart
  const categoryData = agricultureData.find((d) => d.name === categoryName);
  if (categoryData) {
    chartTitle.textContent = categoryData.name;
    renderChart(categoryData.children);
  }
}

// Add event listeners to all tabs
tabs.forEach((tab) => {
  tab.addEventListener("click", handleTabClick);
});

// Initial render with the default data
const defaultCategory = agricultureData.find(
  (d) => d.name === "Farming Methods"
);
renderChart(defaultCategory.children);
