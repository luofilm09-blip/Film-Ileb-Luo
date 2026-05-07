export type BadgeType = 'VIP' | 'SVIP' | 'exclusive' | 'premiere' | 'free' | null;
export type StatusType = 'hot' | 'new' | 'update' | null;

export interface VideoCard {
  id: string;
  title: string;
  subtitle: string;
  thumb: string;
  badge: BadgeType;
  category: string;
  episodeInfo: string;
  statusLabel?: string;
  statusSub?: string;
  rankLabel?: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  titleImg?: string;
  badge: BadgeType;
  category: string;
  episodeInfo: string;
  desc: string;
  rankLabel?: string;
}

export interface VideoSection {
  id: string;
  title: string;
  cards: VideoCard[];
}

const CDN = 'https://liangcang-material.alicdn.com/prod/upload/';

export const heroSlides: HeroSlide[] = [
  {
    id: '1',
    image: `${CDN}a85b39cef4874a34a7866ff3cae07868.webp.jpg`,
    badge: 'VIP',
    category: 'TV Series',
    episodeInfo: 'Ep 1-6 Available',
    desc: 'An epic historical adventure across vast landscapes and ancient seas',
    rankLabel: 'Drama Chart · TOP 1',
  },
  {
    id: '2',
    image: `${CDN}76ac53c450e446d6b2c2e52bb261eb4d.webp.jpg`,
    badge: 'VIP',
    category: 'Children',
    episodeInfo: '20 Episodes Complete',
    desc: 'Young heroes unite to find the star core fragments and save the Earth',
    rankLabel: "Children's Chart · TOP 1",
  },
  {
    id: '3',
    image: `${CDN}9d652fa479fe421f8ffadcc038ff1489.webp.jpg`,
    badge: 'exclusive',
    category: 'Anime',
    episodeInfo: 'Updated to Ep 20',
    desc: 'A brutal apocalyptic boy rewrites his fate by slaying gods',
    rankLabel: 'Anime Chart · TOP 2',
  },
  {
    id: '4',
    image: `${CDN}c59eade0e9ef43c8aebdc01d02eef080.webp.jpg`,
    badge: 'VIP',
    category: 'Documentary',
    episodeInfo: 'Updated to May 2nd',
    desc: 'Follow the footsteps of ancient poets across a thousand years of mountains and rivers',
    rankLabel: 'New Release',
  },
  {
    id: '5',
    image: `${CDN}10a2893f60014821af1de814f49a4407.webp.jpg`,
    badge: null,
    category: 'Variety',
    episodeInfo: 'New Season',
    desc: 'The most anticipated variety show returns with an all-new cast',
    rankLabel: 'Trending',
  },
];

