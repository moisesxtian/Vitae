import { useState, useEffect } from "react";
import Input from "../components/Input";

import { Plus, X, Briefcase, GraduationCap, BadgeCheck, ChevronDown, ChevronUp } from "lucide-react";
import { useFormContext } from "../context/FormContext";

// Information Form (no changes needed for this specific request)
export const InformationForm = () => {
  const { formData, setFormData } = useFormContext();
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="flex flex-col gap-6 p-4">
      <h2 className="text-2xl font-bold text-accent2">Personal Information</h2>
      <div className="">
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z ]*$/.test(value) || value === "") {
                  setFormData({ ...formData, firstName: value });
                } else {
                  setErrorMessage("First name can only contain letters.");
                }
              }
              }
            />
          </div>
          <div className="col-span-1">
            <Input
              label="M.I."
              name="middleInitial"
              maxLength={1}
              value={formData.middleInitial}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z]*$/.test(value) || value === "") {
                  setFormData({ ...formData, middleInitial: value });
                }
                else {
                  setErrorMessage("Middle initial can only contain a single letter.");
                }
              }
              }
            />
          </div>
          <div className="col-span-2">
            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={
                (e) => {
                  const value = e.target.value;
                  if (/^[a-zA-Z]*$/.test(value) || value === "") {
                    setFormData({ ...formData, lastName: value });
                  } else {
                    setErrorMessage("Last name can only contain letters.");
                  }
                }
              }
            />
          </div>
        </div>
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          label="Phone #"
          name="phone"
          value={formData.phone}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value) || value === "") {
              setFormData({ ...formData, phone: value });
            } else {
              setErrorMessage("Phone number can only contain digits.");
            }
          }
          }
        />
        <div className="grid grid-cols-2 gap-2">
          <Input
            label="City"
            name="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          <Input
            label="State/Province"
            name="state"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          />
        </div>


      </div>
      <div className="flex justify-end">
      </div>
    </div>
  );
};

// Skills Form (no changes needed for this specific request)
export const SkillsForm = () => {
  const {formData, setFormData} = useFormContext();
  const [errorMessage, setErrorMessage] = useState(""); // Added errorMessage state
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData({ ...formData, skills: updatedSkills });
  };


  const handleAddSkill = () => {
    if (formData.skills.length >= 10) {
      setErrorMessage("You can only add up to 10 skills.");
      return;
    }
    setFormData({ ...formData, skills: [...formData.skills, ""] });
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills.splice(index, 1);
    setFormData({ ...formData, skills: updatedSkills });
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <h2 className="text-2xl font-bold text-accent2">Skills</h2>
      <div className="grid grid-cols-2 gap-4 overrflow-y-auto">

        {formData.skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              label={`Skill ${index + 1}`}
              name={`skill-${index}`}
              value={skill}
              placeholder="Ex. Editing"
              onChange={(e) => handleSkillChange(index, e.target.value)}
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => handleRemoveSkill(index)}
              className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
            >
              <X className="text-red-600 w-6 h-6" />
            </button>
          </div>
        ))}

      </div>
      {formData.skills.length >= 10 && (
        <p className="text-red-500 text-sm mt-2">You can only add up to 10 skills.</p>
      )}
      <button
        type="button"
        onClick={handleAddSkill}
        className="flex items-center gap-2 text-accent2 hover:underline"
      >
        <Plus className="w-4 h-4" />
        Add Skill
      </button>


    </div>
  );
};
export const ImageForm = () => {
  const { formData, setFormData } = useFormContext();
  const [preview, setPreview] = useState(formData.profileImage);

  const MAX_WIDTH = 512;
  const MAX_HEIGHT = 512;
  const QUALITY = 0.7;

  const compressImage = (file) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        // Resize if necessary
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const aspectRatio = width / height;
          if (aspectRatio > 1) {
            width = MAX_WIDTH;
            height = MAX_WIDTH / aspectRatio;
          } else {
            height = MAX_HEIGHT;
            width = MAX_HEIGHT * aspectRatio;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressed = canvas.toDataURL("image/jpeg", QUALITY);
        resolve(compressed);
      };

      img.onerror = reject;
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      try {
        const compressedBase64 = await compressImage(file);
        setFormData({ ...formData, profileImage: compressedBase64 });
        setPreview(compressedBase64);
      } catch (err) {
        console.error("Compression failed:", err);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <h2 className="text-2xl font-bold text-accent2 text-center">
        Upload Profile Picture
      </h2>

      <div className="flex flex-col items-center gap-4">
        {preview ? (
          <div className="w-48 aspect-square overflow-hidden rounded-xl border border-gray-300 shadow">
            <img
              src={preview}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-48 aspect-square rounded-xl bg-gray-200 border border-dashed border-gray-400 flex items-center justify-center text-gray-500 shadow-inner">
            No Image
          </div>
        )}

        <label
          htmlFor="upload-button"
          className="cursor-pointer bg-accent2 text-white px-4 py-2 rounded-lg shadow hover:bg-accent2-dark transition"
        >
          Choose Image
        </label>
        <input
          id="upload-button"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        <p className="text-xs text-gray-500 text-center">
          Max size: ~200KB after compression · Formats: JPG/PNG
        </p>
      </div>
    </div>
  );
};

