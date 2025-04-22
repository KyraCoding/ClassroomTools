// UI Elements
let loadButton = document.getElementById("loadButton");
let loadPane = document.getElementById("loadPane");
let mainPane = document.getElementById("mainPane");
let nameLabel = document.getElementById("nameLabel");
let nextButton = document.getElementById("nextButton");
let stopButton = document.getElementById("stopButton");
let studentImage = document.getElementById("studentImage");

let studentNames = [];
let studentPortraitURLs = [];
let called = [];

// Extension receives message from injected script
chrome.runtime.onMessage.addListener(
    function(request) {
        studentNames = request.names;
        studentPortraitURLs = request.URLs;
        called.length = studentNames.length;
        called.fill(false);
        console.log("Data recieved");
        startCalling();
    }
);

// Inject script into Synergy
loadButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['injected.js']
    });
});

nextButton.addEventListener("click", async () => {
    rand = generate();
    nameLabel.innerText = studentNames[rand];
    studentImage.src = studentPortraitURLs[rand];
});

stopButton.addEventListener("click", async () => {
    window.close();
});

// Main function
function startCalling() {

    console.log("Calling Started");

    for (let i = 0; i < 3; i++) {
        console.log(studentPortraitURLs[i]);
    }

    loadPane.style.display = "none";
    mainPane.style.display = "block";

    let rand = generate();
    nameLabel.innerText = studentNames[rand];
    studentImage.src = studentPortraitURLs[rand];

}

// Function to generate a name
function generate() {

    let rand;
    let flag = true;

    for (let i = 0; i < called.length; i++) {
        if (!called[i]) {
            flag = false;
            break;
        }
    }

    if (flag) 
        called.fill(false);

    while (true) {
        rand = Math.floor((Math.random() * studentNames.length));
        if (!called[rand]) {
            break;
        }
    }

    called[rand] = true;
    return rand;
    
}