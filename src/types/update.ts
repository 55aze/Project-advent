export interface DailyUpdate {
  day: number;
  date: string;
  title: string;
  description: string;
  highlights: string[];
  gifUrl?: string;
  imageUrl?: string;
  status: 'released' | 'upcoming' | 'locked';
  version: string;
  tags?: string[];
}

export interface UpdatesData {
  projectTitle: string;
  projectDescription: string;
  month: string;
  year: number;
  updates: DailyUpdate[];
}
