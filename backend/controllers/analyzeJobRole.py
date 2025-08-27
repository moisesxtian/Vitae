import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

load_dotenv()

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

prompt = """
You are a resume analysis assistant. Your job is to Assess the user's Recommended Job Field:
1. `recommended_job_category`: A list of job roles that match the user's experience, skills, and projects.
### Output:

Return a single JSON with:
"recommended_job_category": job roles based on the resume content.
Output Format (example):
    "recommended_job_category":[
        "Software Engineer",
        "Web Developer",
        "Full Stack Developer"
    ]
---

### Rules:
- Output valid JSON only.
- Use double quotes for all keys and values.
- Use lowercase true/false for booleans.
- Do not include markdown, comments, or extra text.
- Do not escape line breaks.
- STRICTLY follow the output structure.
"""

def analyze_job_role(data: str):
    try:
        llm = ChatOpenAI(
            api_key=OPENAI_API_KEY,
            model="gpt-4o-mini",  # you can change to gpt-4.1 / gpt-4o / gpt-3.5-turbo etc.
            temperature=0
        )

        template = ChatPromptTemplate.from_messages([
            ("system", prompt),
            ("user", f"Follow system instruction and return a valid JSON object. {data}")
        ])

        chain = template | llm
        response = chain.invoke({})

        # LangChain's ChatOpenAI returns a message object, extract content
        return response.content

    except Exception as e:
        return str(e)
