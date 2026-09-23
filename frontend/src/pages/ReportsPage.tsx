import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Share2, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  Sparkles,
  Award
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Project } from '../types';

interface ReportsPageProps {
  project: Project | null;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ project }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.text("BuildVerse AI - BIM Executive Project Audit", 20, 25);
      doc.setFontSize(12);
      doc.text(`Project Title: ${project?.title || "Elysium Modern Eco-Villa"}`, 20, 38);
      doc.text(`Architectural Style: ${project?.architectural_style || "Modern Minimalist"}`, 20, 46);
      doc.text(`Total Plot Footprint: ${(project?.plot_area || 4000).toLocaleString()} sq.ft`, 20, 54);
      doc.text(`Target Project Budget: $${(project?.target_budget || 185000).toLocaleString()}`, 20, 62);
      doc.text(`LEED Sustainability Status: 94/100 (Platinum Certified)`, 20, 70);
      doc.text(`Annual Solar Clean Energy: 12,400 kWh/year`, 20, 78);
      doc.text("Zoning Setbacks: 100% Compliant with Municipal Guidelines", 20, 86);
      doc.text("Report ID: BV-REP-2026-PLATINUM", 20, 100);
      doc.save(`BuildVerse-Audit-${project?.id || '101'}.pdf`);
      setIsExporting(false);
    }, 500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="electric">Executive Audit Document</Badge>
            <span className="text-xs text-slate-400 font-mono">Client & Investor Deliverable</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Reports & Comprehensive BIM Audit
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Generate and download institutional-grade project audits, BOQ spreadsheets, and sustainability certificates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="electric"
            size="md"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={handleExportPDF}
            isLoading={isExporting}
          >
            Export Client PDF
          </Button>
        </div>
      </div>

      {/* Printable Report Document Card Preview */}
      <Card className="p-8 sm:p-12 bg-slate-900 border-slate-700 shadow-2xl space-y-8 text-slate-200">
        
        {/* Document Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-700">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-cyan-400" />
              <span className="text-xl font-bold text-white tracking-tight">BuildVerse AI Executive Audit</span>
            </div>
            <p className="text-xs text-slate-400">Digital Twin & Architectural Schedule of Works</p>
          </div>

          <div className="text-right text-xs font-mono text-slate-400 space-y-1">
            <p className="text-white font-bold">DOC ID: BV-REP-0923</p>
            <p>Date: Sep 23, 2026</p>
            <Badge variant="success" size="sm">APPROVED FOR TENDER</Badge>
          </div>
        </div>

        {/* Section 1: Project Metadata */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">1. Project Specifications</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">PROJECT</span>
              <span className="text-white font-bold">{project?.title || "Elysium Modern Eco-Villa"}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">TYPOLOGY</span>
              <span className="text-white font-bold">{project?.building_type || "Modern Villa"}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">BUILT-UP AREA</span>
              <span className="text-white font-bold">3,600 sq.ft</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">TOTAL BUDGET</span>
              <span className="text-cyan-400 font-bold">${(project?.target_budget || 185000).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Bill of Quantities Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">2. Bill of Quantities (BOQ) Summary</h3>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Civil & Structural Works (TMT Rebar & Ready-Mix M30)</span>
              <span className="text-white font-bold">$77,700</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Masonry, AAC Blocks & Low-E Glazing</span>
              <span className="text-white font-bold">$33,300</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Smart Electrical, Lighting & MEP Conduit</span>
              <span className="text-white font-bold">$22,200</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Plumbing, Kohler Fixtures & Rainwater Catchment</span>
              <span className="text-white font-bold">$16,650</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Taxes, GST & Contingency Reserve (5%)</span>
              <span className="text-cyan-400 font-bold">$9,250</span>
            </div>
          </div>
        </div>

        {/* Section 3: LEED Environmental Certification */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">3. Environmental & Net-Zero Rating</h3>
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs">
            <div className="space-y-1">
              <span className="font-bold text-emerald-300 block text-sm">LEED Platinum Certified Score: 94 / 100</span>
              <p className="text-slate-400 text-[11px]">
                Annual clean solar output of 12,400 kWh displaces 8.4 tons of operational CO2 emissions.
              </p>
            </div>
            <Award className="w-10 h-10 text-emerald-400 shrink-0" />
          </div>
        </div>

        {/* Signatures & Certification stamps */}
        <div className="pt-6 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div>
            <p className="text-white font-bold">Alexander Vance, AIA</p>
            <p className="text-[10px]">Lead Architect & BIM Validator</p>
          </div>
          <div className="text-right">
            <p className="text-white font-bold">Marcus Thorne, PE</p>
            <p className="text-[10px]">Civil & Structural Engineer</p>
          </div>
        </div>

      </Card>
    </div>
  );
};
