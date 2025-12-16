import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import GeminiAssistant from '../features/assistant/GeminiAssistant';
import AdminDashboard from '../features/dashboards/AdminDashboard';
import ParentDashboard from '../features/dashboards/ParentDashboard';
import UstazDashboard from '../features/dashboards/UstazDashboard';
import PaymentView from '../features/payments/PaymentView';
import SettingsView from '../features/settings/SettingsView';
import { MOCK_USERS } from '../data/mockData';
import LandingExperience from './Landing';
import { Role, User } from '../types';

type AppView = 'dashboard' | 'settings' | 'payment' | 'users';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleLogin = (role: Role) => {
    const user = MOCK_USERS.find((u) => u.role === role);
    if (!user) {
      setStatusMessage('Akaun demo untuk peranan ini belum disediakan.');
      return;
    }
    setCurrentUser(user);
    setCurrentView('dashboard');
    setStatusMessage('');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  const renderDashboard = () => {
    switch (currentUser?.role) {
      case Role.ADMIN:
        return <AdminDashboard />;
      case Role.USTAZ:
        return <UstazDashboard />;
      case Role.PARENT:
        return <ParentDashboard />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (!currentUser) return null;

    if (currentView === 'settings') {
      return <SettingsView user={currentUser} />;
    }

    if (currentView === 'payment') {
      return <PaymentView user={currentUser} />;
    }

    if (currentView === 'dashboard') {
      return renderDashboard();
    }

    return <Placeholder onBack={() => setCurrentView('dashboard')} />;
  };

  if (!currentUser) {
    return <LandingExperience onSelectRole={handleLogin} statusMessage={statusMessage} />;
  }

  return (
    <AppLayout 
      user={currentUser} 
      onLogout={handleLogout} 
      currentView={currentView} 
      onNavigate={(view) => setCurrentView(view as AppView)}
    >
      {renderContent()}
      <GeminiAssistant userRole={currentUser.role} />
    </AppLayout>
  );
};

const Placeholder: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="flex flex-col items-center justify-center h-[50vh] text-slate-400">
    <div className="p-4 bg-slate-100 rounded-full mb-4">
      <ShieldCheck className="w-8 h-8" />
    </div>
    <h2 className="text-xl font-semibold text-slate-600">Halaman sedang dibangunkan</h2>
    <p className="text-sm text-slate-500">Maaf, halaman ini belum tersedia dalam versi demo.</p>
    <button onClick={onBack} className="mt-4 text-primary-600 font-semibold hover:underline">
      Kembali ke Dashboard
    </button>
  </div>
);

export default App;
