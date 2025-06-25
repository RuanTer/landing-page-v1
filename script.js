
document.addEventListener("DOMContentLoaded", function () {
  const firebaseConfig = {
    apiKey: "AIzaSyC5lmh4dkF6YYH-ULbTDSY82bW57IPD9N4",
    authDomain: "landing-page-cba4b.firebaseapp.com",
    databaseURL: "https://landing-page-cba4b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "landing-page-cba4b",
    storageBucket: "landing-page-cba4b.appspot.com",
    messagingSenderId: "749373364502",
    appId: "1:749373364502:web:e9de6d46ee82b68c815837",
    measurementId: "G-J0VLYWKM44"
  };

  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  emailjs.init("4oostFQh7yxUFHUBo");

  function sendToGoogleSheets(data, type) {
    console.log("Sending to Google Sheets:", data);
    fetch("https://script.google.com/macros/s/AKfycbwBUYxQxUMtfSJSYyMFG6PU9BrzyH4o0eClqgQhZZtC9zGmT--CbyH0ErkyexuGKQWq/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...data, type })
    })
    .then(response => response.text())
    .then(text => {
      console.log("Google Sheets response:", text);
    })
    .catch(err => {
      console.error("Error sending to Google Sheets:", err);
    });
  }

  function sendData(form, type) {
    const data = Object.fromEntries(new FormData(form).entries());
    console.log("Form data collected:", data);

    try {
      const ref = database.ref(type).push();
      ref.set(data);
      console.log("Data pushed to Firebase.");
    } catch (firebaseErr) {
      console.error("Firebase error:", firebaseErr);
    }

    sendToGoogleSheets(data, type === "candidates" ? "candidate" : "employer");

    emailjs.send("service_tysp1lh", "template_0t1927l", data)
      .then(response => {
        console.log("EmailJS success:", response.status, response.text);
        form.querySelector(".candidateSuccess, #employerSuccess")?.classList.remove("hidden");
        form.reset();
      })
      .catch(err => {
        console.error("EmailJS error:", err);
        alert("There was an error sending your application. Please try again later.");
      });
  }

  document.querySelectorAll(".candidateForm").forEach(form => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      sendData(form, "candidates");
    });
  });

  const employerForm = document.getElementById("employerForm");
  if (employerForm) {
    employerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      sendData(this, "employers");
    });
  }
});

function toggleDetails(btn) {
  const formDiv = btn.nextElementSibling;
  formDiv.classList.toggle("hidden");
}
