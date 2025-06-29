const Input = ({ label, name, value, onChange, type = 'text', className = '' ,placeholder,maxLength,}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded border-gray-300 ${className}`}
      required
      onFocus={(e) => e.target.placeholder = ''}
      onBlur={(e) => e.target.placeholder = placeholder || ''}

    />
  </div>
);

export default Input;
