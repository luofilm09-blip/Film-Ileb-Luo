import { useState } from 'react';

type Plan = { id: string; name: string; price: number; duration: number; durationUnit: 'month' | 'year'; features: string; isActive: boolean; color: string };

const defaultPlans: Plan[] = [
  { id: 'monthly', name: 'MONTHLY', price: 9.99, duration: 1, durationUnit: 'month', features: 'HD STREAMING, NO ADS, EXCLUSIVE CONTENT, 1 DEVICE', isActive: true, color: '#4a9eff' },
  { id: 'quarterly', name: 'QUARTERLY', price: 24.99, duration: 3, durationUnit: 'month', features: '4K ULTRA HD, NO ADS, EXCLUSIVE + PREMIERE, 2 DEVICES, DOWNLOAD OFFLINE', isActive: true, color: '#e50914' },
  { id: 'yearly', name: 'YEARLY', price: 79.99, duration: 1, durationUnit: 'year', features: '4K ULTRA HD, NO ADS, ALL CONTENT, 4 DEVICES, DOWNLOAD OFFLINE, EARLY ACCESS', isActive: true, color: '#f5a623' },
];

const mockSubs = [
  { id: 's001', userName: 'JAMES CARTER', email: 'james.carter@email.com', plan: 'YEARLY', amount: 79.99, startDate: '2024-11-12', endDate: '2025-11-12', status: 'active' },
  { id: 's002', userName: 'SOPHIA CHEN', email: 'sophia.chen@email.com', plan: 'QUARTERLY', amount: 24.99, startDate: '2024-12-01', endDate: '2025-03-01', status: 'active' },
  { id: 's003', userName: 'AISHA PATEL', email: 'aisha.p@email.com', plan: 'MONTHLY', amount: 9.99, startDate: '2025-01-20', endDate: '2025-02-20', status: 'expired' },
  { id: 's004', userName: 'DAVID KIM', email: 'david.kim@email.com', plan: 'YEARLY', amount: 79.99, startDate: '2025-03-01', endDate: '2026-03-01', status: 'active' },
  { id: 's005', userName: 'MARIA COSTA', email: 'maria.c@email.com', plan: 'MONTHLY', amount: 9.99, startDate: '2025-04-01', endDate: '2025-05-01', status: 'cancelled' },
  { id: 's006', userName: 'ALEX HUANG', email: 'alex.h@email.com', plan: 'QUARTERLY', amount: 24.99, startDate: '2025-03-15', endDate: '2025-06-15', status: 'active' },
];

