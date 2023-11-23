import React from "react";

const ChoosePosition = (props: any) => {
  return (
    <div className="text-center">
  <p className="text-lg font-bold mb-4">Choose Position</p>

  <div className="mb-4">
    <select
      className="block w-full bg-white border border-gray-300 p-2 rounded-md"
      onChange={(e) => console.log(e.target.value)}  
    >
      <option value="left">Left</option>
      <option value="right">Right</option>
    </select>
  </div>

  <button
    onClick={() => props?.setStepNumber(3)}
    className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
  >
    Add Client
  </button>
</div>

  );
};

export default ChoosePosition;
