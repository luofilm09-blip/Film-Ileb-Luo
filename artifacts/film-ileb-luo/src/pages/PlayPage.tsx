import { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { doc, getDoc, collection, query, where, orderBy, getDocs, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ContentDoc, EpisodeDoc } from '../lib/db';
import { useApp } from '../context/AppContext';
import MuxPlayer from '@mux/mux-player-react';

export default function PlayPage() {
  const { id } = useParams<{ id: string }>();
  const { user, openVip } = useApp();
  const [content, setContent] = useState<ContentDoc | null>(null);
  const [episodes, setEpisodes] = useState<EpisodeDoc[]>([]);
  const [activeEp, setActiveEp] = useState<EpisodeDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [tab, setTab] = useState<'video'|'discuss'>('video');

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'content', id));
        if (snap.exists()) {
          const c = { id: snap.id, ...snap.data() } as ContentDoc;
          setContent(c);
          // increment view count
          updateDoc(doc(db, 'content', id), { views: increment(1) }).catch(() => {});
          if (c.type === 'series') {
            const epSnap = await getDocs(query(collection(db, 'episodes'), where('seriesId', '==', id), orderBy('episodeNumber', 'asc')));
            const eps = epSnap.docs.map(d => ({ id: d.id, ...d.data() } as EpisodeDoc));
            setEpisodes(eps);
            if (eps.length) setActiveEp(eps[0]);
          }
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, [id]);

  const currentVideo = activeEp?.videoUrl || content?.videoUrl || '';
  const currentTitle = activeEp ? `EP ${activeEp.episodeNumber}: ${activeEp.title}` : content?.title || '';
  const isVipRequired = activeEp ? !activeEp.isFree : false;
  const canWatch = !isVipRequired || user?.isVip;

  const renderPlayer = () => {
    if (!currentVideo) {
      return (
        <div style={{ width: '100%', aspectRatio: '16/9', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round"><path d="M5 3l14 9-14 9V3z"/></svg>
          <span style={{ color: '#333', fontSize: 11, letterSpacing: 1, fontFamily: 'Arial, sans-serif' }}>NO VIDEO SOURCE</span>
        </div>
      );
    }
    if (!canWatch) {
      return (
        <div style={{ width: '100%', aspectRatio: '16/9', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
          {content?.thumbnail && <img src={content.thumbnail} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} alt="" />}
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" style={{ marginBottom: 10 }}><path d="M2 19h20M3 9l4 5 5-8 5 8 4-5v10H3z"/></svg>
            <div style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 1, fontFamily: 'Arial, sans-serif', marginBottom: 6 }}>VIP CONTENT</div>
            <div style={{ color: '#888', fontSize: 11, letterSpacing: 0.8, fontFamily: 'Arial, sans-serif', marginBottom: 16 }}>SUBSCRIBE TO WATCH THIS EPISODE</div>
            <button onClick={openVip} style={{ background: 'linear-gradient(135deg,#f5a623,#e08a00)', border: 'none', borderRadius: 8, color: '#fff', padding: '10px 24px', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, cursor: 'pointer', fontFamily: 'Arial, sans-serif' }}>
              GET VIP
            </button>
          </div>
        </div>
      );
    }
    // Determine if it's a Mux playback ID (no protocol) or a direct URL
    const isMuxId = currentVideo && !currentVideo.startsWith('http') && !currentVideo.startsWith('//');
    return (
      <MuxPlayer
        style={{ width: '100%', aspectRatio: '16/9', background: '#000' }}
        {...(isMuxId ? { playbackId: currentVideo } : { src: currentVideo })}
        poster={content?.thumbnail || undefined}
        title={currentTitle}
        accentColor="#e50914"
        autoPlay={false}
        preload="metadata"
      />
    );
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#444', fontFamily: 'Arial, sans-serif', fontSize: 12, letterSpacing: 1 }}>
        LOADING...
      </div>
    );
  }

  if (!content) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 16, fontFamily: 'Arial, sans-serif' }}>
        <div style={{ fontSize: 48, color: '#222' }}>404</div>
        <div style={{ color: '#555', fontSize: 12, letterSpacing: 1 }}>CONTENT NOT FOUND</div>
        <Link href="/" style={{ color: '#e50914', fontSize: 11, letterSpacing: 1, textDecoration: 'none' }}>BACK TO HOME</Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#0d0d0d', minHeight: '100vh', color: '#e0e0e0', fontFamily: 'Arial, sans-serif' }}>
      {/* Breadcrumb */}
      <div style={{ padding: '8px 24px', fontSize: 11, color: '#555', display: 'flex', gap: 6, alignItems: 'center' }}>
        <Link href="/"><span style={{ color: '#555', cursor: 'pointer' }}>HOME</span></Link>
        <span>›</span>
        <Link href={`/${content.category}`}><span style={{ color: '#555', cursor: 'pointer', textTransform: 'uppercase' }}>{content.category}</span></Link>
        <span>›</span>
        <span style={{ color: '#999' }}>{content.title}</span>
      </div>

      <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start' }}>
        {/* Player Area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ position: 'relative', background: '#000', width: '100%', maxHeight: 540, overflow: 'hidden' }}>
            {renderPlayer()}
            {canWatch && currentVideo && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '10px 14px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)', display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'none' }}>
                <span style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.05em' }}>{content.title}</span>
                {content.badge && <span style={{ background: '#e50914', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 2 }}>{content.badge}</span>}
              </div>
            )}
          </div>

          {/* Episode selector for series */}
          {content.type === 'series' && episodes.length > 0 && (
            <div style={{ background: '#111', borderBottom: '1px solid #1e1e1e', padding: '10px 16px', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
              <span style={{ fontSize: 12, color: '#666', flexShrink: 0, paddingTop: 4 }}>EPISODES:</span>
              {episodes.map(ep => (
                <button
                  key={ep.id}
                  onClick={() => setActiveEp(ep)}
                  style={{
                    minWidth: 36, height: 28,
                    border: activeEp?.id === ep.id ? '1px solid #e50914' : '1px solid #2a2a2a',
                    background: activeEp?.id === ep.id ? '#e50914' : '#181818',
                    color: activeEp?.id === ep.id ? '#fff' : '#666',
                    borderRadius: 3, fontSize: 11, cursor: 'pointer', fontFamily: 'Arial, sans-serif', flexShrink: 0,
                  }}>
                  {ep.episodeNumber < 10 ? `0${ep.episodeNumber}` : ep.episodeNumber}
                  {!ep.isFree && <span style={{ fontSize: 7, marginLeft: 2, color: '#f5a623' }}>V</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div style={{ width: 320, flexShrink: 0, background: '#0f0f0f', borderLeft: '1px solid #1a1a1a', minHeight: 400 }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #1e1e1e' }}>
            {(['video','discuss'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '12px 0', background: 'transparent', border: 'none', borderBottom: tab === t ? '2px solid #e50914' : '2px solid transparent', color: tab === t ? '#fff' : '#666', fontSize: 12, fontWeight: tab === t ? 700 : 400, cursor: 'pointer', fontFamily: 'Arial, sans-serif', letterSpacing: '0.05em' }}>
                {t === 'video' ? 'INFO' : 'DISCUSSION'}
              </button>
            ))}
          </div>

          {tab === 'video' ? (
            <div style={{ overflowY: 'auto', maxHeight: 700, scrollbarWidth: 'thin', scrollbarColor: '#2a2a2a #111' }}>
              <div style={{ padding: '14px 14px 10px' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 6 }}>{content.title}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
                  {content.year && <span style={{ color: '#666', fontSize: 11 }}>{content.year}</span>}
                  {content.rating && <span style={{ color: '#f5a623', fontSize: 11, fontWeight: 700 }}>{content.rating}</span>}
                  {content.duration && <span style={{ color: '#555', fontSize: 10 }}>{content.duration}</span>}
                </div>
                {content.tags && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                    {content.tags.split(',').map(t => (
                      <span key={t} style={{ background: '#1e1e1e', color: '#888', fontSize: 10, padding: '2px 7px', borderRadius: 2, border: '1px solid #2a2a2a' }}>{t.trim()}</span>
                    ))}
                  </div>
                )}
                {content.description && <div style={{ fontSize: 11, color: '#777', lineHeight: 1.6, marginBottom: 12 }}>{content.description}</div>}

                <div style={{ display: 'flex', gap: 16, paddingBottom: 12, borderBottom: '1px solid #1e1e1e' }}>
                  <button onClick={() => setIsLiked(!isLiked)} style={{ background: 'transparent', border: 'none', color: isLiked ? '#e50914' : '#888', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, fontSize: 18 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? '#e50914' : 'none'} stroke={isLiked ? '#e50914' : '#888'} strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    <span style={{ fontSize: 9, color: isLiked ? '#e50914' : '#666' }}>LIKE</span>
                  </button>
                  <button onClick={() => navigator.share?.({ title: content.title, url: window.location.href }).catch(()=>{})} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, fontSize: 18 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
                    <span style={{ fontSize: 9, color: '#666' }}>SHARE</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: 20, textAlign: 'center' }}>
              <div style={{ marginBottom: 16 }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" style={{ marginBottom: 8 }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>NO COMMENTS YET</div>
              </div>
              <textarea placeholder="SHARE YOUR THOUGHTS..." style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 4, padding: 10, color: '#ccc', fontSize: 12, resize: 'none', height: 80, fontFamily: 'Arial, sans-serif', textTransform: 'uppercase', outline: 'none', boxSizing: 'border-box' }} />
              <button style={{ marginTop: 8, padding: '6px 20px', background: '#e50914', color: '#fff', border: 'none', borderRadius: 3, cursor: 'pointer', fontSize: 11, fontFamily: 'Arial, sans-serif', letterSpacing: '0.05em' }}>POST COMMENT</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
