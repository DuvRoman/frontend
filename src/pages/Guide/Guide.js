import './Guide.css'
export function Guide() {
    return `
    <header class="hero-guide">
        <span class="badge">TECNOLOGÍA SCRAPY V5</span>
        <h1>¿Cómo funciona <span class="green-text">Zyntra</span>?</h1>
        <p class="main-desc">Nuestro bot rastrea los precios de Medellín para que siempre encuentres la opción más barata.</p>
    </header>

    <section class="video-section">
        <div class="video-container">
            <div class="placeholder-content">
                <i class="fas fa-play-circle"></i>
                <p>Carga aquí tu video explicativo</p>
                <span>Formatos sugeridos: .mp4 o .webm</span>
            </div>
        </div>
    </section>

    <main class="steps-container">
        
        <div class="step-card">
            <div class="step-number">01</div>
            <div class="step-icon">
                <i class="fas fa-search"></i>
            </div>
            <h3>Buscas</h3>
            <p>Escribe el producto que quieres comprar en cualquier tienda de la ciudad.</p>
        </div>

        <div class="step-card highlight">
            <div class="step-number">02</div>
            <div class="step-icon bot-glow">
                <i class="fas fa-robot"></i>
            </div>
            <h3>El Bot Compara</h3>
            <p>Nuestro <b>Scrapy Bot</b> revisa los precios actuales en Éxito, D1, Ara y más al mismo tiempo.</p>
        </div>

        <div class="step-card">
            <div class="step-number">03</div>
            <div class="step-icon">
                <i class="fas fa-hand-holding-usd"></i>
            </div>
            <h3>Ahorras</h3>
            <p>Te mostramos quién tiene el precio más bajo para que no pagues ni un peso de más.</p>
        </div>

    </main>

    <section class="cta-bottom">
        <h2>¿Listo para empezar?</h2>
        <button class="btn-go-offers" onclick="navigateTo('/offers')">Ver ofertas activas</button>
    </section>
    `
}