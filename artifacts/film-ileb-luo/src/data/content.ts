const CDN = 'https://liangcang-material.alicdn.com/prod/upload/';
const UED = 'https://liangcang-material.alicdn.com/prod/ued/upload/';
const YKIMG = 'http://ykimg.alicdn.com/develop/image/';

// Exact nav items with actual image icons from source HTML
export const navItems = [
  {
    id: 'home', label: '首页', active: true,
    iconActive: `${YKIMG}2025-05-09/3a748f0610739b60b50dd903dfd3571d.png`,
    iconDefault: `${YKIMG}2025-05-09/a141fd99c6be302b8c350cbae3927464.png`,
    spm: 'd_webhome',
  },
  {
    id: 'drama', label: '电视剧',
    iconActive: `${YKIMG}2025-05-13/24bbb0c6e5f93b840514f494a6aee34b.png`,
    iconDefault: `${YKIMG}2025-05-13/a22c4ca55750c22341c67d3c6d3efde8.png`,
  },
  {
    id: 'anime', label: '动漫',
    iconActive: `${YKIMG}2025-05-13/e6a5df93a9da99a479f74f772792c275.png`,
    iconDefault: `${YKIMG}2025-05-13/43e175be70ed52d2c47e016b7a3be4ba.png`,
  },
  {
    id: 'movie', label: '电影',
    iconActive: `${YKIMG}2025-05-13/d2aa4eb8adf691284e9a876a34c029c8.png`,
    iconDefault: `${YKIMG}2025-05-13/551a1f288b8576bd4051138604784070.png`,
  },
  {
    id: 'variety', label: '综艺',
    iconActive: `${YKIMG}2025-05-13/b23f403b49f6170947dc7ed2d2977a28.png`,
    iconDefault: `${YKIMG}2025-05-13/a13fd0b66ff7c18dd338694463ead315.png`,
  },
  {
    id: 'shortdrama', label: '短剧',
    iconActive: `${YKIMG}2025-05-13/94fc652eeb0d9f94a9a46cccceb4a299.png`,
    iconDefault: `${YKIMG}2025-05-13/4ed993cf0ae463885d24780192a5cb52.png`,
  },
  {
    id: 'kids', label: '少儿',
    iconActive: `${YKIMG}2025-05-13/878a9a801977979eaa8a556809dc215e.png`,
    iconDefault: `${YKIMG}2025-05-13/8c1e4ed8c96c1d5da8c0d0163e1fe414.png`,
  },
  {
    id: 'vip', label: '会员中心',
    iconActive: 'https://gw.alicdn.com/imgextra/i4/O1CN01z6IRyQ1oD4dWmgzRG_!!6000000005190-55-tps-60-60.svg',
    iconDefault: 'https://gw.alicdn.com/imgextra/i1/O1CN01DvcsDX1eesWX1x3l3_!!6000000003897-55-tps-60-60.svg',
  },
  {
    id: 'doc', label: '纪录片',
    iconActive: `${YKIMG}2025-05-13/880e84f4465732acfef7f726b6c4c48a.png`,
    iconDefault: `${YKIMG}2025-05-13/412b0c10e68ff5cde08a557cd56b3c88.png`,
  },
  {
    id: 'sports', label: '体育',
    iconActive: `${YKIMG}2025-05-13/f714343c4dd8611bc0f3c021adf52a63.png`,
    iconDefault: `${YKIMG}2025-05-13/e6a206a320270f68b9e4c0c615099124.png`,
  },
  {
    id: 'culture', label: '人文',
    iconActive: `${YKIMG}2025-05-13/f005572f78c65637b1078d7e263cbdc3.png`,
    iconDefault: `${YKIMG}2025-05-13/dc708f62a7c08982a2a7f454bbbe6d93.png`,
  },
  {
    id: 'live', label: '直播',
    iconActive: `${YKIMG}2025-05-13/31a0304e88769bbb223d3545718b6a69.png`,
    iconDefault: `${YKIMG}2025-05-13/d6e2d17e0ff28b7791bf59f0e6cbf03b.png`,
  },
  {
    id: 'game', label: '游戏',
    iconActive: `${YKIMG}2025-05-13/8c741db30d0b7984181e27b1463e2021.png`,
    iconDefault: `${YKIMG}2025-05-13/cf04f14f3dd143c9fde1d70a73d09776.png`,
  },
  {
    id: 'learn', label: '乐学',
    iconActive: `${YKIMG}2026-02-28/6cf20ba955972696163f24548ccf4ca4.png`,
    iconDefault: `${YKIMG}2026-02-28/bfe0544b918217e60d162f2e1eb4c89d.png`,
  },
  {
    id: 'knowledge', label: '新知',
    iconActive: `${YKIMG}2025-05-13/31cb63b7769e6906c38e37626c71adca.png`,
    iconDefault: `${YKIMG}2025-05-13/297f8d877e4b1592860a7ffb9074efdc.png`,
  },
  {
    id: 'newfilm', label: '新片',
    iconActive: `${YKIMG}2025-05-13/aa11f35a44c8deae94a3bf4e8286acf9.png`,
    iconDefault: `${YKIMG}2025-05-13/ceb0b251924972178499c425b0e662e5.png`,
  },
  {
    id: 'playcenter', label: '页游中心',
    iconActive: `${YKIMG}2025-06-18/13105791c889d48c36228704fb17a615.png`,
    iconDefault: `${YKIMG}2025-06-18/21ab9a789ccc4f3657c5d43f37995201.png`,
  },
  {
    id: 'health', label: '健康',
    iconActive: `${YKIMG}2026-02-26/74949aabdf8beced0c40d257c08bb861.png`,
    iconDefault: `${YKIMG}2026-02-26/42cf872bb32da025a2ff168f717a06b4.png`,
  },
  {
    id: 'public', label: '公益',
    iconActive: `${YKIMG}2025-05-13/8eafb948d84976d69d8bc4639f43cf87.png`,
    iconDefault: `${YKIMG}2025-05-13/bc648c2c282ec6232cbb84cf954d6b80.png`,
  },
  {
    id: 'accessible', label: '无障碍',
    iconActive: `${YKIMG}2025-05-13/a116b4e6381bd3f59aaadd3efccf981d.png`,
    iconDefault: `${YKIMG}2025-05-13/f0a959130d704c43c83988e4e2974cbe.png`,
  },
];

