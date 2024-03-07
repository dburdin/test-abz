export const isInputFocused = (inputId: string) => {
  return document.activeElement === document.getElementById(inputId);
};
