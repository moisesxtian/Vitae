import {useState} from "react";
import Input from "../components/Input";
import { Plus, X,Briefcase} from "lucide-react";
export const StepOne = ({ formData, setFormData}) => {
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
                if (/^[a-zA-Z]*$/.test(value) || value === "") {
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
              onChange={(e)=>{
                const value= e.target.value;
                if(/^[a-zA-Z]*$/.test(value) || value === "") {
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
          onChange={(e) => 
          {
            const value = e.target.value;
            if (/^\d*$/.test(value) || value === "") {
              setFormData({ ...formData, phone: value });
            } else {
              setErrorMessage("Phone number can only contain digits.");
            }
          }
          }
        />

      </div>
      <div className="flex justify-end">
      </div>
    </div>
  );
};
export const StepTwo = ({ formData, setFormData}) => {
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
              <X className="text-red-600 w-4 h-4" />
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
export const StepThree = ({ formData, setFormData, prevStep, nextStep }) => {
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
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { company: '', jobtitle: '', start: '', end: '', present: false, bullets: [''] },
      ]
    });
  };

  const removeExperience = idx => {
    const updated = [...formData.experience];
    updated.splice(idx, 1);
    setFormData({ ...formData, experience: updated });
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

 return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-accent2 text-center">Work Experience</h2>

      {formData.experience.map((exp, idx) => (
        <div
          key={idx}
          className="border border-gray-200 p-4 rounded-lg space-y-2 bg-white shadow-sm"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-accent2 font-semibold">
              <Briefcase className="w-5 h-5" />
              <span>Experience #{idx + 1}</span>
            </div>
            <button type="button" onClick={() => removeExperience(idx)}>
              <X className="w-5 h-5 text-red-600 hover:text-red-800 transition" />
            </button>
          </div>

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

          <div className="grid grid-cols-2 md:flex-row md:items-end gap-4">
            <Input
              label="Start Date"
              name="start"
              type="month"
              value={exp.start}
              onChange={e => handleExperienceChange(idx, e)}
            />

              <Input
                label="End Date"
                name="end"
                type="month"
                value={exp.end}
                onChange={e => handleExperienceChange(idx, e)}
              />


          </div>
      {exp.bullets.map((bullet, bIdx) => (
          <div className="flex h-auto w-fita p-2 rounded-lg items-center gap-2  overflow-auto">
        <div key={bIdx} className="flex h-au w-full items-center gap-2">
          <div className="flex-1">
              <Input
            label={`Responsibilites / Accomplishment #${bIdx + 1}`}
            name={`bullet-${bIdx}`}
            type="text"
            value={bullet}
            placeholder={'e.g. Spearheaded the development of...'}
            
            onChange={(e) => handleBulletChange(idx, bIdx, e.target.value)}
          />
          </div>
          <button
            type="button"
            onClick={() => removeBullet(idx, bIdx)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <X className="w-5 h-5 text-red-600 hover:text-red-800" />
          </button>
  </div>
          </div>
))}
          
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => addBullet(idx)}
              className=" flex gap-2 text-accent2 hover:underline"
            >
              <Plus className="w-5 h-5" />
              Add Bullet Point
            </button>
          </div>
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