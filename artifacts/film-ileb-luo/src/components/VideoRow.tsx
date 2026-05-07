import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import VideoCard from './VideoCard';
import type { VideoCard as VideoCardType } from '../data/content';

interface Props {
  title: string;
  cards: VideoCardType[];
  cardWidth?: number;
}

export default function VideoRow({ title, cards, cardWidth = 148 }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  };

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = cardWidth * 4 + 12 * 4;
    scrollRef.current.scrollBy({
      left: dir === 'right' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Section header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
          padding: '0 2px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 3,
              height: 16,
              background: '#e60012',
              borderRadius: 2,
              flexShrink: 0,
            }}
          />
          <h2
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#f0f0f0',
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </h2>
        </div>

        {/* Arrow buttons */}
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: canScrollLeft ? '#222' : '#161616',
              border: '1px solid',
              borderColor: canScrollLeft ? '#333' : '#202020',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: canScrollLeft ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              if (canScrollLeft)
                (e.currentTarget as HTMLButtonElement).style.background = '#e60012';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = canScrollLeft
                ? '#222'
                : '#161616';
            }}
          >
            <ChevronLeft size={14} color={canScrollLeft ? '#ccc' : '#444'} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: canScrollRight ? '#222' : '#161616',
              border: '1px solid',
              borderColor: canScrollRight ? '#333' : '#202020',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: canScrollRight ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              if (canScrollRight)
                (e.currentTarget as HTMLButtonElement).style.background = '#e60012';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = canScrollRight
                ? '#222'
                : '#161616';
            }}
          >
            <ChevronRight size={14} color={canScrollRight ? '#ccc' : '#444'} />
          </button>
        </div>
      </div>

      {/* Scrollable row */}
      <div style={{ position: 'relative' }}>
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          style={{
            display: 'flex',
            gap: 12,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: 2,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              style={{
                width: cardWidth,
                minWidth: cardWidth,
                flexShrink: 0,
              }}
            >
              <VideoCard card={card} />
            </div>
          ))}
        </div>

        {/* Left fade */}
        {canScrollLeft && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 40,
              background:
                'linear-gradient(to right, rgba(20,20,20,0.95) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Right fade */}
        {canScrollRight && (
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 40,
              background:
                'linear-gradient(to left, rgba(20,20,20,0.95) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </div>
  );
}
