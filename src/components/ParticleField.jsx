import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField({ count = 200, mode = 'mixed', area = [20, 20, 20] }) {
  const meshRef = useRef()
  const timeRef = useRef(0)

  const [positions, velocities, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const siz = new Float32Array(count)

    const sandColor = new THREE.Color('#DCC9A3')
    const snowColor = new THREE.Color('#E8F0F8')
    const mixedColor = new THREE.Color('#F0E6D4')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * area[0]
      pos[i3 + 1] = (Math.random() - 0.5) * area[1]
      pos[i3 + 2] = (Math.random() - 0.5) * area[2]

      const speed = 0.002 + Math.random() * 0.005
      vel[i3] = (Math.random() - 0.5) * speed
      vel[i3 + 1] = -speed * (0.5 + Math.random())
      vel[i3 + 2] = (Math.random() - 0.5) * speed

      const ratio = pos[i3] / area[0] + 0.5
      const particleColor = mode === 'sand' ? sandColor
        : mode === 'snow' ? snowColor
        : ratio < 0.5 ? sandColor.clone().lerp(mixedColor, ratio * 2)
        : snowColor.clone().lerp(mixedColor, (1 - ratio) * 2)

      col[i3] = particleColor.r
      col[i3 + 1] = particleColor.g
      col[i3 + 2] = particleColor.b

      siz[i] = 0.02 + Math.random() * 0.06
    }
    return [pos, vel, col, siz]
  }, [count, mode, area])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    timeRef.current += delta
    const posArray = meshRef.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      posArray[i3] += velocities[i3] + Math.sin(timeRef.current + i * 0.1) * 0.001
      posArray[i3 + 1] += velocities[i3 + 1]
      posArray[i3 + 2] += velocities[i3 + 2] + Math.cos(timeRef.current + i * 0.1) * 0.001

      if (posArray[i3 + 1] < -area[1] / 2) {
        posArray[i3 + 1] = area[1] / 2
        posArray[i3] = (Math.random() - 0.5) * area[0]
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.08}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
