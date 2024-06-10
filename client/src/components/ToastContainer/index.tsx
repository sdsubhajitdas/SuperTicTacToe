// src/ToastContainer.tsx
import { useState, useCallback, forwardRef, useImperativeHandle } from "react";
import Toast from "../Toast";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
}

export interface ToastContainerRef {
  addToast: (message: string, type: "success" | "error") => void;
}

const ToastContainer = forwardRef<ToastContainerRef>((_props, ref) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: "success" | "error") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  useImperativeHandle(ref, () => ({
    addToast,
  }));

  return (
    <div className="fixed z-50 flex flex-col gap-3 top-3 sm:right-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
});

export default ToastContainer;
