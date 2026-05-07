import { useState } from 'react';

export default function Header() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="topheader_top_header_box">
      <div className="topheader_left_box" />
      <div className="topheader_right_box">
        {/* Search */}
        <div className="search_search_box">
          <div className="search_search_box_wrap">
            <div className="search_search_input_box">
              <svg className="search_search_icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <div className="search_search_input_content">
                <input
                  className="search_search_input"
                  type="text"
                  placeholder="搜索优酷"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* VIP Button */}
        <div className="crmvip_vip_wrap">
          <a className="youku_vip_pay_btn" href="#">
            <img
              className="crmvip_vip_icon"
              src="https://gw.alicdn.com/imgextra/i2/O1CN01G2pBlc1jH83k0Uw4y_!!6000000004522-2-tps-72-72.png"
              alt="VIP"
            />
            <div className="crmvip_vip_pop_content">续费会员</div>
          </a>
        </div>

        {/* Filter */}
        <div className="filter_filter_box">
          <img
            className="filter_filter_img"
            src="https://img.alicdn.com/imgextra/i3/O1CN01E71iNM29PXJkAdEx1_!!6000000008060-2-tps-48-48.png"
            alt=""
          />
          <div className="filter_text">筛选</div>
        </div>

        {/* History */}
        <div className="historyrecord_record_box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <div className="historyrecord_text">历史</div>
        </div>

        {/* Client */}
        <div className="useiku_iku_box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          <div className="useiku_text">客户端</div>
        </div>

        {/* User */}
        <div className="crmusercenter_user_center_box">
          <div className="crmusercenter_avatar">
            <img
              src="https://img.alicdn.com/imgextra/i4/O1CN01sm6Pik1QpxWLtcGPd_!!6000000002026-2-tps-180-180.png"
              alt=""
            />
            <span>登录</span>
          </div>
        </div>
      </div>
    </div>
  );
}
