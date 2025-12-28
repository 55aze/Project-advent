import { useState } from 'react';
import type { DailyUpdate, UpdatesData, Project } from '../types/update';
import { AdventCard } from './AdventCard';
import { UpdateModal } from './UpdateModal';
import { CalendarGrid } from './CalendarGrid';
import { Calendar, LayoutGrid } from 'lucide-react';

type ViewMode = 'calendar' | 'cards';

interface AdventCalendarProps {
  data: UpdatesData;
}

export function AdventCalendar({ data }: AdventCalendarProps) {
  const [selectedUpdate, setSelectedUpdate] = useState<DailyUpdate | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(data.startDate));
  const [viewMode, setViewMode] = useState<ViewMode>('calendar'); // Default to calendar view

  const handleCardClick = (update: DailyUpdate) => {
    if (update.status !== 'locked') {
      setSelectedUpdate(update);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedUpdate(null), 200);
  };

  const getProject = (projectId: string): Project | undefined => {
    return data.projects.find(p => p.id === projectId);
  };

  // Get all days from updates, sorted by day number
  const releasedDays = [...data.updates].sort((a, b) => a.day - b.day);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find the next unreleased day number
  const maxDay = releasedDays.length > 0
    ? Math.max(...releasedDays.map(u => u.day))
    : 0;

  const nextDayNumber = maxDay + 1;
  const sprintGoal = 8; // Total days goal for December

  // Create WIP card for next day (if within sprint goal)
  const wipCard: DailyUpdate | null = nextDayNumber <= sprintGoal ? {
    day: nextDayNumber,
    date: today.toISOString().split('T')[0],
    projectId: '',
    title: `Day ${nextDayNumber}`,
    description: 'Coming soon...',
    highlights: [],
    version: `v0.${nextDayNumber}.0`,
    status: 'upcoming' as const,
    tags: []
  } : null;

  // Create locked cards for remaining days
  const lockedCards: DailyUpdate[] = [];
  if (wipCard) {
    for (let i = nextDayNumber + 1; i <= sprintGoal; i++) {
      lockedCards.push({
        day: i,
        date: '', // No date yet
        projectId: '',
        title: `Day ${i}`,
        description: 'Coming soon...',
        highlights: [],
        version: `v0.${i}.0`,
        status: 'locked' as const,
        tags: []
      });
    }
  }

  // Combine: released + WIP + locked, sorted by day number
  const allDays: DailyUpdate[] = [
    ...releasedDays,
    ...(wipCard ? [wipCard] : []),
    ...lockedCards
  ].sort((a, b) => a.day - b.day);

  const stats = {
    released: releasedDays.filter(u => u.status === 'released').length,
    upcoming: wipCard ? 1 : 0,
    locked: lockedCards.length,
  };

  return (
    <div className="min-h-screen bg-background pixel-grid">
      {/* Header - Redesigned for impact */}
      <header className="border-b-4 border-foreground bg-foreground text-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Main title - bigger and bolder */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {data.title.toUpperCase()}
              </h1>
              <p className="text-sm md:text-base font-mono opacity-80 max-w-2xl">
                {data.description}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        {/* View Switcher, Project Filters & Progress - All in one row */}
        <div className="mb-6 flex flex-wrap items-center gap-3 justify-between">
          {/* Left side: View Toggle + Project Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Toggle */}
            <div className="flex border-4 border-foreground pixel-border overflow-hidden h-[44px]">
              <button
                onClick={() => setViewMode('calendar')}
                className={`
                  flex items-center gap-2 px-4 font-bold uppercase text-sm transition-colors
                  ${viewMode === 'calendar'
                    ? 'bg-foreground text-background'
                    : 'bg-background text-foreground hover:bg-muted'
                  }
                `}
              >
                <Calendar className="w-4 h-4" strokeWidth={3} />
                <span className="hidden sm:inline">Calendar</span>
              </button>
              <div className="w-1 bg-foreground" />
              <button
                onClick={() => setViewMode('cards')}
                className={`
                  flex items-center gap-2 px-4 font-bold uppercase text-sm transition-colors
                  ${viewMode === 'cards'
                    ? 'bg-foreground text-background'
                    : 'bg-background text-foreground hover:bg-muted'
                  }
                `}
              >
                <LayoutGrid className="w-4 h-4" strokeWidth={3} />
                <span className="hidden sm:inline">Cards</span>
              </button>
            </div>

            {/* Project Filter Pills */}
            {data.projects.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedProjectFilter(null)}
                  className={`
                    px-4 h-[44px] border-4 border-foreground font-bold uppercase text-xs pixel-border transition-colors
                    ${!selectedProjectFilter
                      ? 'bg-foreground text-background'
                      : 'bg-background text-foreground hover:bg-muted'
                    }
                  `}
                >
                  ALL PROJECTS
                </button>
                {data.projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProjectFilter(project.id)}
                    className={`
                      px-4 h-[44px] border-4 border-foreground font-bold uppercase text-xs pixel-border transition-colors flex items-center gap-2
                      ${selectedProjectFilter === project.id
                        ? 'bg-foreground text-background'
                        : 'bg-background text-foreground hover:bg-muted'
                      }
                    `}
                  >
                    <span>{project.emoji}</span>
                    <span className="hidden sm:inline">{project.name}</span>
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Right side: Progress Bar */}
          <div className="flex items-center gap-3 border-4 border-foreground pixel-border px-4 h-[44px] bg-background min-w-[240px]">
            <div className="flex-1">
              <div className="text-xs font-bold font-mono mb-1 uppercase">
                {stats.released}/{sprintGoal} Released
              </div>
              <div className="w-full h-2 border-2 border-foreground bg-muted">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${(stats.released / sprintGoal) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono">
              {Math.round((stats.released / sprintGoal) * 100)}%
            </div>
          </div>
        </div>

        {/* Calendar View - Full Width */}
        {viewMode === 'calendar' && (
          <div className="w-full">
            <CalendarGrid
              updates={data.updates}
              projects={data.projects}
              currentMonth={currentMonth}
              onMonthChange={setCurrentMonth}
              selectedProject={selectedProjectFilter}
              onDateClick={(update) => {
                if (update) handleCardClick(update);
              }}
            />
          </div>
        )}

        {/* Cards View */}
        {viewMode === 'cards' && (
          <div className="w-full">
            {/* Card Grid - Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {allDays.map((update, index) => (
                <AdventCard
                  key={`${update.day}-${update.date}-${index}`}
                  update={update}
                  project={getProject(update.projectId)}
                  onClick={() => handleCardClick(update)}
                  selectedProjectFilter={selectedProjectFilter}
                  allProjects={data.projects}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <UpdateModal
        update={selectedUpdate}
        project={selectedUpdate ? getProject(selectedUpdate.projectId) : undefined}
        open={modalOpen}
        onClose={handleCloseModal}
        allProjects={data.projects}
      />

      {/* Footer */}
      <footer className="border-t-4 border-foreground bg-foreground text-background mt-12">
        <div className="container mx-auto px-4 py-6 text-center font-mono text-sm">
          <p className="font-bold">
            BUILT WITH REACT + TYPESCRIPT + TAILWIND
          </p>
          <p className="mt-2">
            → SHIP DAILY. NO EXCUSES. BUILD IN PUBLIC. ←
          </p>
        </div>
      </footer>
    </div>
  );
}
