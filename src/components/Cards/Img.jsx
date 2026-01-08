import React from 'react';

function Img({ img }) {
  return (
    <>
      <img
        src={img}
        alt="my profile"
        className="w-6 h-6 rounded-full object-cover bg-stone-200 p-0.5"
      />
    </>
  );
}

export default Img;
