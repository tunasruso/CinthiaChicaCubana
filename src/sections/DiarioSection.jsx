import { useRef, useEffect } from 'react'
import GlassCard from '../components/GlassCard'
import './DiarioSection.css'

const posts = [
    {
        photo: '/photos/cinthia-winter.jpg',
        date: '15 января 2024',
        mood: '❄️',
        title: 'Первая настоящая метель',
        snippet: 'Сегодня вышла на улицу и поняла — я не вижу дороги. Всё белое. Всё. На Кубе такое только в кино показывают...',
        tag: 'Зима'
    },
    {
        photo: '/photos/cinthia-outdoor.jpg',
        date: '8 марта 2024',
        mood: '❤️',
        title: '8 марта в России — это что-то!',
        snippet: 'На Кубе мы каждый день празднуем женщину. А тут — один день, но зато какой! Цветы, подарки, "ты самая лучшая"...',
        tag: 'Культура'
    },
    {
        photo: '/photos/cinthia-home.jpg',
        date: '22 мая 2024',
        mood: '👶',
        title: 'Влади сказал "мамá" по-кубински',
        snippet: 'Он говорит "мáма" с ударением на первый слог, как у нас на Кубе. Мое сердце остановилось на секунду...',
        tag: 'Материнство'
    },
    {
        photo: '/photos/cinthia-cuba.jpg',
        date: '4 июля 2024',
        mood: '🌴',
        title: 'Скучаю по запаху моря',
        snippet: 'Закрываю глаза — и чувствую запах океана. Малекон, вечер, ветер в волосах. ¿Cuándo volveré?',
        tag: 'Nostalgia'
    },
    {
        photo: '/photos/cinthia-look.jpg',
        date: '12 сентября 2024',
        mood: '💃',
        title: 'Станцевала сальсу в метро',
        snippet: 'Музыкант в переходе играл что-то похожее на son cubano. Я не выдержала. Танцевала. Люди снимали на телефон 😂',
        tag: 'Vida loca'
    },
    {
        photo: '/photos/cinthia-moments.jpg',
        date: '3 ноября 2024',
        mood: '🤔',
        title: 'Между двумя мирами',
        snippet: 'Иногда я чувствую, что не принадлежу ни там, ни тут. Но потом смотрю на Влади и понимаю: мой мир — он.',
        tag: 'Reflexión'
    },
]

export default function DiarioSection() {
    const gridRef = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.diario__post')
                    cards.forEach((card, i) => {
                        setTimeout(() => card.classList.add('diario__post--visible'), i * 120)
                    })
                }
            })
        }, { threshold: 0.1 })

        if (gridRef.current) observer.observe(gridRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section id="diario" className="section diario">
            <div className="container">
                <span className="section-label">Diario</span>
                <h2 className="diario__title">
                    Diario de una<br />
                    <em>cubana en Rusia</em>
                </h2>
                <p className="diario__desc">
                    Записки из жизни между двумя мирами. Смех, слёзы, снег и сальса.
                </p>

                <div ref={gridRef} className="diario__grid">
                    {posts.map((post, i) => (
                        <GlassCard key={i} className={`diario__post diario__post--${i % 3 === 1 ? 'tall' : 'regular'}`}>
                            <div className="diario__post-photo">
                                <img src={post.photo} alt={post.title} />
                                <div className="diario__post-mood">{post.mood}</div>
                            </div>
                            <div className="diario__post-body">
                                <div className="diario__post-meta">
                                    <span className="diario__post-date">{post.date}</span>
                                    <span className="diario__post-tag">{post.tag}</span>
                                </div>
                                <h4 className="diario__post-title">{post.title}</h4>
                                <p className="diario__post-snippet">{post.snippet}</p>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                <div className="diario__cta">
                    <a href="https://www.facebook.com/profile.php?id=61585968043753" target="_blank" rel="noopener noreferrer" className="diario__cta-btn">
                        Читать в Facebook
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}
