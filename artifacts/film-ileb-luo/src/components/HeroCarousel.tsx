import { useState, useEffect, useCallback, useRef } from 'react';
import { swiperSlides, bulletCards } from '../data/content';

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % swiperSlides.length);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  }, [next]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const slide = swiperSlides[current];

  return (
    <div
      className="swiper_wrap_3_CON"
      onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
      onMouseLeave={startTimer}
    >
      {/* Slides */}
      <div className="swiper_container_custom">
        <div className="swiper-wrapper">
          {swiperSlides.map((s, i) => (
            <div key={s.id} className={`swiper-slide${i === current ? ' active' : ''}`}>
              <div className="swiper_item_img_wrap_2vvR2">
                <div className={s.id === '7' ? 'swiper_political_img_QmWai' : 'swiper_show_img_qwMgx'}>
                  <a href="#">
                    <img
                      src={s.image}
                      alt=""
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </a>
                  <div className="img_top_shadow_1Jl5Y" />
                  <div className="img_left_shadow_3uQE-" />
                  <div className="img_bottom_shadow_3gdlg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info + Pagination Panel */}
      <div className="pagination_info_wrap_2djxx">
        {/* Info panel (left side) */}
        <div className="swiper_item_info_wrap_xr4-T">
          <div className="swiper_item_info_CFKcC" style={{ display: 'block' }}>
            {/* Title art image */}
            <div style={{ transformOrigin: 'left bottom' }}>
              {slide.titleArtUrl ? (
                <div className={`title_icon_3OEty title_icon_${slide.titleArtStyle === 'square' ? 'square_22rwp' : slide.titleArtStyle === 'horizontal_big' ? 'horizontal_big_tqLXc' : 'horizontal_Gs-ty'}`}>
                  <img
                    src={slide.titleArtUrl}
                    alt=""
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              ) : slide.titleText ? (
                <div className="swiper_item_title_1gdGI">{slide.titleText}</div>
              ) : null}
            </div>

            {/* Tags + desc + play */}
            {!slide.isAd && slide.tags.length > 0 && (
              <div className="item_wrap_3czPf">
                <div className="item_2wPCe">
                  <div className="swiper_item_tags_3qvRt">
                    {slide.tags.map((tag, ti) => (
                      <div
                        key={ti}
                        className={`tag_2AESO ${
                          tag.type === 'vip' ? 'tag12_22zKy' :
                          tag.type === 'exclusive' ? 'tag11_39Lg0' :
                          tag.type === 'ad' ? 'tag199999_1wL9K' :
                          'tag1__xbWn'
                        }`}
                      >
                        <span>{tag.text}</span>
                      </div>
                    ))}
                  </div>
                  {slide.desc && (
                    <div className="swiper_item_desc_1pk_I no_reason_p0187">{slide.desc}</div>
                  )}
                </div>
                <div className="swiper_item_control_1C-Qx">
                  <div className="control_btn_wrap_3w0t8">
                    <a href="#">
                      <div className="swiper_item_play_btn_3oJP-">
                        <span className="play_icon_2lZmx">▶</span>
                        <span className="play_btn_text_1x4lT">播放</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pagination thumbnail strip (right side) */}
        <div className="custom_pagination_wrap_zvWry">
          <div className="hscroll_wrapper_3CJzY">
            <div className="hscroll_content_fdYOj">
              <div className="card_container_1U0e6">
                {bulletCards.slice(0, 7).map((bullet) => {
                  const isActive = bullet.slideIndex === current;
                  return (
                    <div
                      key={bullet.id}
                      className="bullet_wrap_1yE2X g-col-swiper"
                      onClick={() => goTo(bullet.slideIndex)}
                    >
                      <div className="yk_card_368vl">
                        <a href="#" onClick={(e) => { e.preventDefault(); goTo(bullet.slideIndex); }} style={{ position: 'relative', display: 'block' }}>
                          <div className="pack_wrap_2xjIs pack_vertical_ilL2U" style={{ width: 172, height: 96 }}>
                            <div className="pack_img_wrap_3sS_W" style={{ width: '100%', height: '100%' }}>
                              <img
                                className="pack_img_YJm41"
                                src={bullet.image}
                                alt=""
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                              />
                              {isActive ? (
                                <div className="bullet_active_2WZgk" />
                              ) : (
                                <div className="bullet_shadow_283GL" />
                              )}
                            </div>

                            {/* Badge */}
                            {bullet.badgeType && bullet.badgeText && (
                              <div className={`pack_mark_1hLkl ${
                                bullet.badgeType === 'vip' ? 'tag_YELLOW_3uzKD' :
                                bullet.badgeType === 'exclusive' ? 'tag_RED_2-nUp' :
                                bullet.badgeType === 'premiere' ? 'tag_BLUE_o8YDy' :
                                bullet.badgeType === 'free' ? 'tag_RED_2-nUp' :
                                bullet.badgeType === 'svip' ? 'tag_SVIP_COLORFUL_2rSkq' :
                                'tag_ad_XOHyW'
                              } null`}>
                                <span>{bullet.badgeText}</span>
                              </div>
                            )}

                            {/* Status */}
                            {bullet.statusText && (
                              <div className="newSummaryLeft_2WuF0 undefined">
                                <div className="newSummaryLeftText_22TVB">{bullet.statusText}</div>
                                <div className="newSummaryLeftSubTitle_3gXo1">{bullet.statusSub}</div>
                              </div>
                            )}

                            {/* Episode */}
                            {bullet.episodeText && (
                              <div className="lb_texts_wrap_1o6QN">
                                <span className="lb_texts_23IEZ">{bullet.episodeText}</span>
                              </div>
                            )}
                          </div>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="swiper_right_shadow_1Q1Dm" />
    </div>
  );
}
