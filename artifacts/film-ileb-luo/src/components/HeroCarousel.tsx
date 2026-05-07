import { useState, useEffect, useCallback, useRef } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../data/content';

const BadgePill = ({ badge }: { badge: string | null }) => {
  if (!badge) return null;
  const styles: Record<string, React.CSSProperties> = {
    VIP: { background: 'linear-gradient(135deg, #c8901a, #f0c050)', color: '#5a3500' },
    SVIP: { background: 'linear-gradient(135deg, #7b2ff7, #c056ef)', color: '#fff' },
    exclusive: { background: 'linear-gradient(135deg, #c0392b, #e74c3c)', color: '#fff' },
    premiere: { background: 'linear-gradient(135deg, #1565c0, #1e88e5)', color: '#fff' },
  };
  const label: Record<string, string> = {
    VIP: 'VIP',
    SVIP: 'SVIP',
    exclusive: 'EXCLUSIVE',
    premiere: 'PREMIERE',
  };
  return (
    <span
      style={{
        ...(styles[badge] || {}),
        fontSize: 10,
        fontWeight: 800,
        padding: '2px 6px',
        borderRadius: 3,
        letterSpacing: '0.04em',
        display: 'inline-block',
      }}
    >
      {label[badge] || badge}
    </span>
  );
};

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrent(idx);
    setTimeout(() => setTransitioning(false), 400);
  }, [transitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % heroSlides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + heroSlides.length) % heroSlides.length);
  }, [current, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  const slide = heroSlides[current];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 420,
        background: '#0a0a0a',
        overflow: 'hidden',
        borderRadius: 8,
        flexShrink: 0,
      }}
      onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
      onMouseLeave={() => { timerRef.current = setInterval(next, 5000); }}
    >
      {/* Background images */}
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.5s ease',
            pointerEvents: i === current ? 'auto' : 'none',
          }}
        >
          <img
            src={s.image}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          {/* Gradients */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 70%, transparent 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background:
                'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
            }}
          />
        </div>
      ))}

      {/* Content overlay */}
      <div
        style={{
          position: 'absolute',
          left: 40,
          bottom: 50,
          maxWidth: 480,
          zIndex: 10,
        }}
      >
        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10, alignItems: 'center' }}>
          <BadgePill badge={slide.badge} />
          <span
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.7)',
              background: 'rgba(255,255,255,0.12)',
              padding: '2px 8px',
              borderRadius: 3,
            }}
          >
            {slide.category}
          </span>
          <span
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.7)',
              background: 'rgba(255,255,255,0.12)',
              padding: '2px 8px',
              borderRadius: 3,
            }}
          >
            {slide.episodeInfo}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.5,
            marginBottom: 14,
            maxWidth: 400,
          }}
        >
          {slide.desc}
        </p>

        {/* Rank label */}
        {slide.rankLabel && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                background: 'linear-gradient(135deg, #e60012, #ff4444)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 8, color: '#fff', fontWeight: 800 }}>🔥</span>
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#ff6b6b',
              }}
            >
              {slide.rankLabel}
            </span>
          </div>
        )}

        {/* Play button */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#e60012',
            border: 'none',
            borderRadius: 24,
            padding: '10px 24px',
            cursor: 'pointer',
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.01em',
            boxShadow: '0 4px 16px rgba(230,0,18,0.4)',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.04)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          }}
        >
          <Play size={16} fill="#fff" strokeWidth={0} />
          Play Now
        </button>
      </div>

      {/* Thumbnail strip (right side) */}
      <div
        style={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          zIndex: 10,
        }}
      >
        {heroSlides.map((s, i) => (
          <div
            key={s.id}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? 58 : 52,
              height: i === current ? 80 : 72,
              borderRadius: 5,
              overflow: 'hidden',
              cursor: 'pointer',
              border: i === current ? '2px solid #e60012' : '2px solid rgba(255,255,255,0.15)',
              transition: 'all 0.25s',
              opacity: i === current ? 1 : 0.65,
              flexShrink: 0,
            }}
          >
            <img
              src={s.image}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://via.placeholder.com/58x80/1a1a1a/333?text=+`;
              }}
            />
          </div>
        ))}
      </div>

      {/* Arrow navigation */}
      <button
        onClick={prev}
        style={{
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%',
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 11,
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(230,0,18,0.7)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.5)';
        }}
      >
        <ChevronLeft size={18} color="#fff" />
      </button>

      <button
        onClick={next}
        style={{
          position: 'absolute',
          right: 90,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%',
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 11,
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(230,0,18,0.7)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.5)';
        }}
      >
        <ChevronRight size={18} color="#fff" />
      </button>

      {/* Dot indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 5,
          zIndex: 11,
        }}
      >
        {heroSlides.map((_, i) => (
          <div
            key={i}
            onClick={() => goTo(i)}
            className={`hero-dot ${i === current ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
