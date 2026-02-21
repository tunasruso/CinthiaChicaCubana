import { useRef, useEffect } from 'react'
import './DiarioSection.css'

const posts = [
    {
        photo: '/photos/cinthia-winter.jpg',
        date: '15 Ene',
        category: 'Vida',
        tag: '🔥',
        title: 'PRIMERA NEVADA REAL EN RUSIA',
        snippet: 'Сегодня вышла на улицу и поняла — я не вижу дороги. Всё белое. На Кубе такое только в кино показывают...',
        size: 'featured',
    },
    {
        photo: '/photos/cinthia-outdoor.jpg',
        date: '8 Mar',
        category: 'Cultura',
        title: '8 МАРТА — ЭТО ЧТО-ТО!',
        snippet: 'На Кубе мы каждый день празднуем женщину. А тут — один день, но зато какой! Цветы, подарки...',
        size: 'medium',
    },
    {
        photo: '/photos/cinthia-home.jpg',
        date: '22 May',
        category: 'Familia',
        title: 'MI ALMA — ВЛАДИ',
        snippet: 'Он говорит «мáма» с ударением на первый слог, как у нас на Кубе.',
        size: 'small',
    },
    {
        photo: '/photos/cinthia-cuba.jpg',
        date: '4 Jul',
        category: 'Nostalgia',
        title: 'EXTRAÑO EL MAR',
        snippet: 'Закрываю глаза — и чувствую запах океана. Малекон, вечер, ветер в волосах. ¿Cuándo volveré?',
        size: 'medium',
    },
    {
        photo: '/photos/cinthia-look.jpg',
        date: '12 Sep',
        category: 'Vlogs',
        title: 'CAPÍTULO 2: ¿QUE COMEN EN RUSIA?',
        snippet: '¡Familia! Aquí les traigo el Capítulo 2. Hoy les muestro dónde resuelven los estudiantes aquí en Rusia.',
        size: 'small',
    },
    {
        photo: '/photos/cinthia-moments.jpg',
        date: '3 Nov',
        category: 'Reflexión',
        title: 'ENTRE DOS MUNDOS',
        snippet: 'Иногда я чувствую, что не принадлежу ни там, ни тут. Но потом смотрю на Влади и понимаю: мой мир — он.',
        size: 'small',
    },
]

const categories = ['Vida', 'Nostalgia', 'Familia', 'Vlogs', 'Cultura', 'Reflexión', 'Comida', 'Baile']

export default function DiarioSection() {
    const gridRef = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.blog__card')
                    cards.forEach((card, i) => {
                        setTimeout(() => card.classList.add('blog__card--visible'), i * 100)
                    })
                }
            })
        }, { threshold: 0.1 })

        if (gridRef.current) observer.observe(gridRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section id="diario" className="section diario-new">
            <div className="container">
                <div className="blog__header">
                    <h2 className="blog__heading">DIARIO</h2>
                    <a href="https://www.facebook.com/profile.php?id=61585968043753" target="_blank" rel="noopener noreferrer" className="blog__read-btn">
                        Leer en Facebook
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

                <div ref={gridRef} className="blog__bento">
                    {/* Featured large card */}
                    <div className="blog__card blog__card--featured">
                        <div className="blog__card-img">
                            <img src={posts[0].photo} alt={posts[0].title} />
                            {posts[0].tag && <span className="blog__card-badge">{posts[0].tag}</span>}
                        </div>
                        <div className="blog__card-meta">
                            <span className="blog__card-cat">{posts[0].category}</span>
                            <span className="blog__card-sep">·</span>
                            <span className="blog__card-date">{posts[0].date}</span>
                        </div>
                        <h3 className="blog__card-title blog__card-title--lg">{posts[0].title}</h3>
                    </div>

                    {/* Medium text card */}
                    <div className="blog__card blog__card--text">
                        <div className="blog__card-meta">
                            <span className="blog__card-cat">{posts[1].category}</span>
                            <span className="blog__card-sep">·</span>
                            <span className="blog__card-date">{posts[1].date}</span>
                        </div>
                        <h3 className="blog__card-title blog__card-title--xl">{posts[1].title}</h3>
                        <p className="blog__card-snippet">{posts[1].snippet}</p>
                        <div className="blog__card-links">
                            <span className="blog__card-link">{posts[3].title} <span className="arrow">→</span></span>
                            <span className="blog__card-link">{posts[4].title} <span className="arrow">→</span></span>
                        </div>
                    </div>

                    {/* Small accent card */}
                    <div className="blog__card blog__card--accent">
                        <div className="blog__card-img">
                            <img src={posts[2].photo} alt={posts[2].title} />
                        </div>
                        <div className="blog__card-meta">
                            <span className="blog__card-cat">{posts[2].category}</span>
                            <span className="blog__card-sep">·</span>
                            <span className="blog__card-date">{posts[2].date}</span>
                        </div>
                        <h3 className="blog__card-title">{posts[2].title}</h3>
                    </div>

                    {/* Bottom row: image card */}
                    <div className="blog__card blog__card--bottom-img">
                        <div className="blog__card-img">
                            <img src={posts[3].photo} alt={posts[3].title} />
                        </div>
                        <div className="blog__card-meta">
                            <span className="blog__card-cat">{posts[3].category}</span>
                            <span className="blog__card-sep">·</span>
                            <span className="blog__card-date">{posts[3].date}</span>
                        </div>
                        <h3 className="blog__card-title">{posts[3].title}</h3>
                    </div>

                    {/* Bottom row: video card */}
                    <div className="blog__card blog__card--video">
                        <div className="blog__card-img">
                            <img src={posts[4].photo} alt={posts[4].title} />
                            <div className="blog__card-play">▶</div>
                        </div>
                        <div className="blog__card-meta">
                            <span className="blog__card-cat">{posts[4].category}</span>
                            <span className="blog__card-sep">·</span>
                            <span className="blog__card-date">{posts[4].date}</span>
                        </div>
                        <h3 className="blog__card-title">{posts[4].title}</h3>
                    </div>

                    {/* Categories card */}
                    <div className="blog__card blog__card--categories">
                        <div className="blog__cat-pills">
                            {categories.map((cat, i) => (
                                <span key={i} className="blog__cat-pill">{cat}</span>
                            ))}
                        </div>
                        <a href="https://www.facebook.com/profile.php?id=61585968043753" target="_blank" rel="noopener noreferrer" className="blog__view-all">
                            Ver todo el diario
                            <span className="arrow">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
