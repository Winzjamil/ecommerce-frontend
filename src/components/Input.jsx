import React from 'react';

function Input({
  type = 'text',
  name,
  value = '',
  placeholder,
  onChange,
  label,
  className,
  id,
  autoComplete,
  required,
}) {
  return (
    <>
      <div>
        <label className=" font-bold flex flex-col " htmlFor={id}>
          {label}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="border border-blue-700 p-1.5 text-center rounded-lg outline-none bg-white focus:border-orange-400 focus:border-2 w-72"
          autoComplete={autoComplete}
          id={id}
          required={required}
        />
      </div>
    </>
  );
}

export default Input;
