import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useApp } from '../../context/AppContext';

const navSections = [
  {
    title: 'OVERVIEW',
    items: [
      { id: 'dashboard', label: 'DASHBOARD', icon: '📊', path: '/admin' },
    ],
  },
  {
    title: 'CONTENT',
    items: [
      { id: 'movies', label: 'MOVIES', icon: '🎬', path: '/admin/movies' },
      { id: 'series', label: 'TV SERIES', icon: '📺', path: '/admin/series' },
      { id: 'episodes', label: 'EPISODES', icon: '🎞', path: '/admin/episodes' },
      { id: 'live', label: 'LIVE CHANNELS', icon: '📡', path: '/admin/live' },
    ],
  },
  {
    title: 'MANAGEMENT',
    items: [
      { id: 'users', label: 'USERS', icon: '👥', path: '/admin/users' },
      { id: 'subscriptions', label: 'SUBSCRIPTIONS', icon: '💎', path: '/admin/subscriptions' },
      { id: 'wallet', label: 'WALLET', icon: '💰', path: '/admin/wallet' },
    ],
  },
  {
    title: 'CONFIGURATION',
    items: [
      { id: 'settings', label: 'SETTINGS', icon: '⚙️', path: '/admin/settings' },
      { id: 'seo', label: 'SEO', icon: '🔍', path: '/admin/seo' },
    ],
  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { user, logout } = useApp();
  const [sideCollapsed, setSideCollapsed] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0d0d0f', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: sideCollapsed ? 64 : 220, background: '#111115', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, transition: 'width 0.2s' }}>
        {/* Logo */}
        <div style={{ padding: sideCollapsed ? '20px 12px' : '20px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontSize: 13, fontWeight: 900, letterSpacing: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <span style={{ color: '#e50914' }}>FILM</span>
            {!sideCollapsed && <><span style={{ color: '#e50914' }}> ILEB</span><span style={{ color: '#fff' }}> LUO</span></>}
          </div>
          <button onClick={() => setSideCollapsed(!sideCollapsed)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 16, lineHeight: 1, flexShrink: 0 }}>
            {sideCollapsed ? '→' : '←'}
          </button>
        </div>

        {/* Admin badge */}
        {!sideCollapsed && (
          <div style={{ margin: '12px 16px', background: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.2)', borderRadius: 8, padding: '8px 12px' }}>
            <div style={{ color: '#e50914', fontSize: 10, fontWeight: 700, letterSpacing: 1.5 }}>ADMIN PANEL</div>
            <div style={{ color: '#888', fontSize: 10, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'ADMINISTRATOR'}</div>
          </div>
        )}

        {/* Nav */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {navSections.map(sec => (
            <div key={sec.title}>
              {!sideCollapsed && <div style={{ padding: '12px 20px 4px', color: '#444', fontSize: 9, fontWeight: 700, letterSpacing: 2 }}>{sec.title}</div>}
              {sec.items.map(item => {
                const isActive = location === item.path || (item.path !== '/admin' && location.startsWith(item.path));
                return (
                  <Link key={item.id} href={item.path}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: sideCollapsed ? '11px 20px' : '10px 20px', color: isActive ? '#fff' : '#666', background: isActive ? 'rgba(229,9,20,0.12)' : 'transparent', borderLeft: isActive ? '3px solid #e50914' : '3px solid transparent', textDecoration: 'none', fontSize: 11, fontWeight: isActive ? 700 : 400, letterSpacing: 1, transition: 'all 0.15s', whiteSpace: 'nowrap' }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                    <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
                    {!sideCollapsed && item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '12px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 8px', color: '#555', textDecoration: 'none', fontSize: 11, letterSpacing: 1, borderRadius: 6 }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}>
            <span>←</span>
            {!sideCollapsed && 'BACK TO SITE'}
          </Link>
          <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 8px', color: '#555', background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, letterSpacing: 1, width: '100%' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e50914')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}>
            <span>⏻</span>
            {!sideCollapsed && 'LOG OUT'}
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: sideCollapsed ? 64 : 220, flex: 1, transition: 'margin-left 0.2s', minHeight: '100vh' }}>
        {children}
      </div>
    </div>
  );
}
