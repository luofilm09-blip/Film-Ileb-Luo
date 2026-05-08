import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { DollarIcon, UsersIcon, MovieIcon, CrownIcon, ChartIcon } from '../../components/Icons';

type Stats = { users: number; vipUsers: number; content: number; revenue: number };
type Activity = { id: string; type: string; desc: string; time: string };

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ users: 0, vipUsers: 0, content: 0, revenue: 0 });
  const [activity, setActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [usersSnap, vipSnap, contentSnap, txSnap] = await Promise.all([
          getDocs(collection(db, 'users')),
          getDocs(query(collection(db, 'users'), where('isVip', '==', true))),
          getDocs(collection(db, 'content')),
          getDocs(query(collection(db, 'transactions'), orderBy('date', 'desc'), limit(10))),
        ]);
        let revenue = 0;
        const acts: Activity[] = [];
        txSnap.docs.forEach(d => {
          const tx = d.data();
          if (tx.type === 'subscription') revenue += tx.amount || 0;
          acts.push({
            id: d.id,
            type: tx.type,
            desc: tx.desc || 'TRANSACTION',
            time: tx.date?.toDate?.()?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) || '—',
          });
        });
        setStats({ users: usersSnap.size, vipUsers: vipSnap.size, content: contentSnap.size, revenue });
        setActivity(acts);
      } catch (e) {
        console.error(e);
      } finally { setLoading(false); }
    };
    load();
  }, []);

  const cards = [
    { label: 'TOTAL USERS', value: stats.users, Icon: UsersIcon, color: '#4a9eff', sub: 'REGISTERED ACCOUNTS' },
    { label: 'VIP MEMBERS', value: stats.vipUsers, Icon: CrownIcon, color: '#f5a623', sub: 'ACTIVE SUBSCRIPTIONS' },
    { label: 'TOTAL CONTENT', value: stats.content, Icon: MovieIcon, color: '#22c55e', sub: 'MOVIES / SERIES / LIVE' },
    { label: 'TOTAL REVENUE', value: `$${stats.revenue.toFixed(2)}`, Icon: DollarIcon, color: '#e50914', sub: 'FROM SUBSCRIPTIONS' },
  ];

  return (
    <div style={{ padding: '32px 36px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 900, letterSpacing: 1, margin: 0, fontFamily: 'Arial Black, Arial, sans-serif' }}>DASHBOARD</h1>
        <p style={{ color: '#444', fontSize: 11, letterSpacing: 1, margin: '6px 0 0', fontFamily: 'Arial, sans-serif' }}>REAL-TIME OVERVIEW OF YOUR PLATFORM</p>
      </div>
      {loading ? (
        <div style={{ color: '#444', fontSize: 12, letterSpacing: 1, padding: '40px 0', fontFamily: 'Arial, sans-serif' }}>LOADING STATS...</div>
      ) : (<>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
          {cards.map(c => (
            <div key={c.label} style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '22px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ color: '#444', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, fontFamily: 'Arial, sans-serif' }}>{c.label}</span>
                <div style={{ background: `${c.color}18`, borderRadius: 8, padding: 8, display: 'flex' }}><c.Icon size={16} color={c.color} /></div>
              </div>
              <div style={{ color: '#fff', fontSize: 28, fontWeight: 900, letterSpacing: -1, fontFamily: 'Arial Black, Arial, sans-serif' }}>{c.value}</div>
              <div style={{ color: '#333', fontSize: 10, letterSpacing: 1, marginTop: 4, fontFamily: 'Arial, sans-serif' }}>{c.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <ChartIcon size={16} color="#e50914" />
            <h2 style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: 1, margin: 0, fontFamily: 'Arial, sans-serif' }}>RECENT ACTIVITY</h2>
          </div>
          {activity.length === 0 ? (
            <div style={{ color: '#333', fontSize: 11, letterSpacing: 1, padding: '20px 0', fontFamily: 'Arial, sans-serif' }}>NO TRANSACTIONS YET</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif' }}>
              <thead>
                <tr>{['TYPE','DESCRIPTION','DATE'].map(h => (
                  <th key={h} style={{ color: '#333', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textAlign: 'left', padding: '0 0 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {activity.map(a => (
                  <tr key={a.id}>
                    <td style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <span style={{ background: a.type === 'subscription' ? 'rgba(34,197,94,0.12)' : 'rgba(74,158,255,0.12)', color: a.type === 'subscription' ? '#22c55e' : '#4a9eff', fontSize: 9, fontWeight: 700, letterSpacing: 1.5, padding: '3px 8px', borderRadius: 4 }}>{a.type.toUpperCase()}</span>
                    </td>
                    <td style={{ padding: '12px 0', color: '#aaa', fontSize: 11, letterSpacing: 0.5, borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{a.desc}</td>
                    <td style={{ padding: '12px 0', color: '#444', fontSize: 10, letterSpacing: 0.5, borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{a.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </>)}
    </div>
  );
}
