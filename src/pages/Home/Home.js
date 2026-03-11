import './Home.css'
import { Stores } from '../Stores/Stores';

export function Home() {

    const html = `
    <header class="hero-wrapper">
        <div class="hero-main">
            <div class="hero-left">
                <span class="badge">AHORRO INTELIGENTE</span>
                <h1>El mejor buscador <br> de productos.</h1>
                <p>Comparamos precios en Medellín con tecnología Scrapy para que siempre ahorres dinero.</p>
                
                <div class="hero-btns">
                    <button class="btn-solid" id="redirect-store">By Store</button>
                    <button class="btn-outline" id="redirect-product">By Product</button>
                </div>
            </div>

            <div class="hero-right">
                <div class="carousel-wrapper">
                    <div class="carousel">
                        <img src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=500" alt="Frutas">
                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" alt="Tecnología">
                        <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500" alt="Ropa">
                        <img src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500" alt="Tablet">
                        <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500" alt="Hogar">
                    </div>
                </div>
            </div>
        </div>

        <div class="social-bar">
            <a href="https://www.facebook.com/profile.php?id=61588096483967&locale=es_LA" target="_blank">
                <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/zyntrariwi/" target="_blank">
                <i class="fab fa-instagram"></i>
            </a>
            <a href="https://x.com/ZyntraRiwi" target="_blank">
                <i class="fa-brands fa-x-twitter"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCki3jZZ4tXnGtPNpFvcEBkQ" target="_blank">
                <i class="fab fa-youtube"></i>
            </a>
        </div>
    </header>

    <section class="search-upload-section">
        <div class="hero-stores">
            <div class="header-text">
            <div class="search-container">
                <h1 id="main-title">Busca tu <span class="green-text">tienda preferida</span></h1>

                <div class="search-box-wrapper">
                    <div id="text" class="search-mode active" style="display:flex;">
                    <input type="text" id="main-input" placeholder="¿Qué buscas en esta tienda?">
                    <button class="btn-go" id="btn-search">Buscar</button>
                    <button class="btn-clear" id="btn-clear" style="margin-left: 10px;">Limpiar</button>
                </div>      
            </div>
        </div>

        <main class="main-content" id="store-section">
            <div class="grid-container">

                <div class="store-card">
                    <div class="icon-circle">
                        <img src="./src/components/img/pngwing.com.png" alt="Exito">
                    </div>
                    <h3>Éxito</h3>
                    <p>Precios WOW y ofertas diarias.</p>
                    <button class="btn-select">Explorar</button>
                </div>

                <div class="store-card">
                    <div class="icon-circle">
                        <img src="./src/components/img/Tiendas D1 Logo Vector.svg .png" alt="D1">
                    </div>
                    <h3>D1</h3>
                    <p>Calidad alta a precios bajos.</p>
                    <button class="btn-select">Explorar</button>
                </div>

                <div class="store-card">
                    <div class="icon-circle">
                        <img src="./src/components/img/carulla.png" alt="Carulla">
                    </div>
                    <h3>Carulla</h3>
                    <p>Frescura y productos premium.</p>
                    <button class="btn-select">Explorar</button>
                </div>

                <div class="store-card">
                    <div class="icon-circle">
                        <img src="./src/components/img/favpng_99471982f41cfd4e7e7db9b21bbcc94c.png" alt="Falabella">
                    </div>
                    <h3>Falabella</h3>
                    <p>Todo lo que quieras.</p>
                    <button class="btn-select">Explorar</button>
                </div>

                <div class="store-card">
                    <div class="icon-circle">
                        <img src="./src/components/img/ktronix_logo.png" alt="Ktronix">
                    </div>
                    <h3>Ktronix</h3>
                    <p>En Ktronix vas a la fija.</p>
                    <button class="btn-select">Explorar</button>
                </div>

                <div class="store-card">
                    <div class="icon-circle">
                        <img src="./src/components/img/alkomprar_logo.png" alt="Alkomprar">
                    </div>
                    <h3>Alkomprar</h3>
                    <p>Tecnología a tu alcance.</p>
                    <button class="btn-select">Explorar</button>
                </div>

                <div class="store-card">
                    <div class="icon-circle">
                        <img src="./src/components/img/pilatos_logo.png" alt="Pilatos">
                    </div>
                    <h3>Pilatos</h3>
                    <p>On the move.</p>
                    <button class="btn-select">Explorar</button>
                </div>

                <div class="store-card">
                    <div class="icon-circle">
                        <img src="./src/components/img/dafiti.png" alt="Dafiti">
                    </div>
                    <h3>Dafiti</h3>
                    <p>De las mejores marcas.</p>
                    <button class="btn-select">Explorar</button>
                </div>
            </div>
        </main>
    </section>
    `;

    setTimeout(initHomeEvents, 0);
    return html;
}


