let pag = 1; // Página inicial
let limit = 4; // Límite inicial
let lastPage = 1; // Valor inicial de lastPage, se actualizará cuando se obtenga de la API

// Cargar lista de películas desde el API
async function loadMovies(page) {
    const movieList = document.getElementById('movie-list');
    const prevButton = document.getElementById('ant');
    const nextButton = document.getElementById('sig');
    const firstButton = document.getElementById('first');
    const lastButton = document.getElementById('last');
    const currentPageDisplay = document.getElementById('current-page');

    // Indicador de carga
    movieList.innerHTML = '<li>Cargando...</li>';

    try {
        const response = await fetch(`http://localhost:3000/api/peliculas?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`Error al obtener películas: ${response.statusText}`);
        }

        const result = await response.json();

        if (!result || !result.data || !result.meta) {
            throw new Error('La respuesta del servidor no es válida.');
        }

        // Actualizamos lastPage con el valor de la respuesta
        lastPage = result.meta.lastPage;
        console.log('Última página:', lastPage);

        // Limpiar la lista
        movieList.innerHTML = '';

        // Mostrar películas
        if (result.data.length === 0) {
            movieList.innerHTML = '<li>No hay películas disponibles.</li>';
            return;
        }

        result.data.forEach(movie => {
            const li = document.createElement('li');
            li.style.backgroundImage = `url(${movie.image_url})`; // Establecer la imagen como fondo
            li.innerHTML = `
                <span>${movie.name}</span>
            `;
            li.addEventListener('click', () => showMovieDetails(movie));
            movieList.appendChild(li);
        });
        currentPageDisplay.textContent = `Página: ${page}`;
        // Habilitar/Deshabilitar botones según la página
        prevButton.disabled = page === 1;
        nextButton.disabled = page >= lastPage;
        firstButton.disabled = page === 1;
        lastButton.disabled = page === lastPage;

        pag = page; // Actualizar la página actual
    } catch (error) {
        console.error('Error:', error);
        movieList.innerHTML = '<li>Error al obtener películas.</li>';
    }
}

// Mostrar detalles de la película seleccionada
function showMovieDetails(movie) {
    const details = document.getElementById('movie-details');

    // Configurar el fondo del div y agregar desenfoque
    details.style.backgroundImage = `url('${movie.image_url}')`;
    details.style.backgroundSize = 'cover';
    details.style.backgroundPosition = 'center';
    details.style.filter = 'blur(0px)'; // Opcional: si deseas desenfocar más, aumenta el valor

    // Mostrar información en un contenedor superpuesto
    details.innerHTML = `
        <div class="details-content">
            <h3>${movie.name}</h3>
            <p><strong>Año:</strong> ${movie.year}</p>
            <p><strong>Género:</strong> ${movie.type}</p>
        </div>
    `;
}

// Eventos de los botones de paginación
document.getElementById('ant').addEventListener('click', () => {
    if (pag > 1) {
        loadMovies(pag - 1);
    }
});

document.getElementById('sig').addEventListener('click', () => {
    if (pag < lastPage) {
        loadMovies(pag + 1);
    }
});

// Ir a la primera página
document.getElementById('first').addEventListener('click', () => {
    loadMovies(1);
});

// Ir a la última página
document.getElementById('last').addEventListener('click', () => {
    loadMovies(lastPage);
});

// Cargar películas al cargar la página
window.onload = () => loadMovies(pag);
