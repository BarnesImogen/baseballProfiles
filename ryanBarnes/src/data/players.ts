import { Player } from '../types/Player';

// Initial player data - Ryan Barnes
export const initialPlayers: Player[] = [
  {
    id: 'ryan-barnes',
    name: 'Ryan Barnes',
    nickname: 'Barnsey',
    position: 'Catcher / 2nd Base / RF',
    graduationYear: '2026',
    height: '5\'10"',
    weight: '175 lbs',
    batsThrows: 'R/R',
    gpa: '3.82',
    email: 'aussie.ryanbarnes@gmail.com',
    phone: '+61 436 027 800',
    fieldLevel: 'https://www.fieldlevel.com/app/profile/ryan.barnes.2186350/baseball',
    twitter: 'https://twitter.com/BarnseyBaseball',
    gamesPlayed: '7',
    stats: {
      catching: [
        { label: 'Pop Time', value: '1.98s' },
        { label: 'Caught Stealing', value: '1' },
        { label: 'Fielding %', value: '1,000' },
        { label: 'Pass Balls', value: '0' },
        { label: 'Pickoffs', value: '1' },
        { label: '60 Yard Dash', value: '7.4' }
      ],
      hitting: [
        { label: 'Batting Avg', value: '.421' },
        { label: 'RBIs', value: '6' },
        { label: 'OBP', value: '.500' },
        { label: 'OPS', value: '1.026' },
        { label: 'Runs', value: '4' },
        { label: 'QAB', value: '7' },
        { label: 'TB', value: '10' }
      ]
    },
    experience: [
      'College Prospects Australia Showcase (2025)',
      'Blacktown Workers Baseball Club NSW State League 1st & 2nd Grade (2024-2025)',
      'World Baseball Showcases - Primary catcher for 19u team as 17 year old (2024)',
      'Australian Baseball League - Bullpen catcher for Sydney Blue Sox (2022-2024)',
      'Awarded Golden Glove for u18 - Blacktown Workers (2023/2024)',
      'NSW Schoolboys Baseball - CIS Representative (2023-2024)',
      'The Pittwater House Schools - Baseballer of the Year (2023-2024)',
      'Senior League National Championships - 3rd place (2022)',
      'International Experience: 2 West Coast USA tours, Florida tours, Japan tours (PONY)'
    ],
    bio: 'Dual-threat player with experience as both a catcher and batter. Known for competitive spirit, strong work ethic, and leadership on and off the field. Committed to excellence in athletics and academics.'
  }
];

// Storage key
const STORAGE_KEY = 'baseball_players';

export const getPlayers = (): Player[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  console.log('Getting players from localStorage:', stored);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with default player
  console.log('Initializing with default players:', initialPlayers);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPlayers));
  return initialPlayers;
};

export const getPlayerById = (id: string): Player | undefined => {
  const players = getPlayers();
  console.log('Looking for player with ID:', id, 'in players:', players);
  const player = players.find(p => p.id === id);
  console.log('Found player:', player);
  return player;
};

export const updatePlayer = (id: string, updatedPlayer: Player): void => {
  const players = getPlayers();
  const index = players.findIndex(p => p.id === id);
  if (index !== -1) {
    players[index] = updatedPlayer;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  }
};

export const addPlayer = (player: Player): void => {
  const players = getPlayers();
  players.push(player);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
};
