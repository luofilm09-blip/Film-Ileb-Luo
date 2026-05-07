import { useState } from 'react';
import { Search, Filter, History, Monitor, User, Crown, Bell, X } from 'lucide-react';

export default function Header() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 80,
        right: 0,
        height: 56,
        background: 'rgba(13, 13, 13, 0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 99,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 20px 0 24px',
        borderBottom: '1px solid #1a1a1a',
        gap: 8,
      }}
    >
      {/* Search box */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: searchFocused ? '#222' : '#181818',
          border: `1px solid ${searchFocused ? '#444' : '#262626'}`,
          borderRadius: 20,
          padding: '0 14px',
          height: 34,
          width: searchFocused ? 280 : 220,
          transition: 'all 0.2s',
          marginRight: 8,
        }}
      >
        <Search size={14} color="#666" style={{ flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search films, shows, actors..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#e5e5e5',
            fontSize: 13,
            flex: 1,
            marginLeft: 8,
            marginRight: 4,
          }}
        />
        {searchValue && (
          <X
            size={12}
            color="#666"
            style={{ cursor: 'pointer', flexShrink: 0 }}
            onClick={() => setSearchValue('')}
          />
        )}
      </div>

      {/* VIP Button */}
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'linear-gradient(135deg, #c8901a, #f0c050)',
          border: 'none',
          borderRadius: 16,
          padding: '5px 12px',
          cursor: 'pointer',
          height: 30,
        }}
      >
        <Crown size={13} color="#5a3500" strokeWidth={2.5} />
        <span style={{ fontSize: 12, fontWeight: 700, color: '#5a3500', whiteSpace: 'nowrap' }}>
          VIP
        </span>
      </button>

      {/* Divider */}
      <div style={{ width: 1, height: 20, background: '#2a2a2a', margin: '0 4px' }} />

      {/* Filter */}
      <HeaderIconBtn icon={<Filter size={16} />} label="Filter" />

      {/* History */}
      <HeaderIconBtn icon={<History size={16} />} label="History" />

      {/* Notifications */}
      <HeaderIconBtn icon={<Bell size={16} />} label="Alerts" />

      {/* Client Download */}
      <HeaderIconBtn icon={<Monitor size={16} />} label="App" />

      {/* Divider */}
      <div style={{ width: 1, height: 20, background: '#2a2a2a', margin: '0 4px' }} />

      {/* Login / Avatar */}
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          background: '#1c1c1c',
          border: '1px solid #2a2a2a',
          borderRadius: 18,
          padding: '4px 12px 4px 6px',
          cursor: 'pointer',
          height: 34,
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #e60012, #ff6b6b)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <User size={13} color="#fff" />
        </div>
        <span style={{ fontSize: 12, color: '#ccc', whiteSpace: 'nowrap' }}>Sign In</span>
      </button>
    </header>
  );
}

function HeaderIconBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '4px 6px',
        borderRadius: 6,
        gap: 1,
        minWidth: 40,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = '#1c1c1c';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = 'transparent';
      }}
    >
      <div style={{ color: '#999' }}>{icon}</div>
      <span style={{ fontSize: 10, color: '#666', whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  );
}
