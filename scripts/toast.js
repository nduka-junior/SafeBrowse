function displayToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "10px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.backgroundColor = "#333";
  toast.style.color = "#fff";
  toast.style.padding = "10px";
  toast.style.borderRadius = "5px";
  toast.style.zIndex = 10000;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
