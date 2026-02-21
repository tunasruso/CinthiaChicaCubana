import { useRef, useEffect, useState } from 'react'
import './VideoGallery.css'

const videos = [
    { src: '/videos/dance-01.mp4', caption: 'Bailando como si nadie me viera 💃', tag: 'Ritmo' },
    { src: '/videos/dance-02.mp4', caption: 'La salsa corre por mis venas 🎶', tag: 'Salsa' },
    { src: '/videos/dance-03.mov', caption: 'Mi cuerpo habla cuando la música suena 🔥', tag: 'Fuego' },
    { src: '/videos/dance-04.mov', caption: 'Cuba se lleva en el alma y en los pies 🇨🇺', tag: 'Cuba' },
    { src: '/videos/dance-05.mov', caption: 'Entre el frío ruso y el calor cubano ❄️🌴', tag: 'Contraste' },
    { src: '/videos/dance-06.mov', caption: 'No importa dónde estés, baila 🌟', tag: 'Libertad' },
    { src: '/videos/dance-07.mov', caption: 'La música es mi idioma universal 🎵', tag: 'Música' },
    { src: '/videos/dance-08.mp4', caption: 'Cada movimiento cuenta una historia 💫', tag: 'Historia' },
    { src: '/videos/dance-09.mp4', caption: 'El reggaetón no tiene fronteras 🎤', tag: 'Reggaetón' },
    { src: '/videos/dance-10.mov', caption: 'Viernes de perreo intenso 🔊', tag: 'Viernes' },
    { src: '/videos/dance-11.mp4', caption: 'Esta cubana no para de bailar 🌺', tag: 'Cubana' },
]

function VideoCard({ video, index }) {
    const videoRef = useRef()
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    const handlePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = (e) => {
        e.stopPropagation()
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted
            setIsMuted(videoRef.current.muted)
        }
    }

    return (
        <div className="vgallery__card">
            <div className="vgallery__video-wrap" onClick={handlePlay}>
                <video
                    ref={videoRef}
                    src={video.src}
                    loop
                    playsInline
                    preload="metadata"
                    className="vgallery__video"
                />
                <div className={`vgallery__overlay ${isPlaying ? 'vgallery__overlay--hidden' : ''}`}>
                    <div className="vgallery__play-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <polygon points="5,3 19,12 5,21" />
                        </svg>
                    </div>
                </div>
                {isPlaying && (
                    <button className="vgallery__mute-btn" onClick={toggleMute} title={isMuted ? 'Unmute' : 'Mute'}>
                        {isMuted ? '🔇' : '🔊'}
                    </button>
                )}
                <div className="vgallery__caption-bar">
                    <span className="vgallery__tag">{video.tag}</span>
                    <p className="vgallery__caption">{video.caption}</p>
                </div>
            </div>
        </div>
    )
}

export default function VideoGallery() {
    const galleryRef = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.vgallery__card').forEach((el, i) => {
                        setTimeout(() => el.classList.add('vgallery__card--visible'), i * 100)
                    })
                }
            })
        }, { threshold: 0.05 })

        if (galleryRef.current) observer.observe(galleryRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section id="videos" className="section vgallery">
            <div className="container">
                <span className="section-label">Baila conmigo</span>
                <h2 className="vgallery__title">
                    El ritmo que<br />
                    <em>no se detiene</em>
                </h2>
                <p className="vgallery__desc">
                    Можно забрать девушку с Кубы, но нельзя забрать Кубу из девушки. Танец — мой язык. 💃
                </p>

                <div ref={galleryRef} className="vgallery__grid">
                    {videos.map((video, i) => (
                        <VideoCard key={i} video={video} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
