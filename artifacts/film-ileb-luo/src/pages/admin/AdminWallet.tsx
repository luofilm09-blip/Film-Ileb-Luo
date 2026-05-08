import { useState } from 'react';

const transactions = [
  { id: 't001', type: 'subscription', desc: 'YEARLY VIP — DAVID KIM', amount: 79.99, date: '2025-05-07', status: 'completed' },
  { id: 't002', type: 'subscription', desc: 'QUARTERLY VIP — ALEX HUANG', amount: 24.99, date: '2025-05-06', status: 'completed' },
  { id: 't003', type: 'withdrawal', desc: 'WITHDRAWAL TO BANK ACCOUNT', amount: -500.00, date: '2025-05-05', status: 'completed' },
  { id: 't004', type: 'subscription', desc: 'MONTHLY VIP — NEW USER', amount: 9.99, date: '2025-05-05', status: 'completed' },
  { id: 't005', type: 'subscription', desc: 'YEARLY VIP — JAMES CARTER', amount: 79.99, date: '2025-05-04', status: 'completed' },
  { id: 't006', type: 'subscription', desc: 'QUARTERLY VIP — SOPHIA CHEN', amount: 24.99, date: '2025-05-03', status: 'completed' },
  { id: 't007', type: 'withdrawal', desc: 'WITHDRAWAL TO BANK ACCOUNT', amount: -1200.00, date: '2025-04-28', status: 'completed' },
  { id: 't008', type: 'subscription', desc: 'MONTHLY VIP — AISHA PATEL', amount: 9.99, date: '2025-04-20', status: 'completed' },
  { id: 't009', type: 'refund', desc: 'REFUND — CANCELLED SUBSCRIPTION', amount: -9.99, date: '2025-04-15', status: 'completed' },
  { id: 't010', type: 'subscription', desc: 'YEARLY VIP — PREMIUM USER', amount: 79.99, date: '2025-04-10', status: 'completed' },
];

