import React from 'react';
import Home from './pages/Home';
import ReactDOM from 'react-dom/client';
import './index.module.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);

