import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import './FloatingTorus.css'

function Torus({ scrollProgress }) {
    const meshRef = useRef()
    const matRef = useRef()

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.elapsedTime

        // Scroll-driven rotation
        meshRef.current.rotation.x = scrollProgress * Math.PI * 4 + t * 0.15
        meshRef.current.rotation.y = scrollProgress * Math.PI * 3 + t * 0.1
        meshRef.current.rotation.z = Math.sin(scrollProgress * Math.PI * 2) * 0.5

        // Scroll-driven scale: pulses between 0.6 and 1.4
        const baseScale = 0.8 + Math.sin(scrollProgress * Math.PI * 2) * 0.4
        const breathe = 1 + Math.sin(t * 0.8) * 0.05
        const scale = baseScale * breathe
        meshRef.current.scale.setScalar(scale)
    })

    return (
        <mesh ref={meshRef}>
            <torusGeometry args={[1.2, 0.45, 128, 256]} />
            <meshPhysicalMaterial
                ref={matRef}
                color="#1a0a0a"
                metalness={1}
                roughness={0.05}
                clearcoat={1}
                clearcoatRoughness={0.05}
                iridescence={1}
                iridescenceIOR={1.8}
                iridescenceThicknessRange={[200, 800]}
                sheen={1}
                sheenColor={new THREE.Color('#E8654A')}
                sheenRoughness={0.2}
                envMapIntensity={2.5}
                reflectivity={1}
            />
        </mesh>
    )
}

function InnerRing({ scrollProgress }) {
    const ringRef = useRef()

    useFrame((state) => {
        if (!ringRef.current) return
        const t = state.clock.elapsedTime
        ringRef.current.rotation.x = -scrollProgress * Math.PI * 3 + t * 0.2
        ringRef.current.rotation.y = scrollProgress * Math.PI * 2 - t * 0.15
        const scale = 0.6 + Math.sin(scrollProgress * Math.PI * 3 + 1) * 0.25
        ringRef.current.scale.setScalar(scale)
    })

    return (
        <mesh ref={ringRef}>
            <torusGeometry args={[0.7, 0.15, 64, 128]} />
            <meshPhysicalMaterial
                color="#2a0505"
                metalness={1}
                roughness={0.08}
                clearcoat={1}
                clearcoatRoughness={0.1}
                iridescence={1}
                iridescenceIOR={2.2}
                iridescenceThicknessRange={[100, 600]}
                sheen={1}
                sheenColor={new THREE.Color('#C9A96E')}
                sheenRoughness={0.15}
                envMapIntensity={3}
            />
        </mesh>
    )
}

function Scene({ scrollProgress }) {
    return (
        <>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} color="#FFEEDD" />
            <directionalLight position={[-5, -3, 3]} intensity={0.6} color="#E8654A" />
            <pointLight position={[0, 0, 4]} intensity={0.8} color="#C9A96E" />
            <pointLight position={[-3, 2, -2]} intensity={0.4} color="#ff4444" />
            <Torus scrollProgress={scrollProgress} />
            <InnerRing scrollProgress={scrollProgress} />
            <Environment preset="studio" environmentIntensity={1.5} />
        </>
    )
}

export default function FloatingTorus() {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const onScroll = () => {
            const docH = document.documentElement.scrollHeight - window.innerHeight
            const progress = docH > 0 ? window.scrollY / docH : 0
            setScrollProgress(progress)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <div className="floating-torus">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 40 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <Scene scrollProgress={scrollProgress} />
                </Suspense>
            </Canvas>
        </div>
    )
}
