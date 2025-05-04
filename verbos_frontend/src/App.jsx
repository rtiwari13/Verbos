import HeroSection from "./components/HeroSection"
import Navbar from "./components/Navbar"
import ServicesSection from "./components/ServicesSection"
import FeatureSection from "./components/FeatureSection"
import Footer from "./components/Footer"

function App() {


  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar/>
      <HeroSection/>
      <ServicesSection />
      <FeatureSection />
      <Footer/>
      </div>
     
    
    
  )
}

export default App
