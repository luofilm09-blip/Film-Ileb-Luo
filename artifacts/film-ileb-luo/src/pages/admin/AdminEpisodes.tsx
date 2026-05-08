import { useState, useEffect } from 'react';

const emptyForm = { seriesId: '', title: '', episodeNumber: '', description: '', videoUrl: '', thumbnail: '', duration: '', isFree: true };
type Episode = typeof emptyForm & { id: string; uploadedAt: string };
type Series = { id: string; title: string };

export default function AdminEpisodes() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [filterSeries, setFilterSeries] = useState('all');
  const [confirm, setConfirm] = useState<string | null>(null);

  useEffect(() => {
    setEpisodes(JSON.parse(localStorage.getItem('film_episodes') || '[]'));
    setSeriesList(JSON.parse(localStorage.getItem('film_series') || '[]'));
  }, []);

  const save = (data: Episode[]) => { setEpisodes(data); localStorage.setItem('film_episodes', JSON.stringify(data)); };
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.seriesId || !form.episodeNumber || !form.title) return;
    if (editId) {
      save(episodes.map(e => e.id === editId ? { ...form, id: editId, uploadedAt: e.uploadedAt } : e));
    } else {
      save([{ ...form, id: `ep${Date.now()}`, uploadedAt: new Date().toISOString() }, ...episodes]);
    }
    setForm({ ...emptyForm }); setShowForm(false); setEditId(null);
  };

  const handleEdit = (ep: Episode) => {
    setForm({ seriesId: ep.seriesId, title: ep.title, episodeNumber: ep.episodeNumber, description: ep.description, videoUrl: ep.videoUrl, thumbnail: ep.thumbnail, duration: ep.duration, isFree: ep.isFree });
    setEditId(ep.id); setShowForm(true);
  };

  const handleDelete = (id: string) => { save(episodes.filter(e => e.id !== id)); setConfirm(null); };
  const filtered = episodes.filter(e => filterSeries === 'all' || e.seriesId === filterSeries);
  const getSeriesTitle = (id: string) => seriesList.find(s => s.id === id)?.title || 'UNKNOWN SERIES';

  return (
    <div style={{ padding: '28px 32px', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, letterSpacing: 1 }}>EPISODES</h1>
          <p style={{ margin: '4px 0 0', color: '#555', fontSize: 11, letterSpacing: 1 }}>{episodes.length} EPISODES UPLOADED</p>
        </div>
        {seriesList.length > 0 && (
          <button onClick={() => { setShowForm(true); setEditId(null); setForm({ ...emptyForm }); }} style={btnStyle('#e50914')}>+ ADD EPISODE</button>
        )}
      </div>

      {seriesList.length === 0 && (
        <div style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 12, padding: '16px 20px', marginBottom: 20, color: '#f5a623', fontSize: 11, letterSpacing: 1 }}>
          ⚠ YOU MUST ADD A TV SERIES FIRST BEFORE UPLOADING EPISODES.
        </div>
      )}

      {/* Filter */}
      <div style={{ marginBottom: 20 }}>
        <select value={filterSeries} onChange={e => setFilterSeries(e.target.value)} style={{ ...inputStyle, width: 280 }}>
          <option value="all">ALL SERIES</option>
          {seriesList.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
        </select>
      </div>

      {showForm && (
        <div style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>{editId ? 'EDIT EPISODE' : 'ADD NEW EPISODE'}</div>
            <button onClick={() => { setShowForm(false); setEditId(null); }} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 18 }}>✕</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={labelStyle}>SELECT SERIES *</label>
              <select value={form.seriesId} onChange={e => set('seriesId', e.target.value)} style={inputStyle}>
                <option value="">— SELECT A SERIES —</option>
                {seriesList.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>EPISODE NUMBER *</label>
              <input value={form.episodeNumber} onChange={e => set('episodeNumber', e.target.value)} style={inputStyle} placeholder="01" type="number" min="1" />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>EPISODE TITLE *</label>
              <input value={form.title} onChange={e => set('title', e.target.value)} style={inputStyle} placeholder="EPISODE TITLE" />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>DESCRIPTION</label>
              <textarea value={form.description} onChange={e => set('description', e.target.value)} style={{ ...inputStyle, height: 70, resize: 'vertical' }} placeholder="EPISODE SYNOPSIS" />
            </div>
            <div>
              <label style={labelStyle}>DURATION (MIN)</label>
              <input value={form.duration} onChange={e => set('duration', e.target.value)} style={inputStyle} placeholder="45" />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 2 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#888', fontSize: 10, letterSpacing: 1, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.isFree} onChange={e => set('isFree', e.target.checked)} />
                FREE EPISODE
              </label>
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>VIDEO URL</label>
              <input value={form.videoUrl} onChange={e => set('videoUrl', e.target.value)} style={inputStyle} placeholder="https://..." />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>THUMBNAIL URL</label>
              <input value={form.thumbnail} onChange={e => set('thumbnail', e.target.value)} style={inputStyle} placeholder="https://..." />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button onClick={handleSubmit} style={btnStyle('#e50914')}>{editId ? 'SAVE CHANGES' : 'ADD EPISODE'}</button>
            <button onClick={() => { setShowForm(false); setEditId(null); }} style={btnStyle('rgba(255,255,255,0.08)')}>CANCEL</button>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#444', fontSize: 12, letterSpacing: 1 }}>
          {episodes.length === 0 ? 'NO EPISODES ADDED YET' : 'NO EPISODES FOR SELECTED SERIES'}
        </div>
      ) : (
        <div style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['#', 'SERIES', 'TITLE', 'DURATION', 'ACCESS', 'UPLOADED', 'ACTIONS'].map(h => (
                  <th key={h} style={{ textAlign: 'left', color: '#444', fontSize: 9, letterSpacing: 1.5, padding: '14px 16px', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(ep => (
                <tr key={ep.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 16px', color: '#e50914', fontSize: 13, fontWeight: 700 }}>EP{ep.episodeNumber}</td>
                  <td style={{ padding: '12px 16px', color: '#888', fontSize: 11 }}>{getSeriesTitle(ep.seriesId)}</td>
                  <td style={{ padding: '12px 16px', color: '#ccc', fontSize: 11 }}>{ep.title}</td>
                  <td style={{ padding: '12px 16px', color: '#666', fontSize: 11 }}>{ep.duration ? `${ep.duration}m` : '—'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: ep.isFree ? 'rgba(34,197,94,0.1)' : 'rgba(245,166,35,0.1)', color: ep.isFree ? '#22c55e' : '#f5a623', padding: '3px 8px', borderRadius: 4, fontSize: 9, letterSpacing: 1 }}>
                      {ep.isFree ? 'FREE' : 'VIP'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#555', fontSize: 9 }}>{new Date(ep.uploadedAt).toLocaleDateString()}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => handleEdit(ep)} style={{ background: 'rgba(74,158,255,0.1)', border: '1px solid rgba(74,158,255,0.2)', color: '#4a9eff', padding: '5px 10px', borderRadius: 6, fontSize: 10, cursor: 'pointer' }}>EDIT</button>
                      <button onClick={() => setConfirm(ep.id)} style={{ background: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.2)', color: '#e50914', padding: '5px 10px', borderRadius: 6, fontSize: 10, cursor: 'pointer' }}>DELETE</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setConfirm(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }} />
          <div style={{ position: 'relative', background: '#1a1a1a', borderRadius: 14, padding: 28, width: 360, border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ color: '#fff', fontSize: 14, fontWeight: 700, marginBottom: 10 }}>DELETE EPISODE?</div>
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
