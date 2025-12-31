export interface Cycle {
  id: string;
  name: string;
  month: string;
  year: number;
  startDate: string;
  endDate: string;
  goal: number;
}

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
  cycleId: string; // Which cycle this update belongs to
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
  overallStartDate: string; // Overall start date (first cycle start)
  cycles: Cycle[]; // All release cycles
  projects: Project[];
  updates: DailyUpdate[];
}
