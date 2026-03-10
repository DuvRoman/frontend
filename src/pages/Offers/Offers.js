import './Offers.css'

// ✅ Funciones globales accesibles desde el HTML
window.showLoginMessage = function() {
    document.getElementById('loginModal').style.display = 'flex';
}
window.closeModal = function() {
    document.getElementById('loginModal').style.display = 'none';
}

export function Offers (){
    return`
     <header class="hero-offers">
        <div class="bot-badge">
            <span class="pulse"></span> Bot Scrapy: Nivel 5 Activo
        </div>
        <h1>Gangas <span class="green-text">Encontradas</span></h1>
        <p>Precios reales en Medellín. Inicia sesión para desbloquear la ubicación.</p>
    </header>

    <section class="offers-grid">
        <div class="offer-card" onclick="showLoginMessage()">
            <div class="discount-tag">-50%</div>
            <div class="offer-image"><i class="fas fa-plug"></i></div>
            <div class="offer-body">
                <span class="cat">Tecnología</span>
                <h3>Audífonos Sony XM5</h3>
                <div class="prices">
                    <span class="old-p">$1.800.000</span>
                    <span class="new-p">$900.000</span>
                </div>
                <div class="lock-zone">
                    <i class="fas fa-lock"></i> <span class="blur-txt">Tienda Bloqueada</span>
                </div>
                <button class="btn-card">Revelar Tienda</button>
            </div>
        </div>

        <div class="offer-card" onclick="showLoginMessage()">
            <div class="discount-tag">-25%</div>
            <div class="offer-image"><i class="fas fa-utensils"></i></div>
            <div class="offer-body">
                <span class="cat">Hogar</span>
                <h3>Air Fryer 5L Premium</h3>
                <div class="prices">
                    <span class="old-p">$450.000</span>
                    <span class="new-p">$337.500</span>
                </div>
                <div class="lock-zone">
                    <i class="fas fa-lock"></i> <span class="blur-txt">Tienda Bloqueada</span>
                </div>
                <button class="btn-card">Revelar Tienda</button>
            </div>
        </div>

        <div class="offer-card" onclick="showLoginMessage()">
            <div class="discount-tag">-15%</div>
            <div class="offer-image"><i class="fas fa-bicycle"></i></div>
            <div class="offer-body">
                <span class="cat">Deportes</span>
                <h3>Bicicleta de Montaña R29</h3>
                <div class="prices">
                    <span class="old-p">$2.100.000</span>
                    <span class="new-p">$1.785.000</span>
                </div>
                <div class="lock-zone">
                    <i class="fas fa-lock"></i> <span class="blur-txt">Tienda Bloqueada</span>
                </div>
                <button class="btn-card">Revelar Tienda</button>
            </div>
        </div>
    </section>

    <div id="loginModal" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-icon"><i class="fas fa-shield-halved"></i></div>
            <h2>Acceso para Miembros</h2>
            <p>Para ver en qué tienda de Medellín está esta oferta, inicia sesión en tu cuenta Zyntra.</p>
            <button class="btn-modal-login" onclick="navigateTo('/login')">Ir al Login</button>
            <button class="btn-modal-close" onclick="closeModal()">Seguir explorando</button>
        </div>
    </div>`
}