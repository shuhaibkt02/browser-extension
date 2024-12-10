(() => {
  const pageTitle = document.title;
  const subject =
    document.querySelector(".ha")?.innerText.split("\n")[0] ??
    "Subject not found";
  const adsElement = document.querySelector(".adn.ads")?.childNodes[1];
  const links = [...adsElement?.querySelectorAll("a")]
    .map((link) => link.href)
    .filter((href) => /^https?:\/\//.test(href));

  const senderEmailElement = document.querySelector(".ajA.SK")?.childNodes[0];
  const sender_email =
    senderEmailElement?.innerText
      .split("from:")[1]
      ?.split("to:")[0]
      .trim()
      .match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/)?.[0] ??
    "Email Not Found!";
  const content =
    adsElement?.childNodes?.[adsElement.childNodes.length - 1]?.innerText ??
    "Content not found";

  const extractedData = {
    mail_subject: subject,
    sender_mail: sender_email,
    title: pageTitle,
    content,
    links,
  };

  console.log("Extracted Data:", extractedData);

  chrome.runtime.sendMessage({
    type: "PAGE_CONTENT",
    mail_subject: subject,
    sender_mail: extractedData.sender_mail,
    title: pageTitle,
    content: extractedData.content,
    link: extractedData.links,
  });
})();
