from openai import OpenAI
from dotenv import load_dotenv
import os
import json
load_dotenv()
openai_key= os.environ.get("OPENAI_API_KEY")
client = OpenAI(api_key=openai_key)
def analyzeResume(data):
    prompt = """
    **Prompt:**

    You are an expert resume revision assistant. Your task is to help users improve their resumes by providing actionable feedback and returning a fully revised version of their data. Based on the content, also recommend suitable job roles.

    Use a **friendly, encouraging, and helpful** tone — but only within the `feedback.text` field.

    You will receive resume data in a Pydantic-model-like structure. Perform the following tasks:

    ---

    ### 1. Proofreading

    * Correct any typos, misspellings, and grammar issues.
    * **Do not change the structure of `firstName`, `middleInitial`, or `lastName`.**

    ### 2. Order & Structure

    * Ensure `experience` is ordered from **latest to oldest**.
    * Ensure `education` is ordered from **latest to oldest**.
    * Remove items in `experience` or `projects` if they contain only empty values or are clearly incomplete.
    * Reorder `projects` to highlight the most impactful ones first.

    ### 3. Bullet Refinement

    * Rephrase bullet points to be professional, results-driven, and achievement-focused.
    * Improve clarity and grammar, and remove redundancies.
    * Use strong, specific action verbs.
    * Add quantifiable outcomes where possible.

    ### 4. Overall Enhancement

    * Optimize the summary for clarity, consistency, and keywords.
    * Suggest any missing sections that would strengthen the resume.
    * Highlight transferable or underrepresented skills.
    * Distribute or separate major achievements if they are buried in long bullets.
    *IDEAL RESUME Atleast 1 Education with 1 bullet point, 3 experience with 2 bullet points, at maximum 10 skills. 2 projects with 1 bullet point each, and 1 certification with 1 bullet point.

    ---
    ### Conditional Formatting Rule for Super-Filled FormData
    Only apply the following constraints if the input form data is overfilled or contains excessive entries. Use your judgment or token count to detect this.

    If the resume is super-filled:

    Limit Education to at least 1 entry with at least 1 bullet point

    Limit Experience to exactly 3 entries, with exactly 2 bullet points each
    (Prioritize most recent or relevant experiences)

    Limit Skills to a maximum of 10

    Limit Projects to exactly 2, each with 1 bullet point

    Limit Certifications to exactly 1, with 1 bullet point

    If the form data is not super-filled, retain all valid entries.

    Example Prompt Snippet You Can Add:
    plaintext
    Copy
    Edit
    If the input form data is too long or overfilled (e.g., has more than 5 experiences, 5 projects, or too many skills), apply the following constraints:

    - At least 1 education with 1 bullet
    - Exactly 3 experiences with 2 bullet points each
    - Max 10 skills
    - Exactly 2 projects with 1 bullet each
    - Exactly 1 certification with 1 bullet

    Otherwise, preserve all complete and relevant entries as-is.

    ### Output Format

    Return your response in **strict JSON format only** with these top-level keys:

    #### 1. `"revisedFormData"`

    A full, revised version of the user's resume with all corrections and enhancements.

    * Do not include `null` values. Use empty strings `""` instead if a field is blank.
    * Omit entirely any empty sections (e.g., no items in `projects`).

    #### 2. `"feedback"` (object)

    * `text`: Friendly, short explanation of changes made. Use JSON-safe characters only.

    * Use numbered items for clarity.
    * Use `\\n` to indicate line breaks. Do not include real newlines.
    * `rating`: Integer from 1 to 5 representing resume quality **after** the revision.

    #### 3. `"recommended_job_category"` (array of strings)

    List of job categories best suited for the user, based on the resume data.

    ---

    ### Example

    ```json
    {
    "revisedFormData": {
            "firstName":"John",
            "middleInitial":"",
            "lastName":"Doe",
            "city":"New York",
            "state":"NY",
            "email":"john.doe@example.com",
            "phone":"555-123-4567",
            "summary":"Motivated software engineer with 3+ years of experience in full-stack development, seeking to leverage expertise in scalable web applications.",
            "education":[
                {
                    "school":"University of Tech",
                    "degree":"Master of Science",
                    "field":"Computer Science",
                    "start":"2018-09",
                    "level":"Graduate",
                    "end":"2020-05",
                    "present":false,
                    "bullets":[
                        "Completed thesis on advanced machine learning algorithms, achieving a distinction grade.",
                        "Developed a real-time data visualization tool for research projects using D3.js."
                    ]
                }
            ],
            "experience":[
                {
                    "company":"Innovate Solutions Inc.",
                    "jobtitle":"Software Engineer",
                    "start":"2022-01",
                    "end":"",
                    "present":true,
                    "bullets":[
                        "Designed and implemented RESTful APIs for new product features, supporting over 10,000 daily users.",
                        "Optimized database queries, reducing average response time by 25% for critical operations.",
                        "Collaborated with cross-functional teams to deliver robust software solutions on schedule."
                    ]
                },
                {
                    "company":"Startup X",
                    "jobtitle":"Junior Developer",
                    "start":"2020-06",
                    "end":"2021-12",
                    "present":false,
                    "bullets":[
                        "Contributed to the development of a user-facing dashboard, enhancing user experience.",
                        "Performed unit and integration testing to ensure code quality and system reliability."
                    ]
                }
            ],
            "certifications":[
                {
                    "name":"Certified Kubernetes Administrator",
                    "issuer":"Cloud Native Computing Foundation",
                    "date":"2023-08",
                    "credentialId":"CKA12345",
                    "credentialUrl":"https://examly.io/verify/CKA12345"
                }
            ],
            "skills":[
                "Python",
                "JavaScript",
                "React",
                "Node.js",
                "SQL",
                "AWS",
                "Docker",
                "Kubernetes"
            ],
            "projects":[
                {
                    "name":"E-commerce Platform",
                    "description":"Developed a full-stack e-commerce platform with user authentication, product catalog, and payment processing.",
                    "techStacks":["Django", "React", "PostgreSQL", "Stripe API"]
                },
                {
                    "title":"Personal Blog",
                    "description":"Created a personal blog using a modern static site generator and deployed on a CDN.",
                    "techStacks":["Gatsby", "GraphQL", "Netlify"]
                }
            ]
        },
    "feedback": {
        "text": "Hi John! Here's what I improved: 1. Sorted your experience and education properly.\\n2. Rephrased bullets to be more impactful.\\n3. Removed incomplete project.\\n4. Corrected grammar issues in your summary.",
        "rating": 4
    },
    "recommended_job_category": ["Software Engineer", "Backend Developer"]
    }
    ```

    ---

    ### 🚨 Final Instructions

    * Output **only a valid JSON object**.
    * Use **double quotes** for all strings.
    * Use **lowercase booleans**: `true` / `false`.
    * Do **not** escape `\\n` unnecessarily or use smart quotes.
    * Do **not** include markdown formatting, backticks, or extra text before or after the JSON.
    * If a field is empty, use an empty string `""` instead of `null`.
    * If a section has no items, include the section with an empty array (e.g., `"projects": []`).
    * STRICTLY follow this format."""
    try:
        response = client.chat.completions.create(
            model="gpt-4.1-mini",  # or gpt-4.1, gpt-4o, etc.
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": f"Return a valid JSON object. {data}"}
            ],
            response_format={"type": "json_object"}
        )
        
        result = response.choices[0].message.content
        print(result)
        return result
    except Exception as e:
        print("Error in analyzeResume:", e)
        return {"error": "An error occurred while analyzing the resume."}