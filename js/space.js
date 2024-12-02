// space.js

document.getElementById("btnBuscar").addEventListener("click", () => {
    const query = document.getElementById("inputBuscar").value.trim();
    if (query) {
      buscarImagenes(query);
    }
  });
  
  async function buscarImagenes(query) {
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;
  
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        mostrarResultados(data.collection.items);
      } else {
        console.error("Error en la solicitud a la API", response.status);
      }
    } catch (error) {
      console.error("Error de red o en la API", error);
    }
  }
  
  function mostrarResultados(items) {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";
  
    items.forEach(item => {
      const { title, description, date_created } = item.data[0];
      const imageUrl = item.links ? item.links[0].href : "placeholder.jpg";
  
      const card = document.createElement("div");
      card.className = "col-lg-4 col-md-6 mb-4";
      card.innerHTML = `
        <div class="card shadow-sm">
          <img src="${imageUrl}" class="card-img-top" alt="${title}">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description || "Sin descripción disponible."}</p>
            <p class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</p>
          </div>
        </div>
      `;
      contenedor.appendChild(card);
    });
  }
  