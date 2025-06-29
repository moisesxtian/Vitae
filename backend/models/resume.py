from pydantic import BaseModel, EmailStr
from typing import List, Optional

class BasicInfo(BaseModel):
    firstName: str
    middleInitial: Optional[str] = None
    lastName: str

    email: EmailStr
    phone: str
    linkedIn: Optional[str] = None
    portfolio: Optional[str] = None

    country: str
    region: str
    province: str
    city: str

    education: List[EducationEntry]