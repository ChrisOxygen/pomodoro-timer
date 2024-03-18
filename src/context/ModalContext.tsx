/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useReducer } from "react";

type ModalStateType = {
  modalOpen: boolean;
};

type ModalContextValue = ModalStateType & {
  closeModal: () => void;
  openModal: () => void;
};

type ModalProviderProps = {
  children: ReactNode;
};

type CloseModalAction = {
  type: "CLOSE_MODAL";
};

type OpenModalAction = {
  type: "OPEN_MODAL";
};

type Action = CloseModalAction | OpenModalAction;

const initialState: ModalStateType = {
  modalOpen: false,
};

const ModalContext = createContext<ModalContextValue | null>(null);

function modalReducer(state: ModalStateType, action: Action): ModalStateType {
  switch (action.type) {
    case "CLOSE_MODAL":
      return {
        ...state,
        modalOpen: false,
      };
    case "OPEN_MODAL":
      return {
        ...state,
        modalOpen: true,
      };

    default:
      return state;
  }
}

function ModalProvider({ children }: ModalProviderProps) {
  const [modalState, dispatch] = useReducer(modalReducer, initialState);
  const { modalOpen } = modalState;

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const openModal = () => {
    dispatch({ type: "OPEN_MODAL" });
  };

  const ctxValue: ModalContextValue = {
    modalOpen,
    closeModal,
    openModal,
  };

  return (
    <ModalContext.Provider value={ctxValue}>{children}</ModalContext.Provider>
  );
}

//custom hook
function useModal() {
  const context = useContext(ModalContext);

  if (context === null)
    throw new Error("ModalContext was used outside the ModalProvider");
  return context;
}

export { ModalProvider, useModal };
