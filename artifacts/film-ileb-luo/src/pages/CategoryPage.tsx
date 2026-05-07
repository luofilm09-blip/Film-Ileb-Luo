import { useState } from 'react';
import { useParams } from 'wouter';
import VideoCard from '../components/VideoCard';
import { categoryData } from '../data/content';

const DEFAULT_CATEGORY = {
  id: 'default', title: 'CONTENT', subtitle: 'BROWSE ALL CONTENT',
  color: '#c00', gradient: 'linear-gradient(135deg, #1a0000, #2d0000)',
  filters: ['ALL'], cards: [],
};

interface Props {
  categoryId?: string;
}

export default function CategoryPage({ categoryId }: Props) {
  const params = useParams<{ id: string }>();
  const id = categoryId || params.id;
  const cat = (id && categoryData[id]) || DEFAULT_CATEGORY;
  const [activeFilter, setActiveFilter] = useState(0);
  const [sortBy, setSortBy] = useState('HOT');

  const sortOptions = ['HOT', 'NEWEST', 'RATING', 'EPISODES'];

  return (
    <div style={{ background: '#0d0d0d', minHeight: '100vh', color: '#e0e0e0', fontFamily: 'Arial, sans-serif' }}>
      {/* Banner */}
      <div style={{
        background: cat.gradient,
        borderBottom: `2px solid ${cat.color}22`,
        padding: '20px 24px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: -40, left: -40,
          width: 200, height: 200,
          background: `radial-gradient(circle, ${cat.color}33, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 4 }}>
            <h1 style={{
              fontSize: 28, fontWeight: 900, color: '#fff',
              letterSpacing: '0.05em', margin: 0, lineHeight: 1,
              fontFamily: '"Arial Black", Arial, sans-serif',
              textShadow: `0 0 30px ${cat.color}88`,
            }}>
              {cat.title}
            </h1>
            <span style={{ fontSize: 12, color: '#888', paddingBottom: 4, letterSpacing: '0.04em' }}>{cat.subtitle}</span>
          </div>

          {/* Accent line */}
          <div style={{ width: 48, height: 3, background: cat.color, borderRadius: 2, marginBottom: 16 }} />

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none' as const }}>
            {cat.filters.map((filter, i) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(i)}
                style={{
                  padding: '8px 14px', background: 'transparent', border: 'none',
                  borderBottom: activeFilter === i ? `2px solid ${cat.color}` : '2px solid transparent',
                  color: activeFilter === i ? '#fff' : '#666',
                  fontSize: 11, fontWeight: activeFilter === i ? 700 : 400,
                  cursor: 'pointer', fontFamily: 'Arial, sans-serif',
                  whiteSpace: 'nowrap', letterSpacing: '0.04em',
                  transition: 'color 0.15s',
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sort + Count bar */}
      <div style={{
        padding: '10px 24px', background: '#0f0f0f',
        borderBottom: '1px solid #1a1a1a',
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <span style={{ fontSize: 11, color: '#555' }}>SORT BY:</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {sortOptions.map(opt => (
            <button
              key={opt}
              onClick={() => setSortBy(opt)}
              style={{
                padding: '4px 10px', background: sortBy === opt ? cat.color : '#1a1a1a',
                border: `1px solid ${sortBy === opt ? cat.color : '#2a2a2a'}`,
                color: sortBy === opt ? '#fff' : '#666',
                borderRadius: 3, fontSize: 10, cursor: 'pointer',
                fontFamily: 'Arial, sans-serif', letterSpacing: '0.04em',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
        <span style={{ fontSize: 11, color: '#444', marginLeft: 'auto' }}>{cat.cards.length} TITLES</span>
      </div>

      {/* Cards Grid */}
      <div style={{ padding: '16px 24px 32px' }}>
        {cat.cards.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px 10px' }}>
            {cat.cards.map(card => (
              <VideoCard key={card.id} card={card} />
            ))}
          </div>
        ) : (
          <EmptyState title={cat.title} color={cat.color} />
        )}

        {cat.cards.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <button
              style={{
                padding: '10px 40px', background: '#1a1a1a', border: '1px solid #2a2a2a',
                color: '#888', borderRadius: 4, cursor: 'pointer', fontSize: 12,
                fontFamily: 'Arial, sans-serif', letterSpacing: '0.06em',
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = '#222'; (e.target as HTMLElement).style.color = '#ccc'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = '#1a1a1a'; (e.target as HTMLElement).style.color = '#888'; }}
            >
              LOAD MORE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ title, color }: { title: string; color: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#444' }}>
      <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>▶</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#555', marginBottom: 8, letterSpacing: '0.05em' }}>{title}</div>
      <div style={{ fontSize: 12, color: '#444' }}>CONTENT COMING SOON</div>
      <div style={{ width: 40, height: 2, background: color, borderRadius: 2, margin: '16px auto 0', opacity: 0.5 }} />
    </div>
  );
}
