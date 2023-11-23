import api from "@/services/api";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "react-modal";

interface buttonDataType {
  id: string;
  setIsContentDelete: (value: boolean) => void;
}
const RemoveBtn: React.FC<buttonDataType> = ({ id, setIsContentDelete }) => {
  const removeTopics = async () => {
    const response: Response = await api.delete(`/waitlist?id=${id}`);
    if (response.statusText == "OK") {
      setIsContentDelete(true);
      setIsPopUp(false);
    }
  };
  const [isPopUp, setIsPopUp] = useState(false);

  return (
    <>
      <Modal
        isOpen={isPopUp}
        style={{
          content: {
            background: "none",
            border: 0,
            padding: 0,
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <div className="flex justify-center items-center p-4 bg-green-500">
          <h2 className="text-xl font-bold text-red p-2">Delete Topic</h2>
          <p className="text-white p-2">Are you sure ?</p>
          <button
            type="submit"
            onClick={removeTopics}
            className="bg-gray-600 m-2 text-white font-bold py-2 px-4 rounded-md"
          >
            Yes
          </button>
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-md p-2"
            onClick={() => setIsPopUp(false)}
          >
            Close
          </button>
        </div>
      </Modal>
      <button onClick={() => setIsPopUp(true)}>
        <AiOutlineDelete size={24} color={"red"} />
      </button>
    </>
  );
};

export default RemoveBtn;
