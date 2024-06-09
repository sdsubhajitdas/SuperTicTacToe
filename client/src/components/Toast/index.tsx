import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  let toastType = "";
  if (type === "error") {
    toastType = "bg-red-700 text-white";
  } else if (type === "success") {
    toastType = "bg-green-700 text-white";
  }

  console.log(type);

  return (
    <div
      className={`px-7 py-3 text-center text-xl shadow-xl shadow-black/40 rounded ${toastType}`}
    >
      {message}
    </div>
  );
};

export default Toast;
