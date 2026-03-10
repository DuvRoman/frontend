import './Stores.css';


// FUNCIONES GLOBALES (para onclick)


window.openSearch = function (evt, modeName) {
    const tabcontent = document.getElementsByClassName("search-mode");
    const tablinks = document.getElementsByClassName("tab-btn");

    // Ocultar todos los modos
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Quitar active a los botones
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Mostrar modo seleccionado
    const selected = document.getElementById(modeName);
    if (selected) {
        selected.style.display = "flex";
        selected.classList.add("active");
    }

    evt.currentTarget.classList.add("active");
};


window.toggleSearchMode = function (mode) {
    const title = document.getElementById('main-title');
    const desc = document.getElementById('mode-desc');
    const storeBtn = document.getElementById('mode-store');
    const productBtn = document.getElementById('mode-product');
    const storeGrid = document.getElementById('store-section');
    const input = document.getElementById('main-input');

    if (!title || !desc || !storeBtn || !productBtn || !storeGrid || !input) return;

    if (mode === 'product') {
        title.innerHTML = 'Busca por <span class="green-text">Producto</span>';
        desc.innerText = "Busca un artículo y compararemos el precio en todos los supermercados.";
        productBtn.classList.add('active');
        storeBtn.classList.remove('active');
        storeGrid.classList.add('mode-product-active');
        input.placeholder = "Busca en TODAS las tiendas...";
    } else {
        title.innerHTML = 'Busca por <span class="green-text">Tienda</span>';
        desc.innerText = "Selecciona un comercio para ver sus precios actuales.";
        storeBtn.classList.add('active');
        productBtn.classList.remove('active');
        storeGrid.classList.remove('mode-product-active');
        input.placeholder = "¿Qué buscas en esta tienda?";
    }
};

function initStoreEvents() {
    const fileInput = document.getElementById("file-upload");
    const preview = document.getElementById("photo-preview");
    const uploadUI = document.getElementById("upload-ui");
    const resultUI = document.getElementById("result-ui");

    if (!fileInput || !preview || !uploadUI || !resultUI) return;

    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {
            uploadUI.style.display = "none";
            resultUI.style.display = "flex";

            preview.src = e.target.result;
        };

        reader.readAsDataURL(file);
    });
}




// VISTA PRINCIPAL


export function Stores() {
    setTimeout(initStoreEvents, 0);
    return `
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
        
        <div id="upload-ui">
            <label for="file-upload" class="upload-label">
                <i class="fas fa-cloud-upload-alt"></i>
                <span>Sube foto del producto</span>
            </label>
            <input id="file-upload" type="file" accept="image/*" hidden />
        </div>

        <div id="result-ui" style="display:none;">
            <img id="photo-preview" />
            <p class="success-text">¡PRODUCTO IDENTIFICADO!</p>
        </div>
    </header>


    `;
}