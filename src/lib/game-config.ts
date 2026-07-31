// ═══════════════════════════════════════════════════════════════════════
// game-config.ts — All game data configuration
// Tiers, rewards, chip packs, challenges, season pass, HOF, championships
// ═══════════════════════════════════════════════════════════════════════

// ─── Arena Tier Schema ───────────────────────────────────────────────
// id, name, buyIn, bots, xpMultiplier, mapRadius, maxFood, maxStars,
// difficulty, commissionRate, starChipValue, foodValue

/** 30 competitive online arena tiers (10c → 1B buy-in) */
export const ARENA_TIERS = [
  // ── Beginner (1-6) ──
  { id:'tier-1',  name:'Scrap Alley',      buyIn:10,         bots:25, xpMultiplier:1.0, mapRadius:3000, maxFood:400, maxStars:5,  difficulty:'Beginner',    commissionRate:0.35, starChipValue:2,   foodValue:1 },
  { id:'tier-2',  name:'Rust Market',      buyIn:20,         bots:25, xpMultiplier:1.1, mapRadius:3000, maxFood:400, maxStars:5,  difficulty:'Beginner',    commissionRate:0.35, starChipValue:3,   foodValue:1 },
  { id:'tier-3',  name:'Copper Lane',      buyIn:40,         bots:25, xpMultiplier:1.2, mapRadius:3100, maxFood:420, maxStars:6,  difficulty:'Beginner',    commissionRate:0.35, starChipValue:4,   foodValue:1 },
  { id:'tier-4',  name:'Neon Grid',        buyIn:75,         bots:28, xpMultiplier:1.5, mapRadius:3100, maxFood:420, maxStars:6,  difficulty:'Beginner',    commissionRate:0.35, starChipValue:5,   foodValue:1 },
  { id:'tier-5',  name:'Iron District',    buyIn:150,        bots:28, xpMultiplier:1.8, mapRadius:3200, maxFood:450, maxStars:7,  difficulty:'Beginner',    commissionRate:0.35, starChipValue:8,   foodValue:2 },
  { id:'tier-6',  name:'Bronze Arena',     buyIn:300,        bots:30, xpMultiplier:2.0, mapRadius:3200, maxFood:450, maxStars:7,  difficulty:'Beginner',    commissionRate:0.35, starChipValue:10,  foodValue:2 },
  // ── Medium (7-12) ──
  { id:'tier-7',  name:'Silver Strip',     buyIn:500,        bots:30, xpMultiplier:2.5, mapRadius:3300, maxFood:480, maxStars:8,  difficulty:'Medium',      commissionRate:0.35, starChipValue:15,  foodValue:2 },
  { id:'tier-8',  name:'Jade Corridor',    buyIn:1000,       bots:32, xpMultiplier:3.0, mapRadius:3300, maxFood:480, maxStars:8,  difficulty:'Medium',      commissionRate:0.35, starChipValue:25,  foodValue:3 },
  { id:'tier-9',  name:'Amber Crossing',   buyIn:2000,       bots:32, xpMultiplier:3.5, mapRadius:3400, maxFood:500, maxStars:9,  difficulty:'Medium',      commissionRate:0.35, starChipValue:40,  foodValue:3 },
  { id:'tier-10', name:'Gold Quarter',     buyIn:4000,       bots:35, xpMultiplier:4.5, mapRadius:3400, maxFood:520, maxStars:10, difficulty:'Medium',      commissionRate:0.35, starChipValue:60,  foodValue:4 },
  { id:'tier-11', name:'Ruby Den',         buyIn:7500,       bots:35, xpMultiplier:5.5, mapRadius:3500, maxFood:520, maxStars:10, difficulty:'Medium',      commissionRate:0.35, starChipValue:90,  foodValue:4 },
  { id:'tier-12', name:'Sapphire Hall',    buyIn:15000,      bots:38, xpMultiplier:7.0, mapRadius:3500, maxFood:550, maxStars:12, difficulty:'Medium',      commissionRate:0.35, starChipValue:130, foodValue:5 },
  // ── High Stakes (13-18) ──
  { id:'tier-13', name:'Viper Pit',        buyIn:30000,      bots:38, xpMultiplier:8.0, mapRadius:3600, maxFood:550, maxStars:12, difficulty:'High Stakes', commissionRate:0.35, starChipValue:200, foodValue:6 },
  { id:'tier-14', name:'Championship Hub', buyIn:50000,      bots:40, xpMultiplier:10.0,mapRadius:3600, maxFood:580, maxStars:14, difficulty:'High Stakes', commissionRate:0.35, starChipValue:300, foodValue:7 },
  { id:'tier-15', name:'Emerald Court',    buyIn:100000,     bots:40, xpMultiplier:12.0,mapRadius:3800, maxFood:580, maxStars:14, difficulty:'High Stakes', commissionRate:0.35, starChipValue:500, foodValue:8 },
  { id:'tier-16', name:'Diamond Nexus',    buyIn:200000,     bots:42, xpMultiplier:15.0,mapRadius:3800, maxFood:600, maxStars:15, difficulty:'High Stakes', commissionRate:0.35, starChipValue:800, foodValue:10 },
  { id:'tier-17', name:'Apex Vault',       buyIn:350000,     bots:42, xpMultiplier:18.0,mapRadius:4000, maxFood:620, maxStars:16, difficulty:'High Stakes', commissionRate:0.35, starChipValue:1200,foodValue:12 },
  { id:'tier-18', name:'Obsidian Core',    buyIn:750000,     bots:45, xpMultiplier:22.0,mapRadius:4000, maxFood:650, maxStars:18, difficulty:'High Stakes', commissionRate:0.35, starChipValue:2000,foodValue:15 },
  // ── Extreme (19-24) ──
  { id:'tier-19', name:'Crimson Abyss',    buyIn:1500000,    bots:48, xpMultiplier:28.0,mapRadius:4200, maxFood:680, maxStars:18, difficulty:'Extreme',     commissionRate:0.35, starChipValue:3500,foodValue:20 },
  { id:'tier-20', name:'Shadow Realm',     buyIn:3000000,    bots:48, xpMultiplier:32.0,mapRadius:4200, maxFood:700, maxStars:20, difficulty:'Extreme',     commissionRate:0.35, starChipValue:6000,foodValue:25 },
  { id:'tier-21', name:'Void Station',     buyIn:5000000,    bots:50, xpMultiplier:38.0,mapRadius:4500, maxFood:720, maxStars:20, difficulty:'Extreme',     commissionRate:0.35, starChipValue:10000,foodValue:30 },
  { id:'tier-22', name:'Phantom Reach',    buyIn:10000000,   bots:52, xpMultiplier:45.0,mapRadius:4500, maxFood:750, maxStars:22, difficulty:'Extreme',     commissionRate:0.35, starChipValue:18000,foodValue:40 },
  { id:'tier-23', name:'Inferno Gate',     buyIn:20000000,   bots:55, xpMultiplier:52.0,mapRadius:4800, maxFood:780, maxStars:24, difficulty:'Extreme',     commissionRate:0.35, starChipValue:30000,foodValue:50 },
  { id:'tier-24', name:'Tartarus Pit',     buyIn:40000000,   bots:55, xpMultiplier:60.0,mapRadius:4800, maxFood:800, maxStars:25, difficulty:'Extreme',     commissionRate:0.35, starChipValue:50000,foodValue:65 },
  // ── Legendary (25-30) ──
  { id:'tier-25', name:'Venom Grand',      buyIn:75000000,   bots:58, xpMultiplier:70.0,mapRadius:5000, maxFood:850, maxStars:28, difficulty:'Legendary',   commissionRate:0.35, starChipValue:80000,foodValue:80 },
  { id:'tier-26', name:'Omega Station',    buyIn:150000000,  bots:58, xpMultiplier:80.0,mapRadius:5000, maxFood:880, maxStars:30, difficulty:'Legendary',   commissionRate:0.35, starChipValue:120000,foodValue:100 },
  { id:'tier-27', name:'Singularity Core', buyIn:300000000,  bots:60, xpMultiplier:90.0,mapRadius:5500, maxFood:900, maxStars:32, difficulty:'Legendary',   commissionRate:0.35, starChipValue:200000,foodValue:130 },
  { id:'tier-28', name:'Eternity Vault',   buyIn:500000000,  bots:60, xpMultiplier:100.0,mapRadius:5500, maxFood:950, maxStars:35, difficulty:'Legendary',   commissionRate:0.35, starChipValue:350000,foodValue:160 },
  { id:'tier-29', name:'Abyssal Throne',   buyIn:750000000,  bots:60, xpMultiplier:120.0,mapRadius:6000, maxFood:1000,maxStars:38, difficulty:'Legendary',   commissionRate:0.35, starChipValue:500000,foodValue:200 },
  { id:'tier-30', name:'The Singularity',  buyIn:1000000000, bots:60, xpMultiplier:150.0,mapRadius:6000, maxFood:1100,maxStars:40, difficulty:'Legendary',   commissionRate:0.35, starChipValue:750000,foodValue:250 },
] as const;