export default function AdminSubscriptions() {
  const [plans, setPlans] = useState<Plan[]>(defaultPlans);
  const [editPlan, setEditPlan] = useState<Plan | null>(null);
  const [tab, setTab] = useState<'subscribers' | 'plans'>('subscribers');
  const [filter, setFilter] = useState('all');

  const savePlan = () => {
    if (!editPlan) return;
    setPlans(plans.map(p => p.id === editPlan.id ? editPlan : p));
    setEditPlan(null);
  };

  const filteredSubs = mockSubs.filter(s => filter === 'all' || s.status === filter);

  const stats = {
    active: mockSubs.filter(s => s.status === 'active').length,
    revenue: mockSubs.filter(s => s.status === 'active').reduce((a, s) => a + s.amount, 0).toFixed(2),
    expired: mockSubs.filter(s => s.status === 'expired').length,
    cancelled: mockSubs.filter(s => s.status === 'cancelled').length,
  };

  return (
    <div style={{ padding: '28px 32px', color: '#fff' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, letterSpacing: 1 }}>SUBSCRIPTIONS</h1>
        <p style={{ margin: '4px 0 0', color: '#555', fontSize: 11, letterSpacing: 1 }}>MANAGE PLANS AND SUBSCRIBERS</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'ACTIVE', value: stats.active, color: '#22c55e' },
          { label: 'REVENUE', value: `$${stats.revenue}`, color: '#4a9eff' },
          { label: 'EXPIRED', value: stats.expired, color: '#f5a623' },
          { label: 'CANCELLED', value: stats.cancelled, color: '#e50914' },
        ].map(s => (
          <div key={s.label} style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ color: '#555', fontSize: 9, letterSpacing: 1.5, marginBottom: 8 }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: 24, fontWeight: 900 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 20 }}>
        {(['subscribers', 'plans'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ background: 'none', border: 'none', color: tab === t ? '#fff' : '#555', fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: 1.5, padding: '10px 20px', cursor: 'pointer', borderBottom: tab === t ? '2px solid #e50914' : '2px solid transparent', marginBottom: -1 }}>
            {t === 'subscribers' ? 'SUBSCRIBERS' : 'MANAGE PLANS'}
          </button>
        ))}
      </div>

      {tab === 'subscribers' && (
        <>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {['all', 'active', 'expired', 'cancelled'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? '#e50914' : 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 6, color: filter === f ? '#fff' : '#666', padding: '7px 14px', fontSize: 10, letterSpacing: 1.5, fontWeight: 700, cursor: 'pointer' }}>
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          <div style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['USER', 'PLAN', 'AMOUNT', 'START DATE', 'END DATE', 'STATUS'].map(h => (
                    <th key={h} style={{ textAlign: 'left', color: '#444', fontSize: 9, letterSpacing: 1.5, padding: '14px 16px', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredSubs.map(s => (
                  <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>{s.userName}</div>
                      <div style={{ color: '#555', fontSize: 9, marginTop: 2 }}>{s.email}</div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: 'rgba(229,9,20,0.1)', color: '#e50914', padding: '3px 8px', borderRadius: 4, fontSize: 9, letterSpacing: 1 }}>{s.plan}</span>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#22c55e', fontSize: 11, fontWeight: 700 }}>${s.amount.toFixed(2)}</td>
                    <td style={{ padding: '12px 16px', color: '#666', fontSize: 10 }}>{s.startDate}</td>
                    <td style={{ padding: '12px 16px', color: '#666', fontSize: 10 }}>{s.endDate}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: s.status === 'active' ? 'rgba(34,197,94,0.1)' : s.status === 'expired' ? 'rgba(245,166,35,0.1)' : 'rgba(229,9,20,0.1)', color: s.status === 'active' ? '#22c55e' : s.status === 'expired' ? '#f5a623' : '#e50914', padding: '3px 8px', borderRadius: 4, fontSize: 9, letterSpacing: 1 }}>
                        {s.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'plans' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {plans.map(plan => (
            <div key={plan.id} style={{ background: '#16161a', border: `1px solid ${plan.color}33`, borderRadius: 14, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ color: plan.color, fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>{plan.name}</div>
                  <div style={{ color: '#fff', fontSize: 28, fontWeight: 900 }}>${plan.price}</div>
                  <div style={{ color: '#555', fontSize: 10, marginTop: 2 }}>PER {plan.duration} {plan.durationUnit.toUpperCase()}{plan.duration > 1 ? 'S' : ''}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <span style={{ background: plan.isActive ? 'rgba(34,197,94,0.1)' : 'rgba(229,9,20,0.1)', color: plan.isActive ? '#22c55e' : '#e50914', padding: '3px 8px', borderRadius: 4, fontSize: 9, letterSpacing: 1 }}>
                    {plan.isActive ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
              </div>
              <div style={{ color: '#555', fontSize: 10, marginBottom: 16, lineHeight: 1.6 }}>
                {plan.features.split(', ').map(f => <div key={f}>✓ {f}</div>)}
              </div>
              <button onClick={() => setEditPlan({ ...plan })} style={{ width: '100%', background: `${plan.color}1a`, border: `1px solid ${plan.color}33`, color: plan.color, padding: '10px', borderRadius: 8, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, cursor: 'pointer', fontFamily: 'Arial, sans-serif' }}>
                EDIT PLAN
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Edit plan modal */}
      {editPlan && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setEditPlan(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }} />
          <div style={{ position: 'relative', background: '#1a1a1a', borderRadius: 16, padding: 28, width: 440, border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>EDIT {editPlan.name} PLAN</div>
              <button onClick={() => setEditPlan(null)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 18 }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>PLAN NAME</label>
                <input value={editPlan.name} onChange={e => setEditPlan({ ...editPlan, name: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={labelStyle}>PRICE (USD)</label>
                  <input type="number" step="0.01" value={editPlan.price} onChange={e => setEditPlan({ ...editPlan, price: parseFloat(e.target.value) })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>DURATION</label>
                  <input type="number" value={editPlan.duration} onChange={e => setEditPlan({ ...editPlan, duration: parseInt(e.target.value) })} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>DURATION UNIT</label>
                <select value={editPlan.durationUnit} onChange={e => setEditPlan({ ...editPlan, durationUnit: e.target.value as 'month' | 'year' })} style={inputStyle}>
                  <option value="month">MONTH</option>
                  <option value="year">YEAR</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>FEATURES (COMMA SEPARATED)</label>
                <textarea value={editPlan.features} onChange={e => setEditPlan({ ...editPlan, features: e.target.value })} style={{ ...inputStyle, height: 80, resize: 'vertical' }} />
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#888', fontSize: 10, letterSpacing: 1, cursor: 'pointer' }}>
                  <input type="checkbox" checked={editPlan.isActive} onChange={e => setEditPlan({ ...editPlan, isActive: e.target.checked })} />
                  PLAN ACTIVE
                </label>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button onClick={savePlan} style={{ background: '#e50914', border: 'none', borderRadius: 8, color: '#fff', padding: '11px 20px', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, cursor: 'pointer' }}>SAVE CHANGES</button>
              <button onClick={() => setEditPlan(null)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, color: '#fff', padding: '11px 20px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = { width: '100%', padding: '11px 14px', background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontFamily: 'Arial, sans-serif', fontSize: 11, outline: 'none', boxSizing: 'border-box', letterSpacing: 0.8 };
const labelStyle: React.CSSProperties = { display: 'block', color: '#555', fontSize: 9, letterSpacing: 1.5, marginBottom: 6, fontWeight: 700 };
