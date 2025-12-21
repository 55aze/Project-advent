import type { DailyUpdate } from '../types/update';
import { cn } from '../lib/utils';
import { Lock, CheckCircle2, Calendar } from 'lucide-react';

interface AdventCardProps {
  update: DailyUpdate;
  onClick: () => void;
}

export function AdventCard({ update, onClick }: AdventCardProps) {
  const isLocked = update.status === 'locked';
  const isReleased = update.status === 'released';
  const isUpcoming = update.status === 'upcoming';

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={cn(
        "relative group overflow-hidden rounded-lg border-2 transition-all duration-300 aspect-square",
        "hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        isLocked && "opacity-50 cursor-not-allowed hover:scale-100",
        isReleased && "border-primary bg-gradient-to-br from-primary/10 to-secondary/10",
        isUpcoming && "border-secondary bg-gradient-to-br from-secondary/10 to-primary/10",
        isLocked && "border-muted bg-muted/20"
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-4">
        {/* Day Number */}
        <div className={cn(
          "text-4xl font-bold mb-2",
          isReleased && "text-primary",
          isUpcoming && "text-secondary",
          isLocked && "text-muted-foreground"
        )}>
          {update.day}
        </div>

        {/* Status Icon */}
        <div className="mb-2">
          {isReleased && <CheckCircle2 className="w-6 h-6 text-primary" />}
          {isUpcoming && <Calendar className="w-6 h-6 text-secondary" />}
          {isLocked && <Lock className="w-6 h-6 text-muted-foreground" />}
        </div>

        {/* Version Badge */}
        {!isLocked && (
          <div className={cn(
            "text-xs px-2 py-1 rounded-full font-medium",
            isReleased && "bg-primary/20 text-primary",
            isUpcoming && "bg-secondary/20 text-secondary"
          )}>
            {update.version}
          </div>
        )}

        {/* Hover Overlay */}
        {!isLocked && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <p className="text-white text-sm font-medium text-center w-full line-clamp-2">
              {update.title}
            </p>
          </div>
        )}
      </div>

      {/* Sparkle Effect for Released */}
      {isReleased && (
        <div className="absolute top-2 right-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-ping" />
        </div>
      )}
    </button>
  );
}
