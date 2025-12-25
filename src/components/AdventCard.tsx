import type { DailyUpdate, Project } from '../types/update';
import { Lock, Check, Clock } from 'lucide-react';

interface AdventCardProps {
  update: DailyUpdate;
  project: Project | undefined;
  onClick: () => void;
  selectedProjectFilter?: string | null;
}

export function AdventCard({ update, project, onClick, selectedProjectFilter }: AdventCardProps) {
  const isLocked = update.status === 'locked';
  const isReleased = update.status === 'released';
  const isUpcoming = update.status === 'upcoming';

  // Get formatted date (e.g., "Dec 21")
  const formattedDate = new Date(update.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // Check if this card should be dimmed based on filter
  const isDimmed = selectedProjectFilter && update.projectId !== selectedProjectFilter;

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`
        group relative border-4 border-foreground pixel-border retro-hover
        disabled:cursor-not-allowed
        flex flex-col bg-background
        transition-all duration-200 text-left overflow-hidden
        ${isLocked ? 'bg-gray-200 opacity-50 hover:transform-none hover:shadow-none grayscale' : ''}
        ${isUpcoming && !isReleased ? 'opacity-70' : ''}
        ${isDimmed ? 'opacity-30' : ''}
      `}
    >
      {/* Colored bottom border */}
      {project && !isLocked && (
        <div
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{ backgroundColor: project.color }}
        />
      )}

      {/* Card content */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Header with day number */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 border-2 border-foreground flex items-center justify-center bg-background">
              <span className="text-2xl font-bold">{update.day}</span>
            </div>
          </div>

          {/* Status badge */}
          <div className="flex-shrink-0">
            {isReleased && (
              <div className="px-2 py-1 bg-green-500 border-2 border-foreground text-white text-xs font-bold uppercase flex items-center gap-1">
                <Check className="w-3 h-3" strokeWidth={3} />
                DONE
              </div>
            )}
            {isUpcoming && (
              <div className="px-2 py-1 bg-blue-500 border-2 border-foreground text-white text-xs font-bold uppercase flex items-center gap-1">
                <Clock className="w-3 h-3" strokeWidth={3} />
                WIP
              </div>
            )}
            {isLocked && (
              <div className="px-2 py-1 bg-gray-400 border-2 border-foreground text-white text-xs font-bold uppercase flex items-center gap-1">
                <Lock className="w-3 h-3" strokeWidth={3} />
                LOCKED
              </div>
            )}
          </div>
        </div>

        {/* Date - Only show for released items */}
        {isReleased && (
          <div className="text-sm font-mono uppercase tracking-wide opacity-60">
            {formattedDate}
          </div>
        )}

        {/* Title */}
        <h3 className="font-bold text-xl leading-tight line-clamp-2">
          {update.title}
        </h3>

        {/* Description */}
        {!isLocked && (
          <p className="text-sm leading-relaxed opacity-80 line-clamp-3 flex-1">
            {update.description}
          </p>
        )}

        {/* Footer with project name */}
        {project && !isLocked && (
          <div className="flex items-center gap-2 pt-2 border-t-2 border-foreground/20">
            <span className="text-xl">{project.emoji}</span>
            <span className="text-xs font-bold uppercase tracking-wide opacity-60">
              {project.name}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}
