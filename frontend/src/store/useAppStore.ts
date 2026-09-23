import { useState, useEffect } from 'react';
import { Project, User, UserRole, BuildingConfig, FurnitureItem, Material, Comment } from '../types';

export type NavigationTab = 
  | 'landing' 
  | 'dashboard' 
  | 'wizard' 
  | 'configurator' 
  | 'ar_experience' 
  | 'interior' 
  | 'materials' 
  | 'ai_assistant' 
  | 'cost' 
  | 'sustainability' 
  | 'progress' 
  | 'collaboration' 
  | 'reports' 
  | 'settings'
  | 'auth';

const DEFAULT_USER: User = {
  id: 1,
  email: "alexander.vance@autodesk-buildverse.com",
  full_name: "Alexander Vance",
  role: "ARCHITECT",
  organization: "Vance & Partners Global Architecture",
  phone: "+1 (555) 382-9102",
  avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
  is_active: true,
  is_verified: true,
  created_at: "2026-01-15T08:00:00Z"
};

const DEFAULT_FURNITURE: FurnitureItem[] = [
  { id: 'f1', name: "Minimalist Italian Sofa", category: "Living", dimensions: [2.4, 0.85, 0.95], color: "#334155", position: [-1.5, 0.45, 1.2], rotation: 0, price: 3200 },
  { id: 'f2', name: "Nordic Oak Coffee Table", category: "Living", dimensions: [1.2, 0.4, 0.7], color: "#B45309", position: [-1.5, 0.2, 0.0], rotation: 0, price: 850 },
  { id: 'f3', name: "Bespoke Walnut Dining Set (8-Seater)", category: "Dining", dimensions: [2.6, 0.75, 1.1], color: "#78350F", position: [2.0, 0.4, -1.0], rotation: 90, price: 4600 },
  { id: 'f4', name: "King Platform Bed & Headboard", category: "Bedroom", dimensions: [2.1, 1.1, 2.0], color: "#475569", position: [1.8, 0.5, 2.2], rotation: 0, price: 3800 },
  { id: 'f5', name: "Executive Ergonomic Desk & Herman Miller Chair", category: "Office", dimensions: [1.8, 0.75, 0.9], color: "#1E293B", position: [-2.2, 0.45, -2.0], rotation: 45, price: 2400 },
];

export function useAppStore() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('landing');
  const [user, setUser] = useState<User | null>(DEFAULT_USER);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  
  // Active Project State
  const [project, setProject] = useState<Project | null>(null);

  // 3D Configurator State
  const [buildingConfig, setBuildingConfig] = useState<BuildingConfig>({
    architectural_style: "Modern Minimalist",
    num_floors: 2,
    wall_color: "#F8FAFC",
    roof_type: "flat_deck",
    has_balcony: true,
    has_garden: true,
    has_parking: true,
    has_solar: true,
    lighting_preset: "Day",
    x_ray_mode: false,
    camera_view: "Perspective"
  });

  // Selected 3D Element for inspection
  const [selected3DElement, setSelected3DElement] = useState<string | null>(null);

  // AR Experience State
  const [arScale, setArScale] = useState<number>(1.0);
  const [arRotation, setArRotation] = useState<number>(0);
  const [arPlacementConfirmed, setArPlacementConfirmed] = useState<boolean>(false);
  const [arSnapshots, setArSnapshots] = useState<string[]>([]);

  // Interior Designer Items
  const [furnitureItems, setFurnitureItems] = useState<FurnitureItem[]>(DEFAULT_FURNITURE);
  const [selectedFurnitureId, setSelectedFurnitureId] = useState<string | null>(null);

  // Collaboration Comments
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      project_id: 1,
      author_id: 1,
      author_name: "Alexander Vance (Lead Architect)",
      author_role: "ARCHITECT",
      content: "Oriented primary glazing 15° North-East to prevent direct solar glare in the afternoon while maximizing diffuse daylight.",
      position_3d: { x: 2.5, y: 3.5, z: 1.0 },
      element_id: "window_facade_lvl_1",
      is_resolved: false,
      created_at: "2026-09-23T11:20:00Z"
    },
    {
      id: 2,
      project_id: 1,
      author_id: 2,
      author_name: "Marcus Thorne (Civil Engineer)",
      author_role: "ENGINEER",
      content: "Confirmed cantilever structural reinforcement for the level-2 balcony terrace. Ready for municipal signoff.",
      position_3d: { x: 0.0, y: 3.2, z: 6.0 },
      element_id: "balcony_lvl_1",
      is_resolved: true,
      created_at: "2026-09-23T12:45:00Z"
    }
  ]);

  // Notifications
  const [notifications, setNotifications] = useState<{ id: string; title: string; message: string; type: 'info' | 'success' | 'warning'; timestamp: string }[]>([
    { id: '1', title: "AI BIM Verification Complete", message: "All 142 structural joints meet Eurocode 8 & IBC standards.", type: 'success', timestamp: "10 mins ago" },
    { id: '2', title: "Solar Irradiance Calculated", message: "Annual projected offset increased to 12,400 kWh.", type: 'info', timestamp: "1 hour ago" },
    { id: '3', title: "Material Quotation Updated", message: "Structural Steel TMT price synced with spot market rates.", type: 'info', timestamp: "3 hours ago" }
  ]);

  const addComment = (content: string, position?: { x: number; y: number; z: number }, elementId?: string) => {
    const newComment: Comment = {
      id: comments.length + 1,
      project_id: project?.id || 1,
      author_id: user?.id || 1,
      author_name: user ? `${user.full_name} (${user.role})` : "Collaborator",
      author_role: user?.role || "ARCHITECT",
      content,
      position_3d: position,
      element_id: elementId,
      is_resolved: false,
      created_at: new Date().toISOString()
    };
    setComments(prev => [newComment, ...prev]);
  };

  const addFurniture = (item: Omit<FurnitureItem, 'id'>) => {
    const newItem: FurnitureItem = {
      ...item,
      id: `f_${Date.now()}`
    };
    setFurnitureItems(prev => [...prev, newItem]);
  };

  const removeFurniture = (id: string) => {
    setFurnitureItems(prev => prev.filter(f => f.id !== id));
  };

  const updateFurniturePosition = (id: string, position: [number, number, number], rotation?: number) => {
    setFurnitureItems(prev => prev.map(f => f.id === id ? { ...f, position, rotation: rotation ?? f.rotation } : f));
  };

  return {
    activeTab,
    setActiveTab,
    user,
    setUser,
    isDarkMode,
    setIsDarkMode,
    project,
    setProject,
    buildingConfig,
    setBuildingConfig,
    selected3DElement,
    setSelected3DElement,
    arScale,
    setArScale,
    arRotation,
    setArRotation,
    arPlacementConfirmed,
    setArPlacementConfirmed,
    arSnapshots,
    setArSnapshots,
    furnitureItems,
    setFurnitureItems,
    selectedFurnitureId,
    setSelectedFurnitureId,
    addFurniture,
    removeFurniture,
    updateFurniturePosition,
    comments,
    addComment,
    notifications,
    setNotifications
  };
}
