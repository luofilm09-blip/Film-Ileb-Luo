import { navItems } from '../data/content';

export default function Sidebar() {
  return (
    <div className="leftnav_left_box">
      <div className="leftnav_left_logo">
        <img
          className="logo_logo_img"
          src="https://img.alicdn.com/imgextra/i1/O1CN01180Rqd1u3Lo8PdgSs_!!6000000005981-55-tps-213-72.svg"
          alt="优酷"
        />
      </div>
      <div className="leftnav_nav_box">
        <div className="leftnav_nav_content">
          <div className="leftnav_nav_inner">
            {navItems.map((item) => (
              <a
                key={item.id}
                href="#"
                className={`leftnav_link_item${item.active ? ' leftnav_current_item' : ''}`}
              >
                <img
                  className="leftnav_leftnav_icon"
                  src={item.active ? item.iconActive : item.iconDefault}
                  alt={item.label}
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
                />
                <span className="leftnav_nav_mark">
                  <span>{item.label}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
