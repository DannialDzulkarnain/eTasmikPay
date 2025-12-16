import React from 'react';
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Role } from '../types';

interface LandingExperienceProps {
  onSelectRole: (role: Role) => void;
  statusMessage?: string;
}

const roleCards = [
  {
    role: Role.ADMIN,
    title: 'Pentadbir Sekolah',
    description: 'Urus guru, jadual dan laporan kewangan dalam satu papan pemuka.',
    icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
    accent: 'from-emerald-50 to-white',
  },
  {
    role: Role.USTAZ,
    title: 'Ustaz / Guru',
    description: 'Rekod hafazan, pantau prestasi murid dan semak pendapatan anda.',
    icon: <Users className="w-8 h-8 text-primary-600" />,
    accent: 'from-primary-50 to-white',
  },
  {
    role: Role.PARENT,
    title: 'Ibu Bapa',
    description: 'Pantau perkembangan anak dan bayar yuran dengan FPX/QR dengan cepat.',
    icon: <CheckCircle2 className="w-8 h-8 text-amber-600" />,
    accent: 'from-amber-50 to-white',
  },
];

const LandingExperience: React.FC<LandingExperienceProps> = ({ onSelectRole, statusMessage }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="w-full px-6 py-4 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-primary-500/25">
            e
          </div>
          <div>
            <span className="font-bold text-xl text-slate-900">TasmikPay</span>
            <p className="text-xs text-slate-500 leading-tight">Demo interaktif • Hafazan & Pembayaran</p>
          </div>
        </div>
        <div className="hidden md:flex gap-4 text-sm font-medium text-slate-600 items-center">
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-600" /> Versi demo pantas
          </span>
          <a href="#roles" className="hover:text-primary-600 transition-colors">Pilih peranan</a>
          <a href="#journey" className="hover:text-primary-600 transition-colors">Cara berfungsi</a>
        </div>
        <button
          onClick={() => onSelectRole(Role.PARENT)}
          className="px-5 py-2 text-sm font-semibold text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-colors shadow-sm"
        >
          Mula dengan demo
        </button>
      </nav>

      <header className="max-w-6xl w-full mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold border border-primary-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Sistem pengurusan tahfiz moden
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Satu platform untuk rekod hafazan, yuran dan komunikasi yang telus.
          </h1>
          <p className="text-lg text-slate-600">
            Bina keyakinan ibu bapa, permudahkan tugas ustaz dan jadikan kutipan yuran lebih teratur. Klik peranan di bawah untuk melihat pengalaman masing-masing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onSelectRole(Role.ADMIN)}
              className="px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              Lihat papan pemuka sekolah <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectRole(Role.USTAZ)}
              className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:border-primary-200 hover:text-primary-700 transition-colors"
            >
              Saya seorang ustaz
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              { label: 'Notifikasi progres automatik', icon: <Clock3 className="w-4 h-4 text-primary-600" /> },
              { label: 'Pembayaran FPX/DuitNow QR', icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
              { label: 'Laporan hafazan masa nyata', icon: <Sparkles className="w-4 h-4 text-amber-600" /> },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">
                {item.icon}
                <span className="text-slate-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm mb-1">Sedia untuk demo</p>
              <h2 className="text-3xl font-bold">eTasmikPay</h2>
            </div>
            <div className="px-4 py-2 rounded-full bg-white/10 text-xs font-semibold tracking-wide">
              Langsung
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-slate-200 text-sm leading-relaxed">
              Pilih peranan di bawah. Kami akan log masukkan anda terus ke papan pemuka demo yang sesuai tanpa borang tambahan.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-300 mb-1">Tindakan pantas</p>
                <p className="font-semibold">Rekod sesi, bayar yuran, atau kemaskini profil dengan segera.</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-300 mb-1">Sokongan</p>
                <p className="font-semibold">Ada bantuan AI dalam bahasa Melayu untuk setiap peranan.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="roles" className="max-w-6xl w-full mx-auto px-6 pb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Pilih peranan untuk masuk demo</h2>
          <span className="text-sm text-slate-500">Tiada pendaftaran diperlukan</span>
        </div>
        {statusMessage && (
          <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-100 text-sm text-amber-800">
            {statusMessage}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roleCards.map(card => (
            <button
              key={card.role}
              onClick={() => onSelectRole(card.role)}
              className="relative group text-left rounded-2xl border border-slate-200 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl bg-gradient-to-b"
            >
              <div className={`absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${card.accent}`} />
              <div className="relative p-5 space-y-3">
                <div className="p-3 rounded-xl bg-white shadow-sm inline-flex">{card.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                  <p className="text-sm text-slate-600">{card.description}</p>
                </div>
                <div className="flex items-center gap-2 text-primary-700 font-semibold text-sm">
                  Masuk sekarang <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section id="journey" className="bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-primary-700 font-semibold">Aliran pengguna</p>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">Kurang klik, lebih jelas</h2>
            </div>
            <div className="text-xs text-slate-500">Demo ini tidak menyimpan data sebenar.</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Pilih peranan',
                desc: 'Klik kad peranan untuk log masuk auto ke papan pemuka contoh.',
              },
              {
                title: 'Cuba tindakan utama',
                desc: 'Rekod sesi, lihat yuran tertunggak, atau kemaskini konfigurasi sekolah.',
              },
              {
                title: 'Dapatkan bantuan segera',
                desc: 'Gunakan AI helper dalam Bahasa Melayu untuk cadangan atau panduan.',
              },
            ].map(step => (
              <div key={step.title} className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <p className="text-sm font-semibold text-primary-700 mb-1">{step.title}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-100">
        &copy; 2024 eTasmikPay. Dibina untuk pengalaman demo pantas.
      </footer>
    </div>
  );
};

export default LandingExperience;
