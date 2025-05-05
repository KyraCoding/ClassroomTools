import { UI } from "../ui.js";

// check if url is synergy
/// md-hcpss.edupoint.com/POV_TXP_MAIN.aspx

export const Students = {
    name() { return "Student Manager"; },
    icon() { return null; },
    load(_state) {
        const test = UI.tag("div");
        chrome.runtime.onMessage.addListener(function(request) {
            studentNames = request.names;
            studentPortraitURLs = request.URLs;
            const called = new Array(studentNames.length).fill(false);
            const studentWeights = new Array(studentNames.length).fill(1); // Initialize weights
            console.log("Data received");
            //startCalling();
        });
        (async () => {
            const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
            test.dom.textContent = tab.url;

            chrome.scripting
                .executeScript({
                    target : {tabId : tab.id},
                    files : [ "injected.js" ],
                })
                .then(() => console.log("script injected"));
        })();
        return test;
    }
}