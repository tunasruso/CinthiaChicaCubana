import { useRef, useEffect } from 'react'
import GlassCard from '../components/GlassCard'
import './TimelineSection.css'

const milestones = [
    {
        year: '2001',
        title: 'Nací en Las Tunas',
        desc: 'Родилась в Лас-Тунас — городе на востоке Кубы, где жизнь начинается с музыки и заканчивается танцем.',
        emoji: '🌺',
        photo: '/photos/cinthia-street.jpg',
        side: 'left'
    },
    {
        year: '2019',
        title: 'Первая встреча с Россией',
        desc: 'Любовь, которая пересекла океан. Первые шаги в новом мире.',
        emoji: '❤️',
        photo: '/photos/cinthia-happy.jpg',
        side: 'right'
    },
    {
        year: '2021',
        title: 'Переезд в Россию',
        desc: 'Вся жизнь уместилась в один чемодан. Лас-Тунас осталась за океаном.',
        emoji: '✈️',
        photo: '/photos/cinthia-style.jpg',
        side: 'left'
    },
    {
        year: '2022',
        title: 'Mamá de Vladi',
        desc: 'Влади появился на свет — маленький россиянин с кубинской душой.',
        emoji: '👶',
        photo: '/photos/cinthia-home.jpg',
        side: 'right'
    },
    {
        year: '2023',
        title: 'Первая зима -25°C',
        desc: '"¡Dios mío, qué frío!" — Но я выжила. И даже полюбила снег. Почти.',
        emoji: '❄️',
        photo: '/photos/cinthia-winter.jpg',
        side: 'left'
    },
    {
        year: '2024',
        title: 'Блогер между мирами',
        desc: 'Начала вести блог на Facebook — и тысячи людей стали частью моей истории.',
        emoji: '📱',
        photo: '/photos/cinthia-selfie.jpg',
        side: 'right'
    },
]

export default function TimelineSection() {
    const timelineRef = useRef()
    const lineRef = useRef()

    useEffect(() => {
        const onScroll = () => {
            if (!timelineRef.current || !lineRef.current) return
            const rect = timelineRef.current.getBoundingClientRect()
            const windowH = window.innerHeight
            const progress = Math.max(0, Math.min(1, (windowH - rect.top) / (rect.height + windowH)))
            lineRef.current.style.height = `${progress * 100}%`
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('timeline__item--visible')
                }
            })
        }, { threshold: 0.3 })

        const items = timelineRef.current?.querySelectorAll('.timeline__item')
        items?.forEach(item => observer.observe(item))
        return () => observer.disconnect()
    }, [])

    return (
        <section id="timeline" className="section timeline">
            <div className="container">
                <span className="section-label">Mi camino</span>
                <h2 className="timeline__title">
                    Путь из<br />
                    <em>Лас-Тунас в Россию</em>
                </h2>

                <div ref={timelineRef} className="timeline__track">
                    <div className="timeline__line-bg"></div>
                    <div ref={lineRef} className="timeline__line-progress"></div>

                    {milestones.map((item, i) => (
                        <div key={i} className={`timeline__item timeline__item--${item.side}`}>
                            <div className="timeline__dot">
                                <span>{item.emoji}</span>
                            </div>

                            <GlassCard className="timeline__card">
                                <div className="timeline__card-photo">
                                    <img src={item.photo} alt={item.title} />
                                </div>
                                <div className="timeline__card-body">
                                    <span className="timeline__year">{item.year}</span>
                                    <h4 className="timeline__card-title">{item.title}</h4>
                                    <p className="timeline__card-desc">{item.desc}</p>
                                </div>
                            </GlassCard>

                            {i === 0 && (
                                <div className="timeline__video-companion">
                                    <video autoPlay loop muted playsInline src="/videos/cynthia8.mp4" />
                                </div>
                            )}
                            {i === 1 && (
                                <div className="timeline__video-companion timeline__video-companion--left">
                                    <video autoPlay loop muted playsInline src="/videos/cynthia11.mov" />
                                </div>
                            )}
                            {i === 2 && (
                                <div className="timeline__video-companion">
                                    <video autoPlay loop muted playsInline src="/videos/cynthia9.mov" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
