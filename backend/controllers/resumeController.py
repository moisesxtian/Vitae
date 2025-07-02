from fastapi.concurrency import run_in_threadpool
from fastapi.responses import FileResponse
from weasyprint import HTML
from jinja2 import Environment, FileSystemLoader
import uuid, os

from models.resumeModel import Resume

env = Environment(loader=FileSystemLoader("templates"))

def clean_data(obj):
    if isinstance(obj, dict):
        return {k: clean_data(v) for k, v in obj.items() if v not in ("", [], None)}
    elif isinstance(obj, list):
        return [clean_data(item) for item in obj if item not in ("", [], None)]
    else:
        return obj

async def submit_resume(data: Resume):
    # Convert Pydantic model to dict and clean it
    raw_data = data.dict()
    cleaned_data = clean_data(raw_data)

    # Render HTML
    template = await run_in_threadpool(env.get_template, "harvard_resume.html")
    html_content = await run_in_threadpool(template.render, data=cleaned_data)

    # PDF file path
    filename = f"resume_{uuid.uuid4()}.pdf"
    output_path = os.path.join("generated", filename)
    os.makedirs("generated", exist_ok=True)

    # Export to PDF
    await run_in_threadpool(HTML(string=html_content, base_url=".").write_pdf, output_path)
    print (f"PDF generated at: {cleaned_data}")
    return FileResponse(
        output_path,
        media_type="application/pdf",
        filename=filename,
    )
