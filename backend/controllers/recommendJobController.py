import httpx
import os

from dotenv import load_dotenv
load_dotenv()
async def get_job_recommendations(job_role:str, job_location:str):
    url="https://jsearch.p.rapidapi.com/search"
    headers={
        "X-RapidAPI-Key": os.getenv("RAPID_API_KEY"),
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
    }
    params={
        "query": job_role,
        "location": job_location,
        "num_pages": "1"
    }

    async with httpx.AsyncClient(timeout=30) as client:
        response=await client.get(url, headers=headers, params=params)
        return response.json()