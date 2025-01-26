import { X } from "lucide-react";
import React from "react";
import ReactDOM from "react-dom";
import ClientOnly from "../global/client-only";
import Header from "../header";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name: string;
};

function Modal({ children, isOpen, onClose, name }: Props) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4">
      <ClientOnly>
        <div className="w-screen max-w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-dark-secondary">
          <Header
            name={name}
            buttonComponent={
              <button
                className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-primary text-white hover:bg-blue-600"
                onClick={onClose}
              >
                <X size={18} />
              </button>
            }
            isSmallText
          />
          {children}
        </div>
      </ClientOnly>
    </div>,

    document.body
  );
}

export default Modal;
