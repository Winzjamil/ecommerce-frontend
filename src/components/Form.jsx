import React from 'react';

function Form({ header, children, onSubmit, className }) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-wrap items-center justify-center  "
    >
      <div className="bg-gradient-to-tr from-black/80 to-white/80 border max-w-120 border-white  px-8 py-4 rounded-md">
        <h2 className="text-white font-light w-full text-center">{header}</h2>
        {children}
      </div>
    </form>
  );
}

export default Form;
