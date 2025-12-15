import React, { useState } from 'react';
import { User, Role } from '../types';
import { Card, Button, Badge, Input } from '../components/UI';
import { MOCK_SESSIONS, RECENT_PAYMENTS, MOCK_USERS, MOCK_WITHDRAWALS, MOCK_STUDENTS } from '../constants';
import { CreditCard, Wallet, ArrowUpRight, ArrowDownLeft, Calendar, Download, DollarSign, CheckCircle, Clock, XCircle, Banknote, Landmark, QrCode } from 'lucide-react';

interface PaymentViewProps {
  user: User;
}

const PaymentView: React.FC<PaymentViewProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'income' | 'payouts'>('income');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  
  // Parent Payment State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'FPX' | 'QR' | 'CARD' | 'CASH'>('FPX');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentProcess = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
        setIsProcessing(false);
        setShowPaymentModal(false);
        alert(`Pembayaran berjaya menggunakan ${selectedMethod}! Terima kasih.`);
    }, 1500);
  };

  // --- USTAZ VIEW LOGIC ---
  if (user.role === Role.USTAZ) {
    const mySessions = MOCK_SESSIONS.filter(s => s.ustazId === user.id);
    const totalEarnings = mySessions.reduce((sum, s) => sum + s.fee, 0);
    const myWithdrawals = MOCK_WITHDRAWALS.filter(w => w.ustazId === user.id);
    const totalWithdrawn = myWithdrawals
        .filter(w => w.status === 'COMPLETED')
        .reduce((sum, w) => sum + w.amount, 0);
    const pendingWithdrawal = myWithdrawals
        .filter(w => w.status === 'PENDING')
        .reduce((sum, w) => sum + w.amount, 0);
    const currentBalance = totalEarnings - totalWithdrawn - pendingWithdrawal;

    const handleWithdraw = (e: React.FormEvent) => {
        e.preventDefault();
        setShowWithdrawModal(false);
        alert("Permohonan pengeluaran berjaya dihantar!");
    };

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <div>
             <h1 className="text-2xl font-bold text-slate-800">Dompet & Pendapatan</h1>
             <p className="text-slate-500">Uruskan pendapatan hafazan anda.</p>
          </div>
          <Button onClick={() => setShowWithdrawModal(true)} disabled={currentBalance <= 0}>
             <Wallet className="w-4 h-4 mr-2" /> Mohon Pengeluaran
          </Button>
        </div>

        {/* Ustaz Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <Card className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white border-none">
              <div className="flex justify-between items-start">
                 <div>
                    <p className="text-blue-100 font-medium text-sm">Baki Boleh Keluar</p>
                    <h3 className="text-3xl font-bold mt-1">RM {currentBalance.toFixed(2)}</h3>
                 </div>
                 <div className="bg-white/20 p-2 rounded-lg"><DollarSign className="w-6 h-6 text-white" /></div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 flex gap-4 text-xs text-blue-100">
                 <div>
                    <span className="block opacity-70">Sedang Proses</span>
                    <span className="font-semibold text-white">RM {pendingWithdrawal.toFixed(2)}</span>
                 </div>
                 <div>
                    <span className="block opacity-70">Jumlah Dibayar</span>
                    <span className="font-semibold text-white">RM {totalWithdrawn.toFixed(2)}</span>
                 </div>
              </div>
           </Card>

           <Card title="Analisis Ringkas">
               <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-500">Sesi Selesai</span>
                     <span className="font-semibold text-slate-800">{mySessions.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-500">Purata/Sesi</span>
                     <span className="font-semibold text-slate-800">RM 15.00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-500">Bulan Ini</span>
                     <span className="font-semibold text-green-600">+ RM 120.00</span>
                  </div>
               </div>
           </Card>
        </div>

        {/* Transaction History */}
        <Card title="Sejarah Transaksi">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-4 py-3 font-medium text-slate-500">Tarikh</th>
                            <th className="px-4 py-3 font-medium text-slate-500">Jenis</th>
                            <th className="px-4 py-3 font-medium text-slate-500">Keterangan</th>
                            <th className="px-4 py-3 font-medium text-slate-500 text-right">Amaun</th>
                            <th className="px-4 py-3 font-medium text-slate-500">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {myWithdrawals.map(w => (
                            <tr key={w.id}>
                                <td className="px-4 py-3 text-slate-600">{w.date}</td>
                                <td className="px-4 py-3">
                                   <span className="flex items-center gap-1 text-amber-600 font-medium">
                                      <ArrowUpRight className="w-3 h-3" /> Pengeluaran
                                   </span>
                                </td>
                                <td className="px-4 py-3 text-slate-600">Pindahan ke Bank Islam</td>
                                <td className="px-4 py-3 text-right font-medium text-slate-800">- RM {w.amount}</td>
                                <td className="px-4 py-3">
                                    <Badge variant={w.status === 'COMPLETED' ? 'success' : 'warning'}>{w.status}</Badge>
                                </td>
                            </tr>
                        ))}
                        {mySessions.map(s => (
                            <tr key={s.id}>
                                <td className="px-4 py-3 text-slate-600">{s.date}</td>
                                <td className="px-4 py-3">
                                   <span className="flex items-center gap-1 text-green-600 font-medium">
                                      <ArrowDownLeft className="w-3 h-3" /> Pendapatan
                                   </span>
                                </td>
                                <td className="px-4 py-3 text-slate-600">Sesi: {s.surah}</td>
                                <td className="px-4 py-3 text-right font-medium text-slate-800">+ RM {s.fee}</td>
                                <td className="px-4 py-3"><Badge variant="success">SELESAI</Badge></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>

        {/* Withdrawal Modal */}
        {showWithdrawModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Mohon Pengeluaran</h3>
                    <form onSubmit={handleWithdraw} className="space-y-4">
                        <Input label="Jumlah Pengeluaran (RM)" type="number" defaultValue={currentBalance} max={currentBalance} />
                        <div>
                           <label className="block text-sm font-medium text-slate-700 mb-1">Bank Pilihan</label>
                           <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                              <option>Maybank</option>
                              <option>CIMB Bank</option>
                              <option>Bank Islam</option>
                           </select>
                        </div>
                        <Input label="No. Akaun" placeholder="Contoh: 1620..." />
                        <div className="flex gap-3 pt-2">
                           <Button type="button" variant="ghost" className="flex-1" onClick={() => setShowWithdrawModal(false)}>Batal</Button>
                           <Button type="submit" className="flex-1">Hantar Permohonan</Button>
                        </div>
                    </form>
                </div>
            </div>
        )}
      </div>
    );
  }

  // --- ADMIN VIEW LOGIC ---
  if (user.role === Role.ADMIN) {
     return (
        <div className="space-y-6 animate-in fade-in duration-500">
           <div>
             <h1 className="text-2xl font-bold text-slate-800">Pusat Kewangan</h1>
             <p className="text-slate-500">Pantau aliran tunai masuk dan keluar.</p>
           </div>

           <div className="flex gap-2 border-b border-slate-200">
              <button 
                 onClick={() => setActiveTab('income')}
                 className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'income' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
              >
                 Terimaan (Ibu Bapa)
              </button>
              <button 
                 onClick={() => setActiveTab('payouts')}
                 className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'payouts' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
              >
                 Bayaran Keluar (Ustaz)
              </button>
           </div>

           {activeTab === 'income' ? (
              <Card title="Rekod Bayaran Yuran">
                 <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                       <tr>
                          <th className="px-4 py-3 font-medium text-slate-500">ID</th>
                          <th className="px-4 py-3 font-medium text-slate-500">Pelajar</th>
                          <th className="px-4 py-3 font-medium text-slate-500">Tarikh</th>
                          <th className="px-4 py-3 font-medium text-slate-500">Kaedah</th>
                          <th className="px-4 py-3 font-medium text-slate-500 text-right">Amaun</th>
                          <th className="px-4 py-3 font-medium text-slate-500">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {RECENT_PAYMENTS.map((pay) => (
                          <tr key={pay.id}>
                             <td className="px-4 py-3 font-mono text-xs text-slate-500">#{pay.id}</td>
                             <td className="px-4 py-3 text-slate-700 font-medium">Pelajar {pay.studentId}</td>
                             <td className="px-4 py-3 text-slate-600">{pay.date}</td>
                             <td className="px-4 py-3 text-slate-600">{pay.method || '-'}</td>
                             <td className="px-4 py-3 text-right font-medium text-slate-800">RM {pay.amount}</td>
                             <td className="px-4 py-3"><Badge variant={pay.status === 'PAID' ? 'success' : 'warning'}>{pay.status}</Badge></td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </Card>
           ) : (
              <Card title="Permohonan Pengeluaran (Payouts)">
                 <div className="space-y-4">
                    {MOCK_WITHDRAWALS.map(w => {
                       const ustaz = MOCK_USERS.find(u => u.id === w.ustazId);
                       return (
                          <div key={w.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg bg-slate-50/50">
                             <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-full ${w.status === 'PENDING' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                                   <Banknote className="w-5 h-5" />
                                </div>
                                <div>
                                   <h4 className="font-semibold text-slate-800">{ustaz?.name}</h4>
                                   <p className="text-xs text-slate-500">Dihantar: {w.date}</p>
                                </div>
                             </div>
                             <div className="text-right flex items-center gap-4">
                                <div>
                                   <p className="font-bold text-slate-800">RM {w.amount}</p>
                                   <span className={`text-xs font-medium ${w.status === 'PENDING' ? 'text-amber-600' : 'text-green-600'}`}>{w.status}</span>
                                </div>
                                {w.status === 'PENDING' && (
                                   <div className="flex gap-2">
                                      <Button variant="ghost" className="text-red-600 hover:bg-red-50 p-2 h-auto"><XCircle className="w-5 h-5" /></Button>
                                      <Button className="bg-green-600 hover:bg-green-700 p-2 h-auto text-white"><CheckCircle className="w-5 h-5" /></Button>
                                   </div>
                                )}
                             </div>
                          </div>
                       );
                    })}
                 </div>
              </Card>
           )}
        </div>
     );
  }

  // --- PARENT VIEW LOGIC ---
  const myStudents = MOCK_STUDENTS.filter(s => s.parentId === user.id);
  const mySessions = MOCK_SESSIONS.filter(s => myStudents.find(stu => stu.id === s.studentId));
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Pembayaran Yuran</h1>
        <p className="text-slate-500">Semak invois dan buat pembayaran untuk anak-anak.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 space-y-6">
            <Card title="Invois Tertunggak">
               {/* Mock Outstanding Item */}
               <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-white rounded-full text-amber-500 shadow-sm"><Clock className="w-5 h-5" /></div>
                     <div>
                        <h4 className="font-bold text-slate-800">Yuran Oktober 2023</h4>
                        <p className="text-sm text-slate-600">Ahmad bin Razak • 3 Sesi</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                     <span className="font-bold text-xl text-slate-800">RM 45.00</span>
                     <Button className="flex-1 sm:flex-none" onClick={() => setShowPaymentModal(true)}>Bayar Sekarang</Button>
                  </div>
               </div>
            </Card>

            <Card title="Sejarah Pembayaran">
               <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                     <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                           <th className="px-4 py-3">Tarikh</th>
                           <th className="px-4 py-3">Item</th>
                           <th className="px-4 py-3 text-right">Amaun</th>
                           <th className="px-4 py-3 text-center">Resit</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        {RECENT_PAYMENTS.filter(p => p.status === 'PAID').map(p => (
                           <tr key={p.id}>
                              <td className="px-4 py-3 text-slate-600">{p.date}</td>
                              <td className="px-4 py-3 font-medium text-slate-700">Yuran Bulanan</td>
                              <td className="px-4 py-3 text-right">RM {p.amount}</td>
                              <td className="px-4 py-3 text-center">
                                 <button className="text-primary-600 hover:text-primary-800"><Download className="w-4 h-4 mx-auto" /></button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </Card>
         </div>

         <div>
            <Card className="bg-slate-800 text-white border-none">
               <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" /> Kaedah Pembayaran
               </h3>
               <p className="text-slate-300 text-sm mb-6">Kami menyokong pembayaran selamat melalui:</p>
               <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white/10 p-3 rounded-lg text-center font-semibold text-sm hover:bg-white/20 cursor-pointer">FPX Online</div>
                  <div className="bg-white/10 p-3 rounded-lg text-center font-semibold text-sm hover:bg-white/20 cursor-pointer">DuitNow QR</div>
                  <div className="bg-white/10 p-3 rounded-lg text-center font-semibold text-sm hover:bg-white/20 cursor-pointer">Kad Kredit</div>
                  <div className="bg-white/10 p-3 rounded-lg text-center font-semibold text-sm hover:bg-white/20 cursor-pointer">Tunai</div>
               </div>
               <div className="text-xs text-slate-400 text-center border-t border-white/10 pt-4">
                  Dilindungi oleh PayNet & SSL Security
               </div>
            </Card>
         </div>
      </div>

      {/* Payment Selection Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-800">Pilih Kaedah Pembayaran</h3>
                    <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-6 h-6" /></button>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg mb-6 flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Jumlah Perlu Dibayar</span>
                    <span className="text-2xl font-bold text-slate-800">RM 45.00</span>
                </div>

                <form onSubmit={handlePaymentProcess} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div 
                            onClick={() => setSelectedMethod('FPX')}
                            className={`cursor-pointer p-4 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all ${selectedMethod === 'FPX' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-slate-200 hover:border-slate-300'}`}
                        >
                            <Landmark className="w-6 h-6" />
                            <span className="text-sm font-semibold">FPX / Bank</span>
                        </div>
                        <div 
                            onClick={() => setSelectedMethod('QR')}
                            className={`cursor-pointer p-4 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all ${selectedMethod === 'QR' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-slate-200 hover:border-slate-300'}`}
                        >
                            <QrCode className="w-6 h-6" />
                            <span className="text-sm font-semibold">DuitNow QR</span>
                        </div>
                        <div 
                            onClick={() => setSelectedMethod('CARD')}
                            className={`cursor-pointer p-4 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all ${selectedMethod === 'CARD' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-slate-200 hover:border-slate-300'}`}
                        >
                            <CreditCard className="w-6 h-6" />
                            <span className="text-sm font-semibold">Kad Kredit</span>
                        </div>
                         <div 
                            onClick={() => setSelectedMethod('CASH')}
                            className={`cursor-pointer p-4 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all ${selectedMethod === 'CASH' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-slate-200 hover:border-slate-300'}`}
                        >
                            <Banknote className="w-6 h-6" />
                            <span className="text-sm font-semibold">Tunai</span>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button type="submit" className="w-full py-3" isLoading={isProcessing}>
                           {isProcessing ? 'Sedang Memproses...' : `Bayar RM 45.00 Sekarang`}
                        </Button>
                        <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
                           <CheckCircle className="w-3 h-3" /> Transaksi selamat & disulitkan
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )}
    </div>
  );
};

export default PaymentView;