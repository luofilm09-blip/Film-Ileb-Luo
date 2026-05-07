import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { navItems } from '../data/content';

export default function Sidebar() {
  const [location] = useLocation();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="leftnav_left_box">
      {/* FILM ILEB LUO Logo */}
      <Link href="/">
        <div className="leftnav_left_logo" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 48 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.1 }}>
            <span style={{ color: '#ff1a1a', fontSize: 9.5, fontWeight: 900, letterSpacing: '0.05em', fontFamily: '"Arial Black", Arial, sans-serif' }}>FILM</span>
            <span style={{ color: '#ff1a1a', fontSize: 9.5, fontWeight: 900, letterSpacing: '0.05em', fontFamily: '"Arial Black", Arial, sans-serif' }}>ILEB</span>
            <span style={{ color: '#ffffff', fontSize: 9.5, fontWeight: 900, letterSpacing: '0.05em', fontFamily: '"Arial Black", Arial, sans-serif' }}>LUO</span>
          </div>
        </div>
      </Link>

      <div className="leftnav_nav_box">
        <div className="leftnav_nav_content">
          <div className="leftnav_nav_inner">
            {navItems.map((item) => {
              const isActive = location === item.route || (item.route !== '/' && location.startsWith(item.route));
              const isHov = hovered === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.route}
                  className={`leftnav_link_item${isActive ? ' leftnav_current_item' : ''}`}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: isHov && !isActive ? 'rgba(255,255,255,0.04)' : undefined,
                    textDecoration: 'none',
                  }}
                >
                  <img
                    className="leftnav_leftnav_icon"
                    src={isActive ? item.iconActive : item.iconDefault}
                    alt={item.label}
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.25'; }}
                  />
                  <span className="leftnav_nav_mark">
                    <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: isActive ? 700 : 400 }}>{item.label}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
