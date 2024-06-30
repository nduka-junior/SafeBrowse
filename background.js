chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addVerifiedWebsite",
    title: "Add to Verified Websites",
    contexts: ["page"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addVerifiedWebsite" && tab.url) {
    const url = new URL(tab.url);
    const hostname = url.hostname;

    chrome.storage.sync.get(["verifiedWebsites"], function (result) {
      const websites = result.verifiedWebsites || [];

      if (!websites.includes(hostname)) {
        websites.push(hostname);
        chrome.storage.sync.set({ verifiedWebsites: websites }, function () {
          showToast(tab.id, `${hostname} added to verified websites.`);
        });
      } else {
        showToast(
          tab.id,
          `${hostname} is already in the list of verified websites.`
        );
      }
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    const url = new URL(tab.url);
    if (url.protocol === "http:" || url.protocol === "https:") {
      chrome.storage.sync.get(["verifiedWebsites"], function (result) {
        if (chrome.runtime.lastError) {
          return;
        }

        const websites = result.verifiedWebsites || [];
        const hostname = url.hostname;

        if (websites.includes(hostname)) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (hostname) => {
              chrome.storage.sync.get(["verifiedWebsites"], function (result) {
                const websites = result.verifiedWebsites || [];
                if (websites.includes(hostname)) {
                  displayTrustedWebsiteMessage();
                }
              });
            },
            args: [hostname],
          });
        }
      });
    }
  }
});

function showToast(tabId, message) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabId },
      files: ["scripts/toast.js"],
    },
    () => {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: displayToast,
        args: [message],
      });
    }
  );
}

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
