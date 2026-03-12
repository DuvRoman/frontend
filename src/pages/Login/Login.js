import './Login.css'

export function Login() {
    return `
    <div class="container-center">

        <div class="container" id="container">

            <div class="form-container sign-up-container">
                <form id="form-register" novalidate>
                    <h1>Crear Cuenta</h1>

                    <div class="social-container">
                        <a href="#" class="social" aria-label="Registrarse con Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="social" aria-label="Registrarse con Google">
                            <i class="fab fa-google"></i>
                        </a>
                    </div>

                    <span class="small-info">o usa tu correo para registrarte</span>

                    <input id="name"            type="text"     placeholder="Nombre completo"       autocomplete="name"     required />
                    <input id="email"           type="email"    placeholder="Correo Electrónico"    autocomplete="email"    required />
                    <input id="number"          type="tel"      placeholder="Celular"               autocomplete="tel"      required />
                    <input id="password"        type="password" placeholder="Contraseña"            autocomplete="new-password" required />
                    <input id="confirmPassword" type="password" placeholder="Confirmar Contraseña"  autocomplete="new-password" required />

                    <button id="register" type="submit" class="btn-primary">
                        Registrarse
                    </button>
                </form>
            </div>

            <div class="form-container sign-in-container">
                <form id="form-login" novalidate>
                    <h1>Iniciar Sesión</h1>

                    <div class="social-container">
                        <a href="#" class="social" aria-label="Iniciar sesión con Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="social" aria-label="Iniciar sesión con Google">
                            <i class="fab fa-google"></i>
                        </a>
                    </div>

                    <span class="small-info">usa tu cuenta</span>

                    <input type="email"    placeholder="Correo Electrónico" autocomplete="email"    required />
                    <input type="password" placeholder="Contraseña"         autocomplete="current-password" required />

                    <a href="#" class="forgot">¿Olvidaste tu contraseña?</a>

                    <button type="submit" class="btn-primary">Entrar</button>
                </form>
            </div>

            <div class="overlay-container">
                <div class="overlay">

                    <div class="overlay-panel overlay-left">
                        <h1>¡Bienvenido!</h1>
                        <p>Para seguir descubriendo ofertas en Medellín, inicia sesión con tus datos.</p>
                        <br>
                        <p>Te mantendremos al tanto de las ofertas y de tus productos favoritos en descuento, por medio de tu número celular 📲</p>
                        <br>
                        <button class="btn-outline-white" id="signIn">Ya tengo cuenta</button>
                    </div>

                    <div class="overlay-panel overlay-right">
                        <h1>¿Nuevo aquí?</h1>
                        <p>Regístrate y empieza a usar nuestro bot Scrapy para encontrar los mejores precios.</p>
                        <br>
                        <button class="btn-outline-white" id="signUp">Crear cuenta</button>
                    </div>

                </div>
            </div>

        </div>
    </div>`;
}

/*
EVENTOS DEL OVERLAY (cambiar entre paneles)
*/
export function loginEvents() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container    = document.getElementById('container');

    if (!signUpButton || !signInButton || !container) return;

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
}

/* 
REGISTRO DE USUARIO
*/
let user = {
    name    : "",
    email   : "",
    password: "",
    number  : ""
};

export function record() {
    const nameUser        = document.getElementById("name");
    const email           = document.getElementById("email");
    const password        = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const number          = document.getElementById("number");
    const form            = document.getElementById("form-register");

    // Si algún elemento no existe, no seguir
    if (!nameUser || !email || !password || !confirmPassword || !number || !form) return;

    // Actualizar objeto user en tiempo real
    nameUser.addEventListener("input", (e) => { user.name     = e.target.value; });
    email.addEventListener("input",    (e) => { user.email    = e.target.value; });
    password.addEventListener("input", (e) => { user.password = e.target.value; });
    number.addEventListener("input",   (e) => { user.number   = e.target.value; });

    // Escuchar el submit del form (no el click del botón)
    form.addEventListener("submit", (e) => {
        e.preventDefault(); //  evita el refresco de página

        // Validar contraseñas
        if (password.value !== confirmPassword.value) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Validar campos vacíos
        if (!user.name || !user.email || !user.password || !user.number) {
            alert("Por favor completa todos los campos.");
            return;
        }

        console.log(" Usuario registrado:", user);
    });
}