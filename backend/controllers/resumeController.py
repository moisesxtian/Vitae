from models.resumeModel import Resume
from fastapi.responses import JSONResponse

from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
import uuid
import os

env = Environment(loader=FileSystemLoader("templates"))

def submit_resume(data: Resume):
    print("Received resume data:")
    print(data)

    # Render HTML from template
    template = env.get_template("harvard_resume.html")
    html_content = template.render(data=data)

    # Generate unique filename
    filename = f"resume_{uuid.uuid4()}.pdf"
    output_path = os.path.join("generated", filename)

    # Ensure folder exists
    os.makedirs("generated", exist_ok=True)

    # Convert HTML to PDF
    HTML(string=html_content, base_url=".").write_pdf(output_path)

    # Return the file to frontend
    return JSONResponse(content={
        "message": "Resume generated successfully",
        "file_path": output_path
    })