// Carousel slides from source HTML
export interface SwiperSlide {
  id: string;
  image: string;
  isAd?: boolean;
  titleArtUrl?: string;
  titleArtStyle?: 'horizontal_big' | 'horizontal' | 'square';
  titleText?: string;
  tags: Array<{ type: 'vip' | 'exclusive' | 'generic' | 'ad'; text: string }>;
  desc?: string;
}

export const swiperSlides: SwiperSlide[] = [
  {
    id: '0',
    image: `${CDN}a85b39cef4874a34a7866ff3cae07868.webp.jpg`,
    titleArtUrl: `${UED}1773827432460-5e84d543-edc0-4781-9fc5-9241c53c8d89.png`,
    titleArtStyle: 'horizontal_big',
    tags: [
      { type: 'vip', text: 'VIP' },
      { type: 'generic', text: '综艺' },
      { type: 'generic', text: '更新至05-07期' },
    ],
    desc: '浙江卫视观察类真人秀，以"爸气回归"为主题，探讨育儿责任、亲子沟通与家庭关系相关议题。',
  },
  {
    id: '1',
    image: 'https://acg.youku.com/webfile/jbtbrSptSW1UUTAhpY0DsKhBKBJNxMMG.jpg',
    isAd: true,
    titleText: '零氪轻松霸服！一刀秒全图',
    tags: [{ type: 'ad', text: '广告' }],
  },
  {
    id: '2',
    image: `${CDN}e4e85e60f6a242c09b801c37ebbdbb52.webp.jpg`,
    titleArtUrl: `${UED}1773138738080-98faed5b-ba9c-48b4-ba54-7246c65997ef.png`,
    titleArtStyle: 'square',
    tags: [
      { type: 'exclusive', text: '独播' },
      { type: 'generic', text: '综艺' },
      { type: 'generic', text: '更新至05-04期' },
    ],
    desc: '《无限超越班》王牌监制团将带领无限艺员开启职场实战，用演技一较高下，用实力书写命运！',
  },
  {
    id: '3',
    image: 'https://acg.youku.com/webfile/tWQojpZ3hccDt4rOuWXEC925zakHowXD.jpg',
    isAd: true,
    titleText: '跨服追杀爆光装备，兄弟全服通缉',
    tags: [{ type: 'ad', text: '广告' }],
  },
  {
    id: '4',
    image: `${CDN}092e3dd582fe420893e63955039704c5.webp.jpg`,
    titleArtUrl: `${UED}1776391768484-bcd51896-acad-4a77-84e2-933e1a8ecaa7.png`,
    titleArtStyle: 'horizontal',
    tags: [
      { type: 'vip', text: 'VIP' },
      { type: 'generic', text: '剧' },
      { type: 'generic', text: '更新至05-06集' },
    ],
    desc: '藏海传主演肖战、辛芷蕾，两人横跨山川，共赴情海，再现千古绝恋。',
  },
  {
    id: '5',
    image: `${CDN}81518d48c7154c04b4e4bde0f2e06223.webp.jpg`,
    titleArtUrl: `${UED}1776134936055-f13e9816-8d3e-4eb2-8867-389a1f369fad.png`,
    titleArtStyle: 'square',
    tags: [
      { type: 'exclusive', text: '独播' },
      { type: 'generic', text: '动漫' },
      { type: 'generic', text: '更新至20话' },
    ],
    desc: '末世残酷少年为了复仇踏上了弑神之路，在这注定悲剧的命运中逆流而上！',
  },
  {
    id: '6',
    image: `${CDN}76ac53c450e446d6b2c2e52bb261eb4d.webp.jpg`,
    titleArtUrl: `${UED}1776755088110-55fbd116-e650-44c5-b5f0-a9cfc0c73b85.png`,
    titleArtStyle: 'horizontal',
    tags: [
      { type: 'vip', text: 'VIP' },
      { type: 'generic', text: '少儿' },
      { type: 'generic', text: '20集全' },
    ],
    desc: '孩子们拼尽全力寻找星核，踏上拯救地球的冒险之旅！',
  },
  {
    id: '7',
    image: `${CDN}8c9490411498480fa932f83bfe57cdaa.webp.jpg`,
    tags: [],
    desc: '',
  },
  {
    id: '8',
    image: `${CDN}11803d8ae3d64090b3ef99c6b725b28e.webp.jpg`,
    titleArtUrl: `${UED}1776678261100-e7c3b190-56c7-4a4e-ad52-ef9a2489ae8f.png`,
    titleArtStyle: 'horizontal_big',
    tags: [
      { type: 'vip', text: 'VIP' },
      { type: 'generic', text: '纪录片' },
      { type: 'generic', text: '更新至05-02期' },
    ],
    desc: '跟随诗人的脚步穿越千年山河，与西川、鲁大东等文化名人共赏唐诗里的风景！',
  },
  {
    id: '9',
    image: `${CDN}965fa67023364601ab3421248e940344.webp.jpg`,
    titleArtUrl: `${UED}1776134936055-f13e9816-8d3e-4eb2-8867-389a1f369fad.png`,
    titleArtStyle: 'square',
    tags: [
      { type: 'vip', text: 'VIP' },
      { type: 'generic', text: '少儿' },
      { type: 'generic', text: '更新至14期' },
    ],
    desc: '适合6岁以下观看｜优米陪伴快乐成长故事',
  },
  {
    id: '10',
    image: `${CDN}03c45975db904e2ab4a7b7124a99a3b8.webp.jpg`,
    tags: [
      { type: 'generic', text: '少儿' },
      { type: 'generic', text: '更新至29期' },
    ],
    desc: '适合3-9岁观看｜速度与智慧的极限对决',
  },
];

