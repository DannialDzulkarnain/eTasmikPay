import React, { useState } from 'react';
import { User, Role, SchoolConfig } from '../types';
import { Card, Button, Input, Badge } from '../components/UI';
import { DEMO_SCHOOL_CONFIG } from '../constants';
import { Save, Bell, Lock, User as UserIcon, Building, CreditCard, ToggleLeft } from 'lucide-react';

interface SettingsViewProps {
  user: User;
}

const SettingsView: React.FC<SettingsViewProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  // Profile State
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  
  // School Config State (Admin only)
  const [schoolConfig, setSchoolConfig] = useState<SchoolConfig>(DEMO_SCHOOL_CONFIG);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Profil berjaya dikemaskini!");
    }, 1000);
  };

  const handleSaveSchool = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        alert("Konfigurasi sekolah berjaya disimpan!");
    }, 1000);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Tetapan</h1>
        <p className="text-slate-500">Urus profil dan konfigurasi aplikasi.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Navigation/Profile Summary */}
        <div className="space-y-6">
           <Card>
              <div className="flex flex-col items-center text-center p-4">
                 <div className="relative">
                    <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-4 border-slate-50 mb-3" />
                    <button className="absolute bottom-0 right-0 p-1.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors shadow-sm">
                       <UserIcon className="w-4 h-4" />
                    </button>
                 </div>
                 <h3 className="font-bold text-lg text-slate-800">{name}</h3>
                 <p className="text-slate-500 text-sm mb-3">{email}</p>
                 <Badge variant="info">{user.role}</Badge>
              </div>
           </Card>
           
           <Card className="hidden lg:block">
              <nav className="space-y-1">
                 {['Profil Peribadi', 'Keselamatan', 'Notifikasi', user.role === Role.ADMIN ? 'Konfigurasi Madrasah' : null].filter(Boolean).map((item, i) => (
                    <button key={i} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between group">
                       {item}
                       <span className="opacity-0 group-hover:opacity-100 text-slate-400">→</span>
                    </button>
                 ))}
              </nav>
           </Card>
        </div>

        {/* Right Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Personal Profile */}
          <Card title={<><UserIcon className="w-5 h-5 text-primary-600" /> Profil Peribadi</>}>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Nama Penuh" value={name} onChange={e => setName(e.target.value)} />
                <Input label="Alamat E-mel" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="flex justify-end">
                <Button type="submit" isLoading={isLoading}>
                   <Save className="w-4 h-4" /> Simpan Perubahan
                </Button>
              </div>
            </form>
          </Card>

          {/* 2. School Configuration (Admin Only) */}
          {user.role === Role.ADMIN && (
             <Card title={<><Building className="w-5 h-5 text-primary-600" /> Konfigurasi Madrasah</>}>
                <form onSubmit={handleSaveSchool} className="space-y-4">
                   <Input 
                      label="Nama Madrasah" 
                      value={schoolConfig.name} 
                      onChange={e => setSchoolConfig({...schoolConfig, name: e.target.value})} 
                   />
                   
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input 
                         label="Yuran Per Sesi (RM)" 
                         type="number"
                         value={schoolConfig.rates.perSession} 
                         onChange={e => setSchoolConfig({
                             ...schoolConfig, 
                             rates: {...schoolConfig.rates, perSession: Number(e.target.value)}
                         })} 
                      />
                      <Input 
                         label="Yuran Per Halaman (RM)" 
                         type="number"
                         value={schoolConfig.rates.perPage} 
                         onChange={e => setSchoolConfig({
                             ...schoolConfig, 
                             rates: {...schoolConfig.rates, perPage: Number(e.target.value)}
                         })} 
                      />
                      <Input 
                         label="Pakej Bulanan (RM)" 
                         type="number"
                         value={schoolConfig.rates.packagePrice} 
                         onChange={e => setSchoolConfig({
                             ...schoolConfig, 
                             rates: {...schoolConfig.rates, packagePrice: Number(e.target.value)}
                         })} 
                      />
                   </div>
                   <div className="flex justify-end">
                      <Button type="submit" isLoading={isLoading} variant="secondary">
                         <Save className="w-4 h-4" /> Kemaskini Sekolah
                      </Button>
                   </div>
                </form>
             </Card>
          )}

          {/* 3. Notifications */}
          <Card title={<><Bell className="w-5 h-5 text-primary-600" /> Tetapan Notifikasi</>}>
             <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                   <div className="flex items-center gap-3">
                      <div>
                         <p className="font-medium text-slate-800">Notifikasi E-mel</p>
                         <p className="text-xs text-slate-500">Terima laporan mingguan dan resit.</p>
                      </div>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                   </label>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                   <div className="flex items-center gap-3">
                      <div>
                         <p className="font-medium text-slate-800">Notifikasi WhatsApp</p>
                         <p className="text-xs text-slate-500">Terima peringatan kelas (Caj tambahan mungkin dikenakan).</p>
                      </div>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                   </label>
                </div>
             </div>
          </Card>

           {/* 4. Security */}
           <Card title={<><Lock className="w-5 h-5 text-primary-600" /> Keselamatan</>}>
              <div className="space-y-4">
                 <Input label="Kata Laluan Semasa" type="password" placeholder="••••••••" />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Kata Laluan Baru" type="password" />
                    <Input label="Sahkan Kata Laluan" type="password" />
                 </div>
                 <div className="flex justify-end">
                    <Button variant="outline">
                       Tukar Kata Laluan
                    </Button>
                 </div>
              </div>
           </Card>

        </div>
      </div>
    </div>
  );
};

export default SettingsView;