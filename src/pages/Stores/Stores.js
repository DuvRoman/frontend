import './Stores.css';
import Tesseract from 'tesseract.js';

export function Stores() {
    return `
    <header class="hero-stores">
        <div class="header-text">
            <span class="badge">ZYNTRA INTELLIGENCE</span>
            <h1 class="hero-title" id="main-title">
                Busca por <span class="green-text">Tienda</span>
            </h1>

            <div class="mode-switcher">
                <button class="mode-btn active" id="mode-store">
                    <i class="fas fa-store"></i> Por Tienda
                </button>
                <button class="mode-btn" id="mode-product">
                    <i class="fas fa-box-open"></i> Por Producto
                </button>
            </div>

            <p id="mode-desc">Selecciona un producto en especifico para ver sus precios actuales en Medellín.</p>
        </div>

        <div class="search-container">
            <div class="search-tabs">
                <button class="tab-btn active" data-tab="text">
                    <i class="fas fa-keyboard"></i> Texto
                </button>
                <button class="tab-btn" data-tab="voice">
                    <i class="fas fa-microphone"></i> Voz
                </button>
                <button class="tab-btn" data-tab="photo">
                    <i class="fas fa-camera"></i> Foto
                </button>
            </div>

            <div class="search-box-wrapper">
                <div id="text" class="search-mode active" style="display:flex;">
                    <input type="text" id="main-input" placeholder="¿Qué buscas en esta tienda?">
                    <div class="actions-group">
                        <button class="btn-go">Buscar</button>
                        <button id="clear-btn" class="btn-clear" title="Limpiar">
                            <i class="fas fa-eraser"></i> Limpiar
                        </button>
                    </div>
                </div>

                <div id="voice" class="search-mode" style="display:none;">
                    <div class="voice-indicator" id="voice-trigger">
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <span id="voice-status">Click para hablar...</span>
                    </div>
                </div>

                <div id="photo" class="search-mode" style="display:none;">
                    <div class="photo-box">
                        <div id="upload-ui">
                            <label for="file-upload" class="upload-label">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <span>Sube foto del producto</span>
                            </label>
                            <input id="file-upload" type="file" accept="image/*" hidden />
                        </div>

                        <div id="result-ui" style="display:none; flex-direction:column; align-items:center;">
                            <img id="photo-preview" style="max-width: 150px; border-radius: 10px; margin-bottom: 10px;"/>
                            <p class="success-text">¡IMAGEN PROCESADA!</p>
                            <button class="btn-clear-photo" id="clear-photo">Cambiar imagen</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    `;
}

// --- LÓGICA DE INICIALIZACIÓN ---

export function initStores() {
    const container = document.getElementById('app');
    const mainInput = container.querySelector('#main-input');
    
    // 1. Cambio de pestañas (Texto, Voz, Foto)
    container.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mode = btn.dataset.tab;
            container.querySelectorAll('.search-mode').forEach(el => el.style.display = 'none');
            container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            
            document.getElementById(mode).style.display = 'flex';
            btn.classList.add('active');
        });
    });

    // 2. Switcher de Modo (Tienda vs Producto)
    const toggleMode = (isProduct) => {
        const title = container.querySelector('#main-title');
        const desc = container.querySelector('#mode-desc');
        
        title.innerHTML = isProduct ? 'Busca por <span class="green-text">Producto</span>' : 'Busca por <span class="green-text">Tienda</span>';
        desc.innerText = isProduct ? 'Comparamos precios en todos los supermercados.' : 'Selecciona un comercio para ver sus precios actuales.';
        mainInput.placeholder = isProduct ? 'Busca en TODAS las tiendas...' : '¿Qué buscas en esta tienda?';
        
        container.querySelector('#mode-product').classList.toggle('active', isProduct);
        container.querySelector('#mode-store').classList.toggle('active', !isProduct);
    };

    container.querySelector('#mode-store').onclick = () => toggleMode(false);
    container.querySelector('#mode-product').onclick = () => toggleMode(true);

    // 3. Lógica de Búsqueda Central
    const ejecutarBusqueda = (termino) => {
        if (!termino) return;
        mainInput.value = termino;
        console.log(`🚀 ZYNTRA buscando: "${termino}"`);
        // Aquí iría tu función de filtrado de cards
    };

    // 4. Eventos de Voz
    container.querySelector('#voice-trigger').onclick = async () => {
        const textoVoz = await getQueryFromVoice();
        if (textoVoz) ejecutarBusqueda(textoVoz);
    };

    // 5. Eventos de Foto (OCR)
    const fileInput = container.querySelector('#file-upload');
    fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Preview visual
        container.querySelector('#upload-ui').style.display = 'none';
        container.querySelector('#result-ui').style.display = 'flex';
        container.querySelector('#photo-preview').src = URL.createObjectURL(file);

        mainInput.placeholder = "Analizando imagen... 🔍";
        const textoImagen = await getQueryFromImage(file);
        ejecutarBusqueda(textoImagen.replace(/[^a-zA-Z0-9 ]/g, ""));
        mainInput.placeholder = "¿Qué producto buscas?";
    };

    // 6. Botones de Limpiar
    const limpiarTodo = () => {
        mainInput.value = "";
        fileInput.value = "";
        container.querySelector('#upload-ui').style.display = 'block';
        container.querySelector('#result-ui').style.display = 'none';
    };

    container.querySelector('#clear-btn').onclick = limpiarTodo;
    container.querySelector('#clear-photo').onclick = limpiarTodo;
    container.querySelector('.btn-go').onclick = () => ejecutarBusqueda(mainInput.value);
}

// --- EXTRACTORES ---

async function getQueryFromVoice() {
    return new Promise((resolve) => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return resolve("");

        const recognition = new SpeechRecognition();
        recognition.lang = 'es-CO';
        const status = document.getElementById('voice-status');
        
        recognition.start();
        recognition.onstart = () => status.innerText = "Escuchando... 🎙️";
        recognition.onresult = (e) => resolve(e.results[0][0].transcript);
        recognition.onerror = () => resolve("");
        recognition.onend = () => status.innerText = "Click para hablar...";
    });
}

async function getQueryFromImage(file) {
    try {
        const { data: { text } } = await Tesseract.recognize(file, 'spa');
        return text.trim();
    } catch (err) {
        return "";
    }
}

