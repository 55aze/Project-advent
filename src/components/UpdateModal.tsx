import type { DailyUpdate } from '../types/update';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Copy, Twitter, Calendar, Tag } from 'lucide-react';
import { useState } from 'react';

interface UpdateModalProps {
  update: DailyUpdate | null;
  open: boolean;
  onClose: () => void;
}

export function UpdateModal({ update, open, onClose }: UpdateModalProps) {
  const [copied, setCopied] = useState(false);

  if (!update) return null;

  const generateTwitterUpdate = () => {
    const text = `🎄 Day ${update.day} - ${update.title}

${update.highlights.slice(0, 3).map(h => `✨ ${h}`).join('\n')}

${update.version} | Building in Public 🚀

#BuildInPublic #100DaysOfCode`;
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
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl font-bold text-primary">Day {update.day}</span>
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
              {update.version}
            </span>
          </div>
          <DialogTitle className="text-2xl">{update.title}</DialogTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{update.date}</span>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* GIF/Image */}
          {(update.gifUrl || update.imageUrl) && (
            <div className="rounded-lg overflow-hidden border-2 border-border">
              <img
                src={update.gifUrl || update.imageUrl}
                alt={update.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <DialogDescription className="text-base leading-relaxed">
              {update.description}
            </DialogDescription>
          </div>

          {/* Highlights */}
          {update.highlights.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">✨ Highlights</h3>
              <ul className="space-y-2">
                {update.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span className="text-primary mt-0.5">▸</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {update.tags && update.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-muted-foreground" />
              {update.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Twitter Share Section */}
          <div className="border-t pt-4 space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Twitter className="w-4 h-4" />
              Share on X (Twitter)
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg text-sm whitespace-pre-wrap font-mono">
              {generateTwitterUpdate()}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={shareOnTwitter}
                className="flex items-center gap-2"
              >
                <Twitter className="w-4 h-4" />
                Share on X
              </Button>
              <Button
                variant="outline"
                onClick={() => copyToClipboard(generateTwitterUpdate())}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy Text'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
