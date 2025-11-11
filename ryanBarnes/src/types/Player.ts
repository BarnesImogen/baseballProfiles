export interface PlayerStats {
  catching?: StatItem[];
  hitting?: StatItem[];
  pitching?: StatItem[];
}

export interface StatItem {
  label: string;
  value: string;
}

export interface Player {
  id: string;
  name: string;
  nickname: string;
  position: string;
  graduationYear: string;
  height: string;
  weight: string;
  batsThrows: string;
  gpa?: string;
  email: string;
  phone: string;
  fieldLevel?: string;
  twitter?: string;
  stats: PlayerStats;
  experience: string[];
  bio: string;
  profileImage?: string;
  gamesPlayed?: string;
}
