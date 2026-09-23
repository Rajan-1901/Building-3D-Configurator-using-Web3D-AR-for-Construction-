import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  User, 
  Sun, 
  DollarSign, 
  Leaf, 
  ShieldCheck, 
  ArrowRight,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { NavigationTab } from '../store/useAppStore';

interface AIAssistantPageProps {
  onNavigate: (tab: NavigationTab) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionCard?: {
    title: string;
    metrics: string[];
    actionLabel: string;
    targetTab: NavigationTab;
  };
}

export const AIAssistantPage: React.FC<AIAssistantPageProps> = ({ onNavigate }) => {
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: "Hello! I am BuildVerse AI Architect Copilot. I can analyze your plot geometry, optimize daylight lux levels, reduce civil construction costs, or calculate LEED carbon metrics. How can I assist your design today?",
      timestamp: "Just now"
    }
  ]);

  const quickPrompts = [
    "Optimize room layout for maximum natural daylight",
    "Reduce civil structural cost by 10% without compromising safety",
    "Suggest carbon-negative materials for LEED Platinum score",
    "Check municipal setback and zoning compliance"
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: "Just now"
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');

    // Generate intelligent contextual response
    setTimeout(() => {
      let reply: ChatMessage;

      if (query.toLowerCase().includes('daylight') || query.toLowerCase().includes('light')) {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: "I analyzed the solar azimuth for your site at 12.9716° N latitude. Orienting the master suite 15° East-North-East increases natural daylight by 24% while cantilever overhangs prevent harsh 2:00 PM thermal load.",
          timestamp: "Just now",
          actionCard: {
            title: "Daylight Optimization Applied",
            metrics: ["+24% Natural Lux", "-18% Artificial Lighting Load", "Glare Index < 12"],
            actionLabel: "View in 3D Configurator",
            targetTab: "configurator"
          }
        };
      } else if (query.toLowerCase().includes('cost') || query.toLowerCase().includes('reduce')) {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: "By switching interior partition walls from red clay bricks to Autoclaved Aerated Concrete (AAC) blocks and standardizing column bay spans to 5.5m, we can trim $6,400 in structural rebar and mortar.",
          timestamp: "Just now",
          actionCard: {
            title: "Cost Shaving Optimization",
            metrics: ["Save $6,400 Total", "7.5% Structural Weight Reduction", "3 Weeks Faster Masonry"],
            actionLabel: "Inspect BOQ Breakdown",
            targetTab: "cost"
          }
        };
      } else if (query.toLowerCase().includes('carbon') || query.toLowerCase().includes('leed') || query.toLowerCase().includes('green')) {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: "Integrating Cross-Laminated Timber (CLT) upper floor slabs and 12.4 kW of BIPV solar roof arrays brings your project score to 94/100, achieving certified LEED Platinum status.",
          timestamp: "Just now",
          actionCard: {
            title: "LEED Platinum Sustainability Audit",
            metrics: ["Green Score 94/100", "12,400 kWh/yr Clean Solar", "8.4 Tons Net CO2 Offset"],
            actionLabel: "Open Sustainability Dashboard",
            targetTab: "sustainability"
          }
        };
      } else {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: `I have evaluated your query regarding "${query}". All structural parameters conform to IBC 2024 and municipal zoning setback guidelines. What would you like to tweak next?`,
          timestamp: "Just now"
        };
      }

      setMessages(prev => [...prev, reply]);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                AI Design & Engineering Copilot
              </h1>
              <Badge variant="purple">GPT-4o BIM</Badge>
            </div>
            <p className="text-xs text-slate-400">Parametric optimization for layouts, daylighting, and structural budgets.</p>
          </div>
        </div>
      </div>

      {/* Main Chat Box */}
      <Card className="min-h-[500px] flex flex-col justify-between p-6 bg-slate-900/95 border-slate-800 shadow-2xl">
        
        {/* Messages Stream */}
        <div className="space-y-6 overflow-y-auto max-h-[420px] pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className="space-y-3 max-w-xl">
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-tr-none'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Optional Interactive Action Card from Assistant */}
                {msg.actionCard && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3 shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        {msg.actionCard.title}
                      </span>
                      <Badge variant="electric" size="sm">OPTIMIZED</Badge>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {msg.actionCard.metrics.map((m, i) => (
                        <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-slate-700">
                          {m}
                        </span>
                      ))}
                    </div>

                    <Button
                      variant="electric"
                      size="sm"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      onClick={() => onNavigate(msg.actionCard!.targetTab)}
                    >
                      {msg.actionCard.actionLabel}
                    </Button>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-cyan-300 shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Prompt Chips & Input Bar */}
        <div className="space-y-3 pt-4 border-t border-slate-800 mt-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs whitespace-nowrap transition cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask AI to optimize floor plan, reduce cost, analyze daylight..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-cyan-400 outline-none"
            />
            <Button
              type="submit"
              variant="electric"
              size="md"
              leftIcon={<Send className="w-4 h-4" />}
            >
              Ask AI
            </Button>
          </form>
        </div>

      </Card>
    </div>
  );
};
