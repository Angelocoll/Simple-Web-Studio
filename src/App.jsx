import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import StartPage from './Components/StartPage'
import Contact from './Components/ContactPage'
import HeaderNoAnimation from './Components/HeaderNoAnimation'
import ScrollToTop from './Components/ScrollToTOP'
import Services from './Components/ServicePage'
import About from './Components/AboutPage'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<><Header/><StartPage /></>} />
        <Route path="/services" element={<><HeaderNoAnimation/><Services /></>} />
        <Route path="/About" element={<><HeaderNoAnimation/><About /></>} />
        <Route path="/contact" element={<><HeaderNoAnimation/><Contact /></>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
