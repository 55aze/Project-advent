import type { DailyUpdate, Project } from '../types/update';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Copy, Twitter, X, Clock } from 'lucide-react';
import { useState } from 'react';

interface UpdateModalProps {
  update: DailyUpdate | null;
  project: Project | undefined;
  open: boolean;
  onClose: () => void;
}

export function UpdateModal({ update, project, open, onClose }: UpdateModalProps) {
  const [copied, setCopied] = useState(false);

  if (!update) return null;

  const generateTwitterUpdate = () => {
    const text = `🎯 DAY ${update.day}: ${update.title}

${update.highlights.slice(0, 3).map(h => `→ ${h}`).join('\n')}

${project ? project.emoji + ' ' + project.name : ''} | ${update.version}
${update.timeSpent ? `⏱️ ${update.timeSpent}` : ''}

#BuildInPublic #25DaysOfShipping`;
    return text;
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const text = generateTwitterUpdate();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl border-4 border-foreground pixel-border-lg bg-background">
        {/* Custom close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 border-2 border-foreground p-2 bg-destructive text-destructive-foreground pixel-border-sm retro-hover"
        >
          <X className="h-4 w-4" strokeWidth={3} />
        </button>

        <DialogHeader>
          <div className="flex items-start gap-4 mb-4">
            {project && (
              <div
                className="text-5xl border-4 border-foreground p-4 pixel-border"
                style={{ backgroundColor: project.color }}
              >
                {project.emoji}
              </div>
            )}
            <div className="flex-1">
              <div className="text-sm font-mono mb-2 uppercase text-muted-foreground">
                Day {update.day} • {update.date}
              </div>
              <DialogTitle className="text-2xl mb-2">{update.title}</DialogTitle>
              {project && (
                <div className="text-sm font-bold" style={{ color: project.color }}>
                  {project.name.toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="border-2 border-foreground px-3 py-1 bg-background font-mono font-bold text-sm">
                {update.version}
              </div>
              {update.timeSpent && (
                <div className="border-2 border-foreground px-3 py-1 bg-background font-mono text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {update.timeSpent}
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* GIF/Image */}
          {(update.gifUrl || update.imageUrl) && (
            <div className="border-4 border-foreground pixel-border">
              <img
                src={update.gifUrl || update.imageUrl}
                alt={update.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Description */}
          <div className="border-4 border-foreground p-4 bg-muted/30">
            <h3 className="font-bold text-sm mb-3 uppercase">DESCRIPTION</h3>
            <p className="text-sm leading-relaxed font-mono">
              {update.description}
            </p>
          </div>

          {/* Highlights */}
          {update.highlights.length > 0 && (
            <div className="border-4 border-foreground p-4">
              <h3 className="font-bold text-sm mb-3 uppercase">WHAT I BUILT</h3>
              <ul className="space-y-2">
                {update.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm font-mono border-l-4 border-foreground pl-3 py-1"
                  >
                    <span className="font-bold">→</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {update.tags && update.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {update.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border-2 border-foreground text-xs font-mono font-bold uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Twitter Share Section */}
          <div className="border-4 border-foreground p-4 bg-background">
            <h3 className="font-bold text-sm mb-3 uppercase flex items-center gap-2">
              <Twitter className="w-4 h-4" strokeWidth={3} />
              SHARE ON X
            </h3>
            <div className="bg-muted/50 border-2 border-foreground p-4 mb-3 text-xs font-mono whitespace-pre-wrap">
              {generateTwitterUpdate()}
            </div>
            <div className="flex gap-3">
              <Button
                onClick={shareOnTwitter}
                className="flex items-center gap-2 border-4 border-foreground bg-accent text-accent-foreground pixel-border-sm retro-hover font-bold uppercase"
              >
                <Twitter className="w-4 h-4" strokeWidth={3} />
                POST TO X
              </Button>
              <Button
                onClick={() => copyToClipboard(generateTwitterUpdate())}
                variant="outline"
                className="flex items-center gap-2 border-4 border-foreground pixel-border-sm retro-hover font-bold uppercase"
              >
                <Copy className="w-4 h-4" strokeWidth={3} />
                {copied ? 'COPIED!' : 'COPY'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
