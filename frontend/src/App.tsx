import React, { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectWizardPage } from './pages/ProjectWizardPage';
import { Configurator3DPage } from './pages/Configurator3DPage';
import { ARExperiencePage } from './pages/ARExperiencePage';
import { InteriorDesignerPage } from './pages/InteriorDesignerPage';
import { MaterialMarketplacePage } from './pages/MaterialMarketplacePage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { CostEstimationPage } from './pages/CostEstimationPage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { ConstructionProgressPage } from './pages/ConstructionProgressPage';
import { CollaborationPage } from './pages/CollaborationPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { api } from './services/api';

export function App() {
  const {
    activeTab,
    setActiveTab,
    user,
    setUser,
    project,
    setProject,
    buildingConfig,
    setBuildingConfig,
    arSnapshots,
    setArSnapshots,
    furnitureItems,
    addFurniture,
    removeFurniture,
    updateFurniturePosition,
    comments,
    addComment,
    notifications
  } = useAppStore();

  // Fetch initial project on startup
  useEffect(() => {
    api.getProjectById(1).then((initialProj) => {
      setProject(initialProj);
      if (initialProj.building_config) {
        setBuildingConfig(initialProj.building_config);
      }
    });
  }, []);

  return (
    <AppLayout
      activeTab={activeTab}
      onNavigate={setActiveTab}
      user={user}
      onSelectRole={(role) => {
        if (user) setUser({ ...user, role });
      }}
      notifications={notifications}
    >
      {activeTab === 'landing' && (
        <LandingPage onNavigate={setActiveTab} />
      )}

      {activeTab === 'auth' && (
        <AuthPage
          onLoginSuccess={(loggedUser) => setUser(loggedUser)}
          onNavigate={setActiveTab}
        />
      )}

      {activeTab === 'dashboard' && (
        <DashboardPage
          user={user}
          onNavigate={setActiveTab}
          onSelectProject={(p) => {
            setProject(p);
            if (p.building_config) setBuildingConfig(p.building_config);
          }}
        />
      )}

      {activeTab === 'wizard' && (
        <ProjectWizardPage
          onProjectGenerated={(newProj) => {
            setProject(newProj);
            if (newProj.building_config) setBuildingConfig(newProj.building_config);
          }}
          onNavigate={setActiveTab}
        />
      )}

      {activeTab === 'configurator' && (
        <Configurator3DPage
          project={project}
          buildingConfig={buildingConfig}
          onChangeConfig={setBuildingConfig}
          onNavigate={setActiveTab}
        />
      )}

      {activeTab === 'ar_experience' && (
        <ARExperiencePage
          project={project}
          buildingConfig={buildingConfig}
          arSnapshots={arSnapshots}
          onAddSnapshot={(url) => setArSnapshots((prev) => [url, ...prev])}
          onNavigate={setActiveTab}
        />
      )}

      {activeTab === 'interior' && (
        <InteriorDesignerPage
          furnitureItems={furnitureItems}
          onAddFurniture={addFurniture}
          onRemoveFurniture={removeFurniture}
          onUpdatePosition={updateFurniturePosition}
        />
      )}

      {activeTab === 'materials' && (
        <MaterialMarketplacePage
          buildingConfig={buildingConfig}
          onChangeConfig={setBuildingConfig}
          onNavigate={setActiveTab}
        />
      )}

      {activeTab === 'ai_assistant' && (
        <AIAssistantPage onNavigate={setActiveTab} />
      )}

      {activeTab === 'cost' && (
        <CostEstimationPage
          project={project}
          onNavigate={setActiveTab}
        />
      )}

      {activeTab === 'sustainability' && (
        <SustainabilityPage
          project={project}
          onNavigate={setActiveTab}
        />
      )}

      {activeTab === 'progress' && (
        <ConstructionProgressPage project={project} />
      )}

      {activeTab === 'collaboration' && (
        <CollaborationPage
          project={project}
          user={user}
          comments={comments}
          onAddComment={addComment}
        />
      )}

      {activeTab === 'reports' && (
        <ReportsPage project={project} />
      )}

      {activeTab === 'settings' && (
        <SettingsPage
          user={user}
          onUpdateUser={(updated) => setUser(updated)}
        />
      )}
    </AppLayout>
  );
}

export default App;
