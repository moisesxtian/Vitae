from fastapi import APIRouter, File, UploadFile
from models.resumeModel import Resume
from models.resumeModel import MessageRequest
from controllers.resumeController import submit_resume
from controllers.analyzeController import analyzeResume
from controllers.recommendJobController import get_job_recommendations
from controllers.analyzeJobRole import analyze_job_role
from controllers.messageController import get_ai_message
from controllers.linkedInController import analyzeLinkedIn
from fastapi import Body
from models.resumeModel import ResumeWrapper
router = APIRouter()    
@router.post("/submit") 
async def submit_resume_router(wrapper: ResumeWrapper):
    return await submit_resume(wrapper)

@router.post("/analyze")
async def analyzeResume_router(data):
    return analyzeResume(data)

@router.post("/message")
async def get_ai_message_router(request:MessageRequest):
    return get_ai_message(request)
@router.get("/job-recommendations")
async def  get_job_recommendations_router(job_role: str, job_location: str):
    return await get_job_recommendations(job_role, job_location)

@router.post("/job_role")
async def get_job_role(data: Resume):
    return analyze_job_role(data)

@router.post("/linkedin")
async def analyzeLinkedIn_router(uploadFile: UploadFile=File(...)):
    return await analyzeLinkedIn(uploadFile)