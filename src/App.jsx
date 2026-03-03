import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Portfolio from './JakeFranklin_Portfolio.jsx'
import ProjectPage from './ProjectPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  )
}
