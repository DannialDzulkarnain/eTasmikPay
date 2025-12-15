import React, { useState } from 'react';
import { MOCK_USERS } from './constants';
import { User, Role } from './types';
import Layout from './components/Layout';
import AdminDashboard from './views/AdminDashboard';
import UstazDashboard from './views/UstazDashboard';
import ParentDashboard from './views/ParentDashboard';
import SettingsView from './views/SettingsView';
import PaymentView from './views/PaymentView';
import GeminiAssistant from './components/GeminiAssistant';
import { ArrowRight, CheckCircle2, ShieldCheck, Users } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLogin = (role: Role) => {
    const user = MOCK_USERS.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
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
      switch (currentUser.role) {
        case Role.ADMIN: return <AdminDashboard />;
        case Role.USTAZ: return <UstazDashboard />;
        case Role.PARENT: return <ParentDashboard />;
      }
    }

    // Placeholder for other views
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-slate-400">
        <div className="p-4 bg-slate-100 rounded-full mb-4">
           <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold text-slate-600">Halaman Sedang Dibangunkan</h2>
        <p>Maaf, halaman ini belum tersedia dalam versi demo.</p>
        <button 
          onClick={() => setCurrentView('dashboard')} 
          className="mt-4 text-primary-600 font-medium hover:underline"
        >
          Kembali ke Dashboard
        </button>
      </div>
    );
  };

  // Landing Page (Login Simulation)
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Navbar */}
        <nav className="w-full px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">e</div>
              <span className="font-bold text-xl text-slate-800">TasmikPay</span>
           </div>
           <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
              <a href="#" className="hover:text-primary-600">Ciri-Ciri</a>
              <a href="#" className="hover:text-primary-600">Harga</a>
              <a href="#" className="hover:text-primary-600">Hubungi Kami</a>
           </div>
           <button className="px-5 py-2 text-sm font-medium text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-colors">
              Mula Sekarang
           </button>
        </nav>

        {/* Hero */}
        <div className="flex-1 flex flex-col justify-center items-center px-4 py-20 text-center max-w-4xl mx-auto space-y-8">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium border border-primary-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              Sistem Pengurusan Tahfiz Moden #1
           </div>
           <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Permudahkan Urusan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-500">Hafazan & Pembayaran</span>
           </h1>
           <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
              eTasmikPay membantu sekolah agama, ustaz, dan ibu bapa menguruskan rekod hafazan dan pembayaran yuran secara automatik dan telus.
           </p>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mt-12">
              <LoginCard 
                title="Pentadbir Sekolah" 
                desc="Urus guru, pelajar dan laporan kewangan."
                icon={<ShieldCheck className="w-8 h-8 text-indigo-500" />}
                onClick={() => handleLogin(Role.ADMIN)}
              />
              <LoginCard 
                title="Ustaz / Guru" 
                desc="Rekod prestasi hafazan dan semak pendapatan."
                icon={<Users className="w-8 h-8 text-primary-500" />}
                onClick={() => handleLogin(Role.USTAZ)}
              />
              <LoginCard 
                title="Ibu Bapa" 
                desc="Pantau perkembangan anak dan bayar yuran."
                icon={<CheckCircle2 className="w-8 h-8 text-emerald-500" />}
                onClick={() => handleLogin(Role.PARENT)}
              />
           </div>
        </div>

        <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-100">
           &copy; 2024 eTasmikPay. Built for Malaysia Madani.
        </footer>
      </div>
    );
  }

  return (
    <Layout 
      user={currentUser} 
      onLogout={handleLogout} 
      currentView={currentView}
      onNavigate={setCurrentView}
    >
      {renderContent()}
      <GeminiAssistant userRole={currentUser.role} />
    </Layout>
  );
};

const LoginCard: React.FC<{title: string, desc: string, icon: React.ReactNode, onClick: () => void}> = ({ title, desc, icon, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center p-6 bg-white border border-slate-200 rounded-xl hover:shadow-xl hover:border-primary-300 transition-all group text-center"
  >
    <div className="mb-4 p-4 bg-slate-50 rounded-full group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 mb-4">{desc}</p>
    <div className="mt-auto flex items-center text-primary-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
       Log Masuk Demo <ArrowRight className="w-4 h-4 ml-1" />
    </div>
  </button>
);

export default App;