import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import StartPage from './Components/StartPage'
import Contact from './Components/ContactPage'
import HeaderNoAnimation from './Components/HeaderNoAnimation'
import ScrollToTop from './Components/ScrollToTOP'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<><Header/><StartPage /></>} />
        <Route path="/contact" element={<><HeaderNoAnimation/><Contact /></>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