export const hotRecommendations: VideoCard[] = [
  {
    id: 'h1',
    title: 'Secret Case Files',
    subtitle: 'Drama Chart · TOP 4',
    thumb: `${CDN}c25b56fe64bb4a2ba7be1e1f70d13a61.webp.jpg`,
    badge: 'exclusive',
    category: 'Drama',
    episodeInfo: 'Drama · 12 Eps Complete',
    statusLabel: 'Hot Chart',
    statusSub: 'TOP',
  },
  {
    id: 'h2',
    title: 'Golden Pass',
    subtitle: 'Drama Chart · TOP 3',
    thumb: `${CDN}23a2908103db41f5b57c1f15a84c5aef.webp.jpg`,
    badge: 'free',
    category: 'Drama',
    episodeInfo: 'Drama · Free Ep 17-18',
    statusLabel: 'Hot Chart',
    statusSub: 'TOP',
  },
  {
    id: 'h3',
    title: 'Fast Life 3',
    subtitle: 'Shen Teng & Yin Zheng race to the limit',
    thumb: `${CDN}31e59671e8b543c0a51624e9cfd83cce.webp.jpg`,
    badge: 'premiere',
    category: 'Movie',
    episodeInfo: 'Movie',
    statusLabel: 'New Release',
    statusSub: 'NEW',
  },
  {
    id: 'h4',
    title: 'Cang Yuan Tu',
    subtitle: 'Anime Chart · TOP 1',
    thumb: `${CDN}e898046028f24755819e499b69588e28.webp.jpg`,
    badge: 'exclusive',
    category: 'Anime',
    episodeInfo: 'Anime · Updated to Ep 75',
    statusLabel: 'Hot Chart',
    statusSub: 'TOP',
  },
  {
    id: 'h5',
    title: "Running Man Season 10",
    subtitle: 'The running family sets off anew',
    thumb: `${CDN}d2d82bd126014cc1bd5eafb7fc7c0217.webp.jpg`,
    badge: 'SVIP',
    category: 'Variety',
    episodeInfo: 'Variety · Updated to May 6',
    statusLabel: 'New Release',
    statusSub: 'NEW',
  },
  {
    id: 'h6',
    title: 'Beyond Time',
    subtitle: 'Anime Chart · TOP 2',
    thumb: `${CDN}81518d48c7154c04b4e4bde0f2e06223.webp.jpg`,
    badge: 'exclusive',
    category: 'Anime',
    episodeInfo: 'Anime · Updated to Ep 20',
    statusLabel: 'Hot Chart',
    statusSub: 'TOP',
  },
  {
    id: 'h7',
    title: 'Senior Brother',
    subtitle: 'Anime Chart · TOP 3',
    thumb: `${CDN}682fec7981b24c18b45897777cca715f.webp.jpg`,
    badge: 'exclusive',
    category: 'Anime',
    episodeInfo: 'Anime · Updated to Ep 140',
    statusLabel: 'Hot Chart',
    statusSub: 'TOP',
  },
  {
    id: 'h8',
    title: 'Star Voyage',
    subtitle: 'Sci-fi adventure across the galaxy',
    thumb: `${CDN}4bc7902373544a2eb55ba59c1bece4b2.webp.jpg`,
    badge: 'SVIP',
    category: 'Drama',
    episodeInfo: 'Drama · Updated',
    statusLabel: 'New Update',
    statusSub: 'NEW',
  },
];

export const ancientRomance: VideoCard[] = [
  {
    id: 'ar1',
    title: 'The Cool Young Hero',
    subtitle: 'Villain Senior Sister vs Cunning Junior Brother',
    thumb: 'https://m.ykimg.com/0527000061275FAB13F7FF094E5774FA?x-oss-process=image/resize,w_352/interlace,1/quality,Q_70',
    badge: null,
    category: 'Drama',
    episodeInfo: 'Drama · 25 Eps Complete',
  },
  {
    id: 'ar2',
    title: 'Eternal Night Bright',
    subtitle: 'Noble Lady & Mad National Master Cross Eras',
    thumb: `${CDN}de9c08940cb5442998da0b215c609277.webp.jpg`,
    badge: 'exclusive',
    category: 'Drama',
    episodeInfo: 'Drama · 30 Eps Complete',
  },
  {
    id: 'ar3',
    title: 'This Jianghu is Special',
    subtitle: 'Little Assassin Fake-Marries a Demon Lord',
    thumb: `${CDN}bbee6ed1c7554ace8dcb484a068912d4.webp.jpg`,
    badge: 'exclusive',
    category: 'Drama',
    episodeInfo: 'Drama · 28 Eps Complete',
  },
  {
    id: 'ar4',
    title: "Can't Hide My Heart",
    subtitle: 'Eunuch Lord Falls for the Little Immortal',
    thumb: `${CDN}218a4f3de16f4f23922f8e1057212b0a.webp.jpg`,
    badge: 'exclusive',
    category: 'Drama',
    episodeInfo: 'Drama · 24 Eps Complete',
  },
  {
    id: 'ar5',
    title: 'Farewell My Lord',
    subtitle: 'Beautiful Assassin Falls for Her Target',
    thumb: `${CDN}451c5cf196d24be6aa040ba1fe48d4ce.webp.jpg`,
    badge: 'exclusive',
    category: 'Drama',
    episodeInfo: 'Drama · 27 Eps Complete',
  },
  {
    id: 'ar6',
    title: 'Floating World Immortal',
    subtitle: 'A painful love story of mutual redemption',
    thumb: `${CDN}aaf265e8502c493cb96f5cbf8598e50c.webp.jpg`,
    badge: 'exclusive',
    category: 'Drama',
    episodeInfo: 'Drama · 24 Eps Complete',
  },
  {
    id: 'ar7',
    title: 'Shadow of the Palace',
    subtitle: 'Dark secrets beneath the palace walls',
    thumb: `${CDN}a83ded03a6464e5a8589f0462f54221c.webp.jpg`,
    badge: 'exclusive',
    category: 'Drama',
    episodeInfo: 'Drama · 36 Eps',
  },
  {
    id: 'ar8',
    title: 'Phoenix Rises Again',
    subtitle: 'Reborn into ancient times with modern wisdom',
    thumb: `${CDN}bbca5091fe854202815b.webp.jpg`,
    badge: 'VIP',
    category: 'Drama',
    episodeInfo: 'Drama · 40 Eps Complete',
  },
];

