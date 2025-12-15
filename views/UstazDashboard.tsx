import React, { useState } from 'react';
import { Card, Button, Input, Select, Badge } from '../components/UI';
import { MOCK_STUDENTS, MOCK_SESSIONS, DEMO_SCHOOL_CONFIG } from '../constants';
import { Session, Student } from '../types';
import { PlusCircle, Clock, Book, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react';

const UstazDashboard: React.FC = () => {
  const [showNewSession, setShowNewSession] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [surah, setSurah] = useState('');
  const [pages, setPages] = useState('1');
  const [duration, setDuration] = useState('30');
  const [rating, setRating] = useState('4');

  const handleSaveSession = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Session recorded successfully! (Simulated)');
    setShowNewSession(false);
  };

  const totalEarnings = MOCK_SESSIONS.reduce((acc, curr) => acc + curr.fee, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Ustaz</h1>
          <p className="text-slate-500">Selamat datang, Ustaz Abdullah</p>
        </div>
        <Button onClick={() => setShowNewSession(true)}>
          <PlusCircle className="w-5 h-5 mr-2" /> Rekod Sesi Baru
        </Button>
      </div>

      {/* New Session Form Overlay */}
      {showNewSession && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Rekod Hafazan Pelajar</h3>
              <button onClick={() => setShowNewSession(false)} className="text-slate-400 hover:text-slate-600"><PlusCircle className="w-6 h-6 rotate-45" /></button>
            </div>
            <form onSubmit={handleSaveSession} className="p-6 space-y-4">
              <Select 
                label="Pilih Pelajar" 
                value={selectedStudent} 
                onChange={e => setSelectedStudent(e.target.value)}
                options={[
                  { value: '', label: '-- Pilih Pelajar --' },
                  ...MOCK_STUDENTS.map(s => ({ value: s.id, label: s.name }))
                ]}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Surah" 
                  placeholder="Contoh: Al-Baqarah" 
                  value={surah} 
                  onChange={e => setSurah(e.target.value)} 
                  required
                />
                <Input 
                  label="Halaman" 
                  type="number" 
                  value={pages} 
                  onChange={e => setPages(e.target.value)} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <Select 
                  label="Tempoh (Minit)" 
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  options={[
                    { value: '15', label: '15 Minit' },
                    { value: '30', label: '30 Minit' },
                    { value: '45', label: '45 Minit' },
                    { value: '60', label: '1 Jam' },
                  ]}
                />
                 <Select 
                  label="Prestasi" 
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                  options={[
                    { value: '5', label: 'Mumtaz (Cemerlang)' },
                    { value: '4', label: 'Jayyid Jiddan (Sangat Baik)' },
                    { value: '3', label: 'Jayyid (Baik)' },
                    { value: '2', label: 'Maqbul (Lulus)' },
                    { value: '1', label: 'Rasib (Gagal)' },
                  ]}
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setShowNewSession(false)}>Batal</Button>
                <Button type="submit">Simpan Rekod</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary-600 to-primary-800 text-white border-none">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-primary-100 font-medium text-sm">Jumlah Pendapatan (Bulan Ini)</p>
              <h3 className="text-3xl font-bold mt-1">RM {totalEarnings}</h3>
            </div>
            <div className="bg-white/20 p-2 rounded-lg"><TrendingUp className="w-6 h-6 text-white" /></div>
          </div>
          <Button variant="secondary" className="w-full text-sm py-1.5 shadow-none border border-white/20 bg-white/10 hover:bg-white/20">
            Mohon Pengeluaran
          </Button>
        </Card>
        
        <Card>
          <div className="flex items-center gap-4">
             <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                <Clock className="w-6 h-6" />
             </div>
             <div>
                <p className="text-sm text-slate-500">Jumlah Jam Mengajar</p>
                <h4 className="text-2xl font-bold text-slate-800">42 Jam</h4>
             </div>
          </div>
        </Card>

         <Card>
          <div className="flex items-center gap-4">
             <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
                <Book className="w-6 h-6" />
             </div>
             <div>
                <p className="text-sm text-slate-500">Halaman Disemak</p>
                <h4 className="text-2xl font-bold text-slate-800">350 Hal.</h4>
             </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sessions List */}
        <div className="lg:col-span-2">
          <Card title="Rekod Sesi Terkini">
            <div className="space-y-0 divide-y divide-slate-100">
              {MOCK_SESSIONS.map((session) => {
                const student = MOCK_STUDENTS.find(s => s.id === session.studentId);
                return (
                  <div key={session.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 p-2 rounded-lg ${session.rating >= 4 ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                         <CheckCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{student?.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
                          <Book className="w-3 h-3" />
                          <span>{session.surah} (Hal. {session.pagesCompleted})</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          <span>{session.durationMinutes} min</span>
                        </div>
                        {session.notes && <p className="text-xs text-slate-400 mt-1 italic">"{session.notes}"</p>}
                      </div>
                    </div>
                    <div className="text-right pl-11 sm:pl-0">
                      <div className="font-bold text-slate-700">RM {session.fee}</div>
                      <span className="text-xs text-slate-400">{session.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Low Performing Students Alert */}
        <div>
           <Card title="Perlu Perhatian" className="border-t-4 border-t-amber-500">
              <div className="space-y-4">
                 <div className="flex gap-3 items-start p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                       <h5 className="font-semibold text-amber-900 text-sm">Ahmad bin Razak</h5>
                       <p className="text-xs text-amber-700 mt-1">Belum mencapai sasaran mingguan (15%). Perlu kelas tambahan.</p>
                       <button className="text-xs font-bold text-amber-600 mt-2 hover:underline">Hubungi Waris</button>
                    </div>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default UstazDashboard;