/** 3 free practice arenas — no buy-in, 1000 bots, no XP */
export const PRACTICE_TIERS = [
  { id:'practice-easy',   name:'Practice Pit',     buyIn:0, bots:1000, xpMultiplier:0, mapRadius:4000, maxFood:1200, maxStars:10, difficulty:'Beginner',    commissionRate:0, starChipValue:1, foodValue:1 },
  { id:'practice-medium', name:'Training Grounds',  buyIn:0, bots:1000, xpMultiplier:0, mapRadius:4000, maxFood:1200, maxStars:10, difficulty:'Medium',      commissionRate:0, starChipValue:1, foodValue:1 },
  { id:'practice-hard',   name:'Proving Grounds',   buyIn:0, bots:1000, xpMultiplier:0, mapRadius:4000, maxFood:1200, maxStars:10, difficulty:'High Stakes', commissionRate:0, starChipValue:1, foodValue:1 },
] as const;

/** Combined arenas for lookup helpers */
export const ALL_ARENAS = [...ARENA_TIERS, ...PRACTICE_TIERS] as const;

// ─── Daily Rewards (7-Day Cycle) ─────────────────────────────────────

/** Chip amounts per day in the 7-day claim cycle */
export const DAILY_REWARDS = [
  { day: 1, chips: 10 },
  { day: 2, chips: 20 },
  { day: 3, chips: 50 },
  { day: 4, chips: 100 },
  { day: 5, chips: 250 },
  { day: 6, chips: 500 },
  { day: 7, chips: 1000 },
] as const;

