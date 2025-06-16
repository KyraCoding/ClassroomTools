import { UI } from "../ui.js";
import { TP } from "../templates.js";
import { Storage } from "../storage.js";

/** @type {UI} */
let mainContent;

const components = {
    name: null,
    next: null,
    bad: null,
    good: null,
    image: null,
    selection: null,
};

function initComponents() {
    components.name = UI.tag("h2")
        .clz("text-3xl font-bold text-center py-6 text-gray-800")
        .id("nameLabel")
        .sub("Select a Student");

    components.next = UI.tag("button")
        .id("nextButton")
        .clz(
            "px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer min-w-[150px] select-none",
        )
        .sub("New Student");

    components.next.on("click", pickNewStudent);

    components.bad = UI.tag("button")
        .id("badButton")
        .clz(
            "px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer min-w-[100px]",
        )
        .sub("Bad");

    components.bad.on("click", () => markBehavior(false));

    components.good = UI.tag("button")
        .id("goodButton")
        .clz(
            "px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer min-w-[100px]",
        )
        .sub("Good");

    components.good.on("click", () => markBehavior(true));

    components.image = UI.tag("img")
        .clz("mx-auto rounded-lg shadow-lg border-2 border-gray-200 w-auto h-50")
        .id("studentImage")
        .attr("src", "/assets/imgs/defaultAvatar.jpg")
        .attr("height", "200px")
        .attr("width", "150px");
}

function loadComponents() {
    mainContent.dom.textContent = "";
    mainContent.sub(
        components.image,
        components.name,
        components.next,
        // UI.tag("div").clz("flex gap-4 items-center").sub(
        //     components.good,
        //     components.bad,
        // ),
    );
}

// UI Elements
// let loadPane,
//     mainPane,
//     nameLabel,
//     nextButton,
//     badButton,
//     goodButton,
//     studentImage;

// let currentPerod = Storage.period;
let currentStudentIndex = -1;
let called = [];
let studentWeights = {};
let studentData = {};

const allPeriods = ["1", "2", "3", "4A", "4B", "5", "6"];

function line(text) {
    return UI.tag("span").clz("text-base text-center").sub(text);
}

function switchPeriod(period) {
    Storage.period = period;
    Storage.save("period");
    // console.log(Storage.students, period);
    studentData = Storage.students[period];
    if (studentData === undefined) {
        mainContent.dom.textContent = "";
        mainContent.sub(
            line("No students loaded for this period").cls("text-lg", "font-bold"),
            line("(Please go to Student Manager if this is unintentional)")
        );
        return;
    }
    loadComponents();
    called = Array(studentData.names.length).fill(false);
    studentWeights[period] = studentWeights[period] ||
        studentData.names.map(() => 1);
}

function getStudent({ names, urls }, index) {
    console.log("getting");
    console.log(names, urls);
    return { name: names[index], url: urls[index] };
}

// Weighted random selection
function generateWeighted(period) {
    const weights = studentWeights[period];
    const students = studentData.names;

    if (called.every((v) => v)) called.fill(false);

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
    currentStudentIndex = generateWeighted(Storage.period);
    const student = getStudent(studentData, currentStudentIndex);
    console.log(student);
    components.name.dom.textContent = student.name;
    components.image.attr("src", student.url || "/assets/imgs/defaultAvatar.jpg");
    console.log("here");
    console.log(student);
}

function markBehavior(good = true) {
    if (currentStudentIndex >= 0) {
        const weights = studentWeights[Storage.period];
        if (good) {
            weights[currentStudentIndex] = Math.max(
                1,
                weights[currentStudentIndex] - 0.25,
            );
        } else {
            weights[currentStudentIndex] += 0.5;
        }
    }
}

const periods = Object.keys(Storage.students).sort();
console.log(periods);

const svgPath =
    "m384 32h-320c-35.35 0-64 28.65-64 64v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64v-320c0-35.35-28.65-64-64-64zm-256 352c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm96 96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm96 96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z";

export const Picker = {
    name() {
        return "Student Picker";
    },
    icon() {
        return "wheel.png";
    },
    svg() {
        return UI.svg("svg").attr("viewBox", "0 0 448 512").sub(
            UI.svg("path").attr("d", svgPath),
        );
    },
    load(_state) {
        initComponents();

        mainContent = UI.tag("div").clz(
            "flex-1 flex flex-col items-center justify-center space-y-8",
        );

        console.log(Storage.period);
        switchPeriod(Storage.period);

        const { button, dropdown } = TP.select(
            allPeriods.map((period) => ({
                title: `Period ${period}`,
                value: period,
            })),
            (period) => {
                initComponents();
                switchPeriod(period);
                // pickNewStudent();
            },
            { defaultTitle: `Period ${Storage.period}` }
        );

        return UI.tag("div")
            .clz("min-h-screen bg-gray-50 relative flex flex-col p-6")
            .sub(
                UI.tag("div").clz("flex justify-between items-center mb-8").sub(
                    UI.tag("h1").clz("text-4xl font-bold text-gray-800").sub(
                        "Student Picker",
                    ),
                    button,
                    dropdown,
                ),
                mainContent,
            );
    },
};
