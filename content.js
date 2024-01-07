
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "performOCR") {
      
        console.log("Performing OCR for URL:", message.url);

        
        sendResponse({ result: "OCR processing started" });
    }
});
