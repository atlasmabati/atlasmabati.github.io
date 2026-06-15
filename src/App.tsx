import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

// Page Views
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { Process } from './pages/Process';
import { Gallery } from './pages/Gallery';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';

export default function App() {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-atlas-yellow/30 select-text">
        {/* Sticky Site Navigation Controls */}
        <Header />

        {/* Core Main Interactive Screens View Hub */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/process" element={<Process />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Catch-all fallback routing redirects cleanly back home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Global Structural Attribution footer */}
        <Footer />

        {/* Scroll To Top trigger widget */}
        <ScrollToTop />
      </div>
    </HashRouter>
  );
}
