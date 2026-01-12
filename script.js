function getPrediction() {
  const city = document.getElementById("city").value;
  const crop = document.getElementById("crop").value;

  if (!city || !crop) {
    alert("Please select both Municipality/City and Crop.");
    return;
  }

  // Placeholder for backend integration
  console.log("City:", city);
  console.log("Crop:", crop);

  alert(`Prediction requested for ${crop} in ${city}.`);
}
