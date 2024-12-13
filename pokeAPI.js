const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

// Variables para manejar la paginación
let currentPage = 1;
const itemsPerPage = 10;

// Función para obtener Pokémon desde la API
const fetchPokemons = async (page) => {
  try {
    // Calcula el desplazamiento basado en la página actual
    const offset = (page - 1) * itemsPerPage;
    
    // Obtiene los datos de la página actual de Pokémones desde la API
    const response = await fetch(`${API_URL}?offset=${offset}&limit=${itemsPerPage}`);
    // Convierte la respuesta de la API a formato JSON
    const data = await response.json();
    // Llama a la función displayPokemons para mostrar los resultados en la página
    displayPokemons(data.results);
  } catch (error) {
    console.error("Error al obtener los datos de Pokémon:", error);
  }
};

// Función para mostrar la lista de Pokémon en tarjetas
const displayPokemons = async (pokemons) => {
  // Obtiene el contenedor donde se mostrarán las tarjetas de Pokémones
  const container = document.getElementById('cards-container');
  // Limpia el contenido del contenedor antes de mostrar los resultados
  container.innerHTML = '';
  for (const pokemon of pokemons) {
    // Obtiene los detalles del Pokémon de la API
    const response = await fetch(pokemon.url);
    // Convierte la respuesta de la API a formato JSON
    const details = await response.json();
    // Añade la tarjeta de Pokémon al contenedor
    container.innerHTML += `
      <div class="card">
        <img src="${details.sprites.front_default}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
        <p>Especie: ${details.species.name}</p>
        <p>Estado: ${details.base_experience}</p>
      </div>
    `;
  }
};

// Configuración de los botones de paginación
const setupPagination = () => {
  document.getElementById('prev-btn').onclick = () => {
    if (currentPage > 1) {
      // Resta 1 a la página actual y actualiza los botones de paginación
      currentPage--;
      // Llama a la función fetchPokemons para obtener los Pokémones de la página anterior
      fetchPokemons(currentPage);
    }
    // Actualiza el estado de los botones
    updateButtons();
  };
  
  // Configura el botón de siguiente página
  document.getElementById('next-btn').onclick = () => {
    // Suma 1 a la página actual y actualiza los botones de paginación
    currentPage++;
    // Llama a la función fetchPokemons para obtener los Pokémones de la página siguiente
    fetchPokemons(currentPage);
    // Actualiza el estado de los botones
    updateButtons();
  };
};

// Función para deshabilitar el botón "Anterior" en la primera página
const updateButtons = () => {
  document.getElementById('prev-btn').disabled = currentPage === 1;
};

// Ejecuta la función fetchPokemons al cargar la página y configura los botones de paginación
document.addEventListener('DOMContentLoaded', () => {
  fetchPokemons(currentPage);
  setupPagination();
});
