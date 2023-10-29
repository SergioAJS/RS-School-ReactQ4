import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'src/App';
import { ErrorBoundary } from 'src/components/errorBoundary/ErrorBoundary';
import 'src/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