// Education Form (with drag and drop)
export const EducationForm = () => {
  const {formData, setFormData} = useFormContext();
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const handleEducationChange = (idx, e) => {
    const updated = [...formData.education];
    updated[idx][e.target.name] = e.target.value;
    if (updated[idx].level === "Senior High") {
      updated[idx].degree = "";
    }
    setFormData({ ...formData, education: updated });
  };

  const togglePresent = (idx) => {
    const updated = [...formData.education];
    updated[idx].present = !updated[idx].present;
    if (updated[idx].present) updated[idx].end = "";
    setFormData({ ...formData, education: updated });
  };

  const handleBulletChange = (eduIdx, bulletIdx, value) => {
    const updated = [...formData.education];
    updated[eduIdx].bullets[bulletIdx] = value;
    setFormData({ ...formData, education: updated });
  };

  const addBullet = (eduIdx) => {
    const updated = [...formData.education];
    updated[eduIdx].bullets.push("");
    setFormData({ ...formData, education: updated });
  };

  const removeBullet = (eduIdx, bulletIdx) => {
    const updated = [...formData.education];
    updated[eduIdx].bullets.splice(bulletIdx, 1);
    setFormData({ ...formData, education: updated });
  };

  const removeEducation = (idx) => {
    const updated = [...formData.education];
    updated.splice(idx, 1);
    setFormData({ ...formData, education: updated });
    if (expandedIdx === idx) setExpandedIdx(null);
  };

  const toggleCollapse = (idx) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  const addEducation = (level) => {
    const newEducation = {
      level,
      school: "",
      degree: "",
      strand: "",
      field: "",
      start: "",
      end: "",
      present: false,
      bullets: [""],
    };

    setFormData({
      ...formData,
      education: [newEducation, ...formData.education],
    });
    setExpandedIdx(0);
  };

  // Drag and Drop Handlers
  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index); // Set data for drag operation
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === targetIndex) {
      return;
    }

    const updatedEducation = [...formData.education];
    const [draggedItem] = updatedEducation.splice(draggedItemIndex, 1);
    updatedEducation.splice(targetIndex, 0, draggedItem);

    setFormData({ ...formData, education: updatedEducation });
    setDraggedItemIndex(null); // Reset dragged item index
  };

  return (
    <div className="flex flex-col not-first:flex-col gap-6">
      <h2 className="text-2xl font-bold text-accent2 text-center">
        Educational Background
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full m-auto">
        {["College", "Senior High", "High School", "Elementary"].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => addEducation(level)}
            className={//if Elementary and Highschool, Color is Gray, else Color is Accent2
              `px-4 py-2 rounded-lg text-sm font-medium ${
                level === "Elementary" || level === "High School"
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-accent2 text-white hover:bg-accent2/90"
              } transition-colors`
            }
          >{level}
          </button>
        ))}
      </div>

      {formData.education.map((edu, idx) => (
        <div
          key={idx}
          className={`border border-gray-300 rounded-lg bg-white shadow-md relative ${expandedIdx !== idx ? 'cursor-pointer' : ''}`} /* Added conditional cursor-pointer */
          draggable="true" // Make item draggable
          onDragStart={(e) => handleDragStart(e, idx)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, idx)}
        >
          {/* Header */}
          <div
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 pl-10 relative" /* Made header relative */
            onClick={() => toggleCollapse(idx)}
          >
            {/* Hamburger Icon */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1 w-5 h-4 cursor-grab active:cursor-grabbing">
              <span className="block h-0.5 bg-gray-500 w-full rounded"></span>
              <span className="block h-0.5 bg-gray-500 w-full rounded"></span>
              <span className="block h-0.5 bg-gray-500 w-full rounded"></span>
            </div>
            <div className="flex items-center gap-2 font-medium text-accent2">
              <GraduationCap className="w-5 h-5" />
              <span>{edu.level} – {edu.school || "Untitled"}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={(e) => { e.stopPropagation(); removeEducation(idx); }}>
                <X className="w-6 h-6 text-red-500 hover:text-red-700" />
              </button>
              {expandedIdx === idx ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </div>

          {/* Content */}
          {expandedIdx === idx && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="School / University"
                  name="school"
                  value={edu.school}
                  onChange={(e) => handleEducationChange(idx, e)}
                />
                {edu.level === "College" && (
                  <Input
                    label="Degree"
                    name="degree"
                    placeholder="e.g. Bachelor of Science"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(idx, e)}
                  />
                )}
                {edu.level === "College" && (
                  <div className="col-span-2">
                    <Input
                      label="Field of Study"
                      name="field"
                      placeholder="e.g. Computer Science"
                      value={edu.field}
                      onChange={(e) => handleEducationChange(idx, e)}
                    />
                  </div>
                )}
                {edu.level === "Senior High" && (
                  <Input
                    label="Strand"
                    name="field"
                    placeholder="e.g. Computer Science"
                    value={edu.field}
                    onChange={(e) => handleEducationChange(idx, e)}
                  />

                )}

              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  name="start"
                  type="month"
                  value={edu.start}
                  onChange={(e) => handleEducationChange(idx, e)}
                />
                {!edu.present && (
                  <Input
                    label="End Date"
                    name="end"
                    type="month"
                    value={edu.end}
                    onChange={(e) => handleEducationChange(idx, e)}
                  />
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`present-${idx}`}
                  checked={edu.present}
                  onChange={() => togglePresent(idx)}
                />
                <label htmlFor={`present-${idx}`} className="text-sm text-gray-700">
                  I currently study here
                </label>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-2">
                  Highlights / Achievements
                </h4>
                {edu.bullets.map((bullet, bulletIdx) => (
                  <div key={bulletIdx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) =>
                        handleBulletChange(idx, bulletIdx, e.target.value)
                      }
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder={`Bullet point ${bulletIdx + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeBullet(idx, bulletIdx)}
                      className="text-red-500 hover:text-red-700"
                      title="Remove bullet"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addBullet(idx)}
                  className="text-accent2 text-sm hover:underline"
                >
                  + Add bullet point
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};


// Certifications Form (no changes needed for this specific request)
export const CertificationsForm = () => {
  const {formData, setFormData} = useFormContext();
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [expandedIdx, setExpandedIdx] = useState(null);

  useEffect(() => {
    // Always expand the latest added item
    if (formData.certifications.length > 0) {
      setExpandedIdx(0);
    }
  }, [formData.certifications.length]);

  const handleCertChange = (idx, e) => {
    const updated = [...formData.certifications];
    updated[idx][e.target.name] = e.target.value;
    setFormData({ ...formData, certifications: updated });
  };

  const addCertification = () => {
    const newCert = {
      name: "",
      issuer: "",
      date: "",
      credentialId: "",
      credentialUrl: "",
    };
    setFormData({
      ...formData,
      certifications: [newCert, ...formData.certifications],
    });
    setExpandedIdx(0); // Auto expand the newly added
  };

  const removeCertification = (idx) => {
    const updated = [...formData.certifications];
    updated.splice(idx, 1);
    setFormData({ ...formData, certifications: updated });
    if (expandedIdx === idx) setExpandedIdx(null);
  };

  const toggleCollapse = (idx) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  // Drag and Drop Handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const updated = [...formData.certifications];
    const [draggedItem] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, draggedItem);

    setFormData({ ...formData, certifications: updated });
    setDraggedIndex(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-accent2 text-center">Certifications</h2>

      {formData.certifications.map((cert, idx) => (
        <div
          key={idx}
          className="border border-gray-300 rounded-lg bg-white shadow-md relative"
          onDragStart={(e) => handleDragStart(e, idx)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, idx)}
        >
          <div
            draggable="true"
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 pl-10 relative"
            onClick={() => toggleCollapse(idx)}
          >
            {/* Drag Handle */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1 w-5 h-4 cursor-grab active:cursor-grabbing">
              <span className="block h-0.5 bg-gray-500 w-full rounded" />
              <span className="block h-0.5 bg-gray-500 w-full rounded" />
              <span className="block h-0.5 bg-gray-500 w-full rounded" />
            </div>
            <div className="flex items-center gap-2 font-medium text-accent2">
              <BadgeCheck className="w-5 h-5" />
              <span>
                {cert.name?.trim() ? cert.name : `Certification #${idx + 1}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={(e) => { e.stopPropagation(); removeCertification(idx); }}>
                <X className="w-6 h-6 text-red-500 hover:text-red-700" />
              </button>

            </div>
          </div>

          {expandedIdx === idx && (
            <div className="p-4 space-y-4">
              <Input
                label="Certificate Name"
                name="name"
                value={cert.name}
                placeholder="e.g. AWS Certified Cloud Practitioner"
                onChange={(e) => handleCertChange(idx, e)}
              />
              <Input
                label="Issuer"
                name="issuer"
                value={cert.issuer}
                placeholder="e.g. Amazon Web Services"
                onChange={(e) => handleCertChange(idx, e)}
              />
              <Input
                label="Date Earned"
                name="date"
                type="month"
                value={cert.date}
                onChange={(e) => handleCertChange(idx, e)}
              />
              <Input
                label="Credential ID (optional)"
                name="credentialId"
                value={cert.credentialId}
                onChange={(e) => handleCertChange(idx, e)}
              />
              <Input
                label="Credential URL (optional)"
                name="credentialUrl"
                type="url"
                value={cert.credentialUrl}
                onChange={(e) => handleCertChange(idx, e)}
              />
            </div>
          )}
        </div>
      ))}

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          onClick={addCertification}
          className="self-start flex items-center gap-2 text-accent2 hover:underline mb-2"
        >
          <Plus className="w-5 h-5" />
          Add Certification
        </button>
      </div>
    </div>
  );
}; 

// Work Experience Form (with drag and drop)
export const ExperienceForm = () => {
  const {formData, setFormData} = useFormContext();
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [expandedIdx, setExpandedIdx] = useState(null);

  useEffect(() => {
    if (formData.experience.length > 0) {
      setExpandedIdx(0);
    }
  }, [formData.experience.length]);

  const handleExperienceChange = (idx, e) => {
    const updated = [...formData.experience];
    updated[idx][e.target.name] = e.target.value;
    setFormData({ ...formData, experience: updated });
  };

  const togglePresent = idx => {
    const updated = [...formData.experience];
    updated[idx].present = !updated[idx].present;
    if (updated[idx].present) updated[idx].end = '';
    setFormData({ ...formData, experience: updated });
  };

  const addExperience = () => {
    const newExp = {
      company: '',
      jobtitle: '',
      start: '',
      end: '',
      present: false,
      bullets: ['']
    };
    setFormData({
      ...formData,
      experience: [newExp, ...formData.experience]
    });
    setExpandedIdx(0);
  };

  const removeExperience = idx => {
    const updated = [...formData.experience];
    updated.splice(idx, 1);
    setFormData({ ...formData, experience: updated });
    if (expandedIdx === idx) setExpandedIdx(null);
  };

  const handleBulletChange = (expIdx, bIdx, value) => {
    const updated = [...formData.experience];
    updated[expIdx].bullets[bIdx] = value;
    setFormData({ ...formData, experience: updated });
  };

  const addBullet = expIdx => {
    const updated = [...formData.experience];
    updated[expIdx].bullets.push('');
    setFormData({ ...formData, experience: updated });
  };

  const removeBullet = (expIdx, bIdx) => {
    const updated = [...formData.experience];
    updated[expIdx].bullets.splice(bIdx, 1);
    setFormData({ ...formData, experience: updated });
  };

  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === targetIndex) return;

    const updated = [...formData.experience];
    const [draggedItem] = updated.splice(draggedItemIndex, 1);
    updated.splice(targetIndex, 0, draggedItem);

    setFormData({ ...formData, experience: updated });
    setDraggedItemIndex(null);
  };

  const toggleCollapse = (idx) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-accent2 text-center">Professional Experience</h2>

      {formData.experience.map((exp, idx) => (
        <div
          key={idx}
          className="border border-gray-300 rounded-lg bg-white shadow-md relative"
          onDragStart={(e) => handleDragStart(e, idx)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, idx)}
        >
          <div
            className="flex justify-between items-center p-4 bg-gray-50 pl-10 relative"
            draggable={true}
            onClick={() => toggleCollapse(idx)}
          >
            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1 w-5 h-4 cursor-grab active:cursor-grabbing">
              <span className="block h-0.5 bg-gray-500 w-full rounded" />
              <span className="block h-0.5 bg-gray-500 w-full rounded" />
              <span className="block h-0.5 bg-gray-500 w-full rounded" />
            </div>
            <div className="flex items-center gap-2 font-medium text-accent2">
              <Briefcase className="w-5 h-5" />
              <span>{exp.jobtitle?.trim() ? exp.jobtitle : `Experience #${idx + 1}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={(e) => { e.stopPropagation(); removeExperience(idx); }}>
                <X className="w-6 h-6 text-red-500 hover:text-red-700" />
              </button>
            </div>
          </div>

          {expandedIdx === idx && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <Input
                  label="Job Title"
                  name="jobtitle"
                  value={exp.jobtitle}
                  onChange={e => handleExperienceChange(idx, e)}
                />
                <Input
                  label="Company Name"
                  name="company"
                  value={exp.company}
                  onChange={e => handleExperienceChange(idx, e)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  name="start"
                  type="month"
                  value={exp.start}
                  onChange={e => handleExperienceChange(idx, e)}
                />
                {!exp.present && (
                  <Input
                    label="End Date"
                    name="end"
                    type="month"
                    value={exp.end}
                    onChange={e => handleExperienceChange(idx, e)}
                  />
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exp.present}
                  onChange={() => togglePresent(idx)}
                  id={`present-${idx}`}
                />
                <label htmlFor={`present-${idx}`} className="text-sm text-gray-700">
                  I currently work here
                </label>
              </div>

              {exp.bullets.map((bullet, bIdx) => (
                <div key={bIdx} className="flex p-2 rounded-lg items-center gap-2 overflow-auto">
                  <div className="flex-1">
                    <Input
                      label={`Responsibilities / Accomplishment #${bIdx + 1}`}
                      name={`bullet-${bIdx}`}
                      type="text"
                      value={bullet}
                      placeholder="e.g. Spearheaded the development of..."
                      onChange={e => handleBulletChange(idx, bIdx, e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeBullet(idx, bIdx)}
                    className="p-2 rounded-full hover:bg-gray-200 transition"
                  >
                    <X className="w-6 h-6 text-red-600 hover:text-red-800" />
                  </button>
                </div>
              ))}

              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => addBullet(idx)}
                  className="flex gap-2 text-accent2 hover:underline"
                >
                  <Plus className="w-5 h-5" />
                  Add Bullet Point
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          onClick={addExperience}
          className="self-start flex items-center gap-2 text-accent2 hover:underline mb-2"
        >
          <Plus className="w-5 h-5" />
          Add Work Experience
        </button>
      </div>
    </div>
  );
};


