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
      <div className="flex flex-wrap w-full mx-auto items-center justify-center text-white text-sm gap-1  ">
        <label
          className=" font-medium text-md text-stone-600 flex w-full block text-white/90  gap-0.5 leading-none "
          htmlFor={id}
        >
          <span className=" text-xs mr-0.5 text-red-600">
            <FaAsterisk />
          </span>
          {label}
        </label>

        <input
          pattern={pattern}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="border border-white/20 text-xs w-full p-1.5 placeholder:text-xs text-white placeholder:text-white/70 placeholder:font-light bg-transparent rounded-md outline-none focus:border-blue-200 to-stone-300  "
          autoComplete={autoComplete}
          id={id}
        />
      </div>
    </>
  );
}

export default Input;
