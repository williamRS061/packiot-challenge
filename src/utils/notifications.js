import { toast } from "react-toastify";

const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
};

export const NotificationSuccess = msg => {
  toast.success(msg, toastConfig);
};

export const NotificationError = msg => {
  toast.error(msg, toastConfig);
};

export const NotificationDefault = msg => {
  toast(msg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};
