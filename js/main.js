// Wait until DOM is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("job-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-description");
  const closeBtn = document.querySelector(".close-btn");

  document.querySelectorAll(".job-tile").forEach(tile => {
    tile.addEventListener("click", () => {
      const jobKey = tile.getAttribute("data-job");
      const job = jobData[jobKey];
      if (job) {
        modalTitle.textContent = job.title;
        modalDesc.textContent = job.description;
        modal.classList.remove("hidden");
      }
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});