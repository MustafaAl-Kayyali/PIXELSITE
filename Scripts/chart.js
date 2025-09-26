// The data structure remains the same
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

const chartTitle = document.getElementById("chart-title-text");
const tabs = document.querySelectorAll(".tab");

// Get the Chart.js canvas element
const ctx = document.getElementById("myChart");
let agricultureChart; // Variable to hold the chart instance

// Function to convert your data structure into Chart.js format
function formatDataForChart(data) {
  const labels = data.map((item) => item.name);
  const values = data.map((item) => item.value);
  const colors = data.map((item) => item.color);

  return { labels, values, colors };
}

// Function to initialize or update the Chart.js chart
function renderChart(data) {
  const { labels, values, colors } = formatDataForChart(data);

  // If the chart instance exists, destroy it before rendering a new one
  if (agricultureChart) {
    agricultureChart.destroy();
  }

  agricultureChart = new Chart(ctx, {
    type: "bar", // Horizontal bar chart
    data: {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
          borderRadius: 5, // Adds rounded corners to bars
        },
      ],
    },
    options: {
      indexAxis: "y", // Makes it a horizontal bar chart
      responsive: true,
      maintainAspectRatio: false, // Allows you to control the size via CSS
      plugins: {
        legend: {
          display: false, // Hide the legend
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              // Append the '%' sign to the value
              label += context.parsed.x + "%";
              return label;
            },
          },
        },
      },
      scales: {
        x: {
          max: 100,
          min: 0,
          ticks: {
            display: false, // Hide X-axis ticks
          },
          grid: {
            display: false, // Hide vertical grid lines
          },
          border: {
            display: false,
          },
        },
        y: {
          ticks: {
            color: "#555", // Label color
            font: {
              size: 14, // Adjust font size for labels
            },
          },
          grid: {
            display: false, // Hide horizontal grid lines
          },
          border: {
            display: false,
          },
        },
      },
    },
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
