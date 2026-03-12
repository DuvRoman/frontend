import './Login.css'
export function Login (){
    return`
    <div class="Container-center">
    <div class="container" id="container">
        <div class="form-container sign-up-container">
            <form action="#">
                <h1>Crear Cuenta</h1>
                <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social"><i class="fab fa-google"></i></a>
                </div>
                <span class="small-info">o usa tu correo para registrarte</span>
                <input id="name" type="text" placeholder="Nombre completo" required />
                <input id="email" type="email" placeholder="Correo Electrónico" required />
                <input id="number" type="number" placeholder="Celular" required />
                <input id="password" type="password" placeholder="Contraseña" required />
                <input id= "confirmPassword" type="password" placeholder="Confirmar Contraseña" required />
                <button class="btn-primary">Registrarse</button>
            </form>
        </div>

        <div class="form-container sign-in-container">
            <form action="#">
                <h1>Iniciar Sesión</h1>
                <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social"><i class="fab fa-google"></i></a>
                </div>
                <span class="small-info">usa tu cuenta</span>
                <input type="email" placeholder="Correo Electrónico" required />
                <input type="password" placeholder="Contraseña" required />
                <a href="#" class="forgot">¿Olvidaste tu contraseña?</a>
                <button class="btn-primary">Entrar</button>
            </form>
        </div>

        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <h1>¡Bienvenido!</h1>
                    <p>Para seguir descubriendo ofertas en Medellín, inicia sesión con tus datos.</p>
                    <br>
                    <p>Te mantendremos al tanto de las ofertas y de tus productos favoritos en descuento, por medio de tu numero celular 📲</p>
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
    </div>` } 
    
    
export function loginEvents() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if (!signUpButton || !signInButton || !container) return;

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
}

function record (){
    const name = document.getElementById("name")
    const email = document.getElementById("email") 
    const password = document.getElementById("password")
    const confirmPassword = document.getElementById("ConfirmPassword")
    const number = document.getElementById("number")

}