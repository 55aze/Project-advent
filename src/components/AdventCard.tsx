import type { DailyUpdate, Project } from '../types/update';
import { Lock, Check, Clock } from 'lucide-react';

interface AdventCardProps {
  update: DailyUpdate;
  project: Project | undefined;
  onClick: () => void;
}

export function AdventCard({ update, project, onClick }: AdventCardProps) {
  const isLocked = update.status === 'locked';
  const isReleased = update.status === 'released';
  const isUpcoming = update.status === 'upcoming';

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`
        relative border-4 border-foreground p-4 pixel-border retro-hover
        disabled:opacity-50 disabled:cursor-not-allowed
        aspect-square flex flex-col items-center justify-center
        ${isLocked ? 'bg-muted hover:transform-none hover:shadow-none' : 'bg-background'}
      `}
      style={{
        backgroundColor: isLocked ? undefined : (isReleased ? project?.color + '20' : undefined)
      }}
    >
      {/* Project indicator */}
      {project && !isLocked && (
        <div
          className="absolute top-2 right-2 text-xl border-2 border-foreground p-1"
          style={{ backgroundColor: project.color }}
        >
          {project.emoji}
        </div>
      )}

      {/* Calendar Date */}
      <div className="text-center mb-2">
        <div className="text-xs font-mono text-muted-foreground uppercase">
          {new Date(update.date).toLocaleDateString('en-US', { month: 'short' })}
        </div>
        <div className="text-3xl font-bold">
          {new Date(update.date).getDate()}
        </div>
        <div className="text-xs font-mono font-bold">
          DAY {update.day}
        </div>
      </div>

      {/* Status icon */}
      <div className="mb-2">
        {isReleased && <Check className="w-6 h-6" strokeWidth={3} />}
        {isUpcoming && <Clock className="w-6 h-6" strokeWidth={3} />}
        {isLocked && <Lock className="w-6 h-6" strokeWidth={3} />}
      </div>

      {/* Version badge */}
      {!isLocked && (
        <div className="text-xs border-2 border-foreground px-2 py-1 bg-background font-mono font-bold">
          {update.version}
        </div>
      )}

      {/* Status label */}
      <div className="absolute bottom-2 left-2 text-xs font-bold uppercase">
        {isReleased && <span className="text-green-600">✓ SHIPPED</span>}
        {isUpcoming && <span className="text-blue-600">→ WIP</span>}
        {isLocked && <span className="text-gray-500">✕ LOCKED</span>}
      </div>
    </button>
  );
}
