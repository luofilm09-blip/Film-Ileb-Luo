import { useState, useEffect } from 'react';

type Stat = { label: string; value: string; sub: string; color: string; icon: string };

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [content, setContent] = useState<any[]>([]);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem('film_users') || '[]'));
    const movies = JSON.parse(localStorage.getItem('film_movies') || '[]');
    const series = JSON.parse(localStorage.getItem('film_series') || '[]');
    const live = JSON.parse(localStorage.getItem('film_live') || '[]');
    setContent([...movies, ...series, ...live]);
  }, []);

  const vipUsers = users.filter(u => u.isVip).length;
  const revenue = (vipUsers * 9.99 + users.length * 0.5).toFixed(2);

  const stats: Stat[] = [
    { label: 'TOTAL USERS', value: String(users.length + 1204), sub: '+12 THIS WEEK', color: '#4a9eff', icon: '👥' },
    { label: 'VIP SUBSCRIBERS', value: String(vipUsers + 387), sub: '+5 TODAY', color: '#f5a623', icon: '👑' },
    { label: 'TOTAL CONTENT', value: String(content.length + 842), sub: '+3 THIS WEEK', color: '#a855f7', icon: '🎬' },
    { label: 'REVENUE (USD)', value: `$${(parseFloat(revenue) + 12480).toFixed(2)}`, sub: '+$240 TODAY', color: '#22c55e', icon: '💰' },
  ];

  const recentActivity = [
    { action: 'NEW USER REGISTERED', detail: 'john.doe@email.com', time: '2 MIN AGO', type: 'user' },
    { action: 'VIP SUBSCRIPTION', detail: 'YEARLY PLAN — $79.99', time: '15 MIN AGO', type: 'vip' },
    { action: 'CONTENT UPLOADED', detail: 'OCEAN OF DESTINY EP.17', time: '1 HR AGO', type: 'content' },
    { action: 'NEW USER REGISTERED', detail: 'mary.smith@email.com', time: '2 HR AGO', type: 'user' },
    { action: 'WITHDRAWAL REQUEST', detail: '$500.00 — PENDING', time: '3 HR AGO', type: 'wallet' },
    { action: 'CONTENT UPLOADED', detail: 'ETERNAL NIGHT EP.31', time: '5 HR AGO', type: 'content' },
    { action: 'VIP SUBSCRIPTION', detail: 'MONTHLY PLAN — $9.99', time: '6 HR AGO', type: 'vip' },
  ];

  const topContent = [
    { title: 'OCEAN OF DESTINY', category: 'TV DRAMA', views: '2.4M', rating: 9.2 },
    { title: 'ETERNAL NIGHT SHINING', category: 'ROMANCE', views: '1.8M', rating: 8.9 },
    { title: 'GOLDEN GATE', category: 'TV DRAMA', views: '1.2M', rating: 8.7 },
    { title: 'YOUR HEART REVEALED', category: 'ROMANCE', views: '980K', rating: 8.5 },
    { title: 'MAJOR CASE DECODED', category: 'CRIME', views: '760K', rating: 8.3 },
  ];

  const typeColor: Record<string, string> = { user: '#4a9eff', vip: '#f5a623', content: '#a855f7', wallet: '#22c55e' };

  return (
    <div style={{ padding: '28px 32px', color: '#fff' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, letterSpacing: 1 }}>DASHBOARD</h1>
        <p style={{ margin: '4px 0 0', color: '#555', fontSize: 11, letterSpacing: 1 }}>OVERVIEW · {new Date().toDateString().toUpperCase()}</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '20px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ color: '#555', fontSize: 10, letterSpacing: 1.5, marginBottom: 8 }}>{s.label}</div>
                <div style={{ color: '#fff', fontSize: 26, fontWeight: 900, letterSpacing: -0.5 }}>{s.value}</div>
                <div style={{ color: s.color, fontSize: 10, marginTop: 4, letterSpacing: 0.8 }}>{s.sub}</div>
              </div>
              <div style={{ fontSize: 28, opacity: 0.6 }}>{s.icon}</div>
            </div>
            <div style={{ marginTop: 14, height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
              <div style={{ width: '65%', height: '100%', background: s.color, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
        {/* Top content */}
        <div style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '20px' }}>
          <div style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, marginBottom: 18 }}>TOP PERFORMING CONTENT</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['TITLE', 'CATEGORY', 'VIEWS', 'RATING'].map(h => (
                  <th key={h} style={{ textAlign: 'left', color: '#444', fontSize: 9, letterSpacing: 1.5, padding: '0 0 12px', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topContent.map((c, i) => (
                <tr key={c.title}>
                  <td style={{ padding: '12px 0', color: '#ccc', fontSize: 11, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ color: '#444', marginRight: 10, fontSize: 10 }}>#{i + 1}</span>{c.title}
                  </td>
                  <td style={{ padding: '12px 8px', fontSize: 10, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ background: 'rgba(74,158,255,0.1)', color: '#4a9eff', padding: '3px 8px', borderRadius: 4, letterSpacing: 0.8 }}>{c.category}</span>
                  </td>
                  <td style={{ padding: '12px 0', color: '#888', fontSize: 11, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{c.views}</td>
                  <td style={{ padding: '12px 0', color: '#f5a623', fontSize: 11, fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>⭐ {c.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent activity */}
        <div style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '20px' }}>
          <div style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, marginBottom: 18 }}>RECENT ACTIVITY</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < recentActivity.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', alignItems: 'flex-start' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: typeColor[a.type], marginTop: 3, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#ccc', fontSize: 10, fontWeight: 700, letterSpacing: 0.8 }}>{a.action}</div>
                  <div style={{ color: '#555', fontSize: 10, marginTop: 2 }}>{a.detail}</div>
                </div>
                <div style={{ color: '#444', fontSize: 9, letterSpacing: 0.5, whiteSpace: 'nowrap', flexShrink: 0 }}>{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue chart placeholder */}
      <div style={{ marginTop: 20, background: '#16161a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '20px' }}>
        <div style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, marginBottom: 16 }}>REVENUE — LAST 7 DAYS</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
          {[40, 65, 50, 80, 70, 90, 75].map((h, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: '100%', height: `${h}%`, background: `linear-gradient(180deg,#e50914,rgba(229,9,20,0.3))`, borderRadius: '4px 4px 0 0', minHeight: 4 }} />
              <div style={{ color: '#444', fontSize: 9, letterSpacing: 0.5 }}>{['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][i]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
