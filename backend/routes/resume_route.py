from fastapi import APIRouter
from models.resumeModel import Resume
from controllers.resumeController import submit_resume
from controllers.analyzeController import analyzeResume
from controllers.recommendJobController import get_job_recommendations
from controllers.analyzeJobRole import analyze_job_role
router = APIRouter()    
@router.post("/submit") 
async def submit_resume_router(data: Resume):
    return await submit_resume(data)

@router.post("/analyze")
async def analyzeResume_router(data: Resume):
    return analyzeResume(data)

@router.get("/job-recommendations")
async def  get_job_recommendations_router(job_role: str, job_location: str):
    return await get_job_recommendations(job_role, job_location)

@router.post("/job_role")
async def get_job_role(data: Resume):
    return analyze_job_role(data)