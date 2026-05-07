import { useState } from 'react';
import {
  Home, Tv, PlayCircle, Film, Star, Layers, Smile, Crown,
  BookOpen, Trophy, Globe, Radio, Gamepad2, GraduationCap,
  Lightbulb, Heart, Clapperboard, Search, ChevronRight
} from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home, active: true },
  { id: 'drama', label: 'TV Series', icon: Tv },
  { id: 'anime', label: 'Anime', icon: PlayCircle },
  { id: 'movie', label: 'Movies', icon: Film },
  { id: 'variety', label: 'Variety', icon: Star },
  { id: 'short', label: 'Short Drama', icon: Layers },
  { id: 'kids', label: 'Children', icon: Smile },
  { id: 'vip', label: 'VIP Center', icon: Crown },
  { id: 'doc', label: 'Documentary', icon: BookOpen },
  { id: 'sports', label: 'Sports', icon: Trophy },
  { id: 'culture', label: 'Culture', icon: Globe },
  { id: 'live', label: 'Live', icon: Radio },
  { id: 'game', label: 'Games', icon: Gamepad2 },
  { id: 'learn', label: 'Learning', icon: GraduationCap },
  { id: 'knowledge', label: 'Knowledge', icon: Lightbulb },
  { id: 'newfilm', label: 'New Films', icon: Clapperboard },
  { id: 'health', label: 'Health', icon: Heart },
];

export default function Sidebar() {
  const [activeId, setActiveId] = useState('home');

  return (
    <aside
      style={{
        width: 80,
        minWidth: 80,
        background: '#0d0d0d',
        borderRight: '1px solid #1a1a1a',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '18px 0 14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderBottom: '1px solid #1a1a1a',
          marginBottom: 4,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            background: 'linear-gradient(135deg, #e60012, #ff4444)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4,
          }}
        >
          <Film size={22} color="#fff" strokeWidth={2.5} />
        </div>
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: '#e60012',
            letterSpacing: '0.03em',
            textAlign: 'center',
            lineHeight: 1.2,
            textTransform: 'uppercase',
          }}
        >
          FILM
          <br />
          ILEB LUO
        </span>
      </div>

      {/* Search icon */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10px 0',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1c1c1c',
          }}
        >
          <Search size={16} color="#aaa" />
        </div>
        <span style={{ fontSize: 10, color: '#666', marginTop: 3 }}>Search</span>
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '9px 4px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.15s',
                background: isActive ? '#1a1a1a' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLDivElement).style.background = '#161616';
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLDivElement).style.background = 'transparent';
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '20%',
                    height: '60%',
                    width: 3,
                    borderRadius: '0 2px 2px 0',
                    background: '#e60012',
                  }}
                />
              )}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isActive ? '#e60012' : 'transparent',
                  transition: 'background 0.15s',
                }}
              >
                <Icon
                  size={18}
                  color={isActive ? '#fff' : '#888'}
                  strokeWidth={isActive ? 2 : 1.5}
                />
              </div>
              <span
                style={{
                  fontSize: 10,
                  color: isActive ? '#fff' : '#777',
                  marginTop: 3,
                  textAlign: 'center',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </nav>

      {/* Bottom expand */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px 0',
          borderTop: '1px solid #1a1a1a',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <ChevronRight size={16} color="#555" />
      </div>
    </aside>
  );
}
