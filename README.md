# BuildVerse AI

> **Design. Visualize. Build. Experience.**
> 
> *AI-Powered AR Construction Planning, Visualization & Digital Twin Platform*

---

## 🏛️ Project Overview

**BuildVerse AI** is an enterprise-grade architectural AI, WebXR Augmented Reality, and BIM 4D digital twin platform. Built for homeowners, architects, civil engineers, contractors, and real estate developers, BuildVerse enables precision design, real-time 3D customization, 1:1 on-site AR walkthroughs, dynamic Bill of Quantities (BOQ) calculation, and LEED Platinum sustainability lifecycle audits before construction begins.

---

## 🚀 Key Features

### 1. 🤖 Generative AI Building Engine (6-Step Wizard)
- Synthesizes compliant architectural layouts from plot dimensions ($W \times L$), soil classification, and budget constraints.
- Generates parametric 3D BIM elements (foundations, columns, slabs, walls, low-E glazing, balconies, solar roof arrays).
- Produces automated room schedules optimized for natural daylight factor and spatial clearance.

### 2. 🥽 WebXR 1:1 Scale Augmented Reality Experience
- Live ground plane surface detection using GPS reticle targeting.
- Real-world 1:1 scale toggle vs 1:50 tabletop mode.
- Interactive rotate, scale, and translate controls.
- On-site photo capture and simulated video recording with compass heading and geolocation metadata.

### 3. 🏢 3D Parametric BIM Configurator (Three.js & React Three Fiber)
- Real-time storey adjustments ($1$ to $6$ floors).
- Instant facade wall materials (Stucco White, Fair-Faced Concrete, Engineered Timber, Charcoal Slate).
- Environmental lighting presets: **Day**, **Golden Hour**, **Night** (with stellar constellations), and **Blueprint Wireframe**.
- Interactive **X-Ray BIM Structural Wireframe** mode.
- Click-to-inspect element property inspector with fire rating, thickness, and material specs.

### 4. 🛋️ Interior Designer & Furniture Staging Studio
- 2D & 3D room blueprint with drag-and-drop designer furniture catalog.
- Real-time interior cost accumulator and ergonomic clearance validation ($1.2\text{m}$ minimum walking corridor).

### 5. 🧱 Global Material Marketplace
- Physical BIM material library (UHPC Concrete, AAC Blocks, Low-E Double Glazed Glass, Calacatta Gold Italian Marble, CLT Timber, BIPV Solar Roof Tiles).
- Real-time spot price calibration and 1-click application to 3D models.

### 6. 🧠 AI Design & Engineering Copilot
- Natural language chat copilot with contextual recommendation action cards.
- Daylight lux optimization, civil structural cost shaving, and municipal zoning setback checks.

### 7. 📊 Dynamic Cost Estimation & BOQ Engine
- Automated Bill of Quantities (BOQ) with category breakdowns (Civil, Finishes, Electrical, Plumbing, HVAC, Contingency, Taxes).
- Interactive charts (Recharts) with cost per square foot indexing.

### 8. 🌿 Sustainability & LEED Platinum Green Score
- Embodied vs Operational carbon lifecycle auditing ($\text{Tons CO}_2\text{e}$).
- Annual solar energy generation ($\text{kWh/year}$) and dollar offset calculations.
- Rainwater harvesting volume estimations covering $70\%$ of non-potable domestic demands.

### 9. 🔍 Construction Progress & AI Defect Detection
- Site milestone timeline tracking ($68\%$ completion baseline).
- AI Computer Vision scan overlay detecting hairline plaster cracks and efflorescence moisture with confidence bounding boxes.

### 10. 👥 Digital Twin Live Multiplayer Collaboration
- 3D spatial pin comments with element tagging and resolution states.
- Role-based access control (Architect, Civil Engineer, Homeowner, Contractor, Developer).
- Snapshot version history ($v1.0$ through $v3.0$).

### 11. 📄 Executive Reports & Client PDF Export
- Client-ready executive project audits and BOQ schedules exported to downloadable PDF format via `jspdf`.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19, Vite, TypeScript
- **Styling**: Tailwind CSS v4, Glassmorphism, Inter font
- **3D & AR**: Three.js, React Three Fiber (`@react-three/fiber`), React Three Drei (`@react-three/drei`), WebXR
- **Motion & UI**: Framer Motion, Lucide React, Canvas Confetti
- **Data Visualization**: Recharts
- **Document Export**: jsPDF

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database & ORM**: PostgreSQL / SQLite (async with SQLAlchemy 2.0 & aiosqlite)
- **Real-Time Engine**: WebSockets (`/ws/{project_id}`) for Digital Twin state broadcast
- **Validation**: Pydantic v2 & Pydantic-Settings
- **Security**: JWT tokens, OAuth2, Passlib bcrypt, RBAC isolation
- **Containerization**: Docker, Docker Compose

---

## 💻 Getting Started

### Prerequisites
- Node.js `v20+`
- Python `3.11+`

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python main.py
```
API Documentation (Swagger UI) is available at [http://localhost:8000/docs](http://localhost:8000/docs).

### 3. Docker Full-Stack Deployment
```bash
docker-compose up --build
```

---

## 🏆 Smart India Hackathon & Investor Demonstration Guide

1. **Instant Demo Login**: On the `/auth` page or top navigation, click any of the 1-click persona buttons (**Architect**, **Engineer**, **Homeowner**, **Contractor**, **Developer**) to instantly log in.
2. **Synthesize a Building**: Open the **AI Generator** tab, set plot dimensions ($50 \times 80$), choose "Modern Villa", target budget $\$185,000$, select "Modern Minimalist", and click **Synthesize AI Building Design**.
3. **Explore 3D BIM Studio**: Orbit the building in 3D, switch lighting presets (**Day**, **Golden Hour**, **Night**, **Blueprint Wireframe**), and click walls to inspect BIM attributes.
4. **Launch WebXR AR**: Click **View in AR on Actual Land** to open the real-world scale camera view.
5. **Inspect BOQ & Green Score**: Check the itemized material costs in **Cost & BOQ Engine** and download the client-ready tender report in **Reports & PDF Export**.

---

## 📄 License
BuildVerse AI is licensed under the MIT License.

# Building-3D-Configurator-using-Web3D-AR-for-Construction-
