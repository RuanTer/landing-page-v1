
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

  function sendData(form, type) {
    const data = Object.fromEntries(new FormData(form).entries());
    const ref = database.ref(type).push();
    ref.set(data);

    emailjs.send("service_tysp1lh", "template_0t1927l", data)
      .then(() => {
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

  document.getElementById("employerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    sendData(this, "employers");
  });
});

function toggleDetails(btn) {
  const formDiv = btn.nextElementSibling;
  formDiv.classList.toggle("hidden");
}
