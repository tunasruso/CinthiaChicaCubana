import './FooterSection.css'

export default function FooterSection() {
    return (
        <footer className="footer">
            <div className="footer__quote-wrap">
                <blockquote className="footer__quote">
                    "No importa dónde estés,<br />
                    <em>tu corazón sabe el camino</em>"
                </blockquote>
                <p className="footer__quote-translation">
                    — Неважно, где ты находишься. Твоё сердце знает дорогу.
                </p>
            </div>

            <div className="footer__content container">
                <div className="footer__brand">
                    <span className="footer__logo">Cinthia<span className="footer__dot">.</span></span>
                    <p className="footer__tagline">Chica Cubana en Rusia</p>
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
                        <a href="https://www.facebook.com/profile.php?id=61585968043753" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>© 2024 Cinthia — Made between two worlds 🌴❄️</p>
                    <p className="footer__made">Hecho con amor entre Las Tunas y Иваново</p>
                </div>
            </div>
        </footer>
    )
}
