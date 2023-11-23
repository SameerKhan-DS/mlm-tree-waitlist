"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import WaitList from "../WaitList";
import ChoosePosition from "../addClientSteps/ChoosePosition";

function useClient(callback: () => void) {
  const isClient = React.useRef(false);

  if (isClient.current === false) {
    isClient.current = true;
    callback();
  }
}

const Whitelist = (props: any) => {
  const handleCloseModal = () => {
    props.setIsPopupOpen(false);
  };

  useClient(() => {
    // Moved the call to Modal.setAppElement() inside of the return statement
    return () => {
      Modal.setAppElement("#wait-list");
    };
  });
  const [stepNumber, setStepNumber] = useState<number>(1);
  const addUserSteps: Record<number, React.ReactNode> = {
    1: (
      <WaitList
        setStepNumber={setStepNumber}
        stepNumber={stepNumber}
        setIsPopupOpen={props.setIsPopupOpen}
      />
    ),
    2: <ChoosePosition setStepNumber={setStepNumber} />,
  };
  const currentComponent: React.ReactNode = addUserSteps[stepNumber];
  console.log(stepNumber, "stepNumber");

  return (
    <Modal isOpen={props.isPopUpOpen} onRequestClose={handleCloseModal}>
      <div className="text-center">{currentComponent}</div>
    </Modal>
  );
};

export default Whitelist;