export default function AdminWallet() {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState('');
  const [bank, setBank] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [success, setSuccess] = useState(false);

  const balance = 2840.94;
  const totalEarned = 12480.50;
  const totalWithdrawn = 9639.56;

  const handleWithdraw = () => {
    if (!amount || !bank || !accountNo) return;
    const amt = parseFloat(amount);
    if (amt > balance || amt <= 0) return;
    setWithdrawals(w => [{ id: `w${Date.now()}`, amount: amt, bank, accountNo, date: new Date().toISOString(), status: 'pending' }, ...w]);
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setShowWithdraw(false); setAmount(''); setBank(''); setAccountNo(''); }, 2000);
  };

  return (
    <div style={{ padding: '28px 32px', color: '#fff' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, letterSpacing: 1 }}>WALLET</h1>
        <p style={{ margin: '4px 0 0', color: '#555', fontSize: 11, letterSpacing: 1 }}>REVENUE & WITHDRAWALS</p>
      </div>

      {/* Balance cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 28 }}>
        <div style={{ background: 'linear-gradient(135deg,#1a0505,#2a0a0a)', border: '1px solid rgba(229,9,20,0.2)', borderRadius: 16, padding: '24px 24px' }}>
          <div style={{ color: '#e50914', fontSize: 10, letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>AVAILABLE BALANCE</div>
          <div style={{ color: '#fff', fontSize: 38, fontWeight: 900 }}>${balance.toFixed(2)}</div>
          <div style={{ color: '#555', fontSize: 10, marginTop: 8, letterSpacing: 0.8 }}>READY FOR WITHDRAWAL</div>
          <button onClick={() => setShowWithdraw(true)} style={{ marginTop: 20, background: '#e50914', border: 'none', borderRadius: 10, color: '#fff', padding: '12px 24px', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, cursor: 'pointer', fontFamily: 'Arial, sans-serif' }}>
            WITHDRAW FUNDS
          </button>
        </div>
        <div style={{ background: '#16161a', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 16, padding: '24px 24px' }}>
          <div style={{ color: '#22c55e', fontSize: 10, letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>TOTAL EARNED</div>
          <div style={{ color: '#fff', fontSize: 38, fontWeight: 900 }}>${totalEarned.toFixed(2)}</div>
          <div style={{ color: '#555', fontSize: 10, marginTop: 8, letterSpacing: 0.8 }}>ALL TIME REVENUE</div>
          <div style={{ marginTop: 20, color: '#22c55e', fontSize: 12, fontWeight: 700 }}>↑ +$240 TODAY</div>
        </div>
        <div style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '24px 24px' }}>
          <div style={{ color: '#888', fontSize: 10, letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>TOTAL WITHDRAWN</div>
          <div style={{ color: '#fff', fontSize: 38, fontWeight: 900 }}>${totalWithdrawn.toFixed(2)}</div>
          <div style={{ color: '#555', fontSize: 10, marginTop: 8, letterSpacing: 0.8 }}>TOTAL PAID OUT</div>
          <div style={{ marginTop: 20, color: '#555', fontSize: 12 }}>LAST: MAY 5, 2025</div>
        </div>
      </div>

      {/* Pending withdrawals */}
      {withdrawals.length > 0 && (
        <div style={{ background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 14, padding: '20px', marginBottom: 24 }}>
          <div style={{ color: '#f5a623', fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>⏳ PENDING WITHDRAWALS</div>
          {withdrawals.map(w => (
            <div key={w.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div>
                <div style={{ color: '#fff', fontSize: 11 }}>{w.bank} — ****{w.accountNo.slice(-4)}</div>
                <div style={{ color: '#555', fontSize: 9, marginTop: 2 }}>{new Date(w.date).toLocaleString()}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>${w.amount.toFixed(2)}</div>
                <span style={{ background: 'rgba(245,166,35,0.1)', color: '#f5a623', padding: '3px 8px', borderRadius: 4, fontSize: 9 }}>PENDING</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Transactions */}
      <div style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 1.5 }}>TRANSACTION HISTORY</div>
          <div style={{ color: '#555', fontSize: 10, letterSpacing: 0.8 }}>{transactions.length + withdrawals.length} TRANSACTIONS</div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['TYPE', 'DESCRIPTION', 'DATE', 'STATUS', 'AMOUNT'].map(h => (
                <th key={h} style={{ textAlign: h === 'AMOUNT' ? 'right' : 'left', color: '#444', fontSize: 9, letterSpacing: 1.5, padding: '12px 20px', fontWeight: 700 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...withdrawals.map(w => ({ id: w.id, type: 'withdrawal', desc: `WITHDRAWAL — ${w.bank}`, amount: -w.amount, date: w.date.split('T')[0], status: 'pending' })), ...transactions].map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '13px 20px' }}>
                  <span style={{ background: t.type === 'subscription' ? 'rgba(34,197,94,0.1)' : t.type === 'withdrawal' ? 'rgba(74,158,255,0.1)' : 'rgba(229,9,20,0.1)', color: t.type === 'subscription' ? '#22c55e' : t.type === 'withdrawal' ? '#4a9eff' : '#e50914', padding: '3px 8px', borderRadius: 4, fontSize: 9, letterSpacing: 1, fontWeight: 700 }}>
                    {t.type.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '13px 20px', color: '#ccc', fontSize: 11 }}>{t.desc}</td>
                <td style={{ padding: '13px 20px', color: '#555', fontSize: 10 }}>{t.date}</td>
                <td style={{ padding: '13px 20px' }}>
                  <span style={{ color: t.status === 'completed' ? '#22c55e' : '#f5a623', fontSize: 10, letterSpacing: 0.8 }}>{t.status.toUpperCase()}</span>
                </td>
                <td style={{ padding: '13px 20px', textAlign: 'right', color: t.amount > 0 ? '#22c55e' : '#e50914', fontSize: 13, fontWeight: 700 }}>
                  {t.amount > 0 ? '+' : ''}${Math.abs(t.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Withdraw modal */}
      {showWithdraw && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setShowWithdraw(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)' }} />
          <div style={{ position: 'relative', background: '#1a1a1a', borderRadius: 16, padding: 28, width: 420, border: '1px solid rgba(255,255,255,0.1)' }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <div style={{ color: '#22c55e', fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>WITHDRAWAL REQUESTED</div>
                <div style={{ color: '#555', fontSize: 11, marginTop: 8 }}>PROCESSING TIME: 1-3 BUSINESS DAYS</div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>WITHDRAW FUNDS</div>
                  <button onClick={() => setShowWithdraw(false)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 18 }}>✕</button>
                </div>
                <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 20 }}>
                  <div style={{ color: '#555', fontSize: 10, letterSpacing: 1 }}>AVAILABLE BALANCE</div>
                  <div style={{ color: '#22c55e', fontSize: 22, fontWeight: 900 }}>${balance.toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={labelStyle}>WITHDRAWAL AMOUNT (USD)</label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" max={balance} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>BANK NAME</label>
                    <input value={bank} onChange={e => setBank(e.target.value)} placeholder="BANK OF AMERICA, CHASE, ETC." style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>ACCOUNT NUMBER</label>
                    <input value={accountNo} onChange={e => setAccountNo(e.target.value)} placeholder="XXXX-XXXX-XXXX" style={inputStyle} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                  <button onClick={handleWithdraw} style={{ flex: 1, background: '#e50914', border: 'none', borderRadius: 8, color: '#fff', padding: '12px', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, cursor: 'pointer' }}>REQUEST WITHDRAWAL</button>
                  <button onClick={() => setShowWithdraw(false)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, color: '#fff', padding: '12px 16px', fontSize: 11, cursor: 'pointer' }}>CANCEL</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = { width: '100%', padding: '11px 14px', background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontFamily: 'Arial, sans-serif', fontSize: 11, outline: 'none', boxSizing: 'border-box', letterSpacing: 0.8 };
const labelStyle: React.CSSProperties = { display: 'block', color: '#555', fontSize: 9, letterSpacing: 1.5, marginBottom: 6, fontWeight: 700 };
