import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

function setupAnalytics() {
  const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN
  const gaId = import.meta.env.VITE_GA_ID

  if (plausibleDomain) {
    const plausibleScript = document.createElement('script')
    plausibleScript.defer = true
    plausibleScript.dataset.domain = plausibleDomain
    plausibleScript.src = 'https://plausible.io/js/script.js'
    document.head.appendChild(plausibleScript)
  }

  if (gaId) {
    const gtagScript = document.createElement('script')
    gtagScript.async = true
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(gtagScript)

    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', gaId)
  }
}

setupAnalytics()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
