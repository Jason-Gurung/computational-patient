import { Outlet } from 'react-router-dom';
import { NavBar } from '@/shared/components';
import { TrialConfigProvider } from '@/shared/context/TrialConfigContext';

export default function App() {
  return (
    <TrialConfigProvider>
      <div className="min-h-screen bg-kz-bg-primary">
        <NavBar />
        <main className="pt-14">
          <Outlet />
        </main>
      </div>
    </TrialConfigProvider>
  );
}
