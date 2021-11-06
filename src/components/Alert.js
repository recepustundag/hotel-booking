import React from "react";

const Alert = ({showMessage}) => {
  return (
    <div className="flex justify-center">
    <div className="fixed top-0 z-50 mx-auto mt-2">
      <div className="flex items-center px-3 py-2 mb-2 bg-green-500 border-l-4 border-green-700 shadow-md">
        <div className="max-w-xs text-white whitespace-nowrap">{showMessage}</div>
      </div>
    </div>
    </div>
  );
};

export default Alert;
