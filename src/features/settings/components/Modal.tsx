import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export type ModalHandle = {
  open: () => void;
};

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal(
  { children, onClose },
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      if (dialog.current) dialog.current.showModal();
    },
  }));

  return createPortal(
    <dialog
      ref={dialog}
      className="modal-dialog absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] shrink-0 bg-transparent border-none flex flex-col items-center max-[451px]:w-[calc(100%-48px)]"
      onClose={onClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root")!
  );
});

export default Modal;
