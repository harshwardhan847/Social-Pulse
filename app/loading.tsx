import React from "react";

const loading = () => {
  return (
    <div className="w-full h-full flex-1 flex items-center justify-center">
      <div className="w-10 h-10 aspect-square border-r-4 border-t-4 border-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default loading;
