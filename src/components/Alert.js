import React from "react";

const Alert = ({showMessage}) => {
  return (
    <div className="flex justify-center">
    <div className="fixed top-0 z-50 mx-auto mt-2">
      <div className="flex items-center py-2 pl-2 pr-6 bg-blue-500 rounded">
        <div className="max-w-xs text-white whitespace-nowrap">{showMessage}</div>
      </div>
    </div>
    </div>
  );
};

export default Alert;
