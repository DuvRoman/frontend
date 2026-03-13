import './Stores.css';

// HELPERS DE UI 

function openSearch(evt, modeName) {
    document.querySelectorAll('.search-mode').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('active');
    });

    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    const selected = document.getElementById(modeName);
    if (selected) {
        selected.style.display = 'flex';
        selected.classList.add('active');
    }

    evt.currentTarget.classList.add('active');
}

function toggleSearchMode(mode) {
    const title     = document.getElementById('main-title');
    const desc      = document.getElementById('mode-desc');
    const storeBtn  = document.getElementById('mode-store');
    const productBtn = document.getElementById('mode-product');
    const storeGrid = document.getElementById('store-section');
    const input     = document.getElementById('main-input');

    if (!title || !desc || !storeBtn || !productBtn || !storeGrid || !input) return;

    const isProduct = mode === 'product';

    title.innerHTML = isProduct
        ? 'Busca por <span class="green-text">Producto</span>'
        : 'Busca por <span class="green-text">Tienda</span>';

    desc.innerText = isProduct
        ? 'Busca un artículo y compararemos el precio en todos los supermercados.'
        : 'Selecciona un comercio para ver sus precios actuales.';

    productBtn.classList.toggle('active', isProduct);
    storeBtn.classList.toggle('active', !isProduct);
    storeGrid.classList.toggle('mode-product-active', isProduct);
    input.placeholder = isProduct ? 'Busca en TODAS las tiendas...' : '¿Qué buscas en esta tienda?';
}

//  INICIALIZACIÓN DEL COMPONENTE 

function initStoreEvents(container) {
    const fileInput = container.querySelector('#file-upload');
    const preview   = container.querySelector('#photo-preview');
    const uploadUI  = container.querySelector('#upload-ui');
    const resultUI  = container.querySelector('#result-ui');

    if (!fileInput || !preview || !uploadUI || !resultUI) return;

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            uploadUI.style.display = 'none';
            resultUI.style.display = 'flex';
            preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    // Botón buscar (texto)
    container.querySelector('.btn-go')?.addEventListener('click', () => {
        const texto = getQueryFromInput();
        console.log('Texto recibido del input:', texto);
        // Aquí ejecutas tu lógica con el string...
    });

    // Indicador de voz
    container.querySelector('.voice-indicator')?.addEventListener('click', async () => {
        console.log('Escuchando...');
        const voz = await getQueryFromVoice();
        console.log('Voz convertida a texto:', voz);
        // Aquí ejecutas tu lógica con el string...
    });

    // Carga de foto
    fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        console.log('Procesando imagen...');
        const textoFoto = await getQueryFromImage(file);
        console.log('Foto convertida a texto:', textoFoto);
        // Aquí ejecutas tu lógica con el string...
    });

    // Tabs de búsqueda
    container.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => openSearch(e, btn.dataset.tab));
    });

    // Modo tienda / producto
    container.querySelector('#mode-store')?.addEventListener('click', () => toggleSearchMode('store'));
    container.querySelector('#mode-product')?.addEventListener('click', () => toggleSearchMode('product'));
}

// EXTRACTORES DE QUERY 

export const getQueryFromInput = () => {
    const input = document.getElementById('main-input');
    return input ? input.value.trim() : '';
};

export const getQueryFromVoice = () => {
    return new Promise((resolve) => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn('Navegador no compatible con voz.');
            return resolve('');
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'es-CO';
        recognition.start();
        recognition.onresult = (e) => resolve(e.results[0][0].transcript);
        recognition.onerror  = () => resolve('');
    });
};

export const getQueryFromImage = async (file) => {
    if (!file) return '';

    // TODO: reemplazar con llamada real a Google Vision API
    return new Promise((resolve) => {
        setTimeout(() => resolve('Leche Deslactosada'), 1500);
    });
};

// COMPONENTE PRINCIPAL 
import Tesseract from 'tesseract.js';

