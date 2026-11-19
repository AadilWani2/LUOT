import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, CheckCircle2, Receipt, ShieldCheck, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function FeePayment() {
  const { user } = useAuth();
  const [paid, setPaid] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [method, setMethod] = useState('UPI');

  const feeItems = [
    { label: `Semester ${user?.semester || 1} Tuition Fee`, amount: 42000 },
    { label: 'Computer & Research Lab Fee', amount: 4500 },
    { label: 'Digital Library & Exam Fee', amount: 2500 },
  ];
  const total = feeItems.reduce((sum, i) => sum + i.amount, 0);

  const handlePay = (e) => {
    e.preventDefault();
    setPaid(true);
    setModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
      <Link
        to="/student/dashboard"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-luot-teal/70 hover:text-luot-teal mb-6"
      >
        <ArrowLeft size={14} /> Back to Student Dashboard
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-luot-gold">
            Accounts & Billing (UI Demo)
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-luot-teal mt-1">
            Online Fee Payment
          </h1>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-luot-teal/70">
          <ShieldCheck size={16} className="text-emerald-600" />
          256-Bit Encrypted Gateway UI
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-luot-teal/10 overflow-hidden shadow-xs mb-8">
        <div className="p-6 bg-luot-teal text-white flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs text-white/75">Student Name</p>
            <p className="font-serif text-lg font-bold">{user?.name}</p>
          </div>
          <div>
            <p className="text-xs text-white/75">Roll Number</p>
            <p className="font-semibold text-sm">{user?.rollNumber || 'LUOT2026CS01'}</p>
          </div>
          <div>
            <p className="text-xs text-white/75">Status</p>
            <span
              className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold ${
                paid ? 'bg-emerald-500 text-white' : 'bg-luot-gold text-luot-teal'
              }`}
            >
              {paid ? 'Paid' : 'Due Now'}
            </span>
          </div>
        </div>

        <div className="p-6 divide-y divide-luot-teal/10">
          {feeItems.map((item) => (
            <div key={item.label} className="py-3.5 flex justify-between text-sm">
              <span className="text-luot-teal/80">{item.label}</span>
              <span className="font-semibold text-luot-teal">
                ₹{item.amount.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
          <div className="pt-4 flex justify-between items-center">
            <span className="font-serif text-lg font-bold text-luot-teal">Total Payable</span>
            <span className="font-serif text-2xl font-bold text-luot-teal">
              ₹{total.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="px-6 py-4 bg-luot-bg flex justify-end">
          {paid ? (
            <div className="flex items-center gap-3 text-emerald-700 text-sm font-semibold">
              <CheckCircle2 size={18} />
              Payment Successful — Receipt #LUOT-2026-8841
              <button
                onClick={() => window.print()}
                className="ml-2 px-4 py-2 rounded-full bg-luot-teal text-white text-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Receipt size={14} /> Print Receipt
              </button>
            </div>
          ) : (
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3 rounded-full bg-luot-gold hover:bg-luot-gold-hover text-luot-teal font-semibold text-sm inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <CreditCard size={16} />
              Proceed to Pay ₹{total.toLocaleString('en-IN')}
            </button>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-7 shadow-2xl relative animate-fade-up">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-luot-teal/60 hover:text-luot-teal cursor-pointer"
            >
              <X size={20} />
            </button>
            <h3 className="font-serif text-2xl font-bold text-luot-teal mb-4">
              Select Payment Method
            </h3>
            <form onSubmit={handlePay} className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {['UPI', 'Card', 'NetBanking'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={`py-2.5 rounded-xl text-xs font-bold border cursor-pointer ${
                      method === m
                        ? 'bg-luot-teal text-white border-luot-teal'
                        : 'border-luot-teal/20 text-luot-teal'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <input
                required
                placeholder={
                  method === 'UPI'
                    ? 'Enter UPI ID (e.g. student@okaxis)'
                    : method === 'Card'
                    ? 'Card Number (Demo)'
                    : 'Bank Account Reference'
                }
                className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-luot-gold hover:bg-luot-gold-hover text-luot-teal font-semibold text-sm cursor-pointer"
              >
                Confirm Payment ₹{total.toLocaleString('en-IN')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

