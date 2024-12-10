chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "PAGE_CONTENT") {
    document.getElementById("email-subject").innerText = message.mail_subject;
    document.getElementById("sender-email").innerText = message.sender_mail;
    document.getElementById("page-content").innerText = message.content;

    const linksContainer = document.getElementById("links");
    message.link.forEach((link, index) => {
      const listItem = document.createElement("li");
      const anchorTag = document.createElement("a");
      anchorTag.href = link;
      anchorTag.innerText = `link ${index}`;
      anchorTag.target = "_blank";
      anchorTag.title = link;
      listItem.appendChild(anchorTag);
      linksContainer.appendChild(listItem);
    });
  }
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  console.log("Injecting content script into tab:", tabs[0].id); // Debug

  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    files: ["content.js"],
  });
});
