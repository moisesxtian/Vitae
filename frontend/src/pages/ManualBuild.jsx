import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const phLocations = {
  regions: {
    NCR: {
      name: 'National Capital Region',
      provinces: {
        NCR: {
          name: 'NCR',
          cities: [
            'Manila',
            'Quezon City',
            'Makati',
            'Pasig',
            'Taguig',
            'Mandaluyong',
            'Pasay',
            'Marikina',
            'San Juan',
            'Valenzuela',
            'Caloocan',
            'Malabon',
            'Navotas',
            'Las Piñas',
            'Muntinlupa',
            'Pateros'
          ]
        }
      }
    },
    CAR: {
      name: 'Cordillera Administrative Region',
      provinces: {
        Abra: {
          cities: ['Bangued', 'Tayum', 'Bucay', 'Lagangilang']
        },
        Apayao: {
          cities: ['Calanasan', 'Kabugao', 'Conner']
        },
        Benguet: {
          cities: ['Baguio', 'La Trinidad', 'Itogon']
        },
        Ifugao: {
          cities: ['Lagawe', 'Kiangan', 'Hingyon']
        },
        Kalinga: {
          cities: ['Tabuk', 'Lubuagan', 'Pinukpuk']
        },
        'Mountain Province': {
          cities: ['Bontoc', 'Sagada', 'Banaue']
        }
      }
    },
    CALABARZON: {
      name: 'CALABARZON (Region IV-A)',
      provinces: {
        Cavite: {
          cities: ['Dasmariñas', 'Cavite City', 'Imus', 'Trece Martires']
        },
        Laguna: {
          cities: ['Calamba', 'Santa Rosa', 'San Pedro', 'Biñan']
        },
        Batangas: {
          cities: ['Batangas City', 'Lipa', 'Tanauan', 'Lemery']
        },
        Quezon: {
          cities: ['Lucena', 'Tayabas', 'Tiaong']
        },
        Rizal: {
          cities: [
            'Antipolo',
            'Taytay',
            'Cainta',
            'Binangonan',
            'Angono',
            'Rodriguez (Montalban)',
            'San Mateo',
            'Morong',
            'Tanay',
            'Cardona',
            'Pililla'
          ]
        }
      }
    },
    // ... add more regions like MIMAROPA, Bicol, etc.
  }
};

