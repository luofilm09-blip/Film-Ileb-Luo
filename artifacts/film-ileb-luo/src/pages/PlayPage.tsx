import { useState } from 'react';
import { useParams, useLocation, Link } from 'wouter';
import VideoCard from '../components/VideoCard';
import { getPlayShow } from '../data/content';

export default function PlayPage() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const show = getPlayShow(id || '1');
  const [activeTab, setActiveTab] = useState<'video' | 'discuss'>('video');
  const [isLiked, setIsLiked] = useState(false);
  const [activeCast, setActiveCast] = useState(0);

  return (
    <div style={{ background: '#0d0d0d', minHeight: '100vh', color: '#e0e0e0', fontFamily: 'Arial, sans-serif' }}>
      {/* Breadcrumb */}
      <div style={{ padding: '8px 24px', fontSize: 11, color: '#555', display: 'flex', gap: 6, alignItems: 'center' }}>
        <Link href="/"><span style={{ color: '#555', cursor: 'pointer' }} onMouseEnter={e => (e.target as HTMLElement).style.color='#aaa'} onMouseLeave={e => (e.target as HTMLElement).style.color='#555'}>HOME</span></Link>
        <span>›</span>
        <Link href="/drama"><span style={{ color: '#555', cursor: 'pointer' }} onMouseEnter={e => (e.target as HTMLElement).style.color='#aaa'} onMouseLeave={e => (e.target as HTMLElement).style.color='#555'}>TV DRAMA</span></Link>
        <span>›</span>
        <span style={{ color: '#999' }}>{show.title}</span>
      </div>

      {/* CENTER CONTAINER — Player + Right Panel */}
      <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start', padding: '0 0 0 0' }}>
        {/* Player Area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Video Player */}
          <div style={{
            position: 'relative',
            background: '#000',
            aspectRatio: '16/9',
            width: '100%',
            maxHeight: 520,
            overflow: 'hidden',
          }}>
            <video
              src={show.videoUrl}
              poster={show.posterUrl}
              controls
              style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
              onError={(e) => {
                const v = e.target as HTMLVideoElement;
                v.poster = show.posterUrl;
              }}
            />
            {/* Top overlay bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '10px 14px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)', display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'none' }}>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.05em' }}>{show.title}</span>
              <span style={{ background: '#ff1a1a', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 2 }}>{show.badgeText}</span>
            </div>
          </div>

          {/* Below player: episode selector mock */}
          <div style={{ background: '#111', borderBottom: '1px solid #1e1e1e', padding: '10px 16px', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
            <span style={{ fontSize: 12, color: '#666', flexShrink: 0, paddingTop: 4 }}>EPISODES:</span>
            {Array.from({ length: Math.min(show.totalEps, 16) }, (_, i) => i + 1).map(ep => (
              <button
                key={ep}
                style={{
                  minWidth: 36, height: 28, border: ep <= show.completedEps ? '1px solid #ff1a1a' : '1px solid #2a2a2a',
                  background: ep === 1 ? '#ff1a1a' : '#181818',
                  color: ep === 1 ? '#fff' : ep <= show.completedEps ? '#ff8888' : '#666',
                  borderRadius: 3, fontSize: 11, cursor: 'pointer', fontFamily: 'Arial, sans-serif',
                  flexShrink: 0,
                }}
              >
                {ep < 10 ? `0${ep}` : ep}
              </button>
            ))}
            {show.totalEps > 16 && (
              <button style={{ minWidth: 48, height: 28, border: '1px solid #2a2a2a', background: '#181818', color: '#666', borderRadius: 3, fontSize: 11, cursor: 'pointer', flexShrink: 0 }}>
                MORE...
              </button>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ width: 320, flexShrink: 0, background: '#0f0f0f', borderLeft: '1px solid #1a1a1a', minHeight: 400 }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #1e1e1e' }}>
            {(['video', 'discuss'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1, padding: '12px 0', background: 'transparent', border: 'none',
                  borderBottom: activeTab === tab ? '2px solid #ff1a1a' : '2px solid transparent',
                  color: activeTab === tab ? '#fff' : '#666',
                  fontSize: 12, fontWeight: activeTab === tab ? 700 : 400,
                  cursor: 'pointer', fontFamily: 'Arial, sans-serif', letterSpacing: '0.05em',
                }}
              >
                {tab === 'video' ? 'VIDEO' : 'DISCUSSION'}
              </button>
            ))}
          </div>

          {activeTab === 'video' ? (
            <div style={{ overflowY: 'auto', maxHeight: 700, scrollbarWidth: 'thin', scrollbarColor: '#2a2a2a #111' }}>
              {/* Show Info */}
              <div style={{ padding: '14px 14px 10px' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 6, letterSpacing: '0.03em' }}>{show.title}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
                  <span style={{ color: '#ff4444', fontSize: 13, fontWeight: 700 }}>{show.heat.toLocaleString()}</span>
                  <span style={{ color: '#aaa', fontSize: 11 }}>{show.rank}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                  {show.tags.map(t => (
                    <span key={t} style={{ background: '#1e1e1e', color: '#888', fontSize: 10, padding: '2px 7px', borderRadius: 2, border: '1px solid #2a2a2a' }}>{t}</span>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: '#777', lineHeight: 1.6, marginBottom: 12 }}>{show.desc}</div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: 16, paddingBottom: 12, borderBottom: '1px solid #1e1e1e' }}>
                  {[
                    { icon: '⬇', label: 'DOWNLOAD', disabled: true },
                    { icon: '↗', label: 'SHARE', disabled: false },
                    { icon: isLiked ? '♥' : '♡', label: 'LIKE', disabled: false, onClick: () => setIsLiked(!isLiked), color: isLiked ? '#ff4444' : undefined },
                  ].map(btn => (
                    <button
                      key={btn.label}
                      onClick={btn.onClick}
                      disabled={btn.disabled}
                      style={{
                        background: 'transparent', border: 'none',
                        color: btn.disabled ? '#3a3a3a' : btn.color || '#888',
                        cursor: btn.disabled ? 'not-allowed' : 'pointer',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                        fontSize: 18, fontFamily: 'Arial, sans-serif',
                      }}
                    >
                      <span>{btn.icon}</span>
                      <span style={{ fontSize: 9, color: btn.disabled ? '#3a3a3a' : '#666' }}>{btn.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Surrounding Videos */}
              <div style={{ padding: '10px 14px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#ccc', marginBottom: 10, letterSpacing: '0.05em' }}>RELATED VIDEOS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {show.relatedVideos.map((rv) => (
                    <a
                      key={rv.id}
                      href="#"
                      onClick={e => { e.preventDefault(); navigate('/play/1'); }}
                      style={{ display: 'flex', gap: 8, textDecoration: 'none', color: 'inherit' }}
                    >
                      <div style={{ position: 'relative', width: 96, height: 54, flexShrink: 0, borderRadius: 3, overflow: 'hidden', background: '#1a1a1a' }}>
                        <img
                          src={`${rv.thumbnail}?x-oss-process=image/resize,w_192/interlace,1/quality,Q_70`}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
                        />
                        {rv.badge && (
                          <span style={{ position: 'absolute', top: 3, left: 3, background: '#2255ff', color: '#fff', fontSize: 8, padding: '1px 4px', borderRadius: 2 }}>{rv.badge}</span>
                        )}
                        <span style={{ position: 'absolute', bottom: 3, right: 4, color: '#ddd', fontSize: 9, background: 'rgba(0,0,0,0.6)', padding: '1px 3px', borderRadius: 2 }}>{rv.duration}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, color: '#ccc', lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' } as React.CSSProperties}>{rv.title}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: 20, textAlign: 'center' }}>
              <div style={{ marginBottom: 16 }}>
                <img src="https://img.alicdn.com/imgextra/i3/O1CN01LamlXK1zSbv0PI4jQ_!!6000000006713-2-tps-600-600.png" alt="" style={{ width: 80, opacity: 0.3 }} />
                <div style={{ fontSize: 12, color: '#555', marginTop: 8 }}>NO COMMENTS YET</div>
              </div>
              <textarea
                placeholder="SHARE YOUR THOUGHTS..."
                style={{
                  width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a',
                  borderRadius: 4, padding: 10, color: '#ccc', fontSize: 12,
                  resize: 'none', height: 80, fontFamily: 'Arial, sans-serif',
                  textTransform: 'uppercase',
                }}
              />
              <button style={{
                marginTop: 8, padding: '6px 20px', background: '#ff1a1a', color: '#fff',
                border: 'none', borderRadius: 3, cursor: 'pointer', fontSize: 11,
                fontFamily: 'Arial, sans-serif', letterSpacing: '0.05em',
              }}>
                POST COMMENT
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM: Cast tabs + Recommended */}
      <div style={{ padding: '0 16px 16px', marginTop: 2 }}>
        {/* Cast tabs */}
        <div style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #1e1e1e', marginBottom: 16 }}>
            <button
              key="foryou"
              onClick={() => setActiveCast(0)}
              style={{
                padding: '10px 16px', background: 'transparent', border: 'none',
                borderBottom: activeCast === 0 ? '2px solid #ff1a1a' : '2px solid transparent',
                color: activeCast === 0 ? '#fff' : '#666',
                fontSize: 11, fontWeight: activeCast === 0 ? 700 : 400,
                cursor: 'pointer', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap',
                letterSpacing: '0.05em',
              }}
            >
              FOR YOU
            </button>
            {show.cast.map((member, idx) => (
              <button
                key={member.id}
                onClick={() => setActiveCast(idx + 1)}
                style={{
                  padding: '10px 12px', background: 'transparent', border: 'none',
                  borderBottom: activeCast === idx + 1 ? '2px solid #ff1a1a' : '2px solid transparent',
                  color: activeCast === idx + 1 ? '#fff' : '#666',
                  fontSize: 11, cursor: 'pointer', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <span style={{ letterSpacing: '0.03em' }}>{member.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px 8px' }}>
          {show.recommendedCards.map(card => (
            <VideoCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
