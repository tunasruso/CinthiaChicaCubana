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
                        <div className="about__photo-wrapper">
                            <img src="/photos/cinthia-cuba.jpg" alt="Cinthia en Cuba" className="about__photo" />
                            <div className="about__photo-badge glass">
                                <span>🌺</span> Las Tunas, Cuba
                            </div>
                        </div>
                        <div className="about__photo-secondary">
                            <img src="/photos/cinthia-casual.jpg" alt="Cinthia casual" className="about__photo" />
                        </div>
                    </div>

                    <div className="about__text-col">
                        <span className="section-label about__reveal">Quién soy</span>
                        <h2 className="about__title about__reveal">
                            Soy Cinthia,<br />
                            <em>chica cubana</em><br />
                            в России
                        </h2>

                        <GlassCard className="about__bio-card about__reveal">
                            <div className="about__bio-content">
                                <p>
                                    Мне 23. Я из Лас-Тунас — города на востоке Кубы, где музыка звучит на каждой улице, а солнце не заходит до поздней ночи.
                                    Теперь я живу в России, где зима длится полгода, а люди сначала кажутся холодными, но потом становятся самыми близкими.
                                </p>
                                <p>
                                    Я — мама Влади, который имеет российское гражданство. Моя жизнь — это история о любви, адаптации и о том, как не потерять себя между двумя мирами.
                                </p>
                            </div>
                        </GlassCard>

                        <div className="about__pills about__reveal">
                            <span className="pill">🎂 23 года</span>
                            <span className="pill">🇨🇺 Las Tunas</span>
                            <span className="pill">👶 Mamá de Vladi</span>
                            <span className="pill">📍 Иваново / Москва</span>
                            <span className="pill">📱 Facebook Blogger</span>
                            <span className="pill">🌡️ -20°C? Sobrevivo.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
