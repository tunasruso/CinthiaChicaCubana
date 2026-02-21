import { useState, useEffect } from 'react'
import './Navigation.css'

const navItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'about', label: 'Quién soy' },
    { id: 'contrast', label: 'Dos mundos' },
    { id: 'timeline', label: 'Mi camino' },
    { id: 'globe', label: 'Mapa' },
    { id: 'diario', label: 'Diario' },
    { id: 'videos', label: 'Baila' },
]

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false)
    const [active, setActive] = useState('hero')
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 100)
            const sections = navItems.map(item => {
                const el = document.getElementById(item.id)
                return el ? { id: item.id, top: el.offsetTop, height: el.offsetHeight } : null
            }).filter(Boolean)

            const scrollPos = window.scrollY + window.innerHeight / 3
            for (let i = sections.length - 1; i >= 0; i--) {
                if (scrollPos >= sections[i].top) {
                    setActive(sections[i].id)
                    break
                }
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
    }

    return (
        <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
            <div className="nav__inner">
                <button className="nav__logo" onClick={() => scrollTo('hero')}>
                    <span className="nav__logo-text">Cinthia</span>
                    <span className="nav__logo-dot"></span>
                </button>

                <div className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav__link ${active === item.id ? 'nav__link--active' : ''}`}
                            onClick={() => scrollTo(item.id)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <a href="https://www.facebook.com/profile.php?id=61585968043753" target="_blank" rel="noopener noreferrer" className="nav__cta">
                    Facebook
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                </a>

                <button className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span><span></span><span></span>
                </button>
            </div>
        </nav>
    )
}