// Bullet/pagination cards (from custom_pagination_wrap in source)
export interface BulletCard {
  id: string;
  slideIndex: number;
  image: string;
  badgeType?: 'vip' | 'exclusive' | 'premiere' | 'free' | 'svip' | 'ad' | null;
  badgeText?: string;
  statusText?: string;
  statusSub?: string;
  episodeText?: string;
  isActive?: boolean;
}

export const bulletCards: BulletCard[] = [
  { id: 'b0', slideIndex: 0, image: `${CDN}a0b877dff7fb4cf8aaba78fdd432085f.webp.jpg`, badgeType: 'vip', badgeText: 'VIP', statusText: '有更新', statusSub: 'NEW', episodeText: '综・更新至05-07期', isActive: true },
  { id: 'b1', slideIndex: 1, image: 'https://acg.youku.com/webfile/bQ0vwBeFHhFD0v5DOGSSVC15LUP5CYlt.jpg', badgeType: 'ad', badgeText: '广告' },
  { id: 'b2', slideIndex: 2, image: `${CDN}9d652fa479fe421f8ffadcc038ff1489.webp.jpg`, badgeType: 'exclusive', badgeText: '独播', episodeText: '综・更新至05-04期' },
  { id: 'b3', slideIndex: 3, image: 'https://acg.youku.com/webfile/tWQojpZ3hccDt4rOuWXEC925zakHowXD.jpg', badgeType: 'ad', badgeText: '广告' },
  { id: 'b4', slideIndex: 4, image: `${CDN}092e3dd582fe420893e63955039704c5.webp.jpg`, badgeType: 'vip', badgeText: 'VIP', episodeText: '剧・更新至05-06集' },
  { id: 'b5', slideIndex: 5, image: `${CDN}81518d48c7154c04b4e4bde0f2e06223.webp.jpg`, badgeType: 'exclusive', badgeText: '独播', statusText: '热度榜', statusSub: 'TOP', episodeText: '漫・更新至20话' },
  { id: 'b6', slideIndex: 6, image: `${CDN}76ac53c450e446d6b2c2e52bb261eb4d.webp.jpg`, badgeType: 'vip', badgeText: 'VIP', episodeText: '少儿・20集全' },
  { id: 'b7', slideIndex: 7, image: `${CDN}10a2893f60014821af1de814f49a4407.webp.jpg` },
  { id: 'b8', slideIndex: 8, image: `${CDN}00bc140c299e4adb9614b94626ee0961.webp.jpg` },
  { id: 'b9', slideIndex: 9, image: `${CDN}c59eade0e9ef43c8aebdc01d02eef080.webp.jpg`, badgeType: 'vip', badgeText: 'VIP', statusText: '新上线', statusSub: 'NEW', episodeText: '纪・更新至05-02期' },
  { id: 'b10', slideIndex: 10, image: `${CDN}ca7f75754d2e475db6527da1443af0c5.webp.jpg`, badgeType: 'vip', badgeText: 'VIP', episodeText: '少儿・更新至14期' },
  { id: 'b11', slideIndex: 11, image: `${CDN}4bc7902373544a2eb55ba59c1bece4b2.webp.jpg`, badgeType: 'svip', badgeText: 'SVIP', statusText: '有更新', statusSub: 'NEW', episodeText: '少儿・更新至29期' },
];

