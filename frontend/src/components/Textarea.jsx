// components/Textarea.jsx

const Textarea = ({ label, name, value, onChange, placeholder, rows = 5 }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="font-medium text-sm text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-accent2 text-sm"
      />
    </div>
  );
};

export default Textarea;
