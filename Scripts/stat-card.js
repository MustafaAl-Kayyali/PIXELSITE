const data = [
  {
    label: "Agricultural Workers",
    value: "65,000+",
    trend: "+5.2%",
    icon: "users",
  },
  {
    label: "Total Arable Land",
    value: "287,000 ha",
    trend: "+2.1%",
    icon: "wheat",
  },
  {
    label: "Agricultural GDP",
    value: "4.2%",
    trend: "+1.8%",
    icon: "trending-up",
  },
  {
    label: "Growing Seasons",
    value: "2-3 /year",
    trend: "Stable",
    icon: "calendar",
  },
];

// Function to determine trend class
function getTrendClass(trend) {
  if (trend.includes("+")) {
    return "trend-positive";
  } else if (trend.toLowerCase() === "stable") {
    return "trend-stable";
  }
  return ""; // default/negative trend
}

// Function to create an SVG icon using Lucide (or fallback to text)
function getIconSVG(iconName) {
  // Note: Lucide icons are injected via JavaScript, but we use a placeholder
  // class structure here. We ensure the SVG is rendered correctly below.
  const iconSize = 24;
  let iconCode = "";

  switch (iconName) {
    case "users":
      iconCode = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
      break;
    case "wheat":
      iconCode = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wheat"><path d="M2 22s1-10 7-15c8 1 7 12 7 12s1-10-7-15c-8 1-7 12-7 12Z"/><path d="M12 21v-2"/><path d="M12 17v-4"/><path d="M12 13v-4"/><path d="M12 9v-4"/><path d="M12 5v-2"/></svg>`;
      break;
    case "trending-up":
      iconCode = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`;
      break;
    case "calendar":
      iconCode = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
      break;
    default:
      iconCode = `<span class="text-xs">?</span>`;
  }
  return iconCode;
}

function renderMetrics() {
  const container = document.getElementById("metrics-container");
  if (!container) return;

  const html = data
    .map((item) => {
      const trendClass = getTrendClass(item.trend);
      const iconClass = `icon-${item.icon}`;
      const iconSvg = getIconSVG(item.icon);

      return `
                    <div class="metric-card ${iconClass}">
                        <div class="header-section">
                            <div class="icon-wrapper">
                                ${iconSvg}
                            </div>
                            <!-- Trend Badge -->
                            <span class="trend-badge ${trendClass}">
                                ${item.trend}
                            </span>
                            
                        </div>

                        <!-- Value and Label -->
                        <div class="value-section">
                            <div class="metric-value">${item.value}</div>
                            <div class="metric-label">${item.label}</div>
                        </div>
                    </div>
                `;
    })
    .join("");

  container.innerHTML = html;
}

// Run the rendering function when the page loads
document.addEventListener("DOMContentLoaded", renderMetrics);
