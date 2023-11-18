import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'src/App';
import { ErrorBoundary } from 'src/components/errorBoundary/ErrorBoundary';
import 'src/index.scss';
import { setupStore } from 'src/redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={setupStore()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
