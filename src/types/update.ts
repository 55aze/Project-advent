export interface Project {
  id: string;
  name: string;
  description: string;
  color: string; // Retro color for the project
  emoji: string;
  totalDays?: number;
}

export interface DailyUpdate {
  day: number;
  date: string;
  projectId: string; // Which project this day belongs to
  title: string;
  description: string;
  highlights: string[];
  gifUrl?: string;
  imageUrl?: string;
  status: 'released' | 'upcoming' | 'locked';
  version: string;
  tags?: string[];
  timeSpent?: string; // e.g., "2.5 hours"
}

export interface UpdatesData {
  title: string; // Overall challenge title
  description: string;
  month: string;
  year: number;
  projects: Project[];
  updates: DailyUpdate[];
}
