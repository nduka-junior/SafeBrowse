// document.addEventListener("DOMContentLoaded", function () {
//   const websiteList = document.getElementById("websiteList");

//   function loadWebsites() {
//     chrome.storage.sync.get(["verifiedWebsites"], function (result) {
//       const websites = result.verifiedWebsites || [];
//       websiteList.innerHTML = "";
//       websites.forEach((website) => {
//         const li = document.createElement("li");
//         li.textContent = website;
//         websiteList.appendChild(li);
//       });
//     });
//   }

//   loadWebsites();
// });

document.addEventListener("DOMContentLoaded", function () {
  const websiteList = document.getElementById("websiteList");

  function loadWebsites() {
    chrome.storage.sync.get(["verifiedWebsites"], function (result) {
      const websites = result.verifiedWebsites || [];
      websiteList.innerHTML = "";
      websites.forEach((website) => {
        const li = document.createElement("li");
        li.className = "website-item";
        const text = document.createElement("span");
        text.textContent = website;
        const button = document.createElement("button");
        button.textContent = "Delete";
        button.className = "delete-button";
        button.addEventListener("click", () => deleteWebsite(website));
        li.appendChild(text);
        li.appendChild(button);
        websiteList.appendChild(li);
      });
    });
  }

  function deleteWebsite(website) {
    chrome.storage.sync.get(["verifiedWebsites"], function (result) {
      let websites = result.verifiedWebsites || [];
      websites = websites.filter((w) => w !== website);
      chrome.storage.sync.set({ verifiedWebsites: websites }, function () {
        loadWebsites();
      });
    });
  }

  loadWebsites();
});
