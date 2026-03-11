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


// 1. EXTRAER DE TEXTO (Síncrona)
// Retorna lo que haya en el input en ese momento.
export const getQueryFromInput = () => {
    const input = document.getElementById('main-input');
    return input ? input.value.trim() : "";
};

// 2. EXTRAER DE VOZ (Asíncrona)
// Retorna una Promesa que se resuelve con el texto hablado.
export const getQueryFromVoice = () => {
    return new Promise((resolve) => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn("Navegador no compatible con voz.");
            return resolve("");
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'es-CO';
        recognition.start();

        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            resolve(transcript); // <--- AQUÍ RETORNA EL STRING
        };

        recognition.onerror = () => resolve(""); 
    });
};

// 3. EXTRAER DE FOTO (Asíncrona)
// Recibe el objeto 'file' del input y retorna el texto identificado.
export const getQueryFromImage = async (file) => {
    if (!file) return "";

    // Simulación de procesamiento de IA (OCR/Vision)
    return new Promise((resolve) => {
        setTimeout(() => {
            // Aquí iría la respuesta de tu API de Google Vision
            const aiResult = "Leche Deslactosada"; 
            resolve(aiResult); // <--- AQUÍ RETORNA EL STRING
        }, 1500);
    });
};

// Ejemplo con el botón de BUSCAR
document.querySelector('.btn-go').onclick = () => {
    const miTexto = getQueryFromInput(); // Recibes el return
    console.log("Texto recibido:", miTexto);
    // Ahora haz lo que quieras con 'miTexto'
};

// Ejemplo con VOZ (al ser asíncrona usas 'await')
document.querySelector('.voice-indicator').onclick = async () => {
    const miVoz = await getQueryFromVoice(); // Esperas el return
    console.log("Voz convertida a texto:", miVoz);
};

// Ejemplo con FOTO
document.getElementById('file-upload').onchange = async (e) => {
    const miFotoTexto = await getQueryFromImage(e.target.files[0]); // Esperas el return
    console.log("Foto convertida a texto:", miFotoTexto);
};







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