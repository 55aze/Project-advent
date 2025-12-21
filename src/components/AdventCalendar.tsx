import { useState } from 'react';
import type { DailyUpdate, UpdatesData } from '../types/update';
import { AdventCard } from './AdventCard';
import { UpdateModal } from './UpdateModal';
import { Snowflake } from 'lucide-react';

interface AdventCalendarProps {
  data: UpdatesData;
}

export function AdventCalendar({ data }: AdventCalendarProps) {
  const [selectedUpdate, setSelectedUpdate] = useState<DailyUpdate | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  // Generate 25 days, filling in with locked days if not in data
  const allDays: DailyUpdate[] = Array.from({ length: 25 }, (_, i) => {
    const day = i + 1;
    const existing = data.updates.find(u => u.day === day);
    if (existing) return existing;

    // Create a locked placeholder
    return {
      day,
      date: `${data.year}-${data.month}-${day.toString().padStart(2, '0')}`,
      title: `Day ${day}`,
      description: 'Coming soon...',
      highlights: [],
      version: `v0.${day}.0`,
      status: 'locked' as const,
      tags: []
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="container mx-auto px-4 py-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Snowflake className="w-8 h-8 text-primary animate-spin-slow" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {data.projectTitle}
          </h1>
          <Snowflake className="w-8 h-8 text-secondary animate-spin-slow" />
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {data.projectDescription}
        </p>
        <div className="mt-4 flex items-center justify-center gap-4 text-sm">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
            {data.updates.filter(u => u.status === 'released').length} Released
          </span>
          <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full">
            {data.updates.filter(u => u.status === 'upcoming').length} Upcoming
          </span>
          <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full">
            {25 - data.updates.length} Locked
          </span>
        </div>
      </header>

      {/* Calendar Grid */}
      <main className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allDays.map((update) => (
            <AdventCard
              key={update.day}
              update={update}
              onClick={() => handleCardClick(update)}
            />
          ))}
        </div>
      </main>

      {/* Modal */}
      <UpdateModal
        update={selectedUpdate}
        open={modalOpen}
        onClose={handleCloseModal}
      />

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground border-t">
        <p>
          Built with ❤️ using React, Tailwind CSS, and Shadcn UI
        </p>
        <p className="mt-2">
          🚀 Ship daily, learn constantly, build in public
        </p>
      </footer>
    </div>
  );
}
