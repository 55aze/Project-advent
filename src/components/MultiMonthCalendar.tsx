import { useRef, useEffect } from 'react';
import type { DailyUpdate, Project, Cycle } from '../types/update';

interface MultiMonthCalendarProps {
  cycles: Cycle[];
  updates: DailyUpdate[];
  projects: Project[];
  selectedProject: string | null;
  selectedCycleId: string;
  onDateClick: (update: DailyUpdate) => void;
}

export function MultiMonthCalendar({
  cycles,
  updates,
  projects,
  selectedProject,
  selectedCycleId,
  onDateClick
}: MultiMonthCalendarProps) {
  const monthRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const getProject = (projectId: string) => projects.find(p => p.id === projectId);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generate months to display: up to current month + 1 ahead (N+1)
  const displayMonths: { year: number; month: number; cycleName: string; cycleId: string }[] = [];

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  cycles.forEach(cycle => {
    const startDate = new Date(cycle.startDate);
    const endDate = new Date(cycle.endDate);

    let currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const lastDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

    // Limit: up to current month + 1
    const maxDate = new Date(currentYear, currentMonth + 1, 1);

    while (currentDate <= lastDate && currentDate <= maxDate) {
      displayMonths.push({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        cycleName: cycle.name,
        cycleId: cycle.id
      });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  });

  // Auto-scroll to selected cycle's first month when cycle changes
  useEffect(() => {
    const firstMonthOfCycle = displayMonths.find(m => m.cycleId === selectedCycleId);
    if (firstMonthOfCycle) {
      const monthKey = `${firstMonthOfCycle.year}-${firstMonthOfCycle.month}`;
      const monthElement = monthRefs.current.get(monthKey);
      if (monthElement) {
        monthElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedCycleId, displayMonths]);

  const getDayUpdates = (year: number, month: number, day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return updates.filter(u => u.date === dateStr);
  };

  const isToday = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);
    return date.getTime() === today.getTime();
  };

  const isPast = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);
    return date < today;
  };

  return (
    <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
      {displayMonths.map(({ year, month, cycleName }) => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const monthName = firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        // Create calendar grid
        const calendarDays: (number | null)[] = [];

        // Empty cells before first day
        for (let i = 0; i < startingDayOfWeek; i++) {
          calendarDays.push(null);
        }

        // Actual days
        for (let day = 1; day <= daysInMonth; day++) {
          calendarDays.push(day);
        }

        return (
          <div
            key={`${year}-${month}`}
            ref={(el) => {
              if (el) {
                monthRefs.current.set(`${year}-${month}`, el);
              }
            }}
            className="border-2 border-foreground bg-background"
          >
            {/* Month header - Compact */}
            <div className="border-b-2 border-foreground p-2 bg-foreground text-background flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase">{monthName}</h3>
              <span className="text-[10px] opacity-70">{cycleName}</span>
            </div>

            {/* Day labels - Compact */}
            <div className="grid grid-cols-7 border-b border-foreground bg-muted/30">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div
                  key={i}
                  className="p-1 text-center text-[10px] font-bold border-r border-foreground last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid - Compact */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="border-r border-b border-foreground/20 last:border-r-0 bg-muted/30 h-[24px]"
                    />
                  );
                }

                const dayUpdates = getDayUpdates(year, month, day);
                const hasReleased = dayUpdates.some(u => u.status === 'released');
                const isCurrentDay = isToday(year, month, day);
                const isPastDay = isPast(year, month, day);

                // Check if this day should be dimmed based on filter
                const shouldDim = selectedProject && dayUpdates.length > 0 && dayUpdates.every(u => {
                  if (u.projectUpdates && u.projectUpdates.length > 0) {
                    return !u.projectUpdates.some(pu => pu.projectId === selectedProject);
                  }
                  return u.projectId !== selectedProject;
                });

                return (
                  <button
                    key={day}
                    onClick={() => {
                      const update = dayUpdates[0] || null;
                      if (update) onDateClick(update);
                    }}
                    className={`
                      border-r border-b border-foreground/20 last:border-r-0 h-[24px]
                      p-0.5 hover:bg-muted/50 active:bg-muted transition-colors relative
                      touch-manipulation flex flex-col items-center justify-center
                      ${isCurrentDay ? 'bg-yellow-100 ring-2 ring-yellow-500 ring-inset' : ''}
                      ${!isPastDay && !isCurrentDay ? 'bg-gray-50 opacity-60' : ''}
                      ${dayUpdates.length > 0 ? 'cursor-pointer' : 'cursor-default'}
                      ${shouldDim ? 'opacity-30' : ''}
                    `}
                    disabled={dayUpdates.length === 0}
                  >
                    {/* Day number */}
                    <div className={`text-[10px] font-bold ${isCurrentDay ? 'text-yellow-700' : ''}`}>
                      {day}
                    </div>

                    {/* Project dots - Compact */}
                    {dayUpdates.length > 0 && (
                      <div className="flex flex-wrap gap-0.5 mt-0.5 justify-center">
                        {dayUpdates.map((update, idx) => {
                          // For multi-project days, show all project dots
                          if (update.projectUpdates && update.projectUpdates.length > 0) {
                            return update.projectUpdates.map((pu, puIdx) => {
                              const project = getProject(pu.projectId);
                              if (!project) return null;

                              const isFiltered = selectedProject && selectedProject !== pu.projectId;

                              return (
                                <div
                                  key={`${idx}-${puIdx}`}
                                  className={`w-1 h-1 rounded-full border border-foreground ${isFiltered ? 'opacity-30' : ''}`}
                                  style={{ backgroundColor: project.color }}
                                  aria-label={`${project.name} project`}
                                />
                              );
                            });
                          }

                          // Single project day
                          const project = getProject(update.projectId);
                          if (!project) return null;

                          const isFiltered = selectedProject && selectedProject !== update.projectId;

                          return (
                            <div
                              key={idx}
                              className={`w-1 h-1 rounded-full border border-foreground ${isFiltered ? 'opacity-30' : ''}`}
                              style={{ backgroundColor: project.color }}
                              aria-label={`${project.name} project`}
                            />
                          );
                        })}
                      </div>
                    )}

                    {/* Status indicator - Smaller */}
                    {hasReleased && (
                      <div className="absolute bottom-0.5 right-0.5">
                        <div className="w-0.5 h-0.5 bg-green-500 rounded-full" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
