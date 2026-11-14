import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const requestedRoute = new URLSearchParams(window.location.search).get('spa-route');

if (requestedRoute?.startsWith('/')) {
  window.history.replaceState(null, '', requestedRoute);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
