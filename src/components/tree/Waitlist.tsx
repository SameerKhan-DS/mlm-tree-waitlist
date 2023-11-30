"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import WaitList from "../WaitList";
import ChoosePosition from "../addClientSteps/ChoosePosition";
import api from "@/services/api";

function useClient(callback: () => void) {
  const isClient = React.useRef(false);

  if (isClient.current === false) {
    isClient.current = true;
    callback();
  }
}

const Whitelist = (props: any) => {
  const { setIsPopupOpen, setIsRender } = props;
  const __id = props.nodeId;
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
  const [clientToAdd, setClientToAdd] = useState({});

  const addUserSteps: Record<number, React.ReactNode> = {
    1: (
      <WaitList
        setStepNumber={setStepNumber}
        stepNumber={stepNumber}
        setIsPopupOpen={props.setIsPopupOpen}
        setClientToAdd={setClientToAdd}
      />
    ),
    2: (
      <ChoosePosition {...{ clientToAdd, __id, setIsPopupOpen, setIsRender, setStepNumber }} />
    ),
  };
  if (props.isPopUpOpen == false) {
    setIsRender(1);
  }
  console.log(props.isPopUpOpen, stepNumber, "props.isPopUpOpenprops.isPopUpOpen");
  const currentComponent: React.ReactNode = addUserSteps[stepNumber];
  
 
  return (
    <Modal
      isOpen={props.isPopUpOpen}
      onRequestClose={handleCloseModal}
      shouldCloseOnOverlayClick={false}
    >
      <div className="text-center">{currentComponent}</div>
    </Modal>
  );
};

export default Whitelist;
