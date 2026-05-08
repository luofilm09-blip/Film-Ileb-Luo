import { useState } from 'react';

export default function AdminSEO() {
  const [meta, setMeta] = useState({
    title: 'FILM ILEB LUO — STREAM EVERYTHING',
    description: 'Watch thousands of movies, TV dramas, anime, and more. Stream in 4K Ultra HD with VIP membership. New content added daily.',
    keywords: 'streaming, movies, TV drama, anime, VIP, 4K, film, series, online video',
    ogTitle: 'FILM ILEB LUO',
    ogDescription: 'Premium video streaming platform with exclusive content.',
    ogImage: '',
    canonical: 'https://film-ileb-luo.replit.app',
    robots: 'index, follow',
    twitterCard: 'summary_large_image',
  });

  const [sitemap, setSitemap] = useState({ frequency: 'weekly', priority: '0.8', lastmod: new Date().toISOString().split('T')[0] });
  const [analytics, setAnalytics] = useState({ gaId: '', gtmId: '', pixelId: '' });
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const seoScore = [
    { label: 'META TITLE', ok: meta.title.length > 10 && meta.title.length <= 60 },
    { label: 'META DESCRIPTION', ok: meta.description.length > 50 && meta.description.length <= 160 },
    { label: 'KEYWORDS', ok: meta.keywords.length > 0 },
    { label: 'OG TITLE', ok: meta.ogTitle.length > 0 },
    { label: 'OG DESCRIPTION', ok: meta.ogDescription.length > 0 },
    { label: 'CANONICAL URL', ok: meta.canonical.startsWith('https://') },
    { label: 'ROBOTS', ok: meta.robots.length > 0 },
    { label: 'ANALYTICS', ok: analytics.gaId.length > 0 || analytics.gtmId.length > 0 },
  ];
  const score = Math.round((seoScore.filter(s => s.ok).length / seoScore.length) * 100);

  return (
    <div style={{ padding: '28px 32px', color: '#fff', maxWidth: 760 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, letterSpacing: 1 }}>SEO SETTINGS</h1>
        <p style={{ margin: '4px 0 0', color: '#555', fontSize: 11, letterSpacing: 1 }}>OPTIMIZE SEARCH ENGINE VISIBILITY</p>
      </div>

      {/* SEO Score */}
      <div style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ position: 'relative', width: 80, height: 80 }}>
            <svg viewBox="0 0 36 36" style={{ width: 80, height: 80, transform: 'rotate(-90deg)' }}>
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke={score >= 80 ? '#22c55e' : score >= 50 ? '#f5a623' : '#e50914'} strokeWidth="2.5" strokeDasharray={`${score} ${100 - score}`} strokeDashoffset="0" strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <span style={{ color: '#fff', fontSize: 18, fontWeight: 900 }}>{score}</span>
              <span style={{ color: '#555', fontSize: 8 }}>/ 100</span>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>SEO HEALTH SCORE</div>
            <div style={{ color: '#555', fontSize: 10, marginBottom: 14 }}>{score >= 80 ? 'EXCELLENT' : score >= 50 ? 'NEEDS IMPROVEMENT' : 'CRITICAL ISSUES'}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {seoScore.map(s => (
                <span key={s.label} style={{ background: s.ok ? 'rgba(34,197,94,0.1)' : 'rgba(229,9,20,0.1)', color: s.ok ? '#22c55e' : '#e50914', padding: '3px 8px', borderRadius: 4, fontSize: 9, letterSpacing: 0.8 }}>
                  {s.ok ? '✓' : '✗'} {s.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Meta Tags */}
      <div style={sectionStyle}>
        <div style={sectionHeader}>META TAGS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={labelStyle}>PAGE TITLE</label>
              <span style={{ color: meta.title.length > 60 ? '#e50914' : '#555', fontSize: 9 }}>{meta.title.length} / 60</span>
            </div>
            <input value={meta.title} onChange={e => setMeta({ ...meta, title: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={labelStyle}>META DESCRIPTION</label>
              <span style={{ color: meta.description.length > 160 ? '#e50914' : '#555', fontSize: 9 }}>{meta.description.length} / 160</span>
            </div>
            <textarea value={meta.description} onChange={e => setMeta({ ...meta, description: e.target.value })} style={{ ...inputStyle, height: 80, resize: 'vertical' }} />
          </div>
          <div>
            <label style={labelStyle}>KEYWORDS (COMMA SEPARATED)</label>
            <input value={meta.keywords} onChange={e => setMeta({ ...meta, keywords: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>CANONICAL URL</label>
            <input value={meta.canonical} onChange={e => setMeta({ ...meta, canonical: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>ROBOTS DIRECTIVE</label>
            <select value={meta.robots} onChange={e => setMeta({ ...meta, robots: e.target.value })} style={inputStyle}>
              <option value="index, follow">INDEX, FOLLOW</option>
              <option value="noindex, follow">NOINDEX, FOLLOW</option>
              <option value="index, nofollow">INDEX, NOFOLLOW</option>
              <option value="noindex, nofollow">NOINDEX, NOFOLLOW</option>
            </select>
          </div>
        </div>
      </div>

      {/* Open Graph */}
      <div style={sectionStyle}>
        <div style={sectionHeader}>OPEN GRAPH (SOCIAL SHARING)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>OG TITLE</label>
            <input value={meta.ogTitle} onChange={e => setMeta({ ...meta, ogTitle: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>OG DESCRIPTION</label>
            <textarea value={meta.ogDescription} onChange={e => setMeta({ ...meta, ogDescription: e.target.value })} style={{ ...inputStyle, height: 70, resize: 'vertical' }} />
          </div>
          <div>
            <label style={labelStyle}>OG IMAGE URL</label>
            <input value={meta.ogImage} onChange={e => setMeta({ ...meta, ogImage: e.target.value })} style={inputStyle} placeholder="https://..." />
          </div>
          <div>
            <label style={labelStyle}>TWITTER CARD TYPE</label>
            <select value={meta.twitterCard} onChange={e => setMeta({ ...meta, twitterCard: e.target.value })} style={inputStyle}>
              <option value="summary_large_image">SUMMARY LARGE IMAGE</option>
              <option value="summary">SUMMARY</option>
              <option value="player">PLAYER</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sitemap */}
      <div style={sectionStyle}>
        <div style={sectionHeader}>SITEMAP CONFIGURATION</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div>
            <label style={labelStyle}>UPDATE FREQUENCY</label>
            <select value={sitemap.frequency} onChange={e => setSitemap({ ...sitemap, frequency: e.target.value })} style={inputStyle}>
              {['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly'].map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>PRIORITY</label>
            <select value={sitemap.priority} onChange={e => setSitemap({ ...sitemap, priority: e.target.value })} style={inputStyle}>
              {['1.0', '0.9', '0.8', '0.7', '0.6', '0.5'].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>LAST MODIFIED</label>
            <input type="date" value={sitemap.lastmod} onChange={e => setSitemap({ ...sitemap, lastmod: e.target.value })} style={inputStyle} />
          </div>
        </div>
        <button style={{ background: 'rgba(74,158,255,0.1)', border: '1px solid rgba(74,158,255,0.2)', borderRadius: 8, color: '#4a9eff', padding: '10px 18px', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, cursor: 'pointer', fontFamily: 'Arial, sans-serif' }}>
          GENERATE SITEMAP.XML
        </button>
      </div>

      {/* Analytics */}
      <div style={sectionStyle}>
        <div style={sectionHeader}>ANALYTICS & TRACKING</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
          <div>
            <label style={labelStyle}>GOOGLE ANALYTICS (GA4) ID</label>
            <input value={analytics.gaId} onChange={e => setAnalytics({ ...analytics, gaId: e.target.value })} style={inputStyle} placeholder="G-XXXXXXXXXX" />
          </div>
          <div>
            <label style={labelStyle}>GOOGLE TAG MANAGER ID</label>
            <input value={analytics.gtmId} onChange={e => setAnalytics({ ...analytics, gtmId: e.target.value })} style={inputStyle} placeholder="GTM-XXXXXXX" />
          </div>
          <div>
            <label style={labelStyle}>META PIXEL ID</label>
            <input value={analytics.pixelId} onChange={e => setAnalytics({ ...analytics, pixelId: e.target.value })} style={inputStyle} placeholder="XXXXXXXXXXXXXXXXXX" />
          </div>
        </div>
      </div>

      <button onClick={save} style={{ background: '#e50914', border: 'none', borderRadius: 8, color: '#fff', padding: '13px 28px', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, cursor: 'pointer', fontFamily: 'Arial, sans-serif' }}>
        {saved ? '✓ SEO SETTINGS SAVED' : 'SAVE ALL SEO SETTINGS'}
      </button>
    </div>
  );
}

const sectionStyle: React.CSSProperties = { background: '#16161a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 24, marginBottom: 20 };
const sectionHeader: React.CSSProperties = { color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '11px 14px', background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontFamily: 'Arial, sans-serif', fontSize: 11, outline: 'none', boxSizing: 'border-box', letterSpacing: 0.8 };
const labelStyle: React.CSSProperties = { display: 'block', color: '#555', fontSize: 9, letterSpacing: 1.5, marginBottom: 0, fontWeight: 700 };
