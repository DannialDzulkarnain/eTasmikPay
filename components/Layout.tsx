import React from 'react';
import { User, Role } from '../types';
import { LogOut, LayoutDashboard, Users, CreditCard, Settings, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, currentView, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const NavItem = ({ icon: Icon, label, viewId }: { icon: any, label: string, viewId: string }) => {
    const isActive = currentView === viewId;
    return (
      <button 
        onClick={() => {
          onNavigate(viewId);
          setIsSidebarOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-primary-50 text-primary-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
      >
        <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-slate-400'}`} />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50 transform transition-transform duration-200 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-slate-100 flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/30">e</div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">TasmikPay</span>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <NavItem icon={LayoutDashboard} label="Dashboard" viewId="dashboard" />
            {user.role === Role.ADMIN && <NavItem icon={Users} label="Pengguna" viewId="users" />}
            {user.role === Role.PARENT && <NavItem icon={Users} label="Anak-Anak" viewId="users" />}
            <NavItem icon={CreditCard} label="Pembayaran" viewId="payment" />
            <NavItem icon={Settings} label="Tetapan" viewId="settings" />
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-slate-100">
             <div className="flex items-center gap-3 mb-4">
                <img src={user.avatar} className="w-10 h-10 rounded-full border border-slate-200" alt="Profile" />
                <div className="flex-1 min-w-0">
                   <p className="text-sm font-medium text-slate-900 truncate">{user.name}</p>
                   <p className="text-xs text-slate-500 truncate capitalize">{user.role.toLowerCase()}</p>
                </div>
             </div>
             <button 
              onClick={onLogout}
              className="flex items-center gap-2 text-slate-500 hover:text-red-600 w-full px-2 py-1.5 rounded-md text-sm transition-colors"
             >
                <LogOut className="w-4 h-4" /> Log Keluar
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white border-b border-slate-200 lg:hidden px-4 py-3 flex items-center justify-between">
           <div className="font-bold text-lg text-slate-800">eTasmikPay</div>
           <button onClick={toggleSidebar} className="p-2 text-slate-600">
             {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
           </button>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
           <div className="max-w-6xl mx-auto">
              {children}
           </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;