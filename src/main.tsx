import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { I18nProvider } from './app/providers/I18nProvider';
import { QueryProvider } from './app/providers/QueryProvider';
import { SnackbarProvider } from './app/providers/SnackbarProvider';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { env } from './app/config/env';
import './design-system/styles/globals.css';
import './design-system/styles/antd-reset.css';

const bootstrap = async () => {
  if (env.enableMsw && import.meta.env.DEV) {
    const { startMockWorker } = await import('./mocks/browser');
    await startMockWorker();
  }

  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Root element not found');
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <I18nProvider>
        <ThemeProvider>
          <QueryProvider>
            <SnackbarProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </SnackbarProvider>
          </QueryProvider>
        </ThemeProvider>
      </I18nProvider>
    </React.StrictMode>,
  );
};

void bootstrap();
