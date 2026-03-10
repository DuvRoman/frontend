export function processImage(files) {
    const file = files[0]; // Capturamos el primer archivo seleccionado

    // 1. Validación: ¿El usuario seleccionó algo?
    if (!file) return;

    // 2. Validación opcional: ¿Es realmente una imagen?
    if (!file.type.startsWith('image/')) {
        alert("Por favor, selecciona un archivo de imagen válido.");
        return;
    }

    // 3. Leer el archivo para mostrar una previsualización o procesarlo
    const reader = new FileReader();

    reader.onload = function(e) {
        // Aquí 'e.target.result' contiene la imagen en formato Base64
        const imageData = e.target.result;
        
        // Ejemplo: Mostrar la imagen en un elemento <img> que tengas en tu HTML
        // Supongamos que tienes un <img id="preview">
        const preview = document.getElementById('preview-image');
        if(preview) {
            preview.src = imageData;
            preview.style.display = 'block';
        }

        console.log("Imagen cargada con éxito");
    };

    reader.readAsDataURL(file);
}