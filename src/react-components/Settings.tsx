import { useEffect, useRef } from "react";
import Modal, { type ModalHandle } from "./Modal";

import FontSelector from "./FontSelector";
import ColorSelector from "./ColorSelector";
import ApplyBtn from "./ApplyBtn";
import { useModal } from "../context/ModalContext";
import TimeInputForm from "./TimeInputForm";

import { IoSettingsSharp } from "react-icons/io5";

function Settings() {
  const modal = useRef<ModalHandle>(null);
  const { modalOpen, closeModal, openModal } = useModal();

  useEffect(() => {
    if (modal.current) {
      modal.current.open();
    }
  }, [modalOpen]);
  return (
    <>
      <button className="settings" onClick={() => openModal()}>
        <IoSettingsSharp />
      </button>

      {modalOpen && (
        <Modal ref={modal} onClose={closeModal}>
          <div className="modal-box">
            <div className="modal__top">
              <h2>Settings</h2>
              <button className="modal__close" onClick={closeModal}>
                <img src="./assets/icon-close.svg" />
              </button>
            </div>
            <div className="modal__content">
              <div className="time-section">
                <h3>TIME (MINUTES)</h3>
                <TimeInputForm />
              </div>
              <div className="font-section">
                <h3>FONT</h3>
                <FontSelector />
              </div>
              <div className="color-section">
                <h3>COLOR</h3>
                <ColorSelector />
              </div>
            </div>
          </div>
          <ApplyBtn />
        </Modal>
      )}
    </>
  );
}

export default Settings;