// Feed section cards
export interface FeedCard {
  id: string;
  image: string;
  badgeClass?: string;
  badgeText?: string;
  statusText?: string;
  statusSub?: string;
  episodeText: string;
  title: string;
  subtitle: string;
}

// "猜你在追" section
export const guessFollowingCards: FeedCard[] = [
  { id: 'f1', image: `${CDN}6d4dc8fa48c04df88294f82b10d002ea.webp.jpg`, badgeClass: 'tag_RED_2-nUp', badgeText: '限免中', statusText: '有更新', statusSub: 'NEW', episodeText: '剧・限免09-10集', title: '藏海传', subtitle: '肖战辛芷蕾千古绝恋' },
  { id: 'f2', image: `${CDN}c25b56fe64bb4a2ba7be1e1f70d13a61.webp.jpg`, badgeClass: 'tag_RED_2-nUp', badgeText: '独播', statusText: '热度榜', statusSub: 'TOP', episodeText: '剧・12集全', title: '重案解密', subtitle: '电视剧热度榜·TOP4' },
  { id: 'f3', image: `${CDN}23a2908103db41f5b57c1f15a84c5aef.webp.jpg`, badgeClass: 'tag_RED_2-nUp', badgeText: '限免中', statusText: '热度榜', statusSub: 'TOP', episodeText: '剧・限免17-18集', title: '金关', subtitle: '电视剧热度榜·TOP3' },
  { id: 'f4', image: `${CDN}31e59671e8b543c0a51624e9cfd83cce.webp.jpg`, badgeClass: 'tag_BLUE_o8YDy', badgeText: '首播', statusText: '新上线', statusSub: 'NEW', episodeText: '影', title: '飞驰人生3', subtitle: '沈腾尹正热血共赴极限征程' },
  { id: 'f5', image: `${CDN}e898046028f24755819e499b69588e28.webp.jpg`, badgeClass: 'tag_RED_2-nUp', badgeText: '独播', statusText: '热度榜', statusSub: 'TOP', episodeText: '漫・更新至75话', title: '沧元图', subtitle: '动漫热度榜·TOP1' },
  { id: 'f6', image: `${CDN}d2d82bd126014cc1bd5eafb7fc7c0217.webp.jpg`, badgeClass: 'tag_SVIP_COLORFUL_2rSkq', badgeText: 'SVIP', statusText: '新上线', statusSub: 'NEW', episodeText: '综・更新至05-06期', title: '奔跑吧 第十季', subtitle: '奔跑家族集结全新出发' },
  { id: 'f7', image: `${CDN}81518d48c7154c04b4e4bde0f2e06223.webp.jpg`, badgeClass: 'tag_RED_2-nUp', badgeText: '独播', statusText: '热度榜', statusSub: 'TOP', episodeText: '漫・更新至20话', title: '光阴之外', subtitle: '动漫热度榜·TOP2' },
  { id: 'f8', image: `${CDN}682fec7981b24c18b45897777cca715f.webp.jpg`, badgeClass: 'tag_RED_2-nUp', badgeText: '独播', statusText: '热度榜', statusSub: 'TOP', episodeText: '漫・更新至140话', title: '师兄啊师兄', subtitle: '动漫热度榜·TOP3' },
];