// ─── Chip Store Packs (10 Packs) ─────────────────────────────────────

/** 10 purchasable chip packs with INR/USD pricing and bonus % */
export const CHIP_PACKS = [
  { id:'pack-10',    name:'Starter Pack',             chips:1000,     priceINR:10,    priceUSD:0.12,  bonusPercent:0 },
  { id:'pack-50',    name:'Scout Bundle',             chips:5100,     priceINR:50,    priceUSD:0.60,  bonusPercent:2 },
  { id:'pack-100',   name:'Contender Sack',           chips:10500,    priceINR:100,   priceUSD:1.20,  bonusPercent:5 },
  { id:'pack-250',   name:'Gladiator Chest',          chips:27500,    priceINR:250,   priceUSD:3.00,  bonusPercent:10 },
  { id:'pack-500',   name:'High Roller Vault',        chips:57500,    priceINR:500,   priceUSD:6.00,  bonusPercent:15 },
  { id:'pack-1000',  name:'Championship Crate',       chips:120000,   priceINR:1000,  priceUSD:12.00, bonusPercent:20 },
  { id:'pack-2500',  name:'Syndicate Treasury',       chips:325000,   priceINR:2500,  priceUSD:30.00, bonusPercent:30 },
  { id:'pack-5000',  name:'National Titan Coffer',    chips:700000,   priceINR:5000,  priceUSD:60.00, bonusPercent:40 },
  { id:'pack-10000', name:'World Champion Trove',     chips:1500000,  priceINR:10000, priceUSD:120.00,bonusPercent:50 },
  { id:'pack-15000', name:'MAX ANNUAL CAP PACK',      chips:2500000,  priceINR:15000, priceUSD:175.00,bonusPercent:66.67 },
] as const;

// ─── Challenge Templates ─────────────────────────────────────────────

/** Daily challenge templates (randomly selected, 3 per day) */
export const DAILY_CHALLENGES = [
  { id:'dc-1', type:'kills',      description:'Eliminate {target} snakes',            target:5,   xpReward:50,   chipReward:25,   tier:'Novice' },
  { id:'dc-2', type:'extracts',   description:'Extract with chips {target} times',   target:2,   xpReward:60,   chipReward:30,   tier:'Novice' },
  { id:'dc-3', type:'stars',      description:'Collect {target} star chips',          target:10,  xpReward:40,   chipReward:20,   tier:'Novice' },
  { id:'dc-4', type:'score',      description:'Reach body length {target}',           target:50,  xpReward:80,   chipReward:40,   tier:'Operative' },
  { id:'dc-5', type:'entries',    description:'Enter {target} arenas',                 target:3,   xpReward:45,   chipReward:20,   tier:'Novice' },
  { id:'dc-6', type:'survival',   description:'Survive for {target} seconds',         target:120, xpReward:70,   chipReward:35,   tier:'Operative' },
  { id:'dc-7', type:'kills',      description:'Eliminate {target} snakes',            target:10,  xpReward:100,  chipReward:60,   tier:'Veteran' },
  { id:'dc-8', type:'extracts',   description:'Extract with chips {target} times',   target:5,   xpReward:120,  chipReward:80,   tier:'Veteran' },
  { id:'dc-9', type:'score',      description:'Reach body length {target}',           target:100, xpReward:150,  chipReward:100,  tier:'Elite' },
  { id:'dc-10',type:'kills',      description:'Eliminate {target} snakes',            target:20,  xpReward:200,  chipReward:150,  tier:'Elite' },
] as const;

