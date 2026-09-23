from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List
from datetime import datetime, timezone
from app.schemas.collaboration import CommentCreate, CommentResponse
from app.websocket.connection_manager import manager

router = APIRouter(prefix="/collaboration", tags=["Collaboration & Digital Twin"])

# In-memory collaboration comments for fast live sync
MOCK_COMMENTS: List[CommentResponse] = [
    CommentResponse(
        id=1,
        project_id=1,
        author_id=1,
        content="Consider expanding the solar panel arrays on the Southern terrace for 18% greater output.",
        position_3d={"x": 2.5, "y": 6.8, "z": -1.2},
        element_id="roof_deck",
        parent_id=None,
        is_resolved=False,
        created_at=datetime.now(timezone.utc)
    ),
    CommentResponse(
        id=2,
        project_id=1,
        author_id=2,
        content="Structural engineer approved the foundation column loading for Level 2 extension.",
        position_3d={"x": -3.0, "y": 0.5, "z": 2.0},
        element_id="slab_foundation",
        parent_id=None,
        is_resolved=True,
        created_at=datetime.now(timezone.utc)
    )
]

@router.get("/comments/{project_id}", response_model=List[CommentResponse])
async def get_comments(project_id: int):
    return [c for c in MOCK_COMMENTS if c.project_id == project_id]

@router.post("/comments/{project_id}", response_model=CommentResponse)
async def add_comment(project_id: int, comment_in: CommentCreate):
    new_comment = CommentResponse(
        id=len(MOCK_COMMENTS) + 1,
        project_id=project_id,
        author_id=1,
        content=comment_in.content,
        position_3d=comment_in.position_3d,
        element_id=comment_in.element_id,
        parent_id=comment_in.parent_id,
        is_resolved=False,
        created_at=datetime.now(timezone.utc)
    )
    MOCK_COMMENTS.append(new_comment)
    # Broadcast to live WebSockets
    await manager.broadcast_to_project(str(project_id), {
        "type": "NEW_COMMENT",
        "data": new_comment.model_dump(mode="json")
    })
    return new_comment
