const API_KEY = "fsq3ZtmVTH4P1Nk6nuApsGrQtCwRYumVqj7lZRM39UXqNGY=";

async function searchPlaces() {
  const location = document.getElementById("locationInput").value;
  const container = document.getElementById("placesContainer");
  container.innerHTML = "";

  if (!location) {
    alert("Please enter a location.");
    return;
  }

  const limit = 5;
  const url = `https://api.foursquare.com/v3/places/search?near=${location}&limit=${limit}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: API_KEY
      }
    });

    const data = await response.json();

    container.innerHTML = `<h2>📍 Top ${limit} Places in ${location}:</h2>`;

    data.results.forEach((place, idx) => {
      const name = place.name || "N/A";
      const address = place.location?.formatted_address || "N/A";
      const category = place.categories?.[0]?.name || "N/A";

      const card = document.createElement("div");
      card.className = "place-card";
      card.innerHTML = `
        <h3>🔹 ${idx + 1}. ${name}</h3>
        <p>📌 <strong>Address:</strong> ${address}</p>
        <p>📂 <strong>Category:</strong> ${category}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = `<p style="color:red;">❌ Error fetching data. Please try again.</p>`;
    console.error(error);
  }
}
