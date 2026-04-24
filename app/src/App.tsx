import { Outlet } from 'react-router-dom';
import { NavBar } from '@/shared/components';

export default function App() {
  return (
    <div className="min-h-screen bg-kz-bg-primary">
      <NavBar />
      <main className="pt-14">
        <Outlet />
      </main>
    </div>
  );
}
