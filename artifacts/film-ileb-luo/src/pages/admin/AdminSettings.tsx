import { useState } from 'react';

export default function AdminSettings() {
  const [site, setSite] = useState({ name: 'FILM ILEB LUO', tagline: 'STREAM EVERYTHING', logo: '', primaryColor: '#e50914', footerText: '© 2025 FILM ILEB LUO. ALL RIGHTS RESERVED.' });
  const [notif, setNotif] = useState({ emailNewUser: true, emailNewSub: true, emailWithdrawal: true, smsAlerts: false });
  const [maintenance, setMaintenance] = useState(false);
  const [savedSite, setSavedSite] = useState(false);
  const [savedNotif, setSavedNotif] = useState(false);

  const saveSite = () => { setSavedSite(true); setTimeout(() => setSavedSite(false), 2000); };
  const saveNotif = () => { setSavedNotif(true); setTimeout(() => setSavedNotif(false), 2000); };

  return (
    <div style={{ padding: '28px 32px', color: '#fff', maxWidth: 720 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, letterSpacing: 1 }}>SETTINGS</h1>
        <p style={{ margin: '4px 0 0', color: '#555', fontSize: 11, letterSpacing: 1 }}>SITE CONFIGURATION & PREFERENCES</p>
      </div>

      {/* Site Settings */}
      <div style={sectionStyle}>
        <div style={sectionHeader}>SITE INFORMATION</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div>
            <label style={labelStyle}>SITE NAME</label>
            <input value={site.name} onChange={e => setSite({ ...site, name: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>TAGLINE</label>
            <input value={site.tagline} onChange={e => setSite({ ...site, tagline: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>LOGO URL</label>
            <input value={site.logo} onChange={e => setSite({ ...site, logo: e.target.value })} style={inputStyle} placeholder="LEAVE BLANK FOR DEFAULT" />
          </div>
          <div>
            <label style={labelStyle}>PRIMARY COLOR</label>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <input type="color" value={site.primaryColor} onChange={e => setSite({ ...site, primaryColor: e.target.value })} style={{ width: 44, height: 44, padding: 2, background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, cursor: 'pointer' }} />
              <input value={site.primaryColor} onChange={e => setSite({ ...site, primaryColor: e.target.value })} style={{ ...inputStyle, flex: 1 }} />
            </div>
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={labelStyle}>FOOTER TEXT</label>
            <input value={site.footerText} onChange={e => setSite({ ...site, footerText: e.target.value })} style={inputStyle} />
          </div>
        </div>
        <button onClick={saveSite} style={btnStyle('#e50914')}>{savedSite ? '✓ SAVED' : 'SAVE SITE SETTINGS'}</button>
      </div>

      {/* Maintenance Mode */}
      <div style={sectionStyle}>
        <div style={sectionHeader}>MAINTENANCE MODE</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ color: '#ccc', fontSize: 12, marginBottom: 4 }}>ENABLE MAINTENANCE MODE</div>
            <div style={{ color: '#555', fontSize: 10, letterSpacing: 0.8 }}>SITE WILL BE INACCESSIBLE TO REGULAR USERS WHILE ENABLED.</div>
          </div>
          <div onClick={() => setMaintenance(!maintenance)} style={{ width: 48, height: 26, borderRadius: 13, background: maintenance ? '#e50914' : '#333', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
            <div style={{ position: 'absolute', top: 3, left: maintenance ? 25 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
          </div>
        </div>
        {maintenance && (
          <div style={{ background: 'rgba(229,9,20,0.08)', border: '1px solid rgba(229,9,20,0.2)', borderRadius: 10, padding: '12px 16px', color: '#e50914', fontSize: 11, letterSpacing: 0.8 }}>
            ⚠ MAINTENANCE MODE IS ACTIVE. USERS WILL SEE A MAINTENANCE PAGE.
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div style={sectionStyle}>
        <div style={sectionHeader}>NOTIFICATIONS</div>
        {[
          { key: 'emailNewUser', label: 'EMAIL ON NEW USER REGISTRATION', sub: 'RECEIVE EMAIL WHEN A NEW USER SIGNS UP' },
          { key: 'emailNewSub', label: 'EMAIL ON NEW SUBSCRIPTION', sub: 'RECEIVE EMAIL WHEN A USER SUBSCRIBES TO VIP' },
          { key: 'emailWithdrawal', label: 'EMAIL ON WITHDRAWAL REQUEST', sub: 'RECEIVE EMAIL WHEN A WITHDRAWAL IS REQUESTED' },
          { key: 'smsAlerts', label: 'SMS ALERTS (CRITICAL)', sub: 'RECEIVE SMS FOR CRITICAL SYSTEM EVENTS' },
        ].map(({ key, label, sub }) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <div style={{ color: '#ccc', fontSize: 11, marginBottom: 3, letterSpacing: 0.8 }}>{label}</div>
              <div style={{ color: '#555', fontSize: 10 }}>{sub}</div>
            </div>
            <div onClick={() => setNotif({ ...notif, [key]: !notif[key as keyof typeof notif] })} style={{ width: 48, height: 26, borderRadius: 13, background: notif[key as keyof typeof notif] ? '#22c55e' : '#333', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: 3, left: notif[key as keyof typeof notif] ? 25 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
            </div>
          </div>
        ))}
        <button onClick={saveNotif} style={{ ...btnStyle('#e50914'), marginTop: 20 }}>{savedNotif ? '✓ SAVED' : 'SAVE NOTIFICATION SETTINGS'}</button>
      </div>

      {/* Security */}
      <div style={sectionStyle}>
        <div style={sectionHeader}>SECURITY</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={labelStyle}>CURRENT ADMIN PASSWORD</label>
            <input type="password" placeholder="••••••••" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>NEW PASSWORD</label>
            <input type="password" placeholder="••••••••" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>CONFIRM NEW PASSWORD</label>
            <input type="password" placeholder="••••••••" style={inputStyle} />
          </div>
          <button style={btnStyle('#e50914')}>UPDATE PASSWORD</button>
        </div>
      </div>
    </div>
  );
}

const sectionStyle: React.CSSProperties = { background: '#16161a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 24, marginBottom: 20 };
const sectionHeader: React.CSSProperties = { color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' };
const btnStyle = (bg: string): React.CSSProperties => ({ background: bg, border: 'none', borderRadius: 8, color: '#fff', padding: '11px 20px', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, cursor: 'pointer', fontFamily: 'Arial, sans-serif' });
const inputStyle: React.CSSProperties = { width: '100%', padding: '11px 14px', background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontFamily: 'Arial, sans-serif', fontSize: 11, outline: 'none', boxSizing: 'border-box', letterSpacing: 0.8 };
const labelStyle: React.CSSProperties = { display: 'block', color: '#555', fontSize: 9, letterSpacing: 1.5, marginBottom: 6, fontWeight: 700 };
