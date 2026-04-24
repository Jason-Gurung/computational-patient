import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';

const LandingPage = lazy(() => import('@/sections/landing'));
const TrialSetupPage = lazy(() => import('@/sections/trial-setup'));
const PopulationViewPage = lazy(() => import('@/sections/population'));
const BodyExplorerPage = lazy(() => import('@/sections/body-explorer'));
const HowItWorksPage = lazy(() => import('@/sections/supporting/how-it-works'));
const ImpactPage = lazy(() => import('@/sections/supporting/impact'));

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-kz-bg-primary">
          <div className="text-kz-text-secondary">Loading...</div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <SuspenseWrapper><LandingPage /></SuspenseWrapper>,
      },
      {
        path: 'setup',
        element: <SuspenseWrapper><TrialSetupPage /></SuspenseWrapper>,
      },
      {
        path: 'trial',
        element: <SuspenseWrapper><PopulationViewPage /></SuspenseWrapper>,
      },
      {
        path: 'trial/patient/:patientId',
        element: <SuspenseWrapper><BodyExplorerPage /></SuspenseWrapper>,
      },
      {
        path: 'how-it-works',
        element: <SuspenseWrapper><HowItWorksPage /></SuspenseWrapper>,
      },
      {
        path: 'impact',
        element: <SuspenseWrapper><ImpactPage /></SuspenseWrapper>,
      },
    ],
  },
]);
