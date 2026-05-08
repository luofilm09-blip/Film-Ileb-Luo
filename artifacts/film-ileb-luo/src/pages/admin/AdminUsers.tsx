import { useState, useEffect } from 'react';

type User = { id: string; name: string; email: string; phone: string; isVip: boolean; isAdmin: boolean; joinedAt: string; status: string; vipExpiry?: string };

const mockUsers: User[] = [
  { id: 'u001', name: 'JAMES CARTER', email: 'james.carter@email.com', phone: '+1-555-0101', isVip: true, isAdmin: false, joinedAt: '2024-11-12T08:30:00Z', status: 'active', vipExpiry: '2025-11-12T00:00:00Z' },
  { id: 'u002', name: 'SOPHIA CHEN', email: 'sophia.chen@email.com', phone: '+1-555-0102', isVip: true, isAdmin: false, joinedAt: '2024-12-01T14:22:00Z', status: 'active', vipExpiry: '2025-03-01T00:00:00Z' },
  { id: 'u003', name: 'MARCUS JOHNSON', email: 'marcus.j@email.com', phone: '+1-555-0103', isVip: false, isAdmin: false, joinedAt: '2025-01-05T09:15:00Z', status: 'active' },
  { id: 'u004', name: 'AISHA PATEL', email: 'aisha.p@email.com', phone: '+1-555-0104', isVip: true, isAdmin: false, joinedAt: '2025-01-20T16:40:00Z', status: 'active', vipExpiry: '2025-04-20T00:00:00Z' },
  { id: 'u005', name: 'LUCAS RODRIGUEZ', email: 'l.rodriguez@email.com', phone: '+1-555-0105', isVip: false, isAdmin: false, joinedAt: '2025-02-08T11:55:00Z', status: 'suspended' },
  { id: 'u006', name: 'ELENA MORGAN', email: 'elena.m@email.com', phone: '+1-555-0106', isVip: false, isAdmin: false, joinedAt: '2025-02-14T07:30:00Z', status: 'active' },
  { id: 'u007', name: 'DAVID KIM', email: 'david.kim@email.com', phone: '+1-555-0107', isVip: true, isAdmin: false, joinedAt: '2025-03-01T13:20:00Z', status: 'active', vipExpiry: '2026-03-01T00:00:00Z' },
  { id: 'u008', name: 'OLIVIA FOSTER', email: 'o.foster@email.com', phone: '+1-555-0108', isVip: false, isAdmin: false, joinedAt: '2025-03-15T18:45:00Z', status: 'active' },
];

const activityMock = [
  { action: 'WATCHED OCEAN OF DESTINY EP.9', time: '10 MIN AGO' },
  { action: 'SUBSCRIBED TO YEARLY VIP PLAN', time: '2 HR AGO' },
  { action: 'SEARCHED: ETERNAL NIGHT', time: '3 HR AGO' },
  { action: 'ADDED TO WATCHLIST: GOLDEN GATE', time: 'YESTERDAY' },
  { action: 'LOGGED IN FROM MOBILE', time: '2 DAYS AGO' },
];

