function displayTrustedWebsiteMessage() {
  if (!document.getElementById("trustedWebsiteMessage")) {
    const message = document.createElement("div");
    message.id = "trustedWebsiteMessage";
    message.textContent = "Trusted Website";
    message.style.position = "fixed";
    message.style.top = "10px";
    message.style.right = "10px";
    message.style.backgroundColor = "#4CAF50";
    message.style.color = "#fff";
    message.style.padding = "10px";
    message.style.borderRadius = "5px";
    message.style.zIndex = 10000;
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
  }
}
