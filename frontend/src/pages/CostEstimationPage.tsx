import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingDown, 
  PieChart as PieIcon, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Download
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CostEstimate, Project } from '../types';
import { api } from '../services/api';
import { NavigationTab } from '../store/useAppStore';

interface CostEstimationPageProps {
  project: Project | null;
  onNavigate: (tab: NavigationTab) => void;
}

export const CostEstimationPage: React.FC<CostEstimationPageProps> = ({ project, onNavigate }) => {
  const [costData, setCostData] = useState<CostEstimate | null>(null);

  useEffect(() => {
    api.estimateCost({
      plot_area_sqft: project?.plot_area || 4000,
      built_up_area_sqft: (project?.plot_area || 4000) * 0.65 * (project?.num_floors || 2),
      quality_grade: "PREMIUM"
    }).then(setCostData);
  }, [project]);

  if (!costData) {
    return (
      <div className="py-20 text-center text-slate-400">
        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        Calculating Real-Time Bill of Quantities...
      </div>
    );
  }

  const chartData = [
    { name: "Civil & Structural", value: costData.materials_cost, color: "#38BDF8" },
    { name: "Labor & Engineering", value: costData.labor_cost, color: "#818CF8" },
    { name: "Electrical & MEP", value: costData.electrical_cost, color: "#F59E0B" },
    { name: "Plumbing & Sanit.", value: costData.plumbing_cost, color: "#10B981" },
    { name: "HVAC & Interior", value: costData.hvac_interior_cost, color: "#EC4899" },
    { name: "Permits & Architect", value: costData.permits_and_architect_fee, color: "#A855F7" },
    { name: "Contingency Fund", value: costData.contingency_fund, color: "#64748B" }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="electric">Dynamic BOQ Engine</Badge>
            <span className="text-xs text-slate-400 font-mono">Spot Market Calibrated</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Cost Estimation & Bill of Quantities (BOQ)
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Itemized material breakdowns, labor schedules, and automated financial variance tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="glass"
            size="md"
            leftIcon={<FileText className="w-4 h-4 text-cyan-400" />}
            onClick={() => onNavigate('reports')}
          >
            Export BOQ Report
          </Button>
        </div>
      </div>

      {/* Top Financial KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="space-y-1">
          <span className="text-xs font-mono uppercase text-slate-400">Total Project Cost</span>
          <p className="text-2xl sm:text-3xl font-bold text-white font-mono">${costData.total_cost.toLocaleString()}</p>
          <span className="text-[11px] text-emerald-400 font-mono">Includes 5% GST & Contingency</span>
        </Card>

        <Card className="space-y-1">
          <span className="text-xs font-mono uppercase text-slate-400">Rate Index / Sq.Ft</span>
          <p className="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono">${costData.cost_per_sqft} <span className="text-xs text-slate-400">/ sq.ft</span></p>
          <span className="text-[11px] text-slate-400 font-mono">Premium Specification Grade</span>
        </Card>

        <Card className="space-y-1">
          <span className="text-xs font-mono uppercase text-slate-400">Civil & Materials</span>
          <p className="text-2xl sm:text-3xl font-bold text-sky-300 font-mono">${costData.materials_cost.toLocaleString()}</p>
          <span className="text-[11px] text-slate-400 font-mono">44% of total expenditure</span>
        </Card>

        <Card className="space-y-1">
          <span className="text-xs font-mono uppercase text-slate-400">Labor & Supervision</span>
          <p className="text-2xl sm:text-3xl font-bold text-indigo-300 font-mono">${costData.labor_cost.toLocaleString()}</p>
          <span className="text-[11px] text-slate-400 font-mono">22% of total expenditure</span>
        </Card>
      </div>

      {/* Visual Charts & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pie Chart Card */}
        <Card className="space-y-4">
          <h3 className="text-base font-bold text-white">Cost Distribution by Discipline</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Cost']}
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {chartData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Savings Suggestions */}
        <Card className="space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-bold text-white">AI Value Engineering Recommendations</h3>
              </div>
              <Badge variant="electric" size="sm">3 Opportunities</Badge>
            </div>

            <div className="space-y-3">
              {costData.savings_suggestions.map((sug, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed">{sug}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <Button
              variant="electric"
              size="md"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => onNavigate('materials')}
            >
              Explore Material Marketplace for Discounts
            </Button>
          </div>
        </Card>

      </div>

      {/* Detailed Bill of Quantities Table */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-base font-bold text-white">Itemized Bill of Quantities (BOQ)</h3>
          <span className="text-xs font-mono text-cyan-400">BIM 4D Schedule of Rates</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Item Description</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Unit Rate</th>
                <th className="py-3 px-4 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {costData.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition">
                  <td className="py-3 px-4 text-cyan-300 font-semibold">{item.category}</td>
                  <td className="py-3 px-4 text-slate-200">{item.item_name}</td>
                  <td className="py-3 px-4 text-slate-400">{item.quantity} {item.unit}</td>
                  <td className="py-3 px-4 text-slate-400">${item.unit_rate}</td>
                  <td className="py-3 px-4 text-right text-white font-bold">${item.subtotal.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
};
