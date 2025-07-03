from fastapi.responses import FileResponse
from weasyprint import HTML
from jinja2 import Environment, FileSystemLoader
from tempfile import NamedTemporaryFile
from models.resumeModel import Resume
from fastapi.concurrency import run_in_threadpool
from datetime import datetime

env = Environment(loader=FileSystemLoader("templates"))

from datetime import datetime

def datetimeformat(value, format="%B %Y"):
    try:
        date_obj = datetime.strptime(value, "%Y-%m")  # input: '2021-08'
        return date_obj.strftime(format)              # output: 'August 2021'
    except Exception:
        return value  # return original value if parsing fails

def clean_data(obj):
    if isinstance(obj, dict):
        return {k: clean_data(v) for k, v in obj.items() if v not in ("", [], None)}
    elif isinstance(obj, list):
        return [clean_data(item) for item in obj if item not in ("", [], None)]
    else:
        return obj

async def submit_resume(data: Resume):
    #convert date strings to datetime objects
    for entry in data.education:
        if isinstance(entry.start, str):
            entry.start = datetimeformat(entry.start)
        if isinstance(entry.end, str):
            entry.end = datetimeformat(entry.end)
    raw_data = data.dict()
    cleaned_data = clean_data(raw_data)
    print("Cleaned Data:", cleaned_data)
    template = await run_in_threadpool(env.get_template, "harvard_resume.html")
    html_content = await run_in_threadpool(template.render, data=cleaned_data)

    with NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        await run_in_threadpool(HTML(string=html_content, base_url=".").write_pdf, temp_file.name)

        return FileResponse(
            path=temp_file.name,

            #file name is extracted from the first name and last name
            filename=f"{cleaned_data.get('firstName', 'resume')}_{cleaned_data.get('lastName', 'resume')}.pdf",
            media_type="application/pdf"
        )
