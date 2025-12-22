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
        relative border-4 border-foreground p-6 pixel-border retro-hover
        disabled:cursor-not-allowed
        aspect-square flex flex-col items-center justify-center
        transition-all duration-200
        ${isLocked ? 'bg-gray-200 opacity-50 hover:transform-none hover:shadow-none grayscale' : ''}
        ${isUpcoming && !isReleased ? 'opacity-70' : ''}
      `}
      style={{
        backgroundColor: isLocked
          ? undefined
          : (isReleased && project ? `${project.color}15` : undefined)
      }}
    >
      {/* Project badge - top right */}
      {project && !isLocked && (
        <div
          className="absolute top-2 right-2 text-base border-2 border-foreground p-1.5 pixel-border-sm"
          style={{ backgroundColor: project.color }}
        >
          {project.emoji}
        </div>
      )}

      {/* Status badge - top left */}
      <div className="absolute top-2 left-2">
        {isReleased && (
          <div className="px-2 py-1 bg-green-500 border-2 border-foreground text-white text-xs font-bold uppercase">
            DONE
          </div>
        )}
        {isUpcoming && (
          <div className="px-2 py-1 bg-blue-500 border-2 border-foreground text-white text-xs font-bold uppercase">
            WIP
          </div>
        )}
        {isLocked && (
          <div className="px-2 py-1 bg-gray-400 border-2 border-foreground text-white text-xs font-bold uppercase">
            LOCKED
          </div>
        )}
      </div>

      {/* Main content - DAY NUMBER IS HERO */}
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        {/* HUGE Day Number */}
        <div className="text-6xl md:text-7xl font-bold leading-none mb-2">
          {update.day}
        </div>

        {/* Small day label */}
        <div className="text-xs font-mono font-bold uppercase tracking-wider opacity-60 mb-3">
          DAY
        </div>

        {/* Calendar date - small and subtle */}
        <div className="flex items-center gap-1 text-xs font-mono opacity-50">
          <span>{new Date(update.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Bottom - Status icon */}
      <div className="absolute bottom-3">
        {isReleased && <Check className="w-5 h-5" strokeWidth={4} />}
        {isUpcoming && <Clock className="w-5 h-5" strokeWidth={4} />}
        {isLocked && <Lock className="w-5 h-5 opacity-50" strokeWidth={4} />}
      </div>
    </button>
  );
}
