import { useState, useMemo } from 'react';
import type { DailyUpdate, UpdatesData, Project } from '../types/update';
import { AdventCard } from './AdventCard';
import { UpdateModal } from './UpdateModal';
import { Calendar, LayoutGrid, ChevronDown } from 'lucide-react';

type ViewMode = 'calendar' | 'cards';

interface AdventCalendarProps {
  data: UpdatesData;
}

export function AdventCalendar({ data }: AdventCalendarProps) {
  const [selectedUpdate, setSelectedUpdate] = useState<DailyUpdate | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('calendar'); // Default to calendar view

  // Get current cycle (latest cycle by date)
  const currentCycle = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return data.cycles.find(c => today >= c.startDate && today <= c.endDate) || data.cycles[data.cycles.length - 1];
  }, [data.cycles]);

  const [selectedCycleId, setSelectedCycleId] = useState<string>(currentCycle.id);

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

  const selectedCycle = data.cycles.find(c => c.id === selectedCycleId) || currentCycle;

  // Get all days from updates for selected cycle, sorted by day number
  const cycleUpdates = data.updates.filter(u => u.cycleId === selectedCycleId);
  const releasedDays = [...cycleUpdates].sort((a, b) => a.day - b.day);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Only create WIP/locked cards for current cycle
  const isCurrentCycle = selectedCycleId === currentCycle.id;

  // Find the next unreleased day number for this cycle
  const maxDay = releasedDays.length > 0
    ? Math.max(...releasedDays.map(u => u.day))
    : 0;

  const nextDayNumber = maxDay + 1;
  const cycleGoal = selectedCycle.goal;

  // Create WIP card for next day (only for current cycle, if within goal)
  const wipCard: DailyUpdate | null = isCurrentCycle && nextDayNumber <= cycleGoal ? {
    day: nextDayNumber,
    date: today.toISOString().split('T')[0],
    cycleId: selectedCycleId,
    projectId: '',
    title: `Day ${nextDayNumber}`,
    description: 'Coming soon...',
    highlights: [],
    version: `v0.${nextDayNumber}.0`,
    status: 'upcoming' as const,
    tags: []
  } : null;

  // Create locked cards for remaining days (only for current cycle)
  const lockedCards: DailyUpdate[] = [];
  if (isCurrentCycle && wipCard) {
    for (let i = nextDayNumber + 1; i <= cycleGoal; i++) {
      lockedCards.push({
        day: i,
        date: '', // No date yet
        cycleId: selectedCycleId,
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

  // Current cycle stats
  const cycleStats = {
    released: releasedDays.filter(u => u.status === 'released').length,
    upcoming: wipCard ? 1 : 0,
    locked: lockedCards.length,
    goal: cycleGoal
  };

  // Total stats (all cycles, all time)
  const allReleasedUpdates = data.updates.filter(u => u.status === 'released');
  const totalReleases = allReleasedUpdates.length;
  const overallStart = new Date(data.overallStartDate);
  const totalDays = Math.ceil((today.getTime() - overallStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const totalStats = {
    releases: totalReleases,
    days: totalDays
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
          {/* Left side: View Toggle + Cycle Selector + Project Filters */}
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

            {/* Cycle Selector Dropdown */}
            <div className="relative">
              <select
                value={selectedCycleId}
                onChange={(e) => setSelectedCycleId(e.target.value)}
                className="h-[44px] px-4 pr-10 border-4 border-foreground pixel-border bg-background font-bold uppercase text-xs appearance-none cursor-pointer hover:bg-muted transition-colors"
              >
                {data.cycles.map((cycle) => (
                  <option key={cycle.id} value={cycle.id}>
                    {cycle.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" strokeWidth={3} />
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

          {/* Right side: Dual Progress Indicators */}
          <div className="flex items-center gap-3">
            {/* Current Cycle Progress */}
            <div className="flex items-center gap-3 border-4 border-foreground pixel-border px-4 h-[44px] bg-background min-w-[240px]">
              <div className="flex-1">
                <div className="text-xs font-bold font-mono mb-1 uppercase">
                  {cycleStats.released}/{cycleStats.goal} Released
                </div>
                <div className="w-full h-2 border-2 border-foreground bg-muted">
                  <div
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${(cycleStats.released / cycleStats.goal) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-2xl font-bold font-mono">
                {Math.round((cycleStats.released / cycleStats.goal) * 100)}%
              </div>
            </div>

            {/* Total Stats */}
            <div className="flex items-center gap-2 border-4 border-foreground pixel-border px-4 h-[44px] bg-purple-500 text-background">
              <div className="font-mono font-bold text-xs uppercase">
                <div className="text-2xl">{totalStats.releases}</div>
                <div className="text-[10px] opacity-80">TOTAL</div>
              </div>
              <div className="text-2xl font-bold">/</div>
              <div className="font-mono font-bold text-xs uppercase">
                <div className="text-2xl">{totalStats.days}</div>
                <div className="text-[10px] opacity-80">DAYS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar View - Full Width */}
        {viewMode === 'calendar' && (
          <div className="w-full">
            {/* TODO: Implement endless scroll calendar view with all cycles */}
            <div className="border-4 border-foreground pixel-border p-8 text-center">
              <p className="font-mono text-sm">Calendar view coming soon with endless scroll!</p>
              <p className="font-mono text-xs mt-2 opacity-60">For now, use Cards view to see releases</p>
            </div>
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
