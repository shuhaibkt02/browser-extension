async function getSenderEmail() {
  const senderEmailElement = document.querySelector(".ajA.SK")?.childNodes[0];

  if (senderEmailElement) {
    return extractEmail(senderEmailElement.innerText);
  }

  const showDetailsButton = document.querySelector(".ajy");
  if (!showDetailsButton) {
    console.error("Show details button not found.");
    return "Email Not Found!";
  }

  showDetailsButton.click();
  showDetailsButton.click();

  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedSenderEmailElement =
        document.querySelector(".ajA.SK")?.childNodes[0];
      const senderEmail = updatedSenderEmailElement
        ? extractEmail(updatedSenderEmailElement.innerText)
        : "Email Not Found!";
      resolve(senderEmail);
    }, 500); // Reduced timeout for faster performance
  });
}

function extractEmail(text) {
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
  return (
    text
      .split("from:")[1]?.split("to:")[0]?.trim().match(emailRegex)?.[0] ||
    "Email Not Found!"
  );
}

(async () => {
  const pageTitle = document.title;

  const subjectElement = document.querySelector(".ha");
  const subject = subjectElement?.innerText.split("\n")[0] || "Subject not found";

  const adsElement = document.querySelector(".adn.ads")?.childNodes[1];
  const links = Array.from(adsElement?.querySelectorAll("a") || [])
    .map((link) => link.href)
    .filter((href) => /^https?:\/\//.test(href));

  const senderEmail = await getSenderEmail();

  const content = adsElement?.lastChild?.innerText || "Content not found";

  const extractedData = {
    mail_subject: subject,
    sender_mail: senderEmail,
    title: pageTitle,
    content,
    links,
  };


    chrome.runtime.sendMessage({
      type: "PAGE_CONTENT",
      mail_subject: extractedData.subject,
      sender_mail: extractedData.sender_mail,
      title: extractedData.pageTitle,
      content: extractedData.content,
      link: extractedData.links,
    });
})();