import { BrowserRouter } from 'react-router-dom';
import { PageViewTracker } from './components/analytics/PageViewTracker';
import { PrivacyConsentBanner } from './components/privacy/PrivacyConsentBanner';
import { PrivacyConsentProvider } from './contexts/PrivacyConsentContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppRoutes } from './routes/AppRoutes';

export function App() {
  return (
    <ThemeProvider>
      <PrivacyConsentProvider>
        <BrowserRouter>
          <PageViewTracker />
          <AppRoutes />
          <PrivacyConsentBanner />
        </BrowserRouter>
      </PrivacyConsentProvider>
    </ThemeProvider>
  );
}
