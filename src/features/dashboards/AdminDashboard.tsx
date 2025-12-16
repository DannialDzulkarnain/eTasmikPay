import React, { useState } from 'react';
import { Users, BookOpen, DollarSign, Settings, Download, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Badge, Button } from '../../components/ui/index';
import { DEMO_SCHOOL_CONFIG, MOCK_STUDENTS, MOCK_USERS, RECENT_PAYMENTS } from '../../data/mockData';
import { formatCurrency } from '../../lib/format';
import { Role } from '../../types';

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
];

const AdminDashboard: React.FC = () => {
  const [studentSearch, setStudentSearch] = useState('');

  const filteredStudents = MOCK_STUDENTS.filter(student => 
    student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.id.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Pentadbir</h1>
          <p className="text-slate-500">{DEMO_SCHOOL_CONFIG.name}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Settings className="w-4 h-4 mr-2" /> Tetapan</Button>
          <Button variant="primary"><Download className="w-4 h-4 mr-2" /> Laporan</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-primary-500">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 text-primary-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Jumlah Pelajar</p>
              <h4 className="text-2xl font-bold text-slate-800">124</h4>
            </div>
          </div>
        </Card>
        <Card className="border-l-4 border-l-secondary-500">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary-100 text-secondary-600 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Sesi Bulan Ini</p>
              <h4 className="text-2xl font-bold text-slate-800">856</h4>
            </div>
          </div>
        </Card>
        <Card className="border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Kutipan Yuran</p>
              <h4 className="text-2xl font-bold text-slate-800">{formatCurrency(12450)}</h4>
            </div>
          </div>
        </Card>
      </div>

      {/* Analytics Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Analisis Kutipan Yuran (2023)">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div>
          <Card title="Pembayaran Terkini">
            <div className="space-y-4">
              {RECENT_PAYMENTS.map((pay) => (
                <div key={pay.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-800">Pelajar #{pay.studentId}</p>
                    <p className="text-xs text-slate-500">{pay.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary-600">{formatCurrency(pay.amount)}</p>
                    <Badge variant={pay.status === 'PAID' ? 'success' : 'warning'}>{pay.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
             <Button variant="ghost" className="w-full mt-4 text-sm">Lihat Semua</Button>
          </Card>
        </div>
      </div>

      {/* Student List with Search */}
      <Card 
        title="Senarai Pelajar" 
        action={
          <div className="relative w-64">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Search className="h-4 w-4 text-slate-400" />
             </div>
             <input
               type="text"
               placeholder="Cari nama atau ID..."
               className="pl-10 pr-4 py-1.5 w-full border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white transition-all"
               value={studentSearch}
               onChange={(e) => setStudentSearch(e.target.value)}
             />
          </div>
        }
      >
        <div className="overflow-x-auto max-h-80 overflow-y-auto">
          <table className="w-full text-left text-sm relative">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-500">ID</th>
                <th className="px-4 py-3 font-medium text-slate-500">Nama Pelajar</th>
                <th className="px-4 py-3 font-medium text-slate-500">Surah Semasa</th>
                <th className="px-4 py-3 font-medium text-slate-500">Kemajuan</th>
                <th className="px-4 py-3 font-medium text-slate-500">Status</th>
                <th className="px-4 py-3 font-medium text-slate-500">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{s.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-700">{s.name}</td>
                    <td className="px-4 py-3 text-slate-600">{s.currentSurah} <span className="text-slate-400 text-xs">(Hal. {s.currentPage})</span></td>
                    <td className="px-4 py-3 align-middle">
                      <div className="flex items-center gap-2">
                         <div className="flex-1 h-1.5 bg-slate-200 rounded-full max-w-[80px]">
                            <div className="h-1.5 bg-primary-500 rounded-full" style={{ width: `${s.progress}%` }}></div>
                         </div>
                         <span className="text-xs text-slate-500 font-medium">{s.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge variant="success">Aktif</Badge></td>
                    <td className="px-4 py-3">
                       <button className="text-primary-600 hover:text-primary-800 font-medium text-xs">Lihat</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                      Tiada pelajar dijumpai untuk carian "{studentSearch}"
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Teacher List */}
      <Card title="Senarai Ustaz">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-500">Nama</th>
                <th className="px-4 py-3 font-medium text-slate-500">Email</th>
                <th className="px-4 py-3 font-medium text-slate-500">Status</th>
                <th className="px-4 py-3 font-medium text-slate-500">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_USERS.filter(u => u.role === Role.USTAZ).map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img src={u.avatar} alt="" className="w-8 h-8 rounded-full" />
                    <span className="font-medium text-slate-700">{u.name}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{u.email}</td>
                  <td className="px-4 py-3"><Badge variant="success">Aktif</Badge></td>
                  <td className="px-4 py-3">
                    <button className="text-primary-600 hover:text-primary-800 font-medium text-xs">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