export function Stores() {
    // Usamos un pequeño delay para asegurar que el DOM esté listo
    setTimeout(initStoreEvents, 0);
    
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

            <p id="mode-desc">Selecciona un comercio para ver sus precios actuales en Medellín.</p>
            <br>
            <h1 id="main-title">Busca tu <span class="green-text">Producto</span></h1>
            <br>
            <p id="mode-desc">
                Selecciona un producto en específico para ver sus precios actuales en Medellín.
            </p>
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

                        <div id="result-ui" style="display:none;">
                            <img id="photo-preview" alt="Vista previa del producto" />
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
    `;
}

// Se llama desde el router DESPUÉS de hacer innerHTML = Stores()
export function initStores() {
    const container = document.getElementById('app');
    initStoreEvents(container);
}
// // =========================================================
// // 1. LAS 3 FUNCIONES EXTRACTORAS (Retornan un String)
// // =========================================================

// // A. Función de Texto
// const obtenerTextoManual = () => {
//     const input = document.getElementById('main-input');
//     return input ? input.value.trim() : "";
// };

// // B. Función de Voz (Devuelve una Promesa con el String)
// const obtenerTextoPorVoz = () => {
//     return new Promise((resolve) => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (!SpeechRecognition) {
//             alert("Tu navegador no soporta búsqueda por voz. Intenta en Chrome.");
//             return resolve(""); // Retorna vacío si no hay soporte
//         }

//         const recognition = new SpeechRecognition();
//         recognition.lang = 'es-CO'; // Español de Colombia para máxima precisión
//         recognition.start();

//         recognition.onresult = (event) => resolve(event.results[0][0].transcript);
        
//         recognition.onerror = (event) => {
//             console.error("Error al escuchar:", event.error);
//             resolve(""); // Retorna vacío si falla para no bloquear la app
//         };
//     });
// };

// // C. Función de Foto/Imagen (Devuelve una Promesa con el String)
// const obtenerTextoPorImagen = (archivoFile) => {
//     return new Promise((resolve) => {
//         // * AQUÍ VA LA LÓGICA DE TU API (Google Vision o Tesseract.js) *
//         // Como es asíncrono, simulamos el tiempo de respuesta de la API (2 segundos)
//         setTimeout(() => {
//             const textoDetectado = "Zapatos Nike"; // Esto sería lo que te devuelve la API
//             resolve(textoDetectado);
//         }, 2000);
//     });
// };

// // =========================================================
// // 2. EL BUSCADOR CENTRAL (Donde llega el String final)
// // =========================================================
// const ejecutarBusquedaZyntra = (terminoABuscar) => {
//     if (!terminoABuscar) return; // Si llega vacío, no hace nada

//     console.log(`🚀 ZYNTRA INTELLIGENCE buscando: "${terminoABuscar}"`);
    
//     // (Opcional) Ponemos el texto en el input para que el usuario vea qué se buscó
//     const input = document.getElementById('main-input');
//     if (input) input.value = terminoABuscar;

//     // --- AQUÍ LLAMAS A TU FUNCIÓN DE FILTRAR CARDS ---
//     // filtrarTiendas(terminoABuscar); 
// };

// // =========================================================
// // 3. LOS DISPARADORES (Conectados a tu HTML)
// // =========================================================
// document.addEventListener('DOMContentLoaded', () => {

//     // 🎯 Disparador 1: Clic en el botón "Buscar" (Texto)
//     document.addEventListener('click', (e) => {
//         // Usamos .btn-go porque es la clase de tu botón en el HTML
//         if (e.target.matches('.btn-go') || e.target.closest('.btn-go')) {
//             e.preventDefault();
//             const texto = obtenerTextoManual();
//             ejecutarBusquedaZyntra(texto);
//         }
//     });

//     // 🎯 Disparador 2: Clic en el indicador de ondas (Voz)
//     const voiceIndicator = document.querySelector('.voice-indicator');
//     if (voiceIndicator) {
//         voiceIndicator.addEventListener('click', async () => {
//             // Efecto visual: Puedes cambiar el color del texto para indicar que está escuchando
//             const spanVoz = voiceIndicator.querySelector('span');
//             if (spanVoz) spanVoz.style.color = "#28a745"; 

//             const textoHablado = await obtenerTextoPorVoz();
            
//             if (spanVoz) spanVoz.style.color = ""; // Resetea el color
//             ejecutarBusquedaZyntra(textoHablado);
//         });
//     }

//     // 🎯 Disparador 3: Al seleccionar un archivo de imagen (Foto)
//     const fileUpload = document.getElementById('file-upload');
//     if (fileUpload) {
//         fileUpload.addEventListener('change', async (e) => {
//             const file = e.target.files[0];
//             if (!file) return;

//             // Cambiamos la UI según tu HTML (Oculta el botón de subir, muestra la foto)
//             const uploadUI = document.getElementById('upload-ui');
//             const resultUI = document.getElementById('result-ui');
//             const photoPreview = document.getElementById('photo-preview');

//             if (uploadUI) uploadUI.style.display = 'none';
//             if (resultUI) resultUI.style.display = 'block';
//             if (photoPreview) photoPreview.src = URL.createObjectURL(file);

//             // Pasamos la foto a la función y esperamos el texto
//             const textoDesdeFoto = await obtenerTextoPorImagen(file);
//             ejecutarBusquedaZyntra(textoDesdeFoto);
//         });
//     }
// });

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

