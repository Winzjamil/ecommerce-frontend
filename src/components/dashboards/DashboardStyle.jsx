import React from 'react';

function DashBoardStyle({ children }) {
  return (
    <div className="min-h-screen flex  bg-sky-200/70  text-extralight pt-15">
      {children}
    </div>
  );
}

export default DashBoardStyle;