// Projects Form (with drag and drop)
export const ProjectsForm = () => {
  const {formData, setFormData} = useFormContext();
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const handleProjectChange = (idx, e) => {
    const updated = [...formData.projects];
    updated[idx][e.target.name] = e.target.value;
    setFormData({ ...formData, projects: updated });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        {
          name: "",
          description: "",
          technologies: "",
        },
        ...formData.projects,
      ],
    });
    setExpandedIdx(0);
  };

  const removeProject = (idx) => {
    const updated = [...formData.projects];
    updated.splice(idx, 1);
    setFormData({ ...formData, projects: updated });
    if (expandedIdx === idx) setExpandedIdx(null);
  };

  const toggleCollapse = (idx) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  // Drag and Drop Handlers
  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === targetIndex) {
      return;
    }

    const updatedProjects = [...formData.projects];
    const [draggedItem] = updatedProjects.splice(draggedItemIndex, 1);
    updatedProjects.splice(targetIndex, 0, draggedItem);

    setFormData({ ...formData, projects: updatedProjects });
    setDraggedItemIndex(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-accent2 text-center">
        Personal Projects <span className="text-base font-normal text-gray-400">(Optional)</span>
      </h2>

      <button
        type="button"
        onClick={addProject}
        className="self-start flex items-center gap-2 text-accent2 hover:underline"
      >
        <Plus className="w-5 h-5" />
        Add Project
      </button>

      {formData.projects.map((project, idx) => (
        <div
          key={idx}
          className={`border border-gray-300 rounded-lg bg-white shadow-md relative ${expandedIdx !== idx ? 'cursor-pointer' : ''}`} /* Added conditional cursor-pointer */
          onDragStart={(e) => handleDragStart(e, idx)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, idx)}
        >
          {/* Header */}
          <div
            draggable="true"
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 pl-10 relative" /* Adjusted padding for hamburger and made header relative */
            onClick={() => toggleCollapse(idx)}
          >
            {/* Hamburger Icon */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1 w-5 h-4 cursor-grab active:cursor-grabbing">
              <span className="block h-0.5 bg-gray-500 w-full rounded"></span>
              <span className="block h-0.5 bg-gray-500 w-full rounded"></span>
              <span className="block h-0.5 bg-gray-500 w-full rounded"></span>
            </div>
            <div className="flex items-center gap-2 font-medium text-accent2">
              <span>{project.name || "Project #"+(idx+1)}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeProject(idx);
                }}
              >
                <X className="w-6 h-6 text-red-500 hover:text-red-700" />
              </button>
            </div>
          </div>

          {/* Content */}
          {expandedIdx === idx && (
            <div className="p-4 space-y-4">
              <Input
                label="Project Name"
                name="name"
                value={project.name}
                placeholder="e.g. Personal Budget Tracker"
                onChange={(e) => handleProjectChange(idx, e)}
              />
              <Input
                label="Description"
                name="description"
                value={project.description}
                placeholder="Brief overview of what this project does"
                onChange={(e) => handleProjectChange(idx, e)}
              />
              <Input
                label="Technologies Used"
                name="technologies"
                value={project.technologies}
                placeholder="e.g. React, Tailwind, Node.js"
                onChange={(e) => handleProjectChange(idx, e)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Summary Form (no changes needed for this specific request)
export const SummaryForm = () => {
  const {formData, setFormData} = useFormContext();
  const handleChange = (e) => {
    setFormData({ ...formData, summary: e.target.value });
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-accent2 text-center">Summary / Objective</h2>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <label htmlFor="summary" className="block mb-2 font-semibold text-accent2">
          Personal Summary or Objective
        </label>
        <textarea
          id="summary"
          name="summary"
          rows="6"
          placeholder="e.g. Highly motivated and detail-oriented graduate seeking an entry-level position where I can apply my skills in..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-inner focus:outline-accent2 text-sm"
          value={formData.summary}
          onChange={handleChange}
        />
        <p className="text-xs text-gray-500 mt-2">
          Tip: Keep it 2–4 sentences summarizing your goals and strengths.
        </p>
      </div>

    </div>
  );
};