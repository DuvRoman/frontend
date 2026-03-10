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
        <header class="hero-stores">
            <div class="header-text">
                <span class="badge">ZYNTRA INTELLIGENCE</span>
                <h1 id="main-title">Busca por <span class="green-text">Tienda</span></h1>
                
                <div class="mode-switcher">
                    <button class="mode-btn active" id="mode-store" onclick="toggleSearchMode('store')">
                        <i class="fas fa-store"></i> Por Tienda
                    </button>
                    <button class="mode-btn" id="mode-product" onclick="toggleSearchMode('product')">
                        <i class="fas fa-box-open"></i> Por Producto
                    </button>
                </div>
                
                <p id="mode-desc">
                    Selecciona un comercio para ver sus precios actuales en Medellín.
                </p>
            </div>

            <div class="search-container">
                <div class="search-tabs">
                    <button class="tab-btn active" onclick="openSearch(event, 'text')">
                        <i class="fas fa-keyboard"></i> Texto
                    </button>
                    <button class="tab-btn" onclick="openSearch(event, 'voice')">
                        <i class="fas fa-microphone"></i> Voz
                    </button>
                    <button class="tab-btn" onclick="openSearch(event, 'photo')">
                        <i class="fas fa-camera"></i> Foto
                    </button>
                </div>

                <div class="search-box-wrapper">
                    <div id="text" class="search-mode active" style="display:flex;">
                        <input type="text" id="main-input" placeholder="¿Qué buscas en esta tienda?">
                        <button class="btn-go">Buscar</button>
                    </div>

                    <div id="voice" class="search-mode" style="display:none;">
                        <div class="voice-indicator">
                            <div class="wave"></div>
                            <div class="wave"></div>
                            <div class="wave"></div>
                            <span>Escuchando producto...</span>
                        </div>
                    </div>

                    <div id="photo" class="search-mode" style="display:none;">
                        <div class="photo-box" id="photo-box">

                            <!-- UI para subir imagen -->
                            <div id="upload-ui">
                                <label for="file-upload" class="upload-label">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                    <span>Sube foto del producto</span>
                                </label>
                                <input id="file-upload" type="file" accept="image/*" hidden />
                            </div>

                            <!-- UI de cargando -->
                            <div id="loader-ui" style="display:none;">
                                <i class="fas fa-circle-notch fa-spin" style="font-size:2rem; color:var(--primary-green)"></i>
                                <p style="margin-top:10px; font-weight:700; color:var(--primary-green)">Analizando imagen...</p>
                            </div>

                            <!-- UI resultado -->
                            <div id="result-ui" style="display:none;">
                                <img id="photo-preview" style="max-width:120px; border-radius:12px;" />
                                <p class="success-text">¡IMAGEN ENVIADA!</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </header>

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

                <div class="store-card">
                    <div class="icon-circle">
                        <img src="./src/components/img/gef-logo-png_seeklogo-59796.png" alt="Gef">
                    </div>
                    <h3>Gef</h3>
                    <p>La marca que conecta contigo.</p>
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
            document.getElementById('app').innerHTML = Stores();
        });
    }

    if (redirectProduct) {
        redirectProduct.addEventListener("click", () => {
            document.getElementById('app').innerHTML = Stores();
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