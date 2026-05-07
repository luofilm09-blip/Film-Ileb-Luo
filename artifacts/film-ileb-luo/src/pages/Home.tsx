import HeroCarousel from '../components/HeroCarousel';
import VideoRow from '../components/VideoRow';
import { guessFollowingCards, ancientRomanceCards } from '../data/content';

export default function Home() {
  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Feed sections */}
      <VideoRow
        title="KEEP WATCHING"
        cards={guessFollowingCards}
        keyword="4K ULTRA HD ZONE"
      />

      <VideoRow
        title="ANCIENT ROMANCE — SO ADDICTIVE"
        cards={ancientRomanceCards}
      />

      <VideoRow
        title="HOT MOVIES THIS WEEK"
        cards={[...ancientRomanceCards].reverse().slice(0, 8)}
      />

      {/* Footer */}
      <div
        style={{
          marginTop: 24,
          padding: '16px 16px 0',
          borderTop: '1px solid #1a1a1a',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
          {['ABOUT US', 'HELP CENTER', 'TERMS OF SERVICE', 'PRIVACY POLICY', 'COPYRIGHT', 'FEEDBACK'].map((link) => (
            <a
              key={link}
              href="#"
              style={{ fontSize: 11, color: '#444', textDecoration: 'none', fontFamily: 'Arial, sans-serif' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#888'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#444'; }}
            >
              {link}
            </a>
          ))}
        </div>
        <div style={{ fontSize: 11, color: '#333', fontFamily: 'Arial, sans-serif' }}>
          © 2025 FILM ILEB LUO — ALL RIGHTS RESERVED
        </div>
      </div>
    </div>
  );
}
