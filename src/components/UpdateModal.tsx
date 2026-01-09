import type { DailyUpdate, Project } from '../types/update';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Copy, Twitter, X, Clock, Save, Image } from 'lucide-react';
import { useState, useEffect } from 'react';

interface UpdateModalProps {
  update: DailyUpdate | null;
  project: Project | undefined;
  open: boolean;
  onClose: () => void;
  allProjects: Project[];
  editMode?: boolean;
  onSave?: (update: DailyUpdate) => void;
}

export function UpdateModal({ update, project, open, onClose, allProjects, editMode = false, onSave }: UpdateModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [gifUrl, setGifUrl] = useState('');

  // Initialize image URLs from update
  useEffect(() => {
    if (update) {
      setImageUrl(update.imageUrl || '');
      setGifUrl(update.gifUrl || '');
    }
  }, [update]);

  const handleSave = () => {
    if (update && onSave) {
      const updatedUpdate = {
        ...update,
        imageUrl: imageUrl.trim() || undefined,
        gifUrl: gifUrl.trim() || undefined,
      };
      onSave(updatedUpdate);
      onClose();
    }
  };

  if (!update) return null;

  const hasMultipleProjects = update.projectUpdates && update.projectUpdates.length > 0;

  // Get current content based on active tab
  const currentContent = hasMultipleProjects && update.projectUpdates
    ? update.projectUpdates[activeTab]
    : null;

  const currentProject = currentContent
    ? allProjects.find(p => p.id === currentContent.projectId)
    : project;

  const displayTitle = currentContent ? currentContent.title : update.title;
  const displayDescription = currentContent ? currentContent.description : update.description;
  const displayHighlights = currentContent ? currentContent.highlights : update.highlights;
  const displayVersion = currentContent ? currentContent.version : update.version;
  const displayTags = currentContent ? currentContent.tags : update.tags;

  const generateTwitterUpdate = () => {
    if (hasMultipleProjects && update.projectUpdates) {
      // Generate combined tweet for all projects
      const projectLines = update.projectUpdates.map(pu => {
        const proj = allProjects.find(p => p.id === pu.projectId);
        return `${proj?.emoji} ${proj?.name}: ${pu.title}`;
      }).join('\n');

      const allHighlights = update.projectUpdates.flatMap(pu => pu.highlights.slice(0, 2));
      const highlightLines = allHighlights.slice(0, 4).map(h => `→ ${h}`).join('\n');

      const text = `🎯 DAY ${update.day}: Multi-Project Update

${projectLines}

${highlightLines}

#BuildInPublic #25DaysOfShipping`;
      return text;
    }

    // Single project tweet
    const text = `🎯 DAY ${update.day}: ${displayTitle}

${displayHighlights.slice(0, 3).map(h => `→ ${h}`).join('\n')}

${currentProject ? currentProject.emoji + ' ' + currentProject.name : ''} | ${displayVersion}
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
            {currentProject && (
              <div
                className="text-5xl border-4 border-foreground p-4 pixel-border"
                style={{ backgroundColor: currentProject.color }}
              >
                {currentProject.emoji}
              </div>
            )}
            <div className="flex-1">
              <div className="text-sm font-mono mb-2 uppercase text-muted-foreground">
                Day {update.day} • {update.date}
                {hasMultipleProjects && ' • MULTI-PROJECT'}
              </div>
              <DialogTitle className="text-2xl mb-2">{displayTitle}</DialogTitle>
              {currentProject && (
                <div className="text-sm font-bold" style={{ color: currentProject.color }}>
                  {currentProject.name.toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="border-2 border-foreground px-3 py-1 bg-background font-mono font-bold text-sm">
                {displayVersion}
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
          {/* Multi-project tabs */}
          {hasMultipleProjects && update.projectUpdates && (
            <div className="flex gap-2 border-4 border-foreground overflow-hidden">
              {update.projectUpdates.map((pu, index) => {
                const tabProject = allProjects.find(p => p.id === pu.projectId);
                return (
                  <button
                    key={pu.projectId}
                    onClick={() => setActiveTab(index)}
                    className={`
                      flex-1 px-4 py-3 text-sm font-bold uppercase transition-colors
                      ${activeTab === index
                        ? 'bg-foreground text-background'
                        : 'bg-background text-foreground hover:bg-muted'
                      }
                    `}
                  >
                    {tabProject?.emoji} {tabProject?.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* GIF/Image Display */}
          {(update.gifUrl || update.imageUrl || imageUrl || gifUrl) && (
            <div className="border-4 border-foreground pixel-border">
              <img
                src={gifUrl || imageUrl || update.gifUrl || update.imageUrl}
                alt={displayTitle}
                className="w-full h-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Image URL Inputs (Edit Mode) */}
          {editMode && (
            <div className="border-4 border-foreground p-4 bg-yellow-50 space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Image className="w-5 h-5" strokeWidth={3} />
                <h3 className="font-bold text-sm uppercase">ADD IMAGE/GIF</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-2 uppercase">
                    Image URL (optional)
                  </label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.png"
                    className="w-full px-3 py-2 border-2 border-foreground font-mono text-sm bg-background"
                  />
                  <p className="text-xs mt-1 opacity-70">
                    Upload to Imgur, Cloudinary, or similar and paste URL here
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2 uppercase">
                    GIF URL (optional, takes priority over image)
                  </label>
                  <input
                    type="text"
                    value={gifUrl}
                    onChange={(e) => setGifUrl(e.target.value)}
                    placeholder="https://example.com/animation.gif"
                    className="w-full px-3 py-2 border-2 border-foreground font-mono text-sm bg-background"
                  />
                </div>
              </div>

              <Button
                onClick={handleSave}
                className="w-full border-4 border-foreground bg-green-500 text-background pixel-border-sm retro-hover font-bold uppercase flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" strokeWidth={3} />
                SAVE IMAGES
              </Button>
            </div>
          )}

          {/* Description */}
          <div className="border-4 border-foreground p-4 bg-muted/30">
            <h3 className="font-bold text-sm mb-3 uppercase">DESCRIPTION</h3>
            <p className="text-sm leading-relaxed font-mono">
              {displayDescription}
            </p>
          </div>

          {/* Highlights */}
          {displayHighlights.length > 0 && (
            <div className="border-4 border-foreground p-4">
              <h3 className="font-bold text-sm mb-3 uppercase">WHAT I BUILT</h3>
              <ul className="space-y-2">
                {displayHighlights.map((highlight, index) => (
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
          {displayTags && displayTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {displayTags.map((tag) => (
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
