import HeroCarousel from '../components/HeroCarousel';
import VideoRow from '../components/VideoRow';
import { videoSections } from '../data/content';
import { TrendingUp, Flame, Zap } from 'lucide-react';

const statsBar = [
  { icon: <Flame size={14} />, label: '热播', value: '12,847', color: '#e60012' },
  { icon: <TrendingUp size={14} />, label: '飙升', value: '3,291', color: '#f0a500' },
  { icon: <Zap size={14} />, label: '新片', value: '867', color: '#1e88e5' },
];

export default function Home() {
  return (
    <div style={{ padding: '0 0 40px' }}>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Quick stats bar */}
      <div
        style={{
          display: 'flex',
          gap: 0,
          background: '#111',
          borderRadius: 6,
          margin: '14px 0 20px',
          overflow: 'hidden',
          border: '1px solid #1c1c1c',
        }}
      >
        {statsBar.map((s, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 16px',
              borderRight: i < statsBar.length - 1 ? '1px solid #1c1c1c' : 'none',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = '#181818';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = 'transparent';
            }}
          >
            <div style={{ color: s.color }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 11, color: '#666', lineHeight: 1 }}>{s.label}</div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#e0e0e0',
                  lineHeight: 1.4,
                }}
              >
                {s.value}
              </div>
            </div>
          </div>
        ))}

        {/* Genre filter pills */}
        <div
          style={{
            flex: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '0 16px',
            overflowX: 'auto',
          }}
        >
          {['All', 'Drama', 'Movie', 'Anime', 'Variety', 'Children', 'Sports', 'Documentary'].map(
            (g, i) => (
              <button
                key={g}
                style={{
                  padding: '4px 12px',
                  borderRadius: 14,
                  border: i === 0 ? 'none' : '1px solid #2a2a2a',
                  background: i === 0 ? '#e60012' : 'transparent',
                  color: i === 0 ? '#fff' : '#888',
                  fontSize: 12,
                  fontWeight: i === 0 ? 700 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (i !== 0) {
                    (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#444';
                  }
                }}
                onMouseLeave={(e) => {
                  if (i !== 0) {
                    (e.currentTarget as HTMLButtonElement).style.color = '#888';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#2a2a2a';
                  }
                }}
              >
                {g}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Video sections */}
      {videoSections.map((section) => (
        <VideoRow
          key={section.id}
          title={section.title}
          cards={section.cards}
        />
      ))}

      {/* Footer */}
      <div
        style={{
          marginTop: 32,
          paddingTop: 20,
          borderTop: '1px solid #1a1a1a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['About Us', 'Help Center', 'Terms of Service', 'Privacy Policy', 'Advertise', 'Contact'].map(
            (link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: 12,
                  color: '#555',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#999';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#555';
                }}
              >
                {link}
              </a>
            ),
          )}
        </div>
        <div style={{ fontSize: 11, color: '#3a3a3a', textAlign: 'center' }}>
          &copy; 2025 FILM ILEB LUO. All rights reserved.
        </div>
      </div>
    </div>
  );
}
