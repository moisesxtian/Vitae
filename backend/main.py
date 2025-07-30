from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.resume_route import router as resume_router

app=FastAPI(
    title="Vitae API",
    description="API for Vitae Resume Builder",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "http://localhost:5173",
    "https://vitae-alpha.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(resume_router, prefix="/api", tags=["resume"])
@app.get("/")
async def root():
    return {"message": "Welcome to the Vitae API"}