from google import genai
from google.genai import types
import os
from dotenv import load_dotenv
load_dotenv()
GENAI_API_KEY = os.environ.get("GENAI_API_KEY")
prompt = """
Y
"""
def get_ai_message(data):
  try:
    client = genai.Client(api_key=GENAI_API_KEY)
    response = client.models.generate_content(
        model="gemini-2.0-flash-lite",
        contents=f"Follow Sytem Instruction and return a valid JSON object. {data}",
        config={
            "response_mime_type": "application/json",
            "system_instruction": prompt,
        },
    )
    return response.text
  except Exception as e:
    return str(e)