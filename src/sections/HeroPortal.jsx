import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'
import ParticleField from '../components/ParticleField'
import './HeroPortal.css'

function PortalRing() {
    const ringRef = useRef()
    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
        }
    })
    return (
        <mesh ref={ringRef} position={[0, 0, -1]}>
            <torusGeometry args={[3.2, 0.08, 32, 128]} />
            <meshStandardMaterial
                color="#C9A96E"
                metalness={0.9}
                roughness={0.15}
                emissive="#C9A96E"
                emissiveIntensity={0.15}
            />
        </mesh>
    )
}

function PortalSphere({ scrollProgress }) {
    const sphereRef = useRef()
    const matRef = useRef()

    useFrame((state) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.y = state.clock.elapsedTime * 0.15
            sphereRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
        }
        if (matRef.current) {
            matRef.current.distort = 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.15
        }
    })

    const warmColor = new THREE.Color('#E8654A')
    const coldColor = new THREE.Color('#C8DDE8')
    const blendedColor = warmColor.clone().lerp(coldColor, scrollProgress)

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={sphereRef} position={[0, 0, -1]} scale={2.6}>
                <sphereGeometry args={[1, 128, 128]} />
                <MeshDistortMaterial
                    ref={matRef}
                    color={blendedColor}
                    transparent
                    opacity={0.35}
                    roughness={0.15}
                    metalness={0.1}
                    distort={0.3}
                    speed={3}
                />
            </mesh>
        </Float>
    )
}

function MouseLight() {
    const lightRef = useRef()
    const { viewport } = useThree()

    useFrame((state) => {
        if (lightRef.current) {
            const x = (state.pointer.x * viewport.width) / 2
            const y = (state.pointer.y * viewport.height) / 2
            lightRef.current.position.set(x, y, 3)
        }
    })

    return <pointLight ref={lightRef} intensity={0.5} color="#FFEEDD" distance={10} />
}

function Scene({ scrollProgress }) {
    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={0.6} color="#FFF5E6" />
            <MouseLight />
            <PortalRing />
            <PortalSphere scrollProgress={scrollProgress} />
            <ParticleField count={300} mode="mixed" area={[16, 12, 10]} />
            <Environment preset="sunset" environmentIntensity={0.3} />
        </>
    )
}

export default function HeroPortal() {
    const sectionRef = useRef()
    const [scrollProgress, setScrollProgress] = useState(0)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
        const onScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect()
                const progress = Math.max(0, Math.min(1, -rect.top / rect.height))
                setScrollProgress(progress)
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <section ref={sectionRef} id="hero" className="hero">
            <div className="hero__video-stack">
                <div className="hero__video-loop">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        src="/videos/cynthia1.mp4"
                        className="hero__video-loop-media"
                    />
                </div>
                <div className="hero__video-loop">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        src="/videos/cynthia2.mov"
                        className="hero__video-loop-media"
                    />
                </div>
            </div>

            <div className="hero__canvas">
                <Canvas
                    camera={{ position: [0, 0, 7], fov: 50 }}
                    dpr={[1, 1.5]}
                    gl={{ antialias: true, alpha: true }}
                    style={{ background: 'transparent' }}
                >
                    <Suspense fallback={null}>
                        <Scene scrollProgress={scrollProgress} />
                    </Suspense>
                </Canvas>
            </div>

            <div className={`hero__content ${loaded ? 'hero__content--visible' : ''}`}>
                <div className="hero__label">
                    <span className="hero__label-line"></span>
                    Las Tunas → Россия
                </div>

                <h1 className="hero__title">
                    <span className="hero__title-line">Entre</span>
                    <span className="hero__title-line hero__title-line--italic">dos mundos</span>
                </h1>

                <p className="hero__subtitle">
                    Дневник кубинки, которая нашла свой путь между солнцем Лас-Тунас и снегами России
                </p>

                <div className="hero__pills">
                    <span className="pill">🌴 Cuba</span>
                    <span className="pill">❄️ Россия</span>
                    <span className="pill">❤️ Mamá de Vladi</span>
                </div>
            </div>

            <div className="hero__scroll-indicator">
                <div className="hero__scroll-line"></div>
                <span>scroll</span>
            </div>

            <div className="hero__video-right">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="/videos/cynthia3.mp4"
                    className="hero__video-loop-media"
                />
            </div>

            <div className="hero__photo-frame">
                <img src="/photos/cinthia-beach.jpg" alt="Cinthia" className="hero__photo" />
            </div>
        </section>
    )
}
