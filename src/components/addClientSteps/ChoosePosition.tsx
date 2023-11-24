import api from "@/services/api";
import React, { useState } from "react";

const ChoosePosition = (props: any) => {
  const [clientPosition, setClientPosition] = useState("left");
  console.log(props.__id, "choose");
  const addClientInTree = async () => {
    props.clientToAdd.position = clientPosition;
    const data = await api.put(`/tree/${props.__id}`, {
      newChildren: props.clientToAdd,
    });
    props.setIsPopupOpen(false);
  };
  return (
    <div className="text-center">
      <p className="text-lg font-bold mb-4">Choose Position</p>
      <div className="mb-4">
        <select
          className="block w-full bg-white border border-gray-300 p-2 rounded-md"
          onChange={(e) => setClientPosition(e.target.value)}
        >
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>

      <button
        onClick={addClientInTree}
        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Add Client
      </button>
    </div>
  );
};

export default ChoosePosition;
