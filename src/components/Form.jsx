import React from 'react';

function Form({ header, children, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-md  max-w-xl flex flex-col justify-center items-center  bg-black p-4  shadow-sm "
    >
      <h2 className="text-white mb-2">{header}</h2>
      <div className="flex gap-3 flex-col bg-white p-2 rounded-md shadow-md">
        {children}
      </div>
    </form>
  );
}

export default Form;
