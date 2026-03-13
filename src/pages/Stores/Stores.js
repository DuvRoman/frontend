import './Stores.css';
import Tesseract from 'tesseract.js';

export function Stores() {
    // Usamos un pequeño delay para asegurar que el DOM esté listo
    setTimeout(initStoreEvents, 0);
    
    return `
    <header class="hero-stores">
        <div class="header-text">
            <span class="badge">ZYNTRA INTELLIGENCE</span>
            <br>
            <h1 id="main-title">Busca tu <span class="green-text">Producto</span></h1>
            <br>
            <p id="mode-desc">
                Selecciona un producto en específico para ver sus precios actuales en Medellín.
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
                    <input type="text" id="main-input" placeholder="¿Qué producto buscas?">
                    <div class="actions-group">
                        <button class="btn-go">Buscar</button>
                        <button id="clear-btn" class="btn-clear" title="Limpiar búsqueda">
                            <i class="fas fa-eraser"></i> Limpiar
                        </button>
                    </div>
                </div>

                <div id="voice" class="search-mode" style="display:none;">
                    <div class="voice-indicator" id="voice-trigger" style="cursor:pointer;">
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <span id="voice-status">Click para hablar...</span>
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

                        <div id="result-ui" style="display:none; flex-direction:column; align-items:center;">
                            <img id="photo-preview" style="max-width: 150px; border-radius: 10px; margin-bottom: 10px;"/>
                            <p class="success-text">¡PRODUCTO IDENTIFICADO!</p>
                            <button class="btn-clear-photo" id="clear-photo">Cambiar imagen</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <section>
        <div>
        
        </div>
    </section>
    `;
}

// --- FUNCIONES DE NAVEGACIÓN (GLOBALES) ---

window.openSearch = function (evt, modeName) {
    const tabcontent = document.getElementsByClassName("search-mode");
    const tablinks = document.getElementsByClassName("tab-btn");

    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    const selected = document.getElementById(modeName);
    if (selected) {
        selected.style.display = "flex";
        selected.classList.add("active");
    }

    evt.currentTarget.classList.add("active");
};

// --- LÓGICA DE EVENTOS ---

function initStoreEvents() {
    const fileInput = document.getElementById("file-upload");
    const preview = document.getElementById("photo-preview");
    const uploadUI = document.getElementById("upload-ui");
    const resultUI = document.getElementById("result-ui");
    const mainInput = document.getElementById("main-input");

    if (!fileInput) return;

    // EVENTO: Carga de Imagen y OCR
    fileInput.addEventListener("change", async function (event) {
        const file = event.target.files[0];
        if (!file) return;

        // Vista previa
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadUI.style.display = "none";
            resultUI.style.display = "flex";
            preview.src = e.target.result;
        };
        reader.readAsDataURL(file);

        // Procesamiento IA (OCR)
        if (mainInput) {
            mainInput.placeholder = "IA analizando imagen... 🔍";
            const textoExtraido = await getQueryFromImage(file);
            const textoLimpio = textoExtraido.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g, "").trim();
            
            mainInput.value = textoLimpio;
            mainInput.placeholder = "¿Qué producto buscas?";
            // Abrir pestaña de texto para mostrar el resultado
            document.querySelector('[onclick*="text"]').click();
        }
    });

    // EVENTO: Botón Limpiar (General)
    document.getElementById('clear-btn')?.addEventListener('click', () => {
        if (mainInput) mainInput.value = "";
        resetPhotoUI();
    });

    // EVENTO: Botón Limpiar Foto
    document.getElementById('clear-photo')?.addEventListener('click', resetPhotoUI);

    function resetPhotoUI() {
        if (fileInput) fileInput.value = "";
        if (uploadUI) uploadUI.style.display = "block";
        if (resultUI) resultUI.style.display = "none";
        if (preview) preview.src = "";
    }
}

// --- EXTRACCIÓN DE DATOS ---

export const getQueryFromVoice = () => {
    return new Promise((resolve) => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Navegador no compatible con voz.");
            return resolve("");
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'es-CO', 'en-EEUU';
        
        const statusMsg = document.getElementById('voice-status');
        if (statusMsg) statusMsg.innerText = "Escuchando... 🎙️";

        recognition.start();

        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            resolve(transcript);
        };

        recognition.onerror = () => {
            if (statusMsg) statusMsg.innerText = "Error al escuchar.";
            resolve("");
        };

        recognition.onend = () => {
            if (statusMsg) statusMsg.innerText = "Click para hablar...";
        };
    });
};

export const getQueryFromImage = async (file) => {
    try {
        const { data: { text } } = await Tesseract.recognize(file, 'spa');
        return text.trim().replace(/\n/g, ' ');
    } catch (error) {
        console.error("Error OCR:", error);
        return "";
    }
};

// --- ESCUCHADOR GLOBAL PARA CLICKS ---

document.addEventListener('click', async (event) => {
    const mainInput = document.getElementById('main-input');

    // Botón Buscar
    if (event.target.closest('.btn-go')) {
        console.log("Buscando:", mainInput?.value);
        // Aquí llamas a tu función de búsqueda real
    }

    // Disparador de Voz
    if (event.target.closest('#voice-trigger')) {
        const vozTexto = await getQueryFromVoice();
        if (vozTexto && mainInput) {
            mainInput.value = vozTexto;
            console.log(vozTexto)
            document.querySelector('[onclick*="text"]').click(); // Cambiar a pestaña texto
        }
    }
});

