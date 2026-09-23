from typing import Dict, List, Any
from fastapi import WebSocket
import json
import logging

logger = logging.getLogger("buildverse.ws")

class ConnectionManager:
    def __init__(self):
        # Map project_id -> list of active WebSockets
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, project_id: str):
        await websocket.accept()
        if project_id not in self.active_connections:
            self.active_connections[project_id] = []
        self.active_connections[project_id].append(websocket)
        logger.info(f"Client connected to project {project_id}. Total: {len(self.active_connections[project_id])}")

    def disconnect(self, websocket: WebSocket, project_id: str):
        if project_id in self.active_connections:
            if websocket in self.active_connections[project_id]:
                self.active_connections[project_id].remove(websocket)
            if not self.active_connections[project_id]:
                del self.active_connections[project_id]
        logger.info(f"Client disconnected from project {project_id}")

    async def broadcast_to_project(self, project_id: str, message: Dict[str, Any], exclude_ws: WebSocket = None):
        if project_id in self.active_connections:
            serialized = json.dumps(message)
            for connection in self.active_connections[project_id]:
                if connection != exclude_ws:
                    try:
                        await connection.send_text(serialized)
                    except Exception as e:
                        logger.error(f"Error sending message to client: {e}")

manager = ConnectionManager()