/** Weekly challenge templates (randomly selected, 2 per week) */
export const WEEKLY_CHALLENGES = [
  { id:'wc-1', type:'kills',      description:'Eliminate {target} snakes this week',        target:30,  xpReward:300,  chipReward:200,  tier:'Veteran' },
  { id:'wc-2', type:'extracts',   description:'Extract {target} times this week',         target:10,  xpReward:350,  chipReward:250,  tier:'Veteran' },
  { id:'wc-3', type:'stars',      description:'Collect {target} star chips this week',     target:50,  xpReward:400,  chipReward:300,  tier:'Elite' },
  { id:'wc-4', type:'chips',      description:'Bank {target} total chips this week',       target:50000,xpReward:500,  chipReward:400,  tier:'Elite' },
  { id:'wc-5', type:'survival',   description:'Survive {target} seconds total this week', target:600, xpReward:450,  chipReward:350,  tier:'Veteran' },
] as const;

// ─── Season Pass (20 Tiers) ───────────────────────────────────────────

/** Cost to unlock the Elite Cyber Pass (in banked chips) */
export const ELITE_PASS_COST = 100_000;

/** 20 season pass tiers with free + elite cosmetic rewards */
export const SEASON_PASS_TIERS = [
  { tier:1,  xp:1000, free:{ title:'Neon Viper Badge',          category:'Badge',         icon:'🏷️' }, elite:{ title:'Cyber Serpent God Skin',  category:'DNA Skin',      icon:'👑' } },
  { tier:2,  xp:2000, free:{ title:'Cyber Pulse Trail FX',     category:'Tail FX',       icon:'⚡' }, elite:{ title:'Hyper Plasma Arc FX',     category:'Tail FX',       icon:'⚡' } },
  { tier:3,  xp:3000, free:{ title:'Green Venom Frame',         category:'Avatar Border', icon:'🖼️' }, elite:{ title:'Cyber Siren Roar SFX',    category:'Kill Sound',    icon:'🔊' } },
  { tier:4,  xp:4000, free:{ title:'Serpent Whispers SFX',      category:'Kill Sound',    icon:'🔊' }, elite:{ title:'Royal Throne Taunt',       category:'Emote',         icon:'🛋️' } },
  { tier:5,  xp:5000, free:{ title:'Genesis Pioneer Title',     category:'Title',         icon:'🎖️' }, elite:{ title:'1 Crore Immortal Badge',   category:'Badge',         icon:'🎖️' } },
  { tier:6,  xp:6000, free:{ title:'Bio-Hazard Emote Spray',    category:'Spray',         icon:'🎨' }, elite:{ title:'Modular Venom DNA Skin',  category:'DNA Skin',      icon:'🐍' } },
  { tier:7,  xp:7000, free:{ title:'Emerald Tail Glow',         category:'Tail FX',       icon:'✨' }, elite:{ title:'Holo-Shield Tail Aura',    category:'Tail FX',       icon:'🛡️' } },
  { tier:8,  xp:8000, free:{ title:'Cobra Strike Taunt',        category:'Emote',         icon:'🐍' }, elite:{ title:'Golden Viper Frame',       category:'Avatar Border', icon:'🖼️' } },
  { tier:9,  xp:9000, free:{ title:'Cyber Samurai Border',      category:'Avatar Border', icon:'⚔️' }, elite:{ title:'Galactic Overlord Title',  category:'Title',         icon:'🌌' } },
  { tier:10, xp:10000,free:{ title:'Toxic Acid DNA Skin',      category:'DNA Skin',      icon:'🧪' }, elite:{ title:'Dark Matter DNA Skin',     category:'DNA Skin',      icon:'🌑' } },
  { tier:11, xp:11000,free:{ title:'Quantum Grid Avatar',       category:'Profile Icon',  icon:'🌐' }, elite:{ title:'Celestial Fire Trail',     category:'Tail FX',       icon:'🔥' } },
  { tier:12, xp:12000,free:{ title:'Apex Vanguard Emblem',      category:'Badge',         icon:'🛡️' }, elite:{ title:'Apex Predator Emblem',     category:'Badge',         icon:'🦅' } },
  { tier:13, xp:13000,free:{ title:'Neon Matrix Audio FX',      category:'Kill Sound',    icon:'🎵' }, elite:{ title:'Cyber Phantom Skin',       category:'DNA Skin',      icon:'👻' } },
  { tier:14, xp:14000,free:{ title:'Plasma Arc Tail Trail',     category:'Tail FX',       icon:'⚡' }, elite:{ title:'Supernova Explosion SFX',  category:'Kill Sound',    icon:'💥' } },
  { tier:15, xp:15000,free:{ title:'Cyber Warlord Title',       category:'Title',         icon:'👑' }, elite:{ title:"Emperor's Crown Frame",     category:'Avatar Border', icon:'👑' } },
  { tier:16, xp:16000,free:{ title:'Solar Flare Emote',         category:'Emote',         icon:'☀️' }, elite:{ title:'Diamond Viper DNA Skin',    category:'DNA Skin',      icon:'💎' } },
  { tier:17, xp:17000,free:{ title:'Titanium Viper Skin',       category:'DNA Skin',      icon:'🦾' }, elite:{ title:'Hyper-Drive Trail FX',     category:'Tail FX',       icon:'⚡' } },
  { tier:18, xp:18000,free:{ title:'Cyber Void Frame',          category:'Avatar Border', icon:'🌌' }, elite:{ title:'Genesis Sovereign Title',  category:'Title',         icon:'📜' } },
  { tier:19, xp:19000,free:{ title:'Genesis Immortal Badge',    category:'Badge',         icon:'🏆' }, elite:{ title:'Infinite Horizon Frame',   category:'Avatar Border', icon:'🎆' } },
  { tier:20, xp:20000,free:{ title:'Genesis Master DNA Skin',   category:'DNA Skin',      icon:'🐉' }, elite:{ title:'Serpent God Ascended',     category:'DNA Skin',      icon:'🌟' } },
] as const;

