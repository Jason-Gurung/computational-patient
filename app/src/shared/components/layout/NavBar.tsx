import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';

const NAV_ITEMS = [
  { label: 'Home', path: ROUTES.LANDING },
  { label: 'Setup Trial', path: ROUTES.TRIAL_SETUP },
  { label: 'Trial View', path: ROUTES.POPULATION },
  { label: 'How It Works', path: ROUTES.HOW_IT_WORKS },
  { label: 'Impact', path: ROUTES.IMPACT },
];

export function NavBar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-kz-border-subtle bg-kz-bg-primary/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" className="text-lg font-bold text-kz-blue">
          Computational Patient
        </Link>
        <div className="flex gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm transition-colors ${
                location.pathname === item.path
                  ? 'text-kz-blue'
                  : 'text-kz-text-secondary hover:text-kz-text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
