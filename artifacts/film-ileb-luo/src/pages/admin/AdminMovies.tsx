import { useState, useEffect } from 'react';
import { navItems } from '../../data/content';

const emptyForm = { title: '', description: '', category: 'drama', thumbnail: '', videoUrl: '', year: '', duration: '', rating: '', tags: '', badge: 'FREE NOW', isFeatured: false };

type Movie = typeof emptyForm & { id: string; uploadedAt: string; views: number };

export default function AdminMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [search, setSearch] = useState('');
  const [confirm, setConfirm] = useState<string | null>(null);

  useEffect(() => { setMovies(JSON.parse(localStorage.getItem('film_movies') || '[]')); }, []);
  const save = (data: Movie[]) => { setMovies(data); localStorage.setItem('film_movies', JSON.stringify(data)); };

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.title || !form.category) return;
    if (editId) {
      const updated = movies.map(m => m.id === editId ? { ...form, id: editId, uploadedAt: m.uploadedAt, views: m.views } : m);
      save(updated);
    } else {
      save([{ ...form, id: `m${Date.now()}`, uploadedAt: new Date().toISOString(), views: 0 }, ...movies]);
    }
    setForm({ ...emptyForm }); setShowForm(false); setEditId(null);
  };

  const handleEdit = (m: Movie) => {
    setForm({ title: m.title, description: m.description, category: m.category, thumbnail: m.thumbnail, videoUrl: m.videoUrl, year: m.year, duration: m.duration, rating: m.rating, tags: m.tags, badge: m.badge, isFeatured: m.isFeatured });
    setEditId(m.id); setShowForm(true);
  };

  const handleDelete = (id: string) => { save(movies.filter(m => m.id !== id)); setConfirm(null); };

  const filtered = movies.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));
  const categories = navItems.filter(n => n.id !== 'home' && n.id !== 'vip');

  return (
    <div style={{ padding: '28px 32px', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, letterSpacing: 1 }}>MOVIES</h1>
          <p style={{ margin: '4px 0 0', color: '#555', fontSize: 11, letterSpacing: 1 }}>{movies.length} UPLOADED</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm({ ...emptyForm }); }} style={btnStyle('#e50914')}>+ UPLOAD MOVIE</button>
      </div>

      {/* Search */}
      <input placeholder="SEARCH MOVIES..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputStyle, width: 300, marginBottom: 20 }} />

      {/* Upload/Edit Form */}
      {showForm && (
        <div style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>{editId ? 'EDIT MOVIE' : 'UPLOAD NEW MOVIE'}</div>
            <button onClick={() => { setShowForm(false); setEditId(null); }} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 18 }}>✕</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>TITLE *</label>
              <input value={form.title} onChange={e => set('title', e.target.value)} style={inputStyle} placeholder="MOVIE TITLE" />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>DESCRIPTION</label>
              <textarea value={form.description} onChange={e => set('description', e.target.value)} style={{ ...inputStyle, height: 80, resize: 'vertical' }} placeholder="MOVIE DESCRIPTION" />
            </div>
            <div>
              <label style={labelStyle}>CATEGORY *</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} style={inputStyle}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>BADGE</label>
              <select value={form.badge} onChange={e => set('badge', e.target.value)} style={inputStyle}>
                {['FREE NOW', 'EXCLUSIVE', 'PREMIERE', 'VIP', 'SVIP', 'HOT CHART TOP', 'NEW ARRIVAL', 'AD'].map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>RELEASE YEAR</label>
              <input value={form.year} onChange={e => set('year', e.target.value)} style={inputStyle} placeholder="2025" />
            </div>
            <div>
              <label style={labelStyle}>DURATION (MIN)</label>
              <input value={form.duration} onChange={e => set('duration', e.target.value)} style={inputStyle} placeholder="120" />
            </div>
            <div>
              <label style={labelStyle}>RATING (0-10)</label>
              <input value={form.rating} onChange={e => set('rating', e.target.value)} style={inputStyle} placeholder="8.5" />
            </div>
            <div>
              <label style={labelStyle}>TAGS (COMMA SEPARATED)</label>
              <input value={form.tags} onChange={e => set('tags', e.target.value)} style={inputStyle} placeholder="ACTION, ROMANCE" />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>THUMBNAIL URL</label>
              <input value={form.thumbnail} onChange={e => set('thumbnail', e.target.value)} style={inputStyle} placeholder="https://..." />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>VIDEO URL</label>
              <input value={form.videoUrl} onChange={e => set('videoUrl', e.target.value)} style={inputStyle} placeholder="https://..." />
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#888', fontSize: 10, letterSpacing: 1, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.isFeatured} onChange={e => set('isFeatured', e.target.checked)} />
                FEATURE ON HOMEPAGE
              </label>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button onClick={handleSubmit} style={btnStyle('#e50914')}>{editId ? 'SAVE CHANGES' : 'UPLOAD MOVIE'}</button>
            <button onClick={() => { setShowForm(false); setEditId(null); }} style={btnStyle('rgba(255,255,255,0.08)')}>CANCEL</button>
          </div>
        </div>
      )}

      {/* Table */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#444', fontSize: 12, letterSpacing: 1 }}>
          {movies.length === 0 ? 'NO MOVIES UPLOADED YET' : 'NO RESULTS FOUND'}
        </div>
      ) : (
        <div style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['THUMBNAIL', 'TITLE', 'CATEGORY', 'BADGE', 'YEAR', 'VIEWS', 'UPLOADED', 'ACTIONS'].map(h => (
                  <th key={h} style={{ textAlign: 'left', color: '#444', fontSize: 9, letterSpacing: 1.5, padding: '14px 16px', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 16px' }}>
                    <div style={{ width: 48, height: 32, background: '#2a2a2a', borderRadius: 4, overflow: 'hidden' }}>
                      {m.thumbnail && <img src={m.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    </div>
                  </td>
                  <td style={{ padding: '10px 16px', color: '#ccc', fontSize: 11 }}>{m.title}</td>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{ background: 'rgba(74,158,255,0.1)', color: '#4a9eff', padding: '3px 8px', borderRadius: 4, fontSize: 9, letterSpacing: 1 }}>
                      {categories.find(c => c.id === m.category)?.label || m.category.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{ background: 'rgba(229,9,20,0.1)', color: '#e50914', padding: '3px 8px', borderRadius: 4, fontSize: 9 }}>{m.badge}</span>
                  </td>
                  <td style={{ padding: '10px 16px', color: '#666', fontSize: 11 }}>{m.year}</td>
                  <td style={{ padding: '10px 16px', color: '#888', fontSize: 11 }}>{m.views.toLocaleString()}</td>
                  <td style={{ padding: '10px 16px', color: '#555', fontSize: 9, letterSpacing: 0.5 }}>{new Date(m.uploadedAt).toLocaleDateString()}</td>
                  <td style={{ padding: '10px 16px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => handleEdit(m)} style={{ background: 'rgba(74,158,255,0.1)', border: '1px solid rgba(74,158,255,0.2)', color: '#4a9eff', padding: '5px 10px', borderRadius: 6, fontSize: 10, cursor: 'pointer', letterSpacing: 0.8 }}>EDIT</button>
                      <button onClick={() => setConfirm(m.id)} style={{ background: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.2)', color: '#e50914', padding: '5px 10px', borderRadius: 6, fontSize: 10, cursor: 'pointer', letterSpacing: 0.8 }}>DELETE</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirm delete */}
      {confirm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setConfirm(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }} />
          <div style={{ position: 'relative', background: '#1a1a1a', borderRadius: 14, padding: 28, width: 360, border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ color: '#fff', fontSize: 14, fontWeight: 700, marginBottom: 10 }}>DELETE MOVIE?</div>
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
