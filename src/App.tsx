import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { QuoteCartWidget } from './components/QuoteCartWidget';
import { DataProvider } from './context/DataContext';

const Home = lazy(() => import('./pages/Home').then(({ Home }) => ({ default: Home })));
const About = lazy(() => import('./pages/About').then(({ About }) => ({ default: About })));
const Products = lazy(() => import('./pages/Products').then(({ Products }) => ({ default: Products })));
const CalculatorPage = lazy(() => import('./pages/Calculator').then(({ CalculatorPage }) => ({ default: CalculatorPage })));
const Process = lazy(() => import('./pages/Process').then(({ Process }) => ({ default: Process })));
const Gallery = lazy(() => import('./pages/Gallery').then(({ Gallery }) => ({ default: Gallery })));
const FAQ = lazy(() => import('./pages/FAQ').then(({ FAQ }) => ({ default: FAQ })));
const Contact = lazy(() => import('./pages/Contact').then(({ Contact }) => ({ default: Contact })));
function RouteScrollReset() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.getElementById('main-content')?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-atlas-yellow/30 select-text">
          <RouteScrollReset />
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-atlas-blue focus:shadow-lg">
            Skip to page content
          </a>
          <Header />

          {/* Core Main Interactive Screens View Hub */}
          <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
            <Suspense fallback={<div className="min-h-screen bg-slate-50" aria-busy="true" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/calculator" element={<CalculatorPage />} />
                <Route path="/process" element={<Process />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                {/* Catch-all fallback routing redirects cleanly back home */}
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </main>

          {/* Global Structural Attribution footer */}
          <Footer />

          {/* Scroll To Top trigger widget */}
          <ScrollToTop />

          {/* Persistent Floating Quote Cart */}
          <QuoteCartWidget />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </DataProvider>
  );
}
