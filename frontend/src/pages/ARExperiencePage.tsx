import React, { useState } from 'react';
import { 
  Camera, 
  Sparkles, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Share2, 
  CheckCircle2, 
  Maximize2,
  Compass,
  MapPin,
  Eye,
  Sliders,
  ArrowRight
} from 'lucide-react';
import { ARViewer3D } from '../components/3d/ARViewer3D';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { BuildingConfig, Project } from '../types';
import { NavigationTab } from '../store/useAppStore';

interface ARExperiencePageProps {
  project: Project | null;
  buildingConfig: BuildingConfig;
  arSnapshots: string[];
  onAddSnapshot: (url: string) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const ARExperiencePage: React.FC<ARExperiencePageProps> = ({
  project,
  buildingConfig,
  arSnapshots,
  onAddSnapshot,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'live_ar' | 'gallery'>('live_ar');

  const defaultSnapshots = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
  ];

  const allSnapshots = arSnapshots.length > 0 ? arSnapshots : defaultSnapshots;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="electric">WebXR 1:1 AR Spatial Studio</Badge>
            <span className="text-xs text-slate-400 font-mono">GPS Surface Raycast</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Real-World Augmented Reality Experience
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Project and scale your 3D digital twin directly onto your physical land parcel before excavation begins.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={activeTab === 'live_ar' ? 'electric' : 'secondary'}
            size="md"
            leftIcon={<Camera className="w-4 h-4" />}
            onClick={() => setActiveTab('live_ar')}
          >
            AR Camera
          </Button>
          <Button
            variant={activeTab === 'gallery' ? 'electric' : 'secondary'}
            size="md"
            leftIcon={<Eye className="w-4 h-4" />}
            onClick={() => setActiveTab('gallery')}
          >
            Site Captures ({allSnapshots.length})
          </Button>
        </div>
      </div>

      {activeTab === 'live_ar' ? (
        <div className="space-y-6">
          {/* Main 3D AR Viewer */}
          <ARViewer3D
            config={buildingConfig}
            onCaptureSnapshot={(url) => onAddSnapshot(url)}
          />

          {/* AR Features Guide Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <Maximize2 className="w-4 h-4" />
                <span>1:1 Real-World Scaling</span>
              </div>
              <p className="text-xs text-slate-300">
                Walk through full-scale doorways, verify ceiling heights, and evaluate room clearance against physical property boundaries.
              </p>
            </Card>

            <Card className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <Compass className="w-4 h-4" />
                <span>Solar Horizon Alignment</span>
              </div>
              <p className="text-xs text-slate-300">
                Align building orientation with real-world solar azimuth to confirm daylight penetration into living lounges and bedrooms.
              </p>
            </Card>

            <Card className="space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Client & Investor Demos</span>
              </div>
              <p className="text-xs text-slate-300">
                Capture high-resolution site photos and record walkaround videos for stakeholder signoffs and municipal approvals.
              </p>
            </Card>
          </div>
        </div>
      ) : (
        /* Snapshot Gallery */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allSnapshots.map((snap, i) => (
              <Card key={i} className="p-0 overflow-hidden group">
                <div className="h-64 w-full overflow-hidden relative">
                  <img
                    src={snap}
                    alt={`AR Capture ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="electric">Site Capture #{i + 1}</Badge>
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <a
                      href={snap}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-slate-900/90 text-white hover:bg-slate-800 transition cursor-pointer border border-white/10"
                      title="Download Full Resolution"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div className="p-4 bg-slate-950 space-y-1">
                  <p className="text-xs font-bold text-white">AR Overlay Verification</p>
                  <p className="text-[11px] text-slate-400">Captured with GPS surface alignment • 12.9716° N, 77.5946° E</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center pt-4">
            <Button
              variant="electric"
              size="lg"
              leftIcon={<Camera className="w-4 h-4" />}
              onClick={() => setActiveTab('live_ar')}
            >
              Return to AR Camera View
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};