export const trendingMovies: VideoCard[] = [
  {
    id: 'm1',
    title: 'The Wandering Earth III',
    subtitle: 'Mankind builds the solar ark',
    thumb: `${CDN}76ac53c450e446d6b2c2e52bb261eb4d.webp.jpg`,
    badge: 'VIP',
    category: 'Movie',
    episodeInfo: 'Movie',
    statusLabel: 'Hot Chart',
    statusSub: 'TOP',
  },
  {
    id: 'm2',
    title: 'Nezha 3',
    subtitle: 'The lotus reborn faces destiny',
    thumb: `${CDN}9d652fa479fe421f8ffadcc038ff1489.webp.jpg`,
    badge: 'VIP',
    category: 'Anime Movie',
    episodeInfo: 'Movie',
    rankLabel: 'Box Office · TOP 1',
  },
  {
    id: 'm3',
    title: 'The Battle at Lake Changjin III',
    subtitle: 'The final chapter of the legendary war',
    thumb: `${CDN}c59eade0e9ef43c8aebdc01d02eef080.webp.jpg`,
    badge: 'premiere',
    category: 'Movie',
    episodeInfo: 'Movie',
    statusLabel: 'New Release',
    statusSub: 'NEW',
  },
  {
    id: 'm4',
    title: 'Detective Chinatown 4',
    subtitle: 'Global detective showdown in Paris',
    thumb: `${CDN}ca7f75754d2e475db6527da1443af0c5.webp.jpg`,
    badge: 'VIP',
    category: 'Movie',
    episodeInfo: 'Movie',
    statusLabel: 'Hot Chart',
    statusSub: 'TOP',
  },
  {
    id: 'm5',
    title: 'Born to Fly 2',
    subtitle: 'Eagles of the sky face new challenges',
    thumb: `${CDN}4bc7902373544a2eb55ba59c1bece4b2.webp.jpg`,
    badge: 'SVIP',
    category: 'Movie',
    episodeInfo: 'Movie',
    statusLabel: 'New Release',
    statusSub: 'NEW',
  },
  {
    id: 'm6',
    title: 'No More Bets 2',
    subtitle: 'The online fraud syndicate strikes again',
    thumb: `${CDN}d2d82bd126014cc1bd5eafb7fc7c0217.webp.jpg`,
    badge: 'exclusive',
    category: 'Movie',
    episodeInfo: 'Movie',
    rankLabel: 'Trending · TOP',
  },
  {
    id: 'm7',
    title: 'The Long Season 2',
    subtitle: 'A small town detective unravels a new mystery',
    thumb: `${CDN}e898046028f24755819e499b69588e28.webp.jpg`,
    badge: 'VIP',
    category: 'Movie',
    episodeInfo: 'Movie',
    statusLabel: 'Hot Chart',
    statusSub: 'TOP',
  },
];

