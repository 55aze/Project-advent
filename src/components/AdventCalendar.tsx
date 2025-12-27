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

  // Generate days for the current sprint (8 days: Dec 22-31)
  const startDate = new Date(data.startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sprintDays = 8; // Dec 22-31

  const allDays: DailyUpdate[] = Array.from({ length: sprintDays }, (_, i) => {
    const day = i + 1;
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateStr = currentDate.toISOString().split('T')[0];

    // Find all updates for this date
    const existingUpdates = data.updates.filter(u => u.date === dateStr);
    if (existingUpdates.length > 0) return existingUpdates;

    // Determine status based on current date
    const isPast = currentDate < today;
    const isToday = currentDate.getTime() === today.getTime();
    const status: 'released' | 'upcoming' | 'locked' = isPast || isToday ? 'upcoming' : 'locked';

    // Create a placeholder
    return [{
      day,
      date: dateStr,
      projectId: '',
      title: `Day ${day}`,
      description: 'Coming soon...',
      highlights: [],
      version: `v0.${day}.0`,
      status,
      tags: []
    }];
  }).flat();

  const stats = {
    released: data.updates.filter(u => u.status === 'released').length,
    upcoming: data.updates.filter(u => u.status === 'upcoming').length,
    locked: sprintDays - data.updates.length,
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
              <p className="text-sm md:text-base font-mono opacity-80 max-w-2xl mb-6">
                {data.description}
              </p>

              {/* Stats - horizontal badges */}
              <div className="flex flex-wrap gap-3 text-xs font-mono font-bold">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500 border-2 border-background">
                  <span className="text-2xl">{stats.released}</span>
                  <span>SHIPPED</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-500 border-2 border-background">
                  <span className="text-2xl">{stats.released}/{sprintDays}</span>
                  <span>DEC GOAL</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-500 border-2 border-background">
                  <span className="text-2xl">{stats.upcoming}</span>
                  <span>IN PROGRESS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        {/* View Switcher & Project Filters - Mobile optimized */}
        <div className="mb-6 space-y-4">
          {/* View Toggle */}
          <div className="flex border-4 border-foreground pixel-border overflow-hidden w-fit">
            <button
              onClick={() => setViewMode('calendar')}
              className={`
                flex items-center gap-2 px-4 py-3 font-bold uppercase text-sm transition-colors
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
                flex items-center gap-2 px-4 py-3 font-bold uppercase text-sm transition-colors
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
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedProjectFilter(null)}
                className={`
                  px-4 py-2 border-2 border-foreground font-bold uppercase text-xs pixel-border-sm transition-colors
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
                    px-4 py-2 border-2 border-foreground font-bold uppercase text-xs pixel-border-sm transition-colors flex items-center gap-2
                    ${selectedProjectFilter === project.id
                      ? 'bg-foreground text-background'
                      : 'bg-background text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <span>{project.emoji}</span>
                  <span>{project.name}</span>
                </button>
              ))}
            </div>
          )}
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
                  key={`${update.day}-${update.projectId}-${index}`}
                  update={update}
                  project={getProject(update.projectId)}
                  onClick={() => handleCardClick(update)}
                  selectedProjectFilter={selectedProjectFilter}
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
