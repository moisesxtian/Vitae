from google import genai
from google.genai import types
import os 
from dotenv import load_dotenv
import pymupdf4llm
import fitz

load_dotenv()
GENAI_API_KEY = os.environ.get("GENAI_API_KEY")
prompt = """
Rules:
- You must output valid JSON. No extra prose or comments outside the JSON object.
  - Education (school + degree or level),
  - Experience (company + jobtitle + start + 1+ bullets),
  - Project (name + description),
  - Skills (at least two entries)

Clarify any unclear acronyms or entries from the user. Expand common terms like:
- “BSCS” → “Bachelor of Science in Computer Science (BSCS)”
- “MERN” → “MongoDB, Express.js, React.js, Node.js (MERN)”

---
> You are a resume parsing and enhancement assistant.
> Below is a resume extracted from a PDF file as plain text.
> Your task is to:
>
> 1. Parse the resume.
> 2. Structure the data as `formData` using the exact JSON schema below.
> 3. Ensure the data is complete, consistent, and rewritten in professional tone.

```EXAMPLE RESPONSE json
{
    "profileImage": "",
    "firstName": "Christian",
    "middleInitial": "S",
    "lastName": "Moises",
    "city": "Taytay",
    "state": "Rizal",
    "email": "christiansmoises023@gmail.com",
    "phone": "+639770210700",
    "linkedin": "https://linkedin.com/in/christian-moises/",
    "summary": "Highly motivated Computer Science professional with expertise in Artificial Intelligence, Machine Learning, and full-stack web development. Proven ability to develop and deploy cutting-edge AI models, build robust web applications, and manage dynamic social media campaigns. Seeking to leverage strong technical skills and creative problem-solving to contribute to innovative projects.",
    "education": [
        {
            "school": "STI College Ortigas-Cainta",
            "degree": "Bachelor of Science",
            "field": "Computer Science",
            "start": "2021-01",
            "level": "College",
            "end": "2025-01",
            "present": false,
            "bullets": [
                "Graduated Cum Laude, demonstrating academic excellence in Computer Science."
            ]
        }
    ],
    "experience": [
        {
            "company": "Fiverr",
            "jobtitle": "Multi Media Artist",
            "start": "2019-01",
            "end": "",
            "present": true,
            "bullets": [
                "Designed and produced engaging multimedia content, including graphics and videos, for diverse clients, resulting in increased social media engagement and follower growth.",
                "Managed client relationships and project timelines, consistently delivering high-quality visual assets on schedule."
            ]
        },
        {
            "company": "SP Madrid & Associates",
            "jobtitle": "AI/ML Intern",
            "start": "2025-02",
            "end": "2025-04",
            "present": false,
            "bullets": [
                "Developed and deployed advanced machine learning models, specifically YOLO-based architectures, for precise conduction sticker text detection and vehicle classification, contributing to improved data accuracy and efficiency."
            ]
        },
        {
            "company": "Tails of Manila",
            "jobtitle": "Social Media Manager",
            "start": "2023-09",
            "end": "2025-01",
            "present": false,
            "bullets": [
                "Managed and executed comprehensive social media strategies, analyzing performance metrics to optimize content and campaigns, significantly boosting platform engagement and expanding follower base.",
                "Oversaw content calendar, scheduling, and community interaction across platforms, ensuring consistent brand voice and messaging."
            ]
        }
    ],
    "certifications": [
        {
            "name": "Supervised Learning with Scikit Learn",
            "issuer": "DataCamp",
            "date": "",
            "credentialId": "",
            "credentialUrl": ""
        },
        {
            "name": "Intermediate Python",
            "issuer": "DataCamp",
            "date": "",
            "credentialId": "",
            "credentialUrl": ""
        },
        {
            "name": "Data Science in Python",
            "issuer": "DataCamp",
            "date": "",
            "credentialId": "",
            "credentialUrl": ""
        },
        {
            "name": "Java Foundation",
            "issuer": "Oracle",
            "date": "",
            "credentialId": "",
            "credentialUrl": ""
        },
        {
            "name": "AI For Everyone",
            "issuer": "DeepLearning.AI",
            "date": "",
            "credentialId": "",
            "credentialUrl": ""
        },
        {
            "name": "UI/UX",
            "issuer": "Great Learning",
            "date": "",
            "credentialId": "",
            "credentialUrl": ""
        }
    ],
    "skills": [
        "React",
        "Tailwind CSS",
        "Node.js",
        "JSON Web Tokens (JWT)",
        "Mediapipe",
        "Scikit-learn",
        "Data Science",
        "Java",
    ],
    "projects": [
        {
            "name": "Vitae: AI Resume Builder",
            "description": "Developed a modern resume builder featuring a multi-step form, real-time PDF previews, and an integrated AI assistant for resume data extraction through natural chat conversations.",
            "techStacks": [
                "React",
                "Tailwind CSS",
                "FastAPI",
                "Jinja2",
                "AI"
            ]
        },
        {
            "name": "Reptr: Exercise Tracker Web Application",
            "description": "Built a full-stack MERN application for workout tracking, featuring secure user authentication with JWT and comprehensive CRUD capabilities for exercise logging via a responsive React frontend and Node.js/Express backend.",
            "techStacks": [
                "MERN Stack",
                "React",
                "Node.js",
                "Express.js",
                "MongoDB",
                "JSON Web Tokens (JWT)"
            ]
        }
    ]
}
"""
async def analyzeLinkedIn(pdfblob):
    try:
        pdf = fitz.open(stream=pdfblob.file.read(), filetype="pdf")
        md_text = pymupdf4llm.to_markdown(pdf)
        #save md file
        with open("resume.md", "w") as f:
            f.write(md_text)
        client = genai.Client(api_key=GENAI_API_KEY)
        response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=f"Follow Sytem Instruction and return a valid JSON object. {md_text}",
                config={
                        "response_mime_type": "application/json",
                        "system_instruction": prompt,
                },
        )
        print ("response:",response)
        return response.text
    except Exception as e:
        print("Error in analyzeLinkedIn:", e)
        return str(e)