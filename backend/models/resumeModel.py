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
    end: Optional[str]
    present: bool

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

    email: EmailStr
    phone: str
    linkedin: Optional[str] = None
    summary: Optional[str] = ""

    education: List[EducationEntry]
    experience: List[ExperienceEntry]
    certifications: List[CertificationEntry]

    skills: List[str]
    projects: List[dict]  # Update this if you have a fixed project schema
