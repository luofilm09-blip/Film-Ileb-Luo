import type { FeedCard } from '../data/content';

interface Props {
  card: FeedCard;
}

export default function VideoCard({ card }: Props) {
  return (
    <div className="yk_card_368vl">
      <a href="#" style={{ position: 'relative', display: 'block', textDecoration: 'none', color: 'inherit' }}>
        <div className="pack_wrap_2xjIs pack_vertical_ilL2U" style={{ paddingBottom: '145%', position: 'relative' }}>
          <div className="pack_img_wrap_3sS_W" style={{ position: 'absolute', inset: 0 }}>
            <img
              className="pack_img_YJm41"
              src={card.image}
              alt={card.title}
              onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
            />
          </div>

          {/* Badge top-left */}
          {card.badgeClass && card.badgeText && (
            <div className={`pack_mark_1hLkl ${card.badgeClass} null`}>
              <span>{card.badgeText}</span>
            </div>
          )}

          {/* Status top-right */}
          {card.statusText && (
            <div className="newSummaryLeft_2WuF0 undefined">
              <div className="newSummaryLeftText_22TVB">{card.statusText}</div>
              <div className="newSummaryLeftSubTitle_3gXo1">{card.statusSub}</div>
            </div>
          )}

          {/* Episode bottom */}
          <div className="lb_texts_wrap_1o6QN">
            <span className="lb_texts_23IEZ">{card.episodeText}</span>
          </div>
        </div>

        {/* Title */}
        <div className="pack_title_vhB7u">{card.title}</div>
        {/* Subtitle */}
        <div className="pack_subtitle_1HHha">{card.subtitle}</div>
      </a>
    </div>
  );
}
