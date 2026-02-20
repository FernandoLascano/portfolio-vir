import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import CustomCursor from './components/CustomCursor'
import SplashScreen from './components/SplashScreen'

function App() {
  const location = useLocation()
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      <CustomCursor />
      {showSplash && <SplashScreen onEnter={() => setShowSplash(false)} />}
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/proyecto/:slug" element={<ProjectDetail />} />
            <Route path="/sobre-mi" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </>
  )
}

export default App
