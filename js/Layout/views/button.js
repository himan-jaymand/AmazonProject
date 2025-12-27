export function Button({ text, onClick, className = "" }) {
  const button = document.createElement("button");kk
  button.className = `btn ${className}`;
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}