import { useEffect, useRef } from "react";
import { IoSettingsSharp } from "react-icons/io5";

import Modal, { type ModalHandle } from "./Modal";
import FontSelector from "./FontSelector";
import ColorSelector from "./ColorSelector";
import ApplyBtn from "./ApplyBtn";
import TimeInputForm from "./TimeInputForm";
import { useModal } from "../context/ModalContext";

function Settings() {
  const modal = useRef<ModalHandle>(null);
  const { modalOpen, closeModal, openModal } = useModal();

  useEffect(() => {
    if (modal.current) modal.current.open();
  }, [modalOpen]);

  return (
    <>
      <button
        className="mt-11.25 flex items-center justify-center w-14 h-14 rounded-full bg-dark-2 text-faded-blue text-[26px] opacity-60 hover:opacity-100 hover:rotate-45 transition-all duration-300"
        onClick={() => openModal()}
        aria-label="Open settings"
      >
        <IoSettingsSharp />
      </button>

      {modalOpen && (
        <Modal ref={modal} onClose={closeModal}>
          <div className="relative rounded-[25px] bg-white">
            {/* Header */}
            <div className="flex justify-between items-center px-10 pt-[34px] pb-[31px] border-b border-[#E3E1E1] max-[451px]:p-6">
              <h2 className="text-dark-2 text-[28px] font-bold max-[451px]:text-xl">
                Settings
              </h2>
              <button className="opacity-50 hover:opacity-100" onClick={closeModal}>
                <img
                  src="./assets/icon-close.svg"
                  className="w-[14px] h-[14px] shrink-0"
                />
              </button>
            </div>

            {/* Content */}
            <div className="pt-7 pr-10 pb-[59px] pl-10 flex flex-col max-[451px]:p-6 max-[451px]:pb-10">
              {/* Time section */}
              <div className="flex flex-col gap-[22px] max-[451px]:items-center">
                <h3 className="text-dark-2 text-[13px] font-bold tracking-[5px] max-[451px]:text-[11px]">
                  TIME (MINUTES)
                </h3>
                <TimeInputForm />
              </div>

              {/* Font section */}
              <div className="flex items-center justify-between py-4 my-4 border-y border-[#E3E1E1] max-[451px]:flex-col max-[451px]:gap-[18px]">
                <h3 className="text-dark-2 text-[13px] font-bold tracking-[5px] max-[451px]:text-[11px]">
                  FONT
                </h3>
                <FontSelector />
              </div>

              {/* Color section */}
              <div className="flex items-center justify-between max-[451px]:flex-col max-[451px]:gap-[18px]">
                <h3 className="text-dark-2 text-[13px] font-bold tracking-[5px] max-[451px]:text-[11px]">
                  COLOR
                </h3>
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
