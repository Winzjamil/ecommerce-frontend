import React from 'react';

function Form({
  header,
  children,
  onSubmit,

  isAddress,
  isProdForm,
}) {
  const containerClass = isAddress
    ? 'bg-zinc-600 w-full max-w-90 h-screen flex items-center flex-col justify-center  px-3 rounded'
    : isProdForm
    ? 'px-3  flex flex-col gap-4 bg-neutral-500 min-h-110 justify-center rounded max-w-100'
    : 'bg-slate-500  max-w-100 border-white   px-8 py-4 rounded-md';
  return (
    <form onSubmit={onSubmit} className="flex flex-wrap   h-auto ">
      <div className={containerClass}>
        <h2 className="text-white font-light w-full text-sm text-center">
          {header}
        </h2>
        {children}
      </div>
    </form>
  );
}

export default Form;
