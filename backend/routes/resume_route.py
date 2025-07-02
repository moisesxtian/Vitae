from fastapi import APIRouter
from models.resumeModel import Resume
from controllers.resumeController import submit_resume

router = APIRouter()
@router.post("/submit") 
async def submit_resume_router(data: Resume):
    return await submit_resume(data)