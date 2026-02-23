import { useRef, useEffect } from 'react'
import GlassCard from '../components/GlassCard'
import './AboutSection.css'

export default function AboutSection() {
    const sectionRef = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.about__reveal').forEach((el, i) => {
                        setTimeout(() => el.classList.add('about__reveal--visible'), i * 150)
                    })
                }
            })
        }, { threshold: 0.2 })

        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} id="about" className="section about">
            <div className="about__bg-accent"></div>
            <div className="container">
                <div className="about__grid">
                    <div className="about__photo-col about__reveal">
                        <div className="about__media-row">
                            <div className="about__photo-wrapper">
                                <img src="/photos/cinthia-cuba.jpg" alt="Cynthiia Nova - cubana en Rusia" className="about__photo" />
                                <div className="about__photo-badge glass">
                                    <span>🌺</span> Las Tunas, Cuba
                                </div>
                            </div>
                            <div className="about__video-stack">
                                <div className="about__video-card">
                                    <video autoPlay loop muted playsInline src="/videos/cynthia4.mp4" />
                                </div>
                                <div className="about__video-card">
                                    <video autoPlay loop muted playsInline src="/videos/cynthia5.mov" />
                                </div>
                            </div>
                        </div>
                        <div className="about__media-row about__media-row--lower">
                            <div className="about__video-stack">
                                <div className="about__video-card">
                                    <video autoPlay loop muted playsInline src="/videos/cynthia6.mp4" />
                                </div>
                            </div>
                            <div className="about__video-large">
                                <video autoPlay loop muted playsInline src="/videos/cynthia7.mp4" />
                            </div>
                            <div className="about__photo-secondary">
                                <img src="/photos/cinthia-casual.jpg" alt="Cynthiia Nova casual" className="about__photo" />
                            </div>
                        </div>
                    </div>

                    <div className="about__text-col">
                        <span className="section-label about__reveal">Quién soy</span>
                        <h2 className="about__title about__reveal">
                            Soy Cynthiia Nova,<br />
                            <em>chica cubana</em><br />
                            в России
                        </h2>

                        <GlassCard className="about__bio-card about__reveal">
                            <div className="about__bio-content">
                                <p className="about__bio-quote">
                                    «Cubana 🇨🇺 viviendo en Rusia 🇷🇺. Experiencias, mi día a día, familia, vlogs, hijos. De todo un poco ✨»
                                </p>
                                <p>
                                    Мне 23. Я из Лас-Тунас — города на востоке Кубы, где музыка звучит на каждой улице. Сейчас живу в России, создаю контент, растю сына и делюсь историями между двумя мирами.
                                </p>
                                <p>
                                    Я — мама Влади, digital content creator и автор влогов о жизни кубинки в России. На моём канале — «Capítulo» за «Capítulo» про еду, людей, зиму и всё, что между Кубой и Россией.
                                </p>
                            </div>
                        </GlassCard>

                        <div className="about__pills about__reveal">
                            <span className="pill">🎂 23 года</span>
                            <span className="pill">🇨🇺 Las Tunas</span>
                            <span className="pill">👶 Mamá de Vladi</span>
                            <span className="pill">📍 Москва / Россия</span>
                            <span className="pill">🎬 Content Creator</span>
                            <span className="pill">💃 Cubana de corazón</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
