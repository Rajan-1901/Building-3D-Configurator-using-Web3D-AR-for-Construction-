import React, { useState } from 'react';
import { 
  Users2, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Send, 
  ShieldCheck, 
  Pin, 
  Sparkles, 
  Layers,
  History
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Comment, Project, User } from '../types';

interface CollaborationPageProps {
  project: Project | null;
  user: User | null;
  comments: Comment[];
  onAddComment: (content: string, position?: { x: number; y: number; z: number }, elementId?: string) => void;
}

export const CollaborationPage: React.FC<CollaborationPageProps> = ({
  project,
  user,
  comments,
  onAddComment
}) => {
  const [commentInput, setCommentInput] = useState('');

  const teamMembers = [
    { name: "Alexander Vance", role: "Lead Architect", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80", status: "Active Now" },
    { name: "Marcus Thorne", role: "Civil Structural Engineer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80", status: "Active Now" },
    { name: "Sarah Jenkins", role: "Homeowner / Client", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80", status: "Reviewed 1h ago" },
    { name: "Rajesh Kulkarni", role: "General Contractor", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80", status: "Active Now" }
  ];

  const versionHistory = [
    { version: "v3.0", author: "Alexander Vance", change: "Added BIPV Solar Roof Array & Balcony Pergola", date: "Today 14:30" },
    { version: "v2.0", author: "Marcus Thorne", change: "Verified foundation structural load calculations", date: "Yesterday" },
    { version: "v1.0", author: "AI Synthesizer", change: "Initial AI BIM generation from plot dimensions", date: "Sep 20" }
  ];

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(commentInput, { x: 0, y: 3.2, z: 0 }, "general_structure");
    setCommentInput('');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="electric">Multiplayer BIM Digital Twin</Badge>
            <span className="text-xs text-slate-400 font-mono">Live WebSocket Sync</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Team Collaboration & 3D Spatial Annotations
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Coordinate design reviews, structural signoffs, and contractor approvals directly on 3D building elements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="success" size="sm">4 Users Connected</Badge>
        </div>
      </div>

      {/* Main Grid: 3D Spatial Comments & Team Members / Versions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Spatial Comments Thread */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="space-y-4 flex flex-col justify-between min-h-[540px]">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-base font-bold text-white">3D Spatial Pin Comments ({comments.length})</h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">Real-Time Annotation Stream</span>
              </div>

              {/* Comments List */}
              <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-2">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span className="font-bold text-white">{comment.author_name || "Lead Architect"}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{comment.created_at.slice(0, 10)}</span>
                    </div>

                    <p className="text-slate-200 leading-relaxed pl-4">{comment.content}</p>

                    {comment.element_id && (
                      <div className="flex items-center gap-2 pl-4 pt-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                          Tagged: {comment.element_id}
                        </span>
                        {comment.is_resolved && (
                          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Resolved
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handlePost} className="pt-3 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder="Add 3D annotation comment or request structural review..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-cyan-400 outline-none"
              />
              <Button
                type="submit"
                variant="electric"
                size="md"
                leftIcon={<Send className="w-4 h-4" />}
              >
                Post
              </Button>
            </form>
          </Card>
        </div>

        {/* Right: Team Roles & Version History */}
        <div className="space-y-6">
          
          {/* Active Stakeholders */}
          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-white">Project Stakeholders</h3>
            <div className="space-y-3">
              {teamMembers.map((member, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                    <div>
                      <p className="font-bold text-white">{member.name}</p>
                      <p className="text-[11px] text-slate-400">{member.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">{member.status}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Version Snapshot History */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">BIM Version History</h3>
              <History className="w-4 h-4 text-cyan-400" />
            </div>

            <div className="space-y-3">
              {versionHistory.map((v, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <Badge variant="electric" size="sm">{v.version}</Badge>
                    <span className="text-[10px] text-slate-500 font-mono">{v.date}</span>
                  </div>
                  <p className="text-slate-200 font-medium">{v.change}</p>
                  <p className="text-[11px] text-slate-400 font-mono">By {v.author}</p>
                </div>
              ))}
            </div>
          </Card>

        </div>

      </div>

    </div>
  );
};
