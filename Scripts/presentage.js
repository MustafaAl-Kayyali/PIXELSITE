document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("scroll-progress-bar");
  const progressText = document.getElementById("progress-text");

  function updateProgressBar() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const scrollableHeight = scrollHeight - clientHeight;

    if (scrollableHeight <= 0) {
      progressBar.style.width = "100%";
      progressText.textContent = "100%";
      return;
    }

    const scrollPercentage = (scrollTop / scrollableHeight) * 100;
    progressBar.style.width = scrollPercentage + "%";
    progressText.textContent = Math.round(scrollPercentage) + "%";
  }

  window.addEventListener("scroll", updateProgressBar);
  updateProgressBar();
});
