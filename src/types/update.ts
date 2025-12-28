export interface Project {
  id: string;
  name: string;
  description: string;
  color: string; // Retro color for the project
  emoji: string;
  totalDays?: number;
}

export interface ProjectUpdate {
  projectId: string;
  title: string;
  description: string;
  highlights: string[];
  version: string;
  tags?: string[];
  timeSpent?: string;
}

export interface DailyUpdate {
  day: number;
  date: string;
  projectId: string; // Primary project (for backwards compatibility)
  title: string;
  description: string;
  highlights: string[];
  gifUrl?: string;
  imageUrl?: string;
  status: 'released' | 'upcoming' | 'locked';
  version: string;
  tags?: string[];
  timeSpent?: string; // e.g., "2.5 hours"
  // For multi-project days
  projectUpdates?: ProjectUpdate[];
}

export interface UpdatesData {
  title: string; // Overall challenge title
  description: string;
  startDate: string; // Start date of the 25-day challenge (YYYY-MM-DD)
  month: string;
  year: number;
  projects: Project[];
  updates: DailyUpdate[];
}
