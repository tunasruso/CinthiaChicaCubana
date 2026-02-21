import { useRef, useEffect } from 'react'
import GlassCard from '../components/GlassCard'
import './ContrastSection.css'

const contrasts = [
    {
        topic: 'Погода',
        cuba: { emoji: '☀️', title: '+35°C todo el año', desc: 'Солнце, влажность, бесконечное лето' },
        russia: { emoji: '❄️', title: '-20°C зимой', desc: 'Снег, холод, шуба, шапка, три слоя' }
    },
    {
        topic: 'Ритм жизни',
        cuba: { emoji: '💃', title: 'Siempre música', desc: 'Сальса на улицах, ночные гулянки, живой ритм' },
        russia: { emoji: '🤫', title: 'Тишина и порядок', desc: 'Метро, расписание, "не шумите после 22:00"' }
    },
    {
        topic: 'Еда',
        cuba: { emoji: '🍌', title: 'Arroz y frijoles', desc: 'Рис, фасоль, свежие фрукты, ром' },
        russia: { emoji: '🥟', title: 'Пельмени и борщ', desc: 'Сметана, укроп, "попробуй оливье"' }
    },
    {
        topic: 'Люди',
        cuba: { emoji: '🤗', title: 'Abrazo al instante', desc: 'Все друг друга знают, обнимают, целуют' },
        russia: { emoji: '🧊', title: 'Сначала дистанция', desc: 'Но потом — самые верные друзья навсегда' }
    },
    {
        topic: 'Транспорт',
        cuba: { emoji: '🚗', title: 'Almendrones 1957', desc: 'Ретро-машины, автостоп, "¿pa\' dónde vas?"' },
        russia: { emoji: '🚇', title: 'Метро и такси', desc: 'Яндекс.Такси, метро каждые 2 минуты' }
    },
]

export default function ContrastSection() {
    const scrollRef = useRef()
    const sectionRef = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.contrast__card').forEach((el, i) => {
                        setTimeout(() => el.classList.add('contrast__card--visible'), i * 200)
                    })
                }
            })
        }, { threshold: 0.1 })

        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} id="contrast" className="section contrast">
            <div className="container">
                <span className="section-label">Dos mundos</span>
                <h2 className="contrast__title">
                    Cuba <span className="contrast__arrow">↔</span> <em>Россия</em>
                </h2>
                <p className="contrast__desc">
                    Два мира. Два ритма. Одно сердце, которое бьётся между ними.
                </p>
            </div>

            <div className="contrast__scroll-area" ref={scrollRef}>
                <div className="contrast__track">
                    {contrasts.map((item, i) => (
                        <GlassCard key={i} className="contrast__card" hover={false}>
                            <div className="contrast__card-header">
                                <span className="contrast__topic">{item.topic}</span>
                            </div>
                            <div className="contrast__split">
                                <div className="contrast__side contrast__side--warm">
                                    <span className="contrast__emoji">{item.cuba.emoji}</span>
                                    <h4>{item.cuba.title}</h4>
                                    <p>{item.cuba.desc}</p>
                                </div>
                                <div className="contrast__divider">
                                    <div className="contrast__divider-line"></div>
                                </div>
                                <div className="contrast__side contrast__side--cold">
                                    <span className="contrast__emoji">{item.russia.emoji}</span>
                                    <h4>{item.russia.title}</h4>
                                    <p>{item.russia.desc}</p>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    )
}
