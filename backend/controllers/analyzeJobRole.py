from google import genai
from google.genai import types
import os 
from dotenv import load_dotenv
load_dotenv()
GENAI_API_KEY = os.environ.get("GENAI_API_KEY")
prompt = """
You are a resume analysis assistant. Your job is to Assess the user's Recommended Job Field:
1. `recommended_job_category`: A list of job roles that match the user's experience, skills, and projects.
### Output:

Return a single JSON with:
`recommended_job_category`: job roles based on the resume content.
Output Format (example):
    "recommended_job_category":[
        "Software Engineer",
        "Web Developer",
        "Full Stack Developer",]
---

### Rules:
- Output valid JSON only.
- Use double quotes for all keys and values.
- Use lowercase true/false for booleans.
- Do not include markdown, comments, or extra text.
- Do not escape line breaks.
- STRICTLY follow the output structure.

"""
def analyze_job_role(data):
  try:
    client = genai.Client(api_key=GENAI_API_KEY)
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"Follow Sytem Instruction and return a valid JSON object. {data}",
        config={
            "response_mime_type": "application/json",
            "system_instruction": prompt,
        },
    )
    print(response.text)
    return response.text
  except Exception as e:
    return str(e)