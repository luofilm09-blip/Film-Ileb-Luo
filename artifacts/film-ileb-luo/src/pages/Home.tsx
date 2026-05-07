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
        title="猜你在追"
        cards={guessFollowingCards}
        keyword="超高清内容专区"
      />

      <VideoRow
        title="古风恋爱剧，原来这么上头"
        cards={ancientRomanceCards}
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
          {['关于优酷', '帮助中心', '用户协议', '隐私政策', '版权声明', '意见反馈'].map((link) => (
            <a
              key={link}
              href="#"
              style={{ fontSize: 12, color: '#444', textDecoration: 'none' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#888'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#444'; }}
            >
              {link}
            </a>
          ))}
        </div>
        <div style={{ fontSize: 11, color: '#333' }}>
          ©2025 优酷 youku.com 版权所有
        </div>
      </div>
    </div>
  );
}
