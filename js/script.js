
function toggleJobDetails(tile) {
  const details = tile.querySelector(".job-details");
  details.classList.toggle("hidden");
  details.classList.toggle("visible");
}

function toggleForm(event, button) {
  event.stopPropagation();
  const form = button.nextElementSibling;
  form.classList.toggle("hidden");
  form.classList.toggle("visible");
  button.style.display = "none";
}

function submitCandidateForm(event, form) {
  event.preventDefault();
  const formData = new FormData(form);
  fetch("https://formspree.io/f/mwkgnzqg", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData
  }).then(response => {
    if (response.ok) {
      form.reset();
      form.querySelector(".confirmation").classList.remove("hidden");
      form.querySelector(".confirmation").classList.add("visible");
    } else {
      alert("Something went wrong. Please try again.");
    }
  }).catch(() => {
    alert("Error submitting form. Please try again later.");
  });
}

function submitEmployerForm(event, form) {
  event.preventDefault();
  const formData = new FormData(form);
  fetch("https://formspree.io/f/mwkgnzqg", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData
  }).then(response => {
    if (response.ok) {
      form.reset();
      form.querySelector(".confirmation").classList.remove("hidden");
      form.querySelector(".confirmation").classList.add("visible");
    } else {
      alert("Submission failed. Please try again.");
    }
  }).catch(() => {
    alert("Error submitting form. Please try again later.");
  });
}
