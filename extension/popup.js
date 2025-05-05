// UI Elements
let loadButton = document.getElementById("loadButton");
let loadPane = document.getElementById("loadPane");
let mainPane = document.getElementById("mainPane");
let nameLabel = document.getElementById("nameLabel");
let nextButton = document.getElementById("nextButton");
let stopButton = document.getElementById("stopButton");
let badButton = document.getElementById("badButton");
let goodButton = document.getElementById("goodButton");
let studentImage = document.getElementById("studentImage");

// Data Arrays
let studentNames = [];
let studentPortraitURLs = [];
let called = [];
let studentWeights = [];
let currentStudentIndex = -1;

// Receive message from injected script
chrome.runtime.onMessage.addListener(function(request) {
    studentNames = request.names;
    studentPortraitURLs = request.URLs;
    called = new Array(studentNames.length).fill(false);
    studentWeights = new Array(studentNames.length).fill(1); // Initialize weights
    console.log("Data received");
    startCalling();
});

// Inject script into Synergy
loadButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['injected.js']
    });
});

// Select next student
nextButton.addEventListener("click", async () => {
    currentStudentIndex = generateWeighted();
    nameLabel.innerText = studentNames[currentStudentIndex];
    studentImage.src = studentPortraitURLs[currentStudentIndex];
});

// Close popup
stopButton.addEventListener("click", async () => {
    window.close();
});

// Penalize bad behavior
badButton.addEventListener("click", () => {
    if (currentStudentIndex >= 0) {
        studentWeights[currentStudentIndex] += 0.5;
    }
});

// Reward good behavior
goodButton.addEventListener("click", () => {
    if (currentStudentIndex >= 0) {
        studentWeights[currentStudentIndex] = Math.max(1, studentWeights[currentStudentIndex] - 0.25);
    }
});

// Main function
function startCalling() {
    console.log("Calling Started");

    loadPane.style.display = "none";
    mainPane.style.display = "block";

    currentStudentIndex = generateWeighted();
    nameLabel.innerText = studentNames[currentStudentIndex];
    studentImage.src = studentPortraitURLs[currentStudentIndex];
}

// Weighted selection function
function generateWeighted() {
    // Reset called list if all students have been called
    if (called.every(v => v)) {
        called.fill(false);
    }

    // Create weight map excluding already-called students
    let totalWeight = 0;
    let weightMap = [];

    for (let i = 0; i < studentWeights.length; i++) {
        if (!called[i]) {
            totalWeight += studentWeights[i];
            weightMap.push({ index: i, weight: studentWeights[i] });
        }
    }

    let randWeight = Math.random() * totalWeight;
    let cumulative = 0;

    for (let i = 0; i < weightMap.length; i++) {
        cumulative += weightMap[i].weight;
        if (randWeight < cumulative) {
            called[weightMap[i].index] = true;
            return weightMap[i].index;
        }
    }

    return 0; // Fallback
}
