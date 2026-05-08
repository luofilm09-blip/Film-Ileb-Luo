import { useApp } from '../context/AppContext';

const plans = [
  {
    id: 'monthly',
    name: 'MONTHLY',
    price: '$9.99',
    period: '/ MONTH',
    original: '$12.99',
    badge: null,
    color: '#4a9eff',
    features: ['HD STREAMING', 'NO ADS', 'EXCLUSIVE CONTENT', '1 DEVICE'],
  },
  {
    id: 'quarterly',
    name: 'QUARTERLY',
    price: '$24.99',
    period: '/ 3 MONTHS',
    original: '$38.97',
    badge: 'POPULAR',
    color: '#e50914',
    features: ['4K ULTRA HD', 'NO ADS', 'EXCLUSIVE + PREMIERE', '2 DEVICES', 'DOWNLOAD OFFLINE'],
  },
  {
    id: 'yearly',
    name: 'YEARLY',
    price: '$79.99',
    period: '/ YEAR',
    original: '$155.88',
    badge: 'BEST VALUE',
    color: '#f5a623',
    features: ['4K ULTRA HD', 'NO ADS', 'ALL CONTENT', '4 DEVICES', 'DOWNLOAD OFFLINE', 'EARLY ACCESS'],
  },
];

export default function VipModal() {
  const { vipModalOpen, closeVip, isLoggedIn, openLogin, login, user } = useApp();

  if (!vipModalOpen) return null;

  const handleSubscribe = (planId: string) => {
    if (!isLoggedIn) { closeVip(); openLogin('login'); return; }
    const expiry = new Date();
    if (planId === 'monthly') expiry.setMonth(expiry.getMonth() + 1);
    if (planId === 'quarterly') expiry.setMonth(expiry.getMonth() + 3);
    if (planId === 'yearly') expiry.setFullYear(expiry.getFullYear() + 1);
    if (user) login({ ...user, isVip: true, vipExpiry: expiry.toISOString() });
    closeVip();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={closeVip} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)' }} />
      <div style={{ position: 'relative', background: 'linear-gradient(145deg,#1a1a1a,#111)', borderRadius: 20, width: 780, maxWidth: '96vw', padding: '36px 32px 32px', boxShadow: '0 32px 100px rgba(0,0,0,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={closeVip} style={{ position: 'absolute', top: 16, right: 18, background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 22, lineHeight: 1 }}>✕</button>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,166,35,0.12)', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 20, padding: '6px 16px', marginBottom: 12 }}>
            <span style={{ fontSize: 16 }}>👑</span>
            <span style={{ color: '#f5a623', fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: 2 }}>VIP MEMBERSHIP</span>
          </div>
          <h2 style={{ color: '#fff', fontFamily: 'Arial Black, Arial, sans-serif', fontSize: 26, fontWeight: 900, margin: '0 0 8px', letterSpacing: 1 }}>UNLOCK PREMIUM EXPERIENCE</h2>
          <p style={{ color: '#888', fontFamily: 'Arial, sans-serif', fontSize: 12, letterSpacing: 1, margin: 0 }}>4K STREAMING · NO ADS · EXCLUSIVE CONTENT</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {plans.map(plan => (
            <div key={plan.id} style={{ position: 'relative', background: plan.badge === 'POPULAR' ? 'linear-gradient(145deg,#2a0a0a,#1a0505)' : '#1e1e1e', border: `1px solid ${plan.badge === 'POPULAR' ? '#e50914' : 'rgba(255,255,255,0.08)'}`, borderRadius: 16, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16, transition: 'transform 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              {plan.badge && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: plan.badge === 'POPULAR' ? '#e50914' : 'linear-gradient(90deg,#f5a623,#e08a00)', borderRadius: 20, padding: '4px 14px', fontSize: 10, fontFamily: 'Arial, sans-serif', fontWeight: 700, letterSpacing: 1.5, color: '#fff', whiteSpace: 'nowrap' }}>
                  {plan.badge}
                </div>
              )}
              <div>
                <div style={{ color: plan.color, fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: 2, marginBottom: 10 }}>{plan.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ color: '#fff', fontFamily: 'Arial Black, Arial, sans-serif', fontSize: 32, fontWeight: 900 }}>{plan.price}</span>
                  <span style={{ color: '#666', fontFamily: 'Arial, sans-serif', fontSize: 11, letterSpacing: 1 }}>{plan.period}</span>
                </div>
                <div style={{ color: '#555', fontFamily: 'Arial, sans-serif', fontSize: 11, textDecoration: 'line-through', marginTop: 4, letterSpacing: 0.5 }}>WAS {plan.original}</div>
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ccc', fontFamily: 'Arial, sans-serif', fontSize: 11, letterSpacing: 0.8 }}>
                    <span style={{ color: plan.color, fontSize: 14, lineHeight: 1 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleSubscribe(plan.id)} style={{ width: '100%', padding: '12px', background: plan.badge === 'POPULAR' ? 'linear-gradient(135deg,#e50914,#c0000a)' : plan.badge === 'BEST VALUE' ? 'linear-gradient(135deg,#f5a623,#e08a00)' : 'rgba(74,158,255,0.15)', border: plan.badge ? 'none' : '1px solid rgba(74,158,255,0.4)', borderRadius: 10, color: '#fff', fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: 1.5, cursor: 'pointer' }}>
                SUBSCRIBE NOW
              </button>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, color: '#444', fontFamily: 'Arial, sans-serif', fontSize: 10, letterSpacing: 0.8 }}>
          CANCEL ANYTIME · AUTO-RENEWAL · SECURE PAYMENT · ALL PRICES IN USD
        </p>
      </div>
    </div>
  );
}
