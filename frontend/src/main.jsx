import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// css file import 

import '../public/assets/css/bootstrap.min.css'
import '../public/assets/css/common.css'
import '../public/assets/css/main.css'
import '../public/assets/css/responsive.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
