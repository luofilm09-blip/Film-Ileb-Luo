import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLocation } from 'wouter';

export default function Header() {
  const [searchValue, setSearchValue] = useState('');
  const { user, isLoggedIn, openLogin, openVip, logout } = useApp();
  const [, navigate] = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="topheader_top_header_box">
      <div className="topheader_left_box" />
      <div className="topheader_right_box">
        {/* Search */}
        <div className="search_search_box">
          <div className="search_search_box_wrap">
            <div className="search_search_input_box">
              <svg className="search_search_icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <div className="search_search_input_content">
                <input
                  className="search_search_input"
                  type="text"
                  placeholder="SEARCH FILM ILEB LUO"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  style={{ fontFamily: 'Arial, sans-serif', textTransform: 'uppercase' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* VIP Button */}
        <div className="crmvip_vip_wrap" onClick={openVip} style={{ cursor: 'pointer' }}>
          <a className="youku_vip_pay_btn" href="#" onClick={e => e.preventDefault()}>
            <img
              className="crmvip_vip_icon"
              src="https://gw.alicdn.com/imgextra/i2/O1CN01G2pBlc1jH83k0Uw4y_!!6000000004522-2-tps-72-72.png"
              alt="VIP"
            />
            <div className="crmvip_vip_pop_content" style={{ fontFamily: 'Arial, sans-serif' }}>
              {user?.isVip ? 'VIP ACTIVE' : 'RENEW VIP'}
            </div>
          </a>
        </div>

        {/* Filter */}
        <div className="filter_filter_box">
          <img
            className="filter_filter_img"
            src="https://img.alicdn.com/imgextra/i3/O1CN01E71iNM29PXJkAdEx1_!!6000000008060-2-tps-48-48.png"
            alt=""
          />
          <div className="filter_text" style={{ fontFamily: 'Arial, sans-serif' }}>FILTER</div>
        </div>

        {/* History */}
        <div className="historyrecord_record_box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <div className="historyrecord_text" style={{ fontFamily: 'Arial, sans-serif' }}>HISTORY</div>
        </div>

        {/* Client / App */}
        <div className="useiku_iku_box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          <div className="useiku_text" style={{ fontFamily: 'Arial, sans-serif' }}>APP</div>
        </div>

        {/* User */}
        <div className="crmusercenter_user_center_box" style={{ position: 'relative' }}>
          {isLoggedIn ? (
            <>
              <div
                className="crmusercenter_avatar"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#e50914,#6a0008)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                  {user?.name?.[0] || 'U'}
                </div>
                <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 11, marginLeft: 6, maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.name?.split(' ')[0] || 'USER'}
                </span>
              </div>

              {userMenuOpen && (
                <>
                  <div onClick={() => setUserMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 998 }} />
                  <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '8px 0', minWidth: 180, zIndex: 999, boxShadow: '0 16px 48px rgba(0,0,0,0.6)' }}>
                    <div style={{ padding: '10px 16px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{user?.name}</div>
                      <div style={{ color: '#555', fontSize: 10, marginTop: 2 }}>{user?.email}</div>
                      {user?.isVip && <div style={{ color: '#f5a623', fontSize: 9, marginTop: 4, letterSpacing: 1 }}>👑 VIP MEMBER</div>}
                    </div>
                    {[
                      { label: 'MY PROFILE', action: () => {} },
                      { label: 'WATCH HISTORY', action: () => {} },
                      { label: 'MY WATCHLIST', action: () => {} },
                      ...(user?.isAdmin ? [{ label: 'ADMIN PANEL', action: () => { setUserMenuOpen(false); navigate('/admin'); } }] : []),
                    ].map(({ label, action }) => (
                      <div key={label} onClick={() => { action(); setUserMenuOpen(false); }} style={{ padding: '10px 16px', color: '#888', fontSize: 11, letterSpacing: 0.8, cursor: 'pointer', transition: 'all 0.15s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#888'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                        {label}
                      </div>
                    ))}
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 4 }}>
                      <div onClick={() => { logout(); setUserMenuOpen(false); }} style={{ padding: '10px 16px', color: '#e50914', fontSize: 11, letterSpacing: 0.8, cursor: 'pointer' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(229,9,20,0.05)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        LOG OUT
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div
              className="crmusercenter_avatar"
              onClick={() => openLogin('login')}
              style={{ cursor: 'pointer' }}
            >
              <img
                src="https://img.alicdn.com/imgextra/i4/O1CN01sm6Pik1QpxWLtcGPd_!!6000000002026-2-tps-180-180.png"
                alt=""
              />
              <span style={{ fontFamily: 'Arial, sans-serif' }}>LOG IN</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
