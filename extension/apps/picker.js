import { UI } from "../ui.js";
import { Storage } from "../storage.js";

// UI Elements
let loadPane, mainPane, nameLabel, nextButton, badButton, goodButton, studentImage;

let currentPeriod = "Period 1";
let currentStudentIndex = -1;
let called = [];
let studentWeights = {};
let studentData = {};

function initPeriod(period) {
    console.log(Storage.students, period)
    studentData = Storage.students[period] || { names: [], urls: [] };
    called = Array(studentData.names.length).fill(false);
    studentWeights[period] = studentWeights[period] || studentData.names.map(() => 1);
}

function getStudent({ names, urls }, index) {
    console.log("getting")
    console.log(names, urls);
    return { name: names[index], url: urls[index] };
}

// Weighted random selection
function generateWeighted(period) {
    const weights = studentWeights[period];
    const students = studentData.names;

    if (called.every(v => v)) called.fill(false);

    let totalWeight = 0;
    let weightMap = [];

    for (let i = 0; i < students.length; i++) {
        if (!called[i]) {
            totalWeight += weights[i];
            weightMap.push({ index: i, weight: weights[i] });
        }
    }

    let randWeight = Math.random() * totalWeight;
    let cumulative = 0;

    for (let entry of weightMap) {
        cumulative += entry.weight;
        if (randWeight < cumulative) {
            called[entry.index] = true;
            return entry.index;
        }
    }

    return 0;
}

function pickNewStudent() {
    currentStudentIndex = generateWeighted(currentPeriod);
    const student = getStudent(studentData, currentStudentIndex);
    console.log(student)
    nameLabel.dom.innerText = student.name;
    studentImage.src = student.url;
    console.log("here")
    console.log(student);
}

function markBehavior(good = true) {
    if (currentStudentIndex >= 0) {
        const weights = studentWeights[currentPeriod];
        if (good) {
            weights[currentStudentIndex] = Math.max(1, weights[currentStudentIndex] - 0.25);
        } else {
            weights[currentStudentIndex] += 0.5;
        }
    }
}

function createDropdownButton() {
    const button = UI.tag("button")
        .id("dropdownButton")
        .clz("absolute top-6 right-6 px-4 py-2 bg-white border-2 border-gray-300 hover:border-blue-500 rounded-lg text-gray-700 hover:text-blue-600 font-medium shadow-sm hover:shadow-md transition-all cursor-pointer")
        .attr("type", "button")
        .sub(currentPeriod + " ▼");

    button.on("click", () => {
        const dropdown = document.getElementById("dropdown");
        dropdown?.classList.toggle("hidden");
    });

    return button;
}

function _tmpFixPeriod(period) {
    return period.split(" ")[1];
}

function createDropdownList(period) {
    const listItem = UI.tag("li");
    const link = UI.tag("a")
        .clz("block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer")
        .attr("href", "#")
        .sub(period);

    link.on("click", (e) => {
        e.preventDefault();
        const button = document.getElementById("dropdownButton");
        const dropdown = document.getElementById("dropdown");

        button.dom.textContent = period + " ▼";
        
        const p = _tmpFixPeriod(period);

        dropdown.classList.add("hidden");

        currentPeriod = p;
        initPeriod(p);
        pickNewStudent();
    });

    listItem.sub(link);
    return listItem;
}

const periods = Object.keys(Storage.students);

const svgPath = "m384 32h-320c-35.35 0-64 28.65-64 64v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64v-320c0-35.35-28.65-64-64-64zm-256 352c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm96 96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm96 96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z";

export const Picker = {
    name() { return "Student Picker"; },
    icon() { return "wheel.png"; },
    svg() {
        return UI.svg("svg").attr("viewBox", "0 0 448 512").sub(
            UI.svg("path").attr("d", svgPath)
        );
    },
    load(_state) {
        loadPane = document.getElementById("loadPane");
        mainPane = document.getElementById("mainPane");
        
        nameLabel = UI.tag("h2")
            .clz("text-3xl font-bold text-center py-6 text-gray-800")
            .id("nameLabel")
            .sub("Select a Student");

        nextButton = UI.tag("button")
            .id("nextButton")
            .clz("px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer min-w-[150px]")
            .sub("New Student");

        nextButton.on("click", pickNewStudent);

        badButton = UI.tag("button")
            .id("badButton")
            .clz("px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer min-w-[100px]")
            .sub("Bad");

        badButton.on("click", () => markBehavior(false));

        goodButton = UI.tag("button")
            .id("goodButton")
            .clz("px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer min-w-[100px]")
            .sub("Good");
            
        goodButton.on("click", () => markBehavior(true));

        studentImage = UI.tag("img")
            .clz("mx-auto rounded-lg shadow-lg border-2 border-gray-200")
            .id("studentImage")
            .attr("src", "/assets/imgs/defaultAvatar.jpg")
            .attr("height", "200px")
            .attr("width", "150px");

        initPeriod(currentPeriod);

        return UI.tag("div")
            .clz("min-h-screen bg-gray-50 relative flex flex-col p-6")
            .sub(
                UI.tag("div").clz("flex justify-between items-center mb-8").sub(
                    UI.tag("h1").clz("text-4xl font-bold text-gray-800").sub("Student Picker"),
                    createDropdownButton()
                ),
                
                UI.tag("div")
                    .id("dropdown")
                    .clz("absolute top-20 right-6 z-10 hidden bg-white border border-gray-200 rounded-lg shadow-lg min-w-[160px]")
                    .sub(
                        UI.tag("ul")
                            .clz("py-2")
                            .attr("aria-labelledby", "dropdownButton")
                            .sub(
                                createDropdownList("Period 1"),
                                createDropdownList("Period 2"),
                                createDropdownList("Period 3"),
                                createDropdownList("Period 4A"),
                                createDropdownList("Period 4B"),
                                createDropdownList("Period 5"),
                                createDropdownList("Period 6")
                            )
                    ),
                
                UI.tag("div").clz("flex-1 flex flex-col items-center justify-center space-y-8").sub(
                    studentImage,
                    nameLabel,
                    nextButton,
                    UI.tag("div").clz("flex gap-4 items-center").sub(
                        badButton,
                        goodButton
                    )
                )
            );
    }
};