export const varietyShows: VideoCard[] = [
  {
    id: 'v1',
    title: "Running Man Season 10",
    subtitle: 'All new cast, all new challenges',
    thumb: `${CDN}31e59671e8b543c0a51624e9cfd83cce.webp.jpg`,
    badge: 'SVIP',
    category: 'Variety',
    episodeInfo: 'Variety · Updated to May 6',
    statusLabel: 'New Release',
    statusSub: 'NEW',
  },
  {
    id: 'v2',
    title: 'The Voice of China 2025',
    subtitle: 'New season, new voices, new legends',
    thumb: `${CDN}23a2908103db41f5b57c1f15a84c5aef.webp.jpg`,
    badge: 'VIP',
    category: 'Variety',
    episodeInfo: 'Variety · Updated to Ep 8',
    rankLabel: 'Variety Chart · TOP 1',
  },
  {
    id: 'v3',
    title: 'Street Dance China Season 6',
    subtitle: 'The best crews battle for the crown',
    thumb: `${CDN}82a81b9e3e9f4e3a9c3d2e1f0b7a5c4d.webp.jpg`,
    badge: 'VIP',
    category: 'Variety',
    episodeInfo: 'Variety · Ep 1-4 Available',
    rankLabel: 'Trending',
  },
  {
    id: 'v4',
    title: 'The Mask Singer China',
    subtitle: 'Celebrities hide behind stunning masks',
    thumb: `${CDN}a85b39cef4874a34a7866ff3cae07868.webp.jpg`,
    badge: 'exclusive',
    category: 'Variety',
    episodeInfo: 'Variety · Updated to Ep 12',
    statusLabel: 'Hot Chart',
    statusSub: 'TOP',
  },
  {
    id: 'v5',
    title: 'Sisters Who Make Waves 4',
    subtitle: '30+ women compete for pop stardom',
    thumb: `${CDN}de9c08940cb5442998da0b215c609277.webp.jpg`,
    badge: 'VIP',
    category: 'Variety',
    episodeInfo: 'Variety · Updated',
    rankLabel: 'Variety Chart · TOP 2',
  },
  {
    id: 'v6',
    title: 'Youth With You 2025',
    subtitle: 'Training camp for the next generation of idols',
    thumb: `${CDN}bbee6ed1c7554ace8dcb484a068912d4.webp.jpg`,
    badge: 'SVIP',
    category: 'Variety',
    episodeInfo: 'Variety · New Season',
    statusLabel: 'New Release',
    statusSub: 'NEW',
  },
];

export const videoSections: VideoSection[] = [
  { id: 'hot', title: 'Hot Recommendations', cards: hotRecommendations },
  { id: 'ancient', title: 'Ancient Romance Dramas — So Addictive', cards: ancientRomance },
  { id: 'movies', title: 'Trending Movies', cards: trendingMovies },
  { id: 'variety', title: 'Popular Variety Shows', cards: varietyShows },
];

export const navItems = [
  { id: 'home', label: 'Home', icon: 'home', active: true },
  { id: 'drama', label: 'TV Series', icon: 'tv' },
  { id: 'anime', label: 'Anime', icon: 'play-circle' },
  { id: 'movie', label: 'Movies', icon: 'film' },
  { id: 'variety', label: 'Variety', icon: 'star' },
  { id: 'short', label: 'Short Drama', icon: 'layers' },
  { id: 'kids', label: 'Children', icon: 'smile' },
  { id: 'vip', label: 'VIP Center', icon: 'crown' },
  { id: 'doc', label: 'Documentary', icon: 'book-open' },
  { id: 'sports', label: 'Sports', icon: 'trophy' },
  { id: 'culture', label: 'Culture', icon: 'globe' },
  { id: 'live', label: 'Live', icon: 'radio' },
  { id: 'game', label: 'Games', icon: 'gamepad' },
  { id: 'learn', label: 'Learning', icon: 'graduation-cap' },
  { id: 'knowledge', label: 'Knowledge', icon: 'lightbulb' },
  { id: 'newfilm', label: 'New Films', icon: 'clapperboard' },
  { id: 'health', label: 'Health', icon: 'heart' },
];
