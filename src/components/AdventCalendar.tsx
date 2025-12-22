import { useState } from 'react';
import type { DailyUpdate, UpdatesData, Project } from '../types/update';
import { AdventCard } from './AdventCard';
import { UpdateModal } from './UpdateModal';
import { ProjectList } from './ProjectList';
import { Menu, X } from 'lucide-react';

interface AdventCalendarProps {
  data: UpdatesData;
}

export function AdventCalendar({ data }: AdventCalendarProps) {
  const [selectedUpdate, setSelectedUpdate] = useState<DailyUpdate | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  // Filter updates based on selected project
  const filteredUpdates = selectedProjectFilter
    ? data.updates.filter(u => u.projectId === selectedProjectFilter)
    : data.updates;

  // Generate 25 days based on actual calendar dates
  const startDate = new Date(data.startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const allDays: DailyUpdate[] = Array.from({ length: 25 }, (_, i) => {
    const day = i + 1;
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateStr = currentDate.toISOString().split('T')[0];

    // Find existing update for this date
    const existing = filteredUpdates.find(u => u.date === dateStr);
    if (existing) return existing;

    // Determine status based on current date
    const isPast = currentDate < today;
    const isToday = currentDate.getTime() === today.getTime();
    const status: 'released' | 'upcoming' | 'locked' = isPast || isToday ? 'upcoming' : 'locked';

    // Create a placeholder
    return {
      day,
      date: dateStr,
      projectId: '',
      title: `Day ${day}`,
      description: 'Coming soon...',
      highlights: [],
      version: `v0.${day}.0`,
      status,
      tags: []
    };
  });

  const stats = {
    released: data.updates.filter(u => u.status === 'released').length,
    upcoming: data.updates.filter(u => u.status === 'upcoming').length,
    locked: 25 - data.updates.length,
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
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-500 border-2 border-background">
                  <span className="text-2xl">{stats.upcoming}</span>
                  <span>IN PROGRESS</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-600 border-2 border-background">
                  <span className="text-2xl">{25 - stats.released - stats.upcoming}</span>
                  <span>REMAINING</span>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden border-2 border-background p-2 pixel-border-sm bg-background text-foreground"
            >
              {sidebarOpen ? <X strokeWidth={3} /> : <Menu strokeWidth={3} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside
            className={`
              ${sidebarOpen ? 'block' : 'hidden'}
              lg:block w-full lg:w-80 flex-shrink-0
            `}
          >
            <div className="sticky top-8">
              <ProjectList
                projects={data.projects}
                updates={data.updates}
                selectedProject={selectedProjectFilter}
                onSelectProject={setSelectedProjectFilter}
              />
            </div>
          </aside>

          {/* Calendar Grid */}
          <main className="flex-1 min-w-0">
            {selectedProjectFilter && (
              <div className="mb-6 p-4 border-4 border-foreground pixel-border bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="text-3xl border-2 border-foreground p-2"
                      style={{ backgroundColor: getProject(selectedProjectFilter)?.color }}
                    >
                      {getProject(selectedProjectFilter)?.emoji}
                    </div>
                    <div>
                      <h2 className="font-bold text-lg uppercase">
                        {getProject(selectedProjectFilter)?.name}
                      </h2>
                      <p className="text-sm font-mono">
                        {getProject(selectedProjectFilter)?.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProjectFilter(null)}
                    className="border-2 border-foreground px-3 py-1 pixel-border-sm retro-hover font-bold text-sm"
                  >
                    CLEAR
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {allDays.map((update) => (
                <AdventCard
                  key={update.day}
                  update={update}
                  project={getProject(update.projectId)}
                  onClick={() => handleCardClick(update)}
                />
              ))}
            </div>
          </main>
        </div>
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
