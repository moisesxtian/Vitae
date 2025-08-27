from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
import fitz
import pymupdf4llm
import os # Recommended for API keys

# It's best practice to load your API key from environment variables
# from dotenv import load_dotenv
# load_dotenv()
# os.environ["OPENAI_API_KEY"] = "YOUR_API_KEY"

system_prompt = """
You are a resume parsing and enhancement assistant.
Rules:
- You must output valid JSON. No extra prose or comments outside the JSON object.
Clarify any unclear acronyms or entries from the user. Expand common terms like:
- “BSCS” → “Bachelor of Science in Computer Science (BSCS)”
- “MERN” → “MongoDB, Express.js, React.js, Node.js (MERN)”

---

### 📌 EXAMPLE Extracted_data:
{{
    "firstName": "CHRISTIAN",
    "middleInitial": "S",
    "lastName": "MOISES",
    "email": "christiansmoises023@gmail.com",
    "phone": "09770210700",
    "city": "Taytay",
    "state": "Rizal",
    "linkedin": "",
    "summary": "Highly motivated individual focused on machine learning and Eager to learn new technology",
    "education": [
        {{
            "level": "College",
            "school": "STI College Ortigas-Cainta",
            "degree": "Bachelor of Science",
            "strand": "",
            "field": "Computer Science",
            "start": "2020-01",
            "end": "2025-01",
            "present": false,
            "bullets": [
                "Graduated Cum Laude"
            ]
        }}
    ],
    "experience": [
        {{
            "company": "Jollibee Corporations",
            "jobtitle": "Janitor",
            "start": "2018-01",
            "end": "2020-01",
            "present": false,
            "bullets": [
                "Washed dishes and cleaned kitchen facilities",
                "Greeted customers and accurately took their orders"
            ]
        }},
        {{
            "company": "SP Madrid & Associates",
            "jobtitle": "Data Analyst",
            "start": "2025-01",
            "end": "",
            "present": true,
            "bullets": [
                "Led development growth and forecasted company direction"
            ]
        }}
    ],
    "skills": [
        "Computer Vision",
        "Editing",
        "Programming",
        "Machine Learning",
        "Git",
        "AWS"
    ],
    "projects": [
        {{
            "name": "Okpo",
            "description": "OKPO is a web application that compiles various chatbot models, allowing users to access them at a reduced cost.",
            "technologies": [
                "React.js",
                "MongoDB",
                "Express.js",
                "Node.js",
                "Gemini"
            ]
        }}
    ],
    "certifications": [
        {{
            "name": "Data Science Associate",
            "issuer": "Data Camp",
            "date": "2025-07",
            "credentialId": "1092-903-405",
            "credentialUrl": "https://datacamp.com/verify-certificate/1092-903-405"
        }}
    ],
    "profileImage": ""
}}
""" # Note: I've pre-escaped the braces here for simplicity. 
    # The programmatic way is shown in the function below.

async def analyzeLinkedIn(pdfblob):
    try:
        pdf = fitz.open(stream=pdfblob.file.read(), filetype="pdf")
        md_text = pymupdf4llm.to_markdown(pdf)
        print("PDF converted to Markdown.")

        # FIX 1: Programmatically escape the curly braces in your prompt.
        # This is more robust than manually editing the string.
        escaped_system_prompt = system_prompt.replace("{", "{{").replace("}", "}}")

        llm = ChatOpenAI(
            model="gpt-4o-mini",
            temperature=0,
        ).with_structured_output(method="json_mode")

        template = ChatPromptTemplate.from_messages([
            # Use the properly escaped prompt string here
            ("system", escaped_system_prompt),
            ("user", "{text}")
        ])
        
        # Create the chain by piping the template to the language model
        chain = template | llm

        # FIX 2: Use 'await .ainvoke()' for async functions
        response = await chain.ainvoke({"text": md_text})
        
        print("LLM Response:", response)
        
        # FIX 3: Return the direct JSON response, not response.content
        return response
        
    except Exception as e:
        print("Error in analyzeLinkedIn:", e)
        # It's often better to raise the exception or return a structured error
        return {"error": str(e)}