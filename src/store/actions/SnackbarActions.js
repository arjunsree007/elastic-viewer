export const SNACKBAR_OPEN = "SNACKBAR_OPEN";
export const SNACKBAR_CLOSE = "SNACKBAR_CLOSE";

export function openSnackbar(message, messageType) {
  return {
    type: SNACKBAR_OPEN,
    payload: message,
    payloadType: messageType
  };
}

export function closeSnackbar() {
  return {
    type: SNACKBAR_CLOSE,
    payload: false
  };
}
