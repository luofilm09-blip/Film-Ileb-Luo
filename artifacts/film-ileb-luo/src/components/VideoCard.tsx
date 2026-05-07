import { useState } from 'react';
import { Play } from 'lucide-react';
import type { VideoCard as VideoCardType } from '../data/content';

interface Props {
  card: VideoCardType;
}

export default function VideoCard({ card }: Props) {
  const [hovered, setHovered] = useState(false);

  const badgeStyles: Record<string, React.CSSProperties> = {
    VIP: {
      background: 'linear-gradient(135deg, #c8901a, #f0c050)',
      color: '#5a3500',
    },
    SVIP: {
      background: 'linear-gradient(135deg, #7b2ff7, #c056ef)',
      color: '#fff',
    },
    exclusive: {
      background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
      color: '#fff',
    },
    premiere: {
      background: 'linear-gradient(135deg, #1565c0, #1e88e5)',
      color: '#fff',
    },
    free: {
      background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
      color: '#fff',
    },
  };

  const badgeLabels: Record<string, string> = {
    VIP: 'VIP',
    SVIP: 'SVIP',
    exclusive: '独播',
    premiere: '首播',
    free: '限免',
  };

  return (
    <div
      className="video-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '140%',
          borderRadius: 6,
          overflow: 'hidden',
          background: '#1a1a1a',
          marginBottom: 8,
        }}
      >
        <img
          className="card-img"
          src={card.thumb}
          alt={card.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://via.placeholder.com/176x246/1a1a1a/333?text=${encodeURIComponent(card.title.charAt(0))}`;
          }}
        />

        {/* Bottom gradient */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '55%',
            background:
              'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Badge top-left */}
        {card.badge && (
          <div
            style={{
              position: 'absolute',
              top: 6,
              left: 6,
              fontSize: 10,
              fontWeight: 800,
              padding: '2px 5px',
              borderRadius: 3,
              letterSpacing: '0.02em',
              ...(badgeStyles[card.badge] || {}),
            }}
          >
            {badgeLabels[card.badge] || card.badge}
          </div>
        )}

        {/* Status top-left-bottom-area */}
        {card.statusLabel && (
          <div
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.7)',
              borderRadius: 3,
              padding: '2px 5px',
            }}
          >
            <span style={{ fontSize: 9, color: '#ff6b6b', fontWeight: 700, lineHeight: 1 }}>
              {card.statusLabel}
            </span>
            <span style={{ fontSize: 8, color: '#ff9999', fontWeight: 700, lineHeight: 1 }}>
              {card.statusSub}
            </span>
          </div>
        )}

        {/* Episode info bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 5,
            left: 6,
            right: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: 10,
              color: 'rgba(255,255,255,0.75)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            {card.episodeInfo}
          </span>
        </div>

        {/* Hover play overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: 'rgba(230,0,18,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(230,0,18,0.6)',
            }}
          >
            <Play size={18} color="#fff" fill="#fff" strokeWidth={0} />
          </div>
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: hovered ? '#fff' : '#e0e0e0',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          transition: 'color 0.2s',
          marginBottom: 2,
        }}
      >
        {card.title}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 11,
          color: '#666',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {card.subtitle}
      </div>
    </div>
  );
}
