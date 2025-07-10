from pydantic import BaseModel, EmailStr
from typing import List, Optional

class ExperienceEntry(BaseModel):
    company: str
    jobtitle: str
    start: str
    end: Optional[str]
    present: bool
    bullets: List[str]

class EducationEntry(BaseModel):
    school: str
    degree: str
    field: str
    start: str
    level: str
    end: Optional[str]
    present: bool
    bullets: List[str]

class CertificationEntry(BaseModel):
    name: str
    issuer: str
    date: str
    credentialId: Optional[str] = None
    credentialUrl: Optional[str] = None

class Resume(BaseModel):
    firstName: str
    middleInitial: Optional[str]
    lastName: str
    city: str
    state: str

    email: EmailStr
    phone: str
    linkedin: Optional[str] = None
    summary: Optional[str] = ""

    education: Optional[List[EducationEntry]]=[]
    experience: Optional[List[ExperienceEntry]]=[]
    certifications: Optional[List[CertificationEntry]]=[]

    skills: List[str]=[]
    projects: Optional[List[dict]]=[]
