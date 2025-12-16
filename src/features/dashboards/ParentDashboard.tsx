import React, { useState } from 'react';
import { BookOpen, Calendar, CreditCard, Trophy } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, Button, Badge } from '../../components/ui/index';
import { MOCK_STUDENTS, MOCK_SESSIONS } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../lib/format';

const ParentDashboard: React.FC = () => {
  const myStudents = MOCK_STUDENTS.filter((s) => s.parentId === 'p1');
  const [selectedChild, setSelectedChild] = useState<string>(myStudents[0]?.id ?? '');

  const currentStudent = myStudents.find((s) => s.id === selectedChild) || myStudents[0] || null;
  const sessions = currentStudent ? MOCK_SESSIONS.filter((s) => s.studentId === currentStudent.id) : [];
  
  const outstandingAmount = 45; // Simulated

  if (!currentStudent) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Kemajuan Anak Anda</h1>
        <Card>
          <p className="text-slate-600">Tiada anak yang dihubungkan ke akaun demo ini. Tambah pelajar baharu atau hubungi pentadbir untuk pautan.</p>
        </Card>
      </div>
    );
  }

  const data = [
    { name: 'Completed', value: currentStudent.progress },
    { name: 'Remaining', value: 100 - currentStudent.progress },
  ];
  const COLORS = ['#10b981', '#e2e8f0'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Kemajuan Anak Anda</h1>
          <p className="text-slate-500">Pantau hafazan dan pembayaran yuran.</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-lg border border-slate-200">
          {myStudents.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedChild(s.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                selectedChild === s.id 
                  ? 'bg-primary-100 text-primary-700 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {s.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Card */}
        <Card className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="h-48 w-48 shrink-0 relative">
               <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {data.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-3xl font-bold text-primary-600">{currentStudent.progress}%</span>
                 <span className="text-xs text-slate-400 font-medium">Juzuk 30</span>
              </div>
            </div>
            
            <div className="flex-1 w-full space-y-4">
               <div>
                  <h3 className="text-xl font-bold text-slate-800">{currentStudent.name}</h3>
                  <div className="flex items-center gap-2 text-slate-500 mt-1">
                     <BookOpen className="w-4 h-4" />
                     <span>Sedang Menghafal: <span className="font-semibold text-primary-700">{currentStudent.currentSurah}</span></span>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                     <p className="text-xs text-slate-500 mb-1">Halaman Semasa</p>
                     <p className="text-lg font-semibold text-slate-800">{currentStudent.currentPage}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                     <p className="text-xs text-slate-500 mb-1">Prestasi Purata</p>
                     <p className="text-lg font-semibold text-slate-800 flex items-center gap-1">
                       4.5 <Trophy className="w-4 h-4 text-amber-500" />
                     </p>
                  </div>
               </div>
            </div>
          </div>
        </Card>

        {/* Payment Due Card */}
        <Card className="bg-slate-900 text-white border-none flex flex-col justify-between">
           <div>
              <h3 className="font-semibold text-slate-300 mb-1">Yuran Tertunggak</h3>
              <p className="text-4xl font-bold text-white mb-6">{formatCurrency(outstandingAmount)}</p>
              
              <div className="space-y-3">
                 <div className="flex justify-between text-sm text-slate-400 border-b border-white/10 pb-2">
                    <span>Oktober 2023 (Sesi)</span>
                    <span className="text-white">{formatCurrency(30)}</span>
                 </div>
                 <div className="flex justify-between text-sm text-slate-400 border-b border-white/10 pb-2">
                    <span>Oktober 2023 (Tambahan)</span>
                    <span className="text-white">{formatCurrency(15)}</span>
                 </div>
              </div>
           </div>
           
           <div className="mt-8">
              <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white border-none py-3">
                 <CreditCard className="w-4 h-4 mr-2" /> Bayar Sekarang (FPX/QR)
              </Button>
              <p className="text-center text-xs text-slate-500 mt-3">Selamat & Disahkan oleh PayNet</p>
           </div>
        </Card>
      </div>

      {/* History */}
      <Card title="Sejarah Sesi & Transaksi">
               <div className="space-y-4">
                  {sessions.slice(0, 3).map(sess => (
                     <div key={sess.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg bg-slate-50/50">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-600">
                              <Calendar className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="font-semibold text-slate-800">Sesi Hafazan - {sess.surah}</p>
                              <p className="text-xs text-slate-500">{formatDate(sess.date)} • {sess.durationMinutes} minit</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <span className="block font-medium text-slate-700">{formatCurrency(sess.fee)}</span>
                           <Badge variant="success">Selesai</Badge>
                        </div>
                     </div>
                  ))}
         </div>
      </Card>
    </div>
  );
};

export default ParentDashboard;
