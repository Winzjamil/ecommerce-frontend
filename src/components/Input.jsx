import React from 'react';
import { FaAsterisk } from 'react-icons/fa6';
function Input({
  type = 'text',
  name,
  value = '',
  placeholder,
  onChange,
  label,
  id,
  autoComplete,
  pattern,
}) {
  return (
    <>
      <div className="flex flex-wrap w-full mx-auto items-center justify-center text-white text-xs gap-1  ">
        <label
          className="   text-stone-300 flex w-full items-center  gap-0.5 "
          htmlFor={id}
        >
          <FaAsterisk size={8} color="red" />

          {label}
        </label>

        <input
          pattern={pattern}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full p-1.5 placeholder:text-xs placeholder:text-white/70 placeholder:font-light bg-black rounded-md outline-none focus:border focus:border-blue-200   "
          autoComplete={autoComplete}
          id={id}
        />
      </div>
    </>
  );
}

export default Input;