export default function AdminUsers() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'vip' | 'active' | 'suspended'>('all');
  const [selected, setSelected] = useState<User | null>(null);

  useEffect(() => {
    const stored: User[] = JSON.parse(localStorage.getItem('film_users') || '[]');
    setAllUsers([...mockUsers, ...stored]);
  }, []);

  const save = (data: User[]) => {
    setAllUsers(data);
    const custom = data.filter(u => !mockUsers.find(m => m.id === u.id));
    localStorage.setItem('film_users', JSON.stringify(custom));
  };

  const toggleStatus = (id: string) => {
    save(allUsers.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u));
    if (selected?.id === id) setSelected(s => s ? { ...s, status: s.status === 'active' ? 'suspended' : 'active' } : null);
  };

  const toggleVip = (id: string) => {
    save(allUsers.map(u => u.id === id ? { ...u, isVip: !u.isVip } : u));
    if (selected?.id === id) setSelected(s => s ? { ...s, isVip: !s.isVip } : null);
  };

  const filtered = allUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search);
    const matchFilter = filter === 'all' || (filter === 'vip' && u.isVip) || (filter === 'active' && u.status === 'active') || (filter === 'suspended' && u.status === 'suspended');
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ padding: '28px 32px', color: '#fff', display: 'flex', gap: 24, minHeight: 'calc(100vh - 0px)' }}>
      {/* Left panel */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, letterSpacing: 1 }}>USERS</h1>
            <p style={{ margin: '4px 0 0', color: '#555', fontSize: 11, letterSpacing: 1 }}>
              {allUsers.length} TOTAL · {allUsers.filter(u => u.isVip).length} VIP · {allUsers.filter(u => u.status === 'suspended').length} SUSPENDED
            </p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <input placeholder="SEARCH NAME, EMAIL, PHONE..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputStyle, width: 260 }} />
          {(['all', 'vip', 'active', 'suspended'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? '#e50914' : 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 6, color: filter === f ? '#fff' : '#666', padding: '8px 14px', fontSize: 10, letterSpacing: 1.5, fontWeight: 700, cursor: 'pointer' }}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['USER', 'CONTACT', 'STATUS', 'VIP', 'JOINED', 'ACTIONS'].map(h => (
                  <th key={h} style={{ textAlign: 'left', color: '#444', fontSize: 9, letterSpacing: 1.5, padding: '14px 16px', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} onClick={() => setSelected(u)} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', background: selected?.id === u.id ? 'rgba(229,9,20,0.05)' : 'transparent' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#e50914,#6a0008)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                        {u.name[0]}
                      </div>
                      <div>
                        <div style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>{u.name}</div>
                        <div style={{ color: '#555', fontSize: 9, letterSpacing: 0.5 }}>{u.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ color: '#888', fontSize: 10 }}>{u.email}</div>
                    <div style={{ color: '#555', fontSize: 9, marginTop: 2 }}>{u.phone}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: u.status === 'active' ? 'rgba(34,197,94,0.1)' : 'rgba(229,9,20,0.1)', color: u.status === 'active' ? '#22c55e' : '#e50914', padding: '3px 8px', borderRadius: 4, fontSize: 9, letterSpacing: 1 }}>
                      {u.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {u.isVip ? <span style={{ background: 'rgba(245,166,35,0.1)', color: '#f5a623', padding: '3px 8px', borderRadius: 4, fontSize: 9, letterSpacing: 1 }}>👑 VIP</span> : <span style={{ color: '#444', fontSize: 10 }}>—</span>}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#555', fontSize: 10 }}>{new Date(u.joinedAt).toLocaleDateString()}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }} onClick={e => e.stopPropagation()}>
                      <button onClick={() => toggleVip(u.id)} style={{ background: u.isVip ? 'rgba(245,166,35,0.1)' : 'rgba(255,255,255,0.06)', border: 'none', color: u.isVip ? '#f5a623' : '#666', padding: '5px 8px', borderRadius: 5, fontSize: 9, cursor: 'pointer' }}>
                        {u.isVip ? 'REVOKE VIP' : 'GRANT VIP'}
                      </button>
                      <button onClick={() => toggleStatus(u.id)} style={{ background: u.status === 'active' ? 'rgba(229,9,20,0.1)' : 'rgba(34,197,94,0.1)', border: 'none', color: u.status === 'active' ? '#e50914' : '#22c55e', padding: '5px 8px', borderRadius: 5, fontSize: 9, cursor: 'pointer' }}>
                        {u.status === 'active' ? 'SUSPEND' : 'RESTORE'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: '#444', fontSize: 11, letterSpacing: 1 }}>NO USERS FOUND</div>}
        </div>
      </div>

      {/* Right panel — user detail */}
      {selected && (
        <div style={{ width: 300, flexShrink: 0 }}>
          <div style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>USER PROFILE</div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 16 }}>✕</button>
            </div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg,#e50914,#6a0008)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, margin: '0 auto 12px' }}>{selected.name[0]}</div>
              <div style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>{selected.name}</div>
              {selected.isVip && <div style={{ color: '#f5a623', fontSize: 10, marginTop: 4, letterSpacing: 1 }}>👑 VIP MEMBER</div>}
            </div>
            {[{ l: 'EMAIL', v: selected.email }, { l: 'PHONE', v: selected.phone || '—' }, { l: 'USER ID', v: selected.id }, { l: 'JOINED', v: new Date(selected.joinedAt).toLocaleDateString() }, { l: 'STATUS', v: selected.status.toUpperCase() }, ...(selected.vipExpiry ? [{ l: 'VIP EXPIRES', v: new Date(selected.vipExpiry).toLocaleDateString() }] : [])].map(({ l, v }) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ color: '#444', fontSize: 10, letterSpacing: 1 }}>{l}</span>
                <span style={{ color: '#ccc', fontSize: 10, maxWidth: 160, textAlign: 'right', wordBreak: 'break-all' }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 20 }}>
              <div style={{ color: '#444', fontSize: 10, letterSpacing: 1.5, marginBottom: 12 }}>RECENT ACTIVITY</div>
              {activityMock.map((a, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ color: '#ccc', fontSize: 10 }}>{a.action}</div>
                  <div style={{ color: '#444', fontSize: 9, marginTop: 2 }}>{a.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = { padding: '10px 14px', background: '#16161a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontFamily: 'Arial, sans-serif', fontSize: 11, outline: 'none', letterSpacing: 0.8 };
