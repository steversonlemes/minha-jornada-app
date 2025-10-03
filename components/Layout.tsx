import React from 'react';
import { MapIcon, BookIcon, UserIcon, LogoutIcon } from './Icons';
import { useI18n } from '../lib/i18n';

export type NavView = 'map' | 'diary' | 'profile';

interface LayoutProps {
  children: React.ReactNode;
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  onLogout: () => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isSidebar?: boolean;
}> = ({ icon, label, isActive, onClick, isSidebar = false }) => {
  const activeClass = isSidebar 
    ? 'bg-amber-900/50 text-amber-300 border-l-4 border-amber-400' 
    : 'text-amber-400';
  const inactiveClass = isSidebar 
    ? 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
    : 'text-gray-400';
  
  return (
    <button
      onClick={onClick}
      className={`${ isSidebar 
        ? `flex items-center w-full px-4 py-3 space-x-3 transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`
        : `flex flex-col items-center justify-center flex-1 transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`
      }`}
    >
      {icon}
      <span className={isSidebar ? 'font-medium' : 'text-xs mt-1'}>{label}</span>
    </button>
  );
};

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, onLogout }) => {
  const { t } = useI18n();

  const navItems = [
    { id: 'map', label: t('nav.map'), icon: <MapIcon className="w-6 h-6" /> },
    { id: 'diary', label: t('nav.diary'), icon: <BookIcon className="w-6 h-6" /> },
    { id: 'profile', label: t('nav.profile'), icon: <UserIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <aside className="hidden md:flex flex-col w-64 bg-gray-800 border-r border-gray-700">
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-amber-400">Jornada do Líder</h1>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map(item => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={currentView === item.id}
              onClick={() => onNavigate(item.id as NavView)}
              isSidebar={true}
            />
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-3 space-x-3 text-gray-400 hover:bg-red-900/50 hover:text-red-300 rounded-md transition-colors"
          >
            <LogoutIcon className="w-6 h-6" />
            <span className="font-medium">{t('auth.logout')}</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        {children}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around bg-gray-800 border-t border-gray-700 p-1">
        {navItems.map(item => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={currentView === item.id}
            onClick={() => onNavigate(item.id as NavView)}
          />
        ))}
         <button onClick={onLogout} className="flex flex-col items-center justify-center flex-1 text-gray-400">
            <LogoutIcon className="w-6 h-6"/>
            <span className="text-xs mt-1">{t('auth.logout')}</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;