import { useState, useEffect } from 'react';
import { navItems } from '../../data/content';

const emptyForm = { name: '', description: '', category: 'live', streamUrl: '', thumbnail: '', language: 'ENGLISH', isActive: true, badge: 'LIVE' };
type Channel = typeof emptyForm & { id: string; uploadedAt: string; viewers: number };

export default function AdminLive() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [confirm, setConfirm] = useState<string | null>(null);

  useEffect(() => { setChannels(JSON.parse(localStorage.getItem('film_live') || '[]')); }, []);
  const save = (data: Channel[]) => { setChannels(data); localStorage.setItem('film_live', JSON.stringify(data)); };
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.name || !form.streamUrl) return;
    if (editId) {
      save(channels.map(c => c.id === editId ? { ...form, id: editId, uploadedAt: c.uploadedAt, viewers: c.viewers } : c));
    } else {
      save([{ ...form, id: `ch${Date.now()}`, uploadedAt: new Date().toISOString(), viewers: Math.floor(Math.random() * 10000) }, ...channels]);
    }
    setForm({ ...emptyForm }); setShowForm(false); setEditId(null);
  };

  const handleEdit = (ch: Channel) => {
    setForm({ name: ch.name, description: ch.description, category: ch.category, streamUrl: ch.streamUrl, thumbnail: ch.thumbnail, language: ch.language, isActive: ch.isActive, badge: ch.badge });
    setEditId(ch.id); setShowForm(true);
  };

  const toggleActive = (id: string) => {
    save(channels.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const handleDelete = (id: string) => { save(channels.filter(c => c.id !== id)); setConfirm(null); };
  const categories = navItems.filter(n => n.id !== 'home' && n.id !== 'vip');

  return (
    <div style={{ padding: '28px 32px', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, letterSpacing: 1 }}>LIVE CHANNELS</h1>
          <p style={{ margin: '4px 0 0', color: '#555', fontSize: 11, letterSpacing: 1 }}>
            {channels.filter(c => c.isActive).length} ACTIVE · {channels.length} TOTAL
          </p>
        </div>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm({ ...emptyForm }); }} style={btnStyle('#e50914')}>+ ADD CHANNEL</button>
      </div>

      {showForm && (
        <div style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>{editId ? 'EDIT CHANNEL' : 'ADD LIVE CHANNEL'}</div>
            <button onClick={() => { setShowForm(false); setEditId(null); }} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 18 }}>✕</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>CHANNEL NAME *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} style={inputStyle} placeholder="CHANNEL NAME" />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>DESCRIPTION</label>
              <textarea value={form.description} onChange={e => set('description', e.target.value)} style={{ ...inputStyle, height: 70, resize: 'vertical' }} placeholder="CHANNEL DESCRIPTION" />
            </div>
            <div>
              <label style={labelStyle}>CATEGORY</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} style={inputStyle}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>LANGUAGE</label>
              <select value={form.language} onChange={e => set('language', e.target.value)} style={inputStyle}>
                {['ENGLISH', 'MANDARIN', 'CANTONESE', 'KOREAN', 'JAPANESE', 'SPANISH', 'FRENCH'].map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>BADGE</label>
              <select value={form.badge} onChange={e => set('badge', e.target.value)} style={inputStyle}>
                {['LIVE', 'FREE NOW', 'VIP', 'HD', '4K'].map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 2 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#888', fontSize: 10, letterSpacing: 1, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} />
                CHANNEL ACTIVE
              </label>
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>STREAM URL *</label>
              <input value={form.streamUrl} onChange={e => set('streamUrl', e.target.value)} style={inputStyle} placeholder="https://live-stream-url.m3u8" />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>THUMBNAIL / LOGO URL</label>
              <input value={form.thumbnail} onChange={e => set('thumbnail', e.target.value)} style={inputStyle} placeholder="https://..." />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button onClick={handleSubmit} style={btnStyle('#e50914')}>{editId ? 'SAVE CHANGES' : 'ADD CHANNEL'}</button>
            <button onClick={() => { setShowForm(false); setEditId(null); }} style={btnStyle('rgba(255,255,255,0.08)')}>CANCEL</button>
          </div>
        </div>
      )}

      {channels.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#444', fontSize: 12, letterSpacing: 1 }}>NO LIVE CHANNELS ADDED YET</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {channels.map(ch => (
            <div key={ch.id} style={{ background: '#16161a', border: `1px solid ${ch.isActive ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: 120, background: '#0d0d0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {ch.thumbnail ? <img src={ch.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ fontSize: 32, opacity: 0.2 }}>📡</div>}
                <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 6 }}>
                  {ch.isActive && <span style={{ background: '#22c55e', color: '#fff', padding: '2px 8px', borderRadius: 4, fontSize: 9, fontWeight: 700, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />LIVE</span>}
                  <span style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '2px 8px', borderRadius: 4, fontSize: 9 }}>{ch.badge}</span>
                </div>
                <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: '#f5a623', padding: '2px 8px', borderRadius: 4, fontSize: 9 }}>
                  {ch.viewers.toLocaleString()} WATCHING
                </div>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <div style={{ color: '#fff', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{ch.name}</div>
                <div style={{ color: '#555', fontSize: 10, marginBottom: 12, letterSpacing: 0.8 }}>{ch.language} · {ch.category.toUpperCase()}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => handleEdit(ch)} style={{ flex: 1, background: 'rgba(74,158,255,0.1)', border: '1px solid rgba(74,158,255,0.2)', color: '#4a9eff', padding: '7px', borderRadius: 6, fontSize: 10, cursor: 'pointer', letterSpacing: 0.8 }}>EDIT</button>
                  <button onClick={() => toggleActive(ch.id)} style={{ flex: 1, background: ch.isActive ? 'rgba(245,166,35,0.1)' : 'rgba(34,197,94,0.1)', border: `1px solid ${ch.isActive ? 'rgba(245,166,35,0.2)' : 'rgba(34,197,94,0.2)'}`, color: ch.isActive ? '#f5a623' : '#22c55e', padding: '7px', borderRadius: 6, fontSize: 10, cursor: 'pointer', letterSpacing: 0.8 }}>
                    {ch.isActive ? 'DISABLE' : 'ENABLE'}
                  </button>
                  <button onClick={() => setConfirm(ch.id)} style={{ background: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.2)', color: '#e50914', padding: '7px 10px', borderRadius: 6, fontSize: 10, cursor: 'pointer' }}>🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setConfirm(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }} />
          <div style={{ position: 'relative', background: '#1a1a1a', borderRadius: 14, padding: 28, width: 360, border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ color: '#fff', fontSize: 14, fontWeight: 700, marginBottom: 10 }}>DELETE CHANNEL?</div>
            <div style={{ color: '#666', fontSize: 11, marginBottom: 20 }}>THIS ACTION CANNOT BE UNDONE.</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => handleDelete(confirm)} style={btnStyle('#e50914')}>DELETE</button>
              <button onClick={() => setConfirm(null)} style={btnStyle('rgba(255,255,255,0.08)')}>CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const btnStyle = (bg: string): React.CSSProperties => ({ background: bg, border: 'none', borderRadius: 8, color: '#fff', padding: '10px 18px', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, cursor: 'pointer', fontFamily: 'Arial, sans-serif' });
const inputStyle: React.CSSProperties = { width: '100%', padding: '11px 14px', background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontFamily: 'Arial, sans-serif', fontSize: 11, outline: 'none', boxSizing: 'border-box', letterSpacing: 0.8 };
const labelStyle: React.CSSProperties = { display: 'block', color: '#555', fontSize: 9, letterSpacing: 1.5, marginBottom: 6, fontWeight: 700 };