// ─── Hall of Fame Tiers (6 Milestone Tiers) ───────────────────────────

/** 6 HOF milestone tiers: Bronze → Omega */
export const HOF_TIERS = [
  { id:'t-1lakh',  name:'1 Lakh Chips Milestone',          minWalletChips:100_000,    badge:'🥉 Bronze Elite' },
  { id:'t-5lakh',  name:'5 Lakh Chips Milestone',          minWalletChips:500_000,    badge:'🥈 Silver Commander' },
  { id:'t-10lakh', name:'10 Lakh (1M) Chips Milestone',    minWalletChips:1_000_000,  badge:'🥇 Gold Apex Vanguard' },
  { id:'t-25lakh', name:'25 Lakh Chips Milestone',         minWalletChips:2_500_000,  badge:'💎 Platinum Sovereign' },
  { id:'t-50lakh', name:'50 Lakh Chips Milestone',         minWalletChips:5_000_000,  badge:'🔮 Diamond Warlord' },
  { id:'t-1crore', name:'1 Crore (10M) Legendary Milestone',minWalletChips:10_000_000, badge:'👑 Omega Immortal God' },
] as const;

// ─── Championship Prize Tiers (4) ─────────────────────────────────────

/** 4 championship prize tiers with chip rewards and titles */
export const CHAMPIONSHIP_PRIZES = [
  { category:'RANK_1',      title:'Grand Champion',               badge:'🥇 1st Place',   chipsReward:5_000_000,  crownTitle:'2026 World Champion',          hallOfFameInduction:true },
  { category:'RANK_2_10',   title:'Top 10 Legends',               badge:'🥈 Top 10',      chipsReward:2_500_000,  crownTitle:'Venom Arena Overlord',          hallOfFameInduction:true },
  { category:'RANK_11_50',  title:'Elite Masters',                badge:'🥉 Ranks 11–50',  chipsReward:1_000_000,  crownTitle:'Arena Elite Master',           hallOfFameInduction:true },
  { category:'RANK_51_100', title:'Championship Contenders',       badge:'🛡️ Ranks 51–100',chipsReward:250_000,    crownTitle:'Championship Contender',        hallOfFameInduction:true },
] as const;
