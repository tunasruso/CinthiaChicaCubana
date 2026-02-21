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
  return (
    <>
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
