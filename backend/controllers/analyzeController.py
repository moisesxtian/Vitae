from groq import Groq
from dotenv import load_dotenv
import os
def analyzeResume(data):
    load_dotenv()
    api=os.environ.get("GROQ_API_KEY")
    print("TEST API:",api)
    try:
        #call LLM
        client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
        completion=client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
        {
            "role": "system",
            "content": 
            "You are a fun and smart and precise Resume Analyzer. Your job is to review a candidate’s resume (provided as a JSON object) YOU MUST RETURN A JSON OBJECT, identify areas for improvement, and directly output:\n\n1. A revised JSON object **exactly** with the same schema as the input (no extra keys), but updated where needed (e.g., stronger summary, added keywords, better project bullets, filled skills, etc.)\n\n2. A separate \"overview\" text (under a top-level key \"overview\") explaining *what* you  changed specifically and *why*—concise, actionable, and friendly tone. make it a maximum of 2 paragraph\n3. You may Correct wrong spelling, Arrange Array Format of Work Experience, Education from Latest to Oldest, array[0] as Latest.\n4. DO NOT MAKE UP INFORMATION THAT IS NOT INCLUDED IN THE OBJECT except for the bullets. you may rephrase those\n\n\nOutput **only valid JSON**, with no extra commentary.\n\n### Input schema:\n```json\n{\n  \"firstName\": string,\n  \"middleInitial\": string,\n  \"lastName\": string,\n  \"phone\": string,\n  \"email\": string,\n  \"city\": string,\n  \"state\": string,\n  \"summary\": string,\n  \"linkedin\": string,\n  \"projects\": [\n    { \"name\": string, \"description\": string, \"technologies\": string }\n  ],\n  \"certifications\": [\n    { \"name\": string, \"issuer\": string, \"date\": string, \"credentialId\": string, \"credentialUrl\": string }\n  ],\n  \"education\": [\n    { \"level\": string, \"school\": string, \"degree\": string, \"strand\": string, \"field\": string, \"start\": string, \"end\": string, \"present\": boolean, \"bullets\": [string] }\n  ],\n  \"experience\": [\n    { \"company\": string, \"position\": string, \"location\": string, \"start\": string, \"end\": string, \"description\": string }\n  ],\n  \"skills\": [string]\n}\n"
        },
        {
            "role": "user",
            "content": "{\n    \"firstName\": \"CHRISTIAN\",\n    \"middleInitial\": \"S\",\n    \"lastName\": \"MOISES\",\n    \"phone\": \"09770210700\",\n    \"email\": \"christiansmoises023@gmail.com\",\n    \"city\": \"Taytay\",\n    \"state\": \"Rizal\",\n    \"summary\": \"\",\n    \"linkedin\": \"\",\n    \"projects\": [\n        {\n            \"name\": \"MIRA - ASL Recognition\",\n            \"description\": \"a mobile application that recognize Sign Language using computer vision\",\n            \"technologies\": \"\"\n        },\n        {\n            \"name\": \"Reptr- Exercise Tracker\",\n            \"description\": \"Simple exercise tracker  with login authentication, that logs a users Exercise, Rep and load. Built using MERN stack\",\n            \"technologies\": \"\"\n        },\n        {\n            \"name\": \"Vitae\",\n            \"description\": \"Resume  Builder website that instantly builds a resume in minutes\",\n            \"technologies\": \"\"\n        }\n    ],\n    \"certifications\": [\n        {\n            \"name\": \"Data Scienctist Associate\",\n            \"issuer\": \"Data Camp\",\n            \"date\": \"2025-04\",\n            \"credentialId\": \"\",\n            \"credentialUrl\": \"\"\n        }\n    ],\n    \"education\": [\n        {\n            \"level\": \"College\",\n            \"school\": \"STI College Ortigas-Cainta\",\n            \"degree\": \"Bachelor Of Science\",\n            \"strand\": \"\",\n            \"field\": \"Computer Science\",\n            \"start\": \"2021-01\",\n            \"end\": \"2025-10\",\n            \"present\": false,\n            \"bullets\": [\n                \"Cum Laude\"\n            ]\n        }\n    ],\n    \"experience\": [\n        {\n            \"company\": \"SP Madrid & Associatesd\",\n            \"jobtitle\": \"AI ML/Intern\",\n            \"start\": \"2025-02\",\n            \"end\": \"2025-04\",\n            \"present\": false,\n            \"bullets\": [\n                \"i did some backend, using fastapi\",\n                \"trained and annotated images for model training\",\n                \"created a Conduction sticker model\"\n            ]\n        }\n    ],\n    \"skills\": [\n        \"Edituing\",\n        \"Photoshop\",\n        \"Programming\",\n        \"Machine Learning\",\n        \"YOLO\",\n        \"Logo designg\"\n    ]\n}"
        }
        ],
        temperature=1,
        max_completion_tokens=1024,
        top_p=1,
        stream=True,
        stop=None,
        )
        response=""
        for chunk in completion:
            response += chunk.choices[0].delta.content or ""
        return response
    except Exception as e:
        return {"error": str(e)}