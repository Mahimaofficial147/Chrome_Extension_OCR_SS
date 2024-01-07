document.addEventListener("DOMContentLoaded", function () {
    const screenshotBtn = document.getElementById("screenshotBtn");
    const submitBtn = document.getElementById("submit");

    if (screenshotBtn) {
        screenshotBtn.addEventListener("click", takeScreenshot);
    } else {
        console.error("Button not found.");
    }

    if (submitBtn) {
        submitBtn.addEventListener("click", performOCR);
    } else {
        console.error("Submit button not found.");
    }

    // Listen for messages from the content script
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.action === 'ocrResult') {
            console.log('OCR Result:', message.text);
        } else if (message.action === 'ocrError') {
            console.error('OCR Error:', message.error);
        }
    });
});

function takeScreenshot() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tab = tabs[0];
        chrome.tabs.captureVisibleTab(tab.windowId, { format: "png" }, function (screenshotUrl) {
            if (!chrome.runtime.lastError) {
                const link = document.createElement("a");
                link.href = screenshotUrl;
                link.download = "screenshot.png";
                link.click();
            } else {
                console.error(chrome.runtime.lastError);
            }
        });
    });
}

function performOCR() {
 

    document.getElementById("submit").onclick = async () => {
        const url = document.getElementById("url").value;
      
        const res = await fetch(url);
        const blob = await res.blob();
      
        iframe.contentWindow.postMessage(blob, "*");
      }
    }