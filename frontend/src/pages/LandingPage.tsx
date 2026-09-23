import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Sparkles, 
  Camera, 
  Box, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Leaf, 
  TrendingUp, 
  Play, 
  Star, 
  ChevronDown, 
  ChevronUp,
  Cpu,
  Compass,
  DollarSign
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { BuildingScene3D } from '../components/3d/BuildingScene3D';
import { NavigationTab } from '../store/useAppStore';

interface LandingPageProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [plotSize, setPlotSize] = useState<number>(3000);
  const [qualityTier, setQualityTier] = useState<'Standard' | 'Premium' | 'Luxury'>('Premium');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Live ROI Calculation
  const estimatedCost = plotSize * (qualityTier === 'Standard' ? 55 : qualityTier === 'Premium' ? 75 : 110);
  const aiCostSavings = Math.round(estimatedCost * 0.14);
  const timeSavedMonths = 3.5;

  const faqs = [
    {
      q: "How does BuildVerse AI generate 3D building models?",
      a: "Our proprietary AI engine synthesizes architectural layouts based on plot dimensions, municipal zoning setbacks, solar orientation, and budget constraints, producing fully parametric 3D BIM models instantly."
    },
    {
      q: "Can I view the building in Augmented Reality on my actual land plot?",
      a: "Yes! Our WebXR AR studio enables 1:1 real-world scaling. Simply open the app on your mobile browser or tablet, point at your plot, and walk through your future home with millimeter precision."
    },
    {
      q: "How accurate are the AI Cost Estimation and Bill of Quantities (BOQ)?",
      a: "Our BOQ engine is calibrated against spot market prices for structural steel, ready-mix concrete, masonry, and finishes with over 95% historical accuracy across multiple regional markets."
    },
    {
      q: "How does the platform support green building & LEED certification?",
      a: "BuildVerse calculates embodied carbon, annual solar generation potential, rainwater catchment volume, and natural airflow paths, giving your project an instant Green Score and LEED rating."
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-sky-400/20 blur-[120px] pointer-events-none -z-10" />

        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-cyan-500/10"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>Next-Gen AI Construction Planning & WebXR Digital Twin</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.1]"
          >
            Design. Visualize. <br />
            <span className="gradient-text">Build. Experience.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Empowering homeowners, architects, and civil engineers to synthesize AI buildings, customize in 3D BIM, and place structures on physical land with Augmented Reality.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button
              variant="electric"
              size="xl"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={() => onNavigate('wizard')}
            >
              Synthesize AI Building
            </Button>
            <Button
              variant="glass"
              size="xl"
              leftIcon={<Camera className="w-5 h-5 text-cyan-400" />}
              onClick={() => onNavigate('ar_experience')}
            >
              Launch AR Experience
            </Button>
          </motion.div>

          {/* Social Proof / Tech Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> ISO 27001 Certified</span>
            <span className="flex items-center gap-1.5"><Leaf className="w-4 h-4 text-emerald-400" /> LEED Platinum Aligned</span>
            <span className="flex items-center gap-1.5"><Box className="w-4 h-4 text-cyan-400" /> IFC / BIM 4D Ready</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-400" /> 14% Avg. Cost Reduction</span>
          </div>
        </div>

        {/* Interactive 3D Hero Building Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 sm:mt-16 relative rounded-3xl p-2 sm:p-4 bg-gradient-to-b from-slate-800/80 to-slate-950/90 border border-slate-700/80 shadow-2xl shadow-cyan-500/10"
        >
          <div className="w-full h-[450px] sm:h-[580px] rounded-2xl overflow-hidden relative">
            <BuildingScene3D
              config={{
                architectural_style: "Modern Minimalist",
                num_floors: 3,
                wall_color: "#F8FAFC",
                roof_type: "flat_deck",
                has_balcony: true,
                has_garden: true,
                has_parking: true,
                has_solar: true,
                lighting_preset: "Day",
                x_ray_mode: false
              }}
              interactive={true}
            />

            {/* Floating Live 3D Overlay Controls */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
              <div className="bg-slate-950/85 backdrop-blur-md p-3 rounded-2xl border border-slate-700/80 pointer-events-auto flex items-center gap-4 text-xs">
                <div>
                  <p className="text-slate-400 font-mono">BIM Model</p>
                  <p className="font-bold text-white">Villa Elysium 3.0</p>
                </div>
                <div className="h-6 w-px bg-slate-800" />
                <div>
                  <p className="text-slate-400 font-mono">Solar Output</p>
                  <p className="font-bold text-emerald-400">12,400 kWh/yr</p>
                </div>
                <div className="h-6 w-px bg-slate-800" />
                <div>
                  <p className="text-slate-400 font-mono">Green Score</p>
                  <p className="font-bold text-cyan-400">92 / 100</p>
                </div>
              </div>

              <div className="pointer-events-auto">
                <Button
                  variant="electric"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => onNavigate('configurator')}
                >
                  Open in 3D Configurator
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. PROBLEM VS SOLUTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="electric">Industry Transformation</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Traditional Construction vs. BuildVerse AI
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Eliminate architectural miscommunications, budget blowouts, and site rework before ground is broken.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Way */}
          <Card className="border-red-900/30 bg-red-950/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold">
                ✕
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">The Legacy Approach</h3>
                <p className="text-xs text-red-400">Fragmented & Error-Prone</p>
              </div>
            </div>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span>Weeks spent waiting for static 2D blueprint drafting and revisions.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span>Homeowners cannot visualize spaces until concrete columns are already poured.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span>Unpredictable material inflation and unstandardized contractor quotes.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span>Zero environmental lifecycle audits, resulting in high lifetime energy bills.</span>
              </li>
            </ul>
          </Card>

          {/* BuildVerse Way */}
          <Card className="border-cyan-500/40 bg-gradient-to-b from-blue-950/20 to-slate-900/80 space-y-6 shadow-xl shadow-cyan-500/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">The BuildVerse AI Approach</h3>
                <p className="text-xs text-cyan-400">Intelligent, Transparent & Real-Time</p>
              </div>
            </div>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Instant AI synthesis of compliant 3D architectural models in under 10 seconds.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Walk through 1:1 scale buildings directly on physical land with WebXR AR.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Dynamic Bill of Quantities (BOQ) with live market-linked material pricing.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Automated LEED Platinum carbon, solar, and rainwater sustainability metrics.</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* 3. PLATFORM FEATURES SHOWCASE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="purple">End-To-End Enterprise Suite</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Engineered for Modern Construction Workflows
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Generative AI Building Engine</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Input plot dimensions, soil type, and budget to instantly generate fully structural 3D BIM models with automated room schedule optimization.
            </p>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('wizard')} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Try AI Generator
            </Button>
          </Card>

          <Card className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">WebXR 1:1 Augmented Reality</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Position full-scale 3D buildings on actual physical parcels using your phone camera. Move, rotate, inspect clearances, and capture site photos.
            </p>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('ar_experience')} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Open AR Studio
            </Button>
          </Card>

          <Card className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Sustainability & LEED Engine</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Real-time calculations for embodied carbon, annual solar kWh generation, rainwater storage, and natural thermal insulation coefficients.
            </p>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('sustainability')} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              View Green Score
            </Button>
          </Card>

          <Card className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Dynamic BOQ & Cost Estimator</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Itemized Bill of Quantities covering civil, steel rebar, concrete, plumbing, electrical, and interior finishes with budget variance alerts.
            </p>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('cost')} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Explore Cost Engine
            </Button>
          </Card>

          <Card className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Computer Vision Defect Detection</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Upload real site inspection photos to automatically detect hairline stress cracks, water seepage, and column misalignments against BIM geometry.
            </p>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('progress')} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Inspect Site Photos
            </Button>
          </Card>

          <Card className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-600/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Real-Time Digital Twin Sync</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Live collaboration for architects, civil engineers, contractors, and clients with 3D spatial pin comments, approvals, and version histories.
            </p>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('collaboration')} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Collaborate Now
            </Button>
          </Card>
        </div>
      </section>

      {/* 4. INTERACTIVE ROI & EFFICIENCY CALCULATOR */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-8 sm:p-12 border-cyan-500/30 bg-slate-900/90 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <Badge variant="electric">Interactive Value Simulator</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Calculate Your Estimated Project Savings
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Adjust your parcel size and quality grade to see how BuildVerse AI optimizes construction schedules, reduces material waste, and lowers lifecycle energy bills.
              </p>

              {/* Slider 1: Plot Size */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300 uppercase font-mono">Plot Footprint Area</span>
                  <span className="text-cyan-400 font-mono font-bold text-sm">{plotSize.toLocaleString()} sq.ft</span>
                </div>
                <input
                  type="range"
                  min={1200}
                  max={10000}
                  step={200}
                  value={plotSize}
                  onChange={(e) => setPlotSize(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Quality Tier Selector */}
              <div className="space-y-2">
                <span className="text-slate-300 uppercase font-mono text-xs font-semibold">Specification Tier</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['Standard', 'Premium', 'Luxury'] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setQualityTier(tier)}
                      className={`py-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                        qualityTier === tier
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                          : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-500">Project Optimization Output</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <p className="text-xs text-slate-400">Estimated Total Cost</p>
                  <p className="text-2xl font-bold text-white font-mono mt-1">${estimatedCost.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                  <p className="text-xs text-emerald-400">AI Cost Reduction</p>
                  <p className="text-2xl font-bold text-emerald-300 font-mono mt-1">-${aiCostSavings.toLocaleString()}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-300">Pre-Construction Time Saved</span>
                  <span className="text-cyan-400 font-mono font-bold">~{timeSavedMonths} Months</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Accelerated drafting, automated zoning clearance, and instant 3D client approvals.
                </p>
              </div>

              <Button
                variant="electric"
                size="lg"
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => onNavigate('wizard')}
              >
                Synthesize This Building Now
              </Button>
            </div>

          </div>
        </Card>
      </section>

      {/* 5. ENTERPRISE CLIENT TESTIMONIALS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="electric">Trusted by Global Leaders</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            What Top Architects & Developers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "BuildVerse AI cut our client visualization turnaround from 3 weeks to 15 minutes. Being able to take the client directly to their empty plot and view the 1:1 AR model was an absolute game changer."
            </p>
            <div className="pt-2 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="Architect"
                className="w-10 h-10 rounded-full object-cover border border-slate-700"
              />
              <div>
                <p className="text-xs font-bold text-white">David Sterling</p>
                <p className="text-[11px] text-cyan-400 font-mono">Principal Architect, Sterling Design Group</p>
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "The dynamic BOQ calculation and carbon footprint analysis gave our real estate development board complete visibility into material procurement and ESG compliance before laying concrete."
            </p>
            <div className="pt-2 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                alt="Developer"
                className="w-10 h-10 rounded-full object-cover border border-slate-700"
              />
              <div>
                <p className="text-xs font-bold text-white">Priya Sundaram</p>
                <p className="text-[11px] text-cyan-400 font-mono">Head of Engineering, Apex Infrastructure</p>
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "As a first-time homeowner, visualizing rooms in 3D and adjusting wall materials in real-time gave my family immense confidence. We saved over $18,000 on unnecessary structural changes."
            </p>
            <div className="pt-2 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                alt="Homeowner"
                className="w-10 h-10 rounded-full object-cover border border-slate-700"
              />
              <div>
                <p className="text-xs font-bold text-white">Michael Chang</p>
                <p className="text-[11px] text-cyan-400 font-mono">Homeowner, Elysium Modern Villa</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 6. PRICING TIERS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="electric">Flexible Enterprise Plans</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Transparent Pricing For Every Scale
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tier 1 */}
          <Card className="space-y-6">
            <div>
              <p className="text-xs font-mono uppercase text-slate-400">Homeowner & Solo</p>
              <h3 className="text-2xl font-bold text-white mt-1">Starter</h3>
              <p className="text-3xl font-extrabold text-white font-mono mt-4">$0 <span className="text-xs font-normal text-slate-400">/ project</span></p>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> 1 Active AI Project</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> WebXR AR Camera Viewer</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Basic Cost Estimation</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> 3D Building Configurator</li>
            </ul>
            <Button variant="outline" size="md" className="w-full" onClick={() => onNavigate('wizard')}>
              Get Started Free
            </Button>
          </Card>

          {/* Tier 2 (Highlighted) */}
          <Card className="space-y-6 border-cyan-400 bg-gradient-to-b from-blue-950/40 to-slate-900/90 shadow-2xl relative">
            <div className="absolute -top-3 right-6">
              <Badge variant="electric">MOST POPULAR</Badge>
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-cyan-300">Professional Studio</p>
              <h3 className="text-2xl font-bold text-white mt-1">Architect Pro</h3>
              <p className="text-3xl font-extrabold text-white font-mono mt-4">$129 <span className="text-xs font-normal text-slate-400">/ month</span></p>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Unlimited AI Building Syntheses</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> 1:1 Scale WebXR AR on Physical Sites</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Full Dynamic BOQ & PDF Export</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> LEED Carbon & Solar Irradiance Audit</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Real-time Multiplayer Collaboration</li>
            </ul>
            <Button variant="electric" size="lg" className="w-full" onClick={() => onNavigate('wizard')}>
              Start 14-Day Pro Trial
            </Button>
          </Card>

          {/* Tier 3 */}
          <Card className="space-y-6">
            <div>
              <p className="text-xs font-mono uppercase text-slate-400">Enterprise & Developer</p>
              <h3 className="text-2xl font-bold text-white mt-1">Enterprise Cloud</h3>
              <p className="text-3xl font-extrabold text-white font-mono mt-4">Custom <span className="text-xs font-normal text-slate-400">/ annual</span></p>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Dedicated Digital Twin Infrastructure</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Custom IFC / Revit / BIM Pipelines</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> AI Computer Vision Drone Inspection</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> SSO, RBAC & SOC2 Compliance</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> 24/7 SLA & Solutions Engineering</li>
            </ul>
            <Button variant="outline" size="md" className="w-full" onClick={() => onNavigate('settings')}>
              Contact Enterprise Sales
            </Button>
          </Card>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="electric">Common Questions</Badge>
          <h2 className="text-3xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                onClick={() => setOpenFaq(isOpen ? null : index)}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 transition cursor-pointer hover:border-slate-700"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm sm:text-base font-semibold text-white">{faq.q}</h3>
                  <button className="text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
                {isOpen && (
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 pt-3 border-t border-slate-800/80 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl p-8 sm:p-16 bg-gradient-to-r from-blue-900/50 via-slate-900 to-cyan-950/50 border border-cyan-500/40 text-center space-y-6 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to Build the Future of Construction?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Synthesize your first AI building layout, inspect it in 3D BIM, and walk through it in Augmented Reality on your physical land today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              variant="electric"
              size="xl"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={() => onNavigate('wizard')}
            >
              Start Designing With AI Free
            </Button>
            <Button
              variant="glass"
              size="xl"
              onClick={() => onNavigate('dashboard')}
            >
              Open Live Dashboard
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};
