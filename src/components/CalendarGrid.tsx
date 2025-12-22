import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { DailyUpdate, Project } from '../types/update';

interface CalendarGridProps {
  updates: DailyUpdate[];
  projects: Project[];
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  selectedProject: string | null;
  onDateClick: (update: DailyUpdate | null) => void;
}

export function CalendarGrid({
  updates,
  projects,
  currentMonth,
  onMonthChange,
  selectedProject,
  onDateClick
}: CalendarGridProps) {
  const getProject = (projectId: string) => projects.find(p => p.id === projectId);

  // Get days in month
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const handlePrevMonth = () => {
    onMonthChange(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    onMonthChange(new Date(year, month + 1, 1));
  };

  const getDayUpdates = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return updates.filter(u => u.date === dateStr);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isToday = (day: number) => {
    const date = new Date(year, month, day);
    return date.getTime() === today.getTime();
  };

  const isPast = (day: number) => {
    const date = new Date(year, month, day);
    return date < today;
  };

  // Create calendar grid
  const calendarDays = [];

  // Empty cells before first day
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }

  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="border-4 border-foreground pixel-border bg-background">
      {/* Header with month navigation */}
      <div className="border-b-4 border-foreground p-4 bg-foreground text-background">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:opacity-70 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={3} />
          </button>
          <h3 className="font-bold text-lg uppercase">{monthName}</h3>
          <button
            onClick={handleNextMonth}
            className="p-1 hover:opacity-70 transition-opacity"
          >
            <ChevronRight className="w-6 h-6" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 border-b-2 border-foreground">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="p-2 text-center text-xs font-bold border-r-2 border-foreground last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return (
              <div
                key={`empty-${index}`}
                className="aspect-square border-r-2 border-b-2 border-foreground last:border-r-0 bg-muted/30"
              />
            );
          }

          const dayUpdates = getDayUpdates(day);
          const hasReleased = dayUpdates.some(u => u.status === 'released');
          const isCurrentDay = isToday(day);
          const isPastDay = isPast(day);

          return (
            <button
              key={day}
              onClick={() => {
                const update = dayUpdates[0] || null;
                if (update) onDateClick(update);
              }}
              className={`
                aspect-square border-r-2 border-b-2 border-foreground last:border-r-0
                p-2 hover:bg-muted/50 transition-colors relative
                ${isCurrentDay ? 'bg-yellow-100' : ''}
                ${!isPastDay && !isCurrentDay ? 'bg-gray-100 opacity-60' : ''}
              `}
            >
              {/* Day number */}
              <div className={`text-sm font-bold ${isCurrentDay ? 'text-yellow-700' : ''}`}>
                {day}
              </div>

              {/* Project dots */}
              {dayUpdates.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1 justify-center">
                  {dayUpdates.map((update, idx) => {
                    const project = getProject(update.projectId);
                    if (!project) return null;

                    const isFiltered = selectedProject && selectedProject !== update.projectId;

                    return (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full border border-foreground ${isFiltered ? 'opacity-30' : ''}`}
                        style={{ backgroundColor: project.color }}
                      />
                    );
                  })}
                </div>
              )}

              {/* Status indicator */}
              {hasReleased && (
                <div className="absolute bottom-1 right-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
