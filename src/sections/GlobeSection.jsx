import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import './GlobeSection.css'

const cities = [
    { name: 'Las Tunas', lat: 20.9616, lng: -76.9544, label: 'Donde nací', emoji: '🌺' },
    { name: 'Москва', lat: 55.7558, lng: 37.6173, label: 'Первый шаг', emoji: '🏙️' },
    { name: 'Иваново', lat: 57.0004, lng: 40.9739, label: 'Мой дом', emoji: '🏠' },
]

function latLngToVector3(lat, lng, radius) {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lng + 180) * (Math.PI / 180)
    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    )
}

function Globe3D() {
    const globeRef = useRef()
    const arcRef = useRef()
    const { viewport } = useThree()

    const globeRadius = Math.min(viewport.width, viewport.height) * 0.35
    const radius = Math.max(1.8, Math.min(2.5, globeRadius))

    const cityPositions = useMemo(() =>
        cities.map(c => latLngToVector3(c.lat, c.lng, radius)),
        [radius]
    )

    const arcCurves = useMemo(() => {
        const curves = []
        for (let i = 0; i < cityPositions.length - 1; i++) {
            const start = cityPositions[i]
            const end = cityPositions[i + 1]
            const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.4)
            curves.push(new THREE.QuadraticBezierCurve3(start, mid, end))
        }
        return curves
    }, [cityPositions, radius])

    useFrame((state) => {
        if (globeRef.current) {
            globeRef.current.rotation.y = state.clock.elapsedTime * 0.05
        }
    })

    const wireframeGeo = useMemo(() => {
        const geo = new THREE.SphereGeometry(radius, 36, 24)
        return geo
    }, [radius])

    return (
        <group ref={globeRef}>
            <mesh geometry={wireframeGeo}>
                <meshStandardMaterial
                    color="#F5F0E8"
                    transparent
                    opacity={0.3}
                    wireframe
                />
            </mesh>

            <mesh>
                <sphereGeometry args={[radius * 0.99, 64, 64]} />
                <meshStandardMaterial
                    color="#FAFAF7"
                    transparent
                    opacity={0.6}
                    roughness={0.8}
                />
            </mesh>

            {arcCurves.map((curve, i) => {
                const points = curve.getPoints(64)
                const geometry = new THREE.BufferGeometry().setFromPoints(points)
                return (
                    <line key={i} geometry={geometry}>
                        <lineBasicMaterial color="#E8654A" linewidth={2} transparent opacity={0.8} />
                    </line>
                )
            })}

            {cityPositions.map((pos, i) => (
                <group key={i}>
                    <mesh position={pos}>
                        <sphereGeometry args={[0.06, 16, 16]} />
                        <meshStandardMaterial color="#E8654A" emissive="#E8654A" emissiveIntensity={0.5} />
                    </mesh>
                    <mesh position={pos}>
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshStandardMaterial color="#E8654A" transparent opacity={0.2} />
                    </mesh>
                    <Html
                        position={[pos.x * 1.15, pos.y * 1.15, pos.z * 1.15]}
                        center
                        distanceFactor={8}
                        style={{ pointerEvents: 'none' }}
                    >
                        <div className="globe__city-label glass">
                            <span className="globe__city-emoji">{cities[i].emoji}</span>
                            <div>
                                <strong>{cities[i].name}</strong>
                                <small>{cities[i].label}</small>
                            </div>
                        </div>
                    </Html>
                </group>
            ))}
        </group>
    )
}

export default function GlobeSection() {
    const sectionRef = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.globe__reveal').forEach((el, i) => {
                        setTimeout(() => el.classList.add('globe__reveal--visible'), i * 200)
                    })
                }
            })
        }, { threshold: 0.2 })

        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} id="globe" className="section globe">
            <div className="globe__text globe__reveal">
                <span className="section-label">Mapa</span>
                <h2 className="globe__title">
                    Мой маршрут<br />
                    <em>через два мира</em>
                </h2>
                <p>Лас-Тунас → Москва → Иваново. 9 700 км и целая жизнь между ними.</p>
            </div>

            <div className="globe__canvas-wrap globe__reveal">
                <Canvas
                    camera={{ position: [0, 0, 7], fov: 45 }}
                    dpr={[1, 1.5]}
                    gl={{ antialias: true, alpha: true }}
                    style={{ background: 'transparent' }}
                >
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.6} />
                        <directionalLight position={[5, 5, 5]} intensity={0.5} />
                        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#E8654A" />
                        <Globe3D />
                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            autoRotate
                            autoRotateSpeed={0.3}
                            minPolarAngle={Math.PI * 0.3}
                            maxPolarAngle={Math.PI * 0.7}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    )
}