function initHomeEvents() {

    //  ID corregido: "file-upload" igual que en el HTML
    const fileInput = document.getElementById('file-upload');
    const redirectStore = document.getElementById("redirect-store");
    const redirectProduct = document.getElementById("redirect-product");
    const sectionObject = document.getElementById("store-section")

    //  IMAGEN → BACKEND
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleProcessImage(e.target.files[0]);
            }
        });
    }

    //REDIRECCIÓN
    if (redirectStore) {
        redirectStore.addEventListener("click", () => {
           sectionObject.scrollIntoView({ 
        behavior: 'smooth' 
        });
        });
    }

    if (redirectProduct) {
        redirectProduct.addEventListener("click", () => {
            window.location.href = "/searchProduct";
        });
    }
}


//  FUNCIÓN PRINCIPAL DE IMAGEN

function handleProcessImage(file) {
    if (!file) return;

    const uploadUi = document.getElementById('upload-ui');
    const loaderUi = document.getElementById('loader-ui');
    const resultUi = document.getElementById('result-ui');
    const photoPreview = document.getElementById('photo-preview');

    // 1. Mostrar la imagen en pantalla (previsualización local)
    const reader = new FileReader();
    reader.onload = function(e) {
        photoPreview.src = e.target.result; // muestra la imagen antes de enviar
    };
    reader.readAsDataURL(file);

    // 2. Cambiar UI: ocultar el botón, mostrar "cargando"
    uploadUi.style.display = 'none';
    loaderUi.style.display = 'flex';

    // 3. Crear el FormData con la imagen para mandar al backend
    const formData = new FormData();
    formData.append('image', file); //  "image" igual que en upload.single("image") del backend

    // 4. Enviar al backend con fetch
    fetch('http://localhost:3000/api/image', { //  URL correcta según imageRoute.js
        method: 'POST',
        body: formData
        //  NO pongas Content-Type, el navegador lo pone solo con FormData
    })
    .then(response => response.json())
    .then(data => {
        console.log(' Respuesta del backend:', data);

        // 5. Ocultar "cargando", mostrar resultado
        loaderUi.style.display = 'none';
        resultUi.style.display = 'flex';
    })
    .catch(error => {
        console.error('❌ Error al enviar la imagen:', error);
        loaderUi.style.display = 'none';
        uploadUi.style.display = 'flex'; // volver al estado inicial si falla
        alert('Error al conectar con el servidor. ¿Está corriendo el backend?');
    });
}

// 1. La función de normalizar siempre fuera
const normalizarTexto = (texto) => {
    return texto ? texto.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";
};

// 2. Encapsulamos todo para esperar al DOM
document.addEventListener('click', (e) => {
    
    // --- LÓGICA DEL BOTÓN BUSCAR ---
    if (e.target.id === 'btn-search' || e.target.closest('#btn-search')) {
        console.log("¡Clic en Buscar detectado!");
        
        const inputBusqueda = document.getElementById('main-input');
        const todasLasCards = document.querySelectorAll('.store-card');
        const terminoUsuario = normalizarTexto(inputBusqueda.value);

        if (terminoUsuario === "") {
            todasLasCards.forEach(card => card.style.display = "block");
            return;
        }

        todasLasCards.forEach(card => {
            const h3 = card.querySelector('h3');
            if (h3) {
                const nombreTienda = normalizarTexto(h3.textContent);
                card.style.display = nombreTienda.includes(terminoUsuario) ? "block" : "none";
            }
        });
    }

    // --- LÓGICA DEL BOTÓN LIMPIAR ---
    if (e.target.id === 'btn-clear' || e.target.closest('#btn-clear')) {
        console.log("¡Clic en Limpiar detectado!");
        const inputBusqueda = document.getElementById('main-input');
        const todasLasCards = document.querySelectorAll('.store-card');
        
        if(inputBusqueda) inputBusqueda.value = "";
        todasLasCards.forEach(card => card.style.display = "block");
    }
});
