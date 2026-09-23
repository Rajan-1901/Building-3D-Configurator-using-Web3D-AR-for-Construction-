import React, { useState } from 'react';
import { 
  CheckSquare, 
  Clock, 
  Upload, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Image as ImageIcon,
  ChevronRight,
  Eye
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DefectInspection, Project } from '../types';
import { api } from '../services/api';

interface ConstructionProgressPageProps {
  project: Project | null;
}

export const ConstructionProgressPage: React.FC<ConstructionProgressPageProps> = ({ project }) => {
  const [inspection, setInspection] = useState<DefectInspection | null>({
    id: 101,
    project_id: project?.id || 1,
    image_url: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80",
    detected_defects: [
      {
        defect_type: "Hairline Plaster Stress Crack",
        severity: "LOW",
        confidence: 0.96,
        bounding_box: [0.24, 0.35, 0.18, 0.08],
        location_description: "Upper East perimeter lintel beam junction",
        suggested_action: "Apply elastomeric polymer grout before final exterior coat."
      },
      {
        defect_type: "Surface Moisture Efflorescence",
        severity: "MEDIUM",
        confidence: 0.89,
        bounding_box: [0.62, 0.55, 0.22, 0.14],
        location_description: "Ground floor plinth junction",
        suggested_action: "Inject damp-proof siliconate barrier and check drainage slope."
      }
    ],
    completion_estimated: 68.5,
    inspection_notes: "AI computer vision model compared 142 structural joints with BIM master geometry. Structural integrity nominal. Minor cosmetic remediation recommended.",
    inspector_name: "BuildVerse AI Vision Engine v4.2",
    status: "ANALYZED",
    created_at: new Date().toISOString()
  });

  const [isScanning, setIsScanning] = useState(false);

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1000);
  };

  const milestones = [
    { title: "1. Substructure & Foundation Piling", date: "Aug 2026", status: "COMPLETED", progress: 100, budget: "$38,000" },
    { title: "2. RCC Column & Slab Superstructure", date: "Sep 2026", status: "IN_PROGRESS", progress: 85, budget: "$64,000" },
    { title: "3. Masonry, AAC Wall Infill & Plaster", date: "Oct 2026", status: "IN_PROGRESS", progress: 40, budget: "$28,000" },
    { title: "4. MEP, Solar Inverter & Smart Conduit", date: "Nov 2026", status: "PENDING", progress: 10, budget: "$32,000" },
    { title: "5. Italian Marble Flooring & Finishes", date: "Dec 2026", status: "PENDING", progress: 0, budget: "$23,000" }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="electric">Computer Vision Site AI</Badge>
            <span className="text-xs text-slate-400 font-mono">BIM vs Reality Deviation Scanner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Construction Progress & AI Defect Detection
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Automated image comparison between physical site photographs and 3D BIM digital twin ground truth.
          </p>
        </div>

        <Button
          variant="electric"
          size="md"
          leftIcon={<Upload className="w-4 h-4" />}
          onClick={handleSimulateScan}
          isLoading={isScanning}
        >
          Upload New Site Photo
        </Button>
      </div>

      {/* Main Grid: AI Inspection Scanner & Milestone Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: AI Defect Scanner Image with Bounding Boxes */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold text-white">AI Visual Inspection Analysis</h3>
            </div>
            <Badge variant="success" size="sm">68.5% Completion Verified</Badge>
          </div>

          {/* Photo Display with Simulated CV Reticle Overlays */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-black h-72 sm:h-80">
            <img
              src={inspection?.image_url}
              alt="Site Inspection"
              className="w-full h-full object-cover opacity-85"
            />
            
            {/* Defect Bounding Boxes */}
            <div className="absolute top-[35%] left-[24%] w-[35%] h-[15%] border-2 border-emerald-400 bg-emerald-500/20 rounded-md p-1 pointer-events-none animate-pulse">
              <span className="text-[9px] font-mono bg-emerald-950 text-emerald-300 px-1 py-0.5 rounded border border-emerald-400 block font-bold w-max">
                Hairline Crack (96% Conf.)
              </span>
            </div>

            <div className="absolute top-[55%] left-[58%] w-[30%] h-[25%] border-2 border-amber-400 bg-amber-500/20 rounded-md p-1 pointer-events-none">
              <span className="text-[9px] font-mono bg-amber-950 text-amber-300 px-1 py-0.5 rounded border border-amber-400 block font-bold w-max">
                Efflorescence Moisture (89% Conf.)
              </span>
            </div>
          </div>

          {/* Detected Defects List */}
          <div className="space-y-3 pt-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Detected Issues & Remediation</p>
            {inspection?.detected_defects.map((defect, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{defect.defect_type}</span>
                  <Badge variant={defect.severity === 'LOW' ? 'neutral' : 'warning'} size="sm">
                    {defect.severity} SEVERITY
                  </Badge>
                </div>
                <p className="text-slate-400 text-[11px]">{defect.location_description}</p>
                <p className="text-cyan-300 text-[11px] font-mono mt-1">Action: {defect.suggested_action}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: Milestone Timeline */}
        <Card className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">Construction Milestones</h3>
            <span className="text-xs font-mono text-cyan-400">Target Handover: Dec 2026</span>
          </div>

          <div className="space-y-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{m.title}</span>
                    <span className="text-[11px] text-slate-400 font-mono">Budget: {m.budget} • {m.date}</span>
                  </div>
                  <Badge variant={m.status === 'COMPLETED' ? 'success' : m.status === 'IN_PROGRESS' ? 'electric' : 'neutral'}>
                    {m.status}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      m.progress === 100 ? 'bg-emerald-400' : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                    }`}
                    style={{ width: `${m.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Total Structural Verification:</span>
            <span className="text-emerald-400 font-bold font-mono">142/142 Joints Verified</span>
          </div>
        </Card>

      </div>

    </div>
  );
};
