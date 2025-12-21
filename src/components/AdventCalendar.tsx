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

  // Generate 25 days, filling in with locked days if not in data
  const allDays: DailyUpdate[] = Array.from({ length: 25 }, (_, i) => {
    const day = i + 1;
    const existing = filteredUpdates.find(u => u.day === day);
    if (existing) return existing;

    // Create a locked placeholder
    return {
      day,
      date: `${data.year}-${String(data.month).padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
      projectId: '',
      title: `Day ${day}`,
      description: 'Coming soon...',
      highlights: [],
      version: `v0.${day}.0`,
      status: 'locked' as const,
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
      {/* Header */}
      <header className="border-b-4 border-foreground bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden border-2 border-foreground p-2 pixel-border-sm retro-hover"
              >
                {sidebarOpen ? <X strokeWidth={3} /> : <Menu strokeWidth={3} />}
              </button>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold mb-2">
                  {data.title.toUpperCase()}
                </h1>
                <p className="text-sm md:text-base font-mono max-w-2xl">
                  {data.description}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono font-bold">
            <div className="border-2 border-foreground px-3 py-1 bg-green-500 text-white">
              ✓ {stats.released} SHIPPED
            </div>
            <div className="border-2 border-foreground px-3 py-1 bg-blue-500 text-white">
              → {stats.upcoming} WIP
            </div>
            <div className="border-2 border-foreground px-3 py-1 bg-gray-400 text-white">
              ✕ {stats.locked} LOCKED
            </div>
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