// "古风恋爱剧，原来这么上头" section
export const ancientRomanceCards: FeedCard[] = [
  { id: 'ar1', image: 'https://m.ykimg.com/0527000061275FAB13F7FF094E5774FA', badgeClass: '', badgeText: '', episodeText: '剧・25集全', title: '这个少侠有点冷', subtitle: '反派大师姐vs腹黑小师弟' },
  { id: 'ar2', image: `${CDN}de9c08940cb5442998da0b215c609277.webp.jpg`, badgeClass: 'tag_RED_2-nUp', badgeText: '独播', episodeText: '剧・30集全', title: '永夜长明', subtitle: '贵女携癫狂国师乱世溯爱' },
  { id: 'ar3', image: `${CDN}bbee6ed1c7554ace8dcb484a068912d4.webp.jpg`, badgeClass: 'tag_RED_2-nUp', badgeText: '独播', episodeText: '剧・28集全', title: '这个江湖不一般', subtitle: '小刺客假嫁魔头相爱相杀' },
  { id: 'ar4', image: `${CDN}218a4f3de16f4f23922f8e1057212b0a.webp.jpg`, badgeClass: 'tag_RED_2-nUp', badgeText: '独播', episodeText: '剧・24集全', title: '君心藏不住', subtitle: '督公千岁情陷小仙姑' },
  { id: 'ar5', image: `${CDN}451c5cf196d24be6aa040ba1fe48d4ce.webp.jpg`, badgeClass: 'tag_RED_2-nUp', badgeText: '独播', episodeText: '剧・27集全', title: '与君诀', subtitle: '美人杀手爱上刺杀对象' },
  { id: 'ar6', image: `${CDN}aaf265e8502c493cb96f5cbf8598e50c.webp.jpg`, badgeClass: 'tag_RED_2-nUp', badgeText: '独播', episodeText: '剧・24集全', title: '浮世仙衣不染尘', subtitle: '虐恋情深相互救赎之路' },
  { id: 'ar7', image: `${CDN}a83ded03a6464e5a8589f0462f54221c.webp.jpg`, badgeClass: 'tag_RED_2-nUp', badgeText: '独播', episodeText: '剧・36集', title: '长夜烬明', subtitle: '暗夜里的爱恋与救赎' },
  { id: 'ar8', image: `${CDN}092e3dd582fe420893e63955039704c5.webp.jpg`, badgeClass: 'tag_YELLOW_3uzKD', badgeText: 'VIP', episodeText: '剧・40集全', title: '凤归巢', subtitle: '凤凰涅槃再次归来' },
];