export default function ManualBuild() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', middleInitial: '', lastName: '',
    email: '', phone: '', linkedIn: '', portfolio: '',
    country: 'Philippines', region: '', province: '', city: '',
    education: []
  });
  const [educationList, setEducationList] = useState([]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const addEducation = () =>
    setEducationList([...educationList, { instName: '', degree: '', field: '', start: '', end: '', honors: '', coursework: '' }]);

  const handleEduChange = (idx, e) => {
    const list = [...educationList];
    list[idx][e.target.name] = e.target.value;
    setEducationList(list);
  };

  const removeEducation = (idx) =>
    setEducationList(educationList.filter((_, i) => i !== idx));

  const validateStep = () => {
    if (step === 3 && educationList.length > 0) {
      return educationList.every(ed =>
        ed.instName && ed.degree && ed.field && ed.start && ed.end
      );
    }
    return true;
  };

  const nextStep = () => {
    if (!validateStep()) {
      alert('Please fill in all required education fields or skip.');
      return;
    }
    if (step === 3) {
      setFormData(curr => ({ ...curr, education: educationList }));
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted form:', { ...formData, education: educationList });
    // navigate or send data
  };

  const StepContent = () => {
    if (step === 1) {
      return (
        <>
          <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <Input label="Middle Initial" name="middleInitial" value={formData.middleInitial} onChange={handleChange} />
          <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          <Input label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
          <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
          <Input label="LinkedIn Profile" name="linkedIn" value={formData.linkedIn} onChange={handleChange} />
          <Input label="Portfolio URL (optional)" name="portfolio" value={formData.portfolio} onChange={handleChange} />
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <Select label="Country" name="country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value, region: '', province: '', city: '' })} options={['Philippines', 'Other']} />
          {formData.country === 'Philippines' ? (
            <>
              <Select label="Region" name="region" value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value, province: '', city: '' })} options={Object.keys(phLocations.regions)} />
              {formData.region && <Select label="Province" name="province" value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value, city: '' })} options={Object.keys(phLocations.regions[formData.region].provinces)} />}
              {formData.region && formData.province && <Select label="City" name="city" value={formData.city} onChange={handleChange} options={phLocations.regions[formData.region].provinces[formData.province].cities} />}
            </>
          ) : (
            <>
              <Input label="Region / State" name="region" value={formData.region} onChange={handleChange} />
              <Input label="Province / District" name="province" value={formData.province} onChange={handleChange} />
              <Input label="City / Municipality" name="city" value={formData.city} onChange={handleChange} />
            </>
          )}
        </>
      );
    } else if (step === 3) {
      return (
        <>
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Education</h3>
            <button type="button" onClick={addEducation} className="rounded-full px-4 py-1 bg-primary text-white text-sm hover:opacity-90">+ Add Education</button>
          </div>
          {educationList.length === 0 && (
            <button type="button" onClick={nextStep} className="text-sm text-primary hover:underline my-2">Skip — no education to add</button>
          )}
          {educationList.map((ed, idx) => (
            <div key={idx} className="border p-4 rounded-lg space-y-3 bg-bgcolor">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Institution #{idx + 1}</h4>
                <button type="button" onClick={() => removeEducation(idx)} className="text-red-500 text-sm hover:underline">Remove</button>
              </div>
              <Input label="Institution Name" name="instName" value={ed.instName} onChange={(e) => handleEduChange(idx, e)} />
              <Input label="Degree" name="degree" value={ed.degree} onChange={(e) => handleEduChange(idx, e)} />
              <Input label="Field of Study" name="field" value={ed.field} onChange={(e) => handleEduChange(idx, e)} />
              <div className="flex gap-4">
                <Input label="Start Date" name="start" type="month" value={ed.start} onChange={(e) => handleEduChange(idx, e)} />
                <Input label="End Date" name="end" type="month" value={ed.end} onChange={(e) => handleEduChange(idx, e)} />
              </div>
              <Input label="Honors (optional)" name="honors" value={ed.honors} onChange={(e) => handleEduChange(idx, e)} />
              <label className="text-sm text-dark/80">Relevant Coursework (optional)</label>
              <textarea name="coursework" value={ed.coursework} onChange={(e) => handleEduChange(idx, e)} className="border border-dark/10 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary bg-bgcolor" rows={2} />
            </div>
          ))}
        </>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-bgcolor text-dark flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl border border-dark/10 rounded-2xl p-6 shadow-md bg-white">
        <h2 className="text-2xl font-bold text-accent2 mb-4 text-center">Step {step} of 3</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <StepContent />
          <div className="flex justify-between items-center pt-6">
            {step > 1 && <button type="button" onClick={prevStep} className="rounded-full px-6 py-2 text-sm bg-dark/10 text-dark hover:bg-dark/20">← Back</button>}
            <button type={step === 3 ? 'submit' : 'button'} onClick={step < 3 ? nextStep : null} className="ml-auto rounded-full px-6 py-2 text-sm bg-primary text-white hover:opacity-90">
              {step < 3 ? 'Next →' : 'Submit →'}
            </button>
          </div>
        </form>
        <button onClick={() => navigate('/')} className="mt-6 text-sm text-primary hover:underline block text-center">← Back to Home</button>
      </div>
    </div>
  );
}

// Reusable components
function Input({ label, name, value, onChange, type = 'text' }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm mb-1 text-dark/80">{label}</label>
      <input type={type} name={name} id={name} value={value} onChange={onChange} className="border border-dark/10 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary text-sm bg-bgcolor" required />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm mb-1 text-dark/80">{label}</label>
      <select name={name} id={name} value={value} onChange={onChange} className="border border-dark/10 rounded-md px-4 py-2 bg-bgcolor text-sm focus:ring-2 focus:ring-primary" required>
        <option value="">Select {label}</option>
        {options.map((opt, idx) => <option key={idx} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}