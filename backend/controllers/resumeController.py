from fastapi.responses import FileResponse
from weasyprint import HTML
from jinja2 import Environment, FileSystemLoader
from tempfile import NamedTemporaryFile
from models.resumeModel import ResumeWrapper
from fastapi.concurrency import run_in_threadpool
from datetime import datetime
import os
env = Environment(loader=FileSystemLoader("templates"))

def count_total_entries(data: dict) -> int:
    """Counts weighted entries across all resume sections for density control."""
    count = 0

    if data.get("summary"):
        count += 1  # Summary block

    # Skills
    count += len(data.get("skills", [])) * .5  # Each skill is a short item

    # Experience
    for exp in data.get("experience", []):
        if exp.get("jobtitle") or exp.get("company"):
            count += 1.5  # Main entry
        count += len(exp.get("bullets", [])) * 1  # Each bullet counts as 1

    # Education
    for edu in data.get("education", []):
        if edu.get("school") or edu.get("degree"):
            count += 1.2  # Main entry
        count += len(edu.get("bullets", [])) * 0.8  # Less dense than experience

    # Certifications
    for cert in data.get("certifications", []):
        if cert.get("name"):
            count += 0.8  # Compact items

    # Projects
    for proj in data.get("projects", []):
        if proj.get("name"):
            count += 1
        if proj.get("description"):
            count += 0.5
    #    if proj.get("technologies"): Add in the future
    #        count += 0.5
    print(count)
    return round(count)

def datetimeformat(value, format="%B %Y"):
    try:
        date_obj = datetime.strptime(value, "%Y-%m")
        return date_obj.strftime(format)
    except Exception:
        return value

def clean_data(obj):
    if isinstance(obj, dict):
        return {k: clean_data(v) for k, v in obj.items() if v not in ("", [], None)}
    elif isinstance(obj, list):
        return [clean_data(item) for item in obj if item not in ("", [], None)]
    else:
        return obj

async def submit_resume(wrapper:ResumeWrapper):
    print(wrapper)
    raw_data = wrapper.formData.model_dump() 
    print("test")
    # Format dates in experience and education
    for entry in raw_data.get("education", []) + raw_data.get("experience", []):
        if isinstance(entry.get("start"), str):
            entry["start"] = datetimeformat(entry["start"])
        if isinstance(entry.get("end"), str):
            entry["end"] = datetimeformat(entry["end"])

    cleaned_data = clean_data(raw_data)

    # Compute detailed resume density
    total_items = count_total_entries(cleaned_data)

    # Wider range for resume density with new categories
    if total_items <= 5:
        cleaned_data["resume_density"] = "super_sparse"
    elif total_items <= 10:
        cleaned_data["resume_density"] = "sparse"
    elif total_items <= 15:
        cleaned_data["resume_density"] = "medium"
    elif total_items <= 20:
        cleaned_data["resume_density"] = "dense"
    else:
        cleaned_data["resume_density"] = "super_dense"
    # Render template
    print("Templates directory content:", os.listdir("templates"))
    template = await run_in_threadpool(env.get_template, f"{wrapper.selected_template}.html")
    print("Using template:", f"{wrapper.selected_template}.html")
    html_content = await run_in_threadpool(template.render, data=cleaned_data)
    print(cleaned_data["resume_density"])
    # Generate PDF
    with NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        await run_in_threadpool(HTML(string=html_content, base_url=".").write_pdf, temp_file.name)

        return FileResponse(
            path=temp_file.name,
            filename=f"{cleaned_data.get('firstName', 'resume')}_{cleaned_data.get('lastName', 'resume')}.pdf",
            media_type="application/pdf"
        )
