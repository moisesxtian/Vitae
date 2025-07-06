from fastapi import APIRouter
from models.resumeModel import Resume
from controllers.resumeController import submit_resume
from controllers.analyzeController import analyzeResume
router = APIRouter()
@router.post("/submit") 
async def submit_resume_router(data: Resume):
    return await submit_resume(data)

@router.post("/analyze")
async def analyzeResume_router(data: Resume):
    return analyzeResume(data)