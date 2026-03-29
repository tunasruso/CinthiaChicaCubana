import './FooterSection.css'

export default function FooterSection() {
    return (
        <footer className="footer">
            {/* Wave SVG divider */}
            <div className="footer__wave">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0 60C240 100 480 20 720 60C960 100 1200 20 1440 60V120H0V60Z" fill="currentColor" />
                </svg>
            </div>

            {/* Marquee quote */}
            <div className="footer__marquee-wrap">
                <div className="footer__marquee">
                    <span className="footer__marquee-text">
                        No importa dónde estés, tu corazón sabe el camino · Неважно, где ты — сердце знает дорогу ·
                        No importa dónde estés, tu corazón sabe el camino · Неважно, где ты — сердце знает дорогу ·
                    </span>
                </div>
            </div>

            <div className="footer__content container">
                <div className="footer__brand">
                    <span className="footer__logo">Cynthiia Nova<span className="footer__dot">.</span></span>
                    <p className="footer__tagline">Cubana 🇨🇺 viviendo en Rusia 🇷🇺</p>
                </div>

                <div className="footer__links">
                    <div className="footer__link-group">
                        <h4>Навигация</h4>
                        <a href="#about">Quién soy</a>
                        <a href="#contrast">Dos mundos</a>
                        <a href="#timeline">Mi camino</a>
                        <a href="#globe">Mapa</a>
                        <a href="#diario">Diario</a>
                    </div>
                    <div className="footer__link-group">
                        <h4>Соцсети</h4>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>© 2024 Cynthiia Nova — Made between two worlds 🌴❄️</p>
                    <p className="footer__made">Hecho con amor entre Las Tunas y Москва</p>
                </div>
            </div>
        </footer>
    )
}
