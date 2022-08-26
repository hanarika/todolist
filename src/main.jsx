import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Todolist from './Todolist'
import About from './about';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todolist />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
