import { useEffect, useState } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import FloatingTorus from './components/FloatingTorus'
import HeroPortal from './sections/HeroPortal'
import AboutSection from './sections/AboutSection'
import ContrastSection from './sections/ContrastSection'
import TimelineSection from './sections/TimelineSection'
import GlobeSection from './sections/GlobeSection'
import DiarioSection from './sections/DiarioSection'
import VideoGallery from './sections/VideoGallery'
import FooterSection from './sections/FooterSection'

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
      <Navigation />
      <FloatingTorus />
      <main>
        <HeroPortal />
        <AboutSection />
        <ContrastSection />
        <TimelineSection />
        <GlobeSection />
        <DiarioSection />
        <VideoGallery />
        <FooterSection />
      </main>
    </>
  )
}
