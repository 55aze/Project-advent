import type { Project, DailyUpdate } from '../types/update';

interface ProjectListProps {
  projects: Project[];
  updates: DailyUpdate[];
  selectedProject: string | null;
  onSelectProject: (projectId: string | null) => void;
}

export function ProjectList({ projects, updates, selectedProject, onSelectProject }: ProjectListProps) {
  const getProjectStats = (projectId: string) => {
    const projectUpdates = updates.filter(u => u.projectId === projectId);
    const released = projectUpdates.filter(u => u.status === 'released').length;
    const total = projectUpdates.length;
    return { released, total };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">PROJECTS</h2>
        <button
          onClick={() => onSelectProject(null)}
          className={`px-4 py-2 border-2 border-foreground font-bold uppercase text-sm pixel-border-sm retro-hover ${
            selectedProject === null ? 'bg-foreground text-background' : 'bg-background'
          }`}
        >
          ALL
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => {
          const stats = getProjectStats(project.id);
          const isSelected = selectedProject === project.id;

          return (
            <button
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className={`text-left border-4 border-foreground p-4 pixel-border retro-hover ${
                isSelected ? 'bg-foreground text-background' : 'bg-background'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className="text-3xl border-2 border-foreground p-2"
                  style={{ backgroundColor: isSelected ? 'white' : project.color }}
                >
                  {project.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm mb-1 uppercase truncate">
                    {project.name}
                  </h3>
                  <p className="text-xs opacity-80 mb-2 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex gap-2 text-xs font-mono">
                    <span className="px-2 py-1 border border-current font-bold">
                      {stats.released} RELEASED
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
