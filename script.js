
function toggleDetails(btn) {
  const formDiv = btn.nextElementSibling;
  if (formDiv.classList.contains('hidden')) {
    formDiv.classList.remove('hidden');
  } else {
    formDiv.classList.add('hidden');
  }
}
