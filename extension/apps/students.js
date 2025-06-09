import { UI } from "../ui.js";
import { Storage } from "../storage.js";

// check if url is synergy
const INJECT_TARGET = "md-hcpss.edupoint.com/POV_TXP_MAIN.aspx";
const periods = [
    "1", "2", "3", "4A", "4B", "5", "6"
];

chrome.runtime.onMessage.addListener(function (request) {
    const studentNames = request.names;
    const studentPortraitURLs = request.URLs;
    // const called = new Array(studentNames.length).fill(false);
    // const studentWeights = new Array(studentNames.length).fill(1); // Initialize weights
    console.log("Data received");
    const period = dropdown.dom.value;
    const data = { names: studentNames, urls: studentPortraitURLs }
    Storage.students[period] = data;
    loadStudents(period, data);
    //startCalling();
});

function createStudentBox(name, url) {
    return UI.tag("div").sub(
        UI.tag("image").attr("src", url),
        UI.tag("span").sub(name)
    );
}

function createDropdown(options) {
    const root = UI.tag("select");
    for (const option of options) {
        root.add(UI.tag("option").attr("value", option).sub(option));
    }
    return root;
};

function mockData() {
    console.log("ekd")
    Storage.students["4B"] = createMockData();
}

function createMockData() {
    return {
        names: ["Eda Vocado", "Tas Maniandevil", "Starf Ish", "Leonsoft Oiler", "Macrohard Doors", "Gaussian Gauss", "Legendre's Constant", "Walter White Uncertainty Principle", "Morris Worm", "Tux", "Xfce"],
        urls: ["./test-images/avocado.jpg", "./test-images/tasmanian.jpg", null, null, null, null]
    };
}

/** @type {{[key: string]: UI}} */
const studentContainers = {};
periods.forEach(period => {
    studentContainers[period] = UI.tag("div");
});
function loadStudents(period, data) {
    const container = studentContainers[period];
    container.dom.textContent = "";
    if (data === undefined) {
        container.add(UI.tag("p").sub("No students added"));
        return;
    }
    for (let i = 0; i < data.names.length; i++) {
        const name = data.names[i];
        const url = data.urls[i];
        container.add(createStudentBox(name, url));
    }
    Storage.save("students");
}

const dropdown = createDropdown(periods);
const load = UI.tag("button").sub("Load");
const clear = UI.tag("button").sub("Clear");

const svgPath = "m487.4 315.7-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3l-42.6 24.6c-17.9-15.4-38.5-27.3-60.8-35.1v-49.1c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7v49.2c-22.2 7.9-42.8 19.8-60.8 35.1l-42.5-24.6c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14l42.6 24.6c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zm-231.4 20.3c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z";

export const Students = {
    name() { return "Student Manager"; },
    icon() { return null; },
    svg() {
        return UI.svg("svg").attr("viewBox", "0 0 511 512").sub(
            UI.svg("path").attr("fill-rule", "evenodd").attr("d", svgPath)
        );
    },
    load(_state) {
        mockData();
        const root = UI.tag("div").id("accordion-flush").attr("data-accordion", "collapse").attr("data-active-classes", "bg-white dark:bg-gray-900 text-gray-900 dark:text-white").attr("data-inactive-classes", "text-gray-500 dark:text-gray-400");
        for (const period of periods) {
            const idz = "accordion-collapse-period-" + period;
            const spanIdz = "Period " + period;
            const studentIdz = "accordion-collapse-period-" + period + "-students";
            const studentButton = "studentButton" + period;
            const students = Storage.students[period];
            loadStudents(period, students);
            const button = UI.tag("button").id(studentButton).attr("type", "button").clz("flex px-2 items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3").attr("data-accordion-target", `#${studentIdz}`).attr("aria-expanded", "true").attr("aria-controls", "accordion-flush-body-1").sub(
                UI.tag("span").sub(spanIdz),
                UI.svg("svg").attr("data-accordion-icon").clz("w-3 h-3 rotate-180 shrink-0").attr("aria-hidden", "true").attr("xmlns", "http://www.w3.org/2000/svg").attr("fill", "none").attr("viewBox", "0 0 10 6").sub(
                    UI.svg("path").attr("stroke", "currentColor").attr("stroke-linecap", "round").attr("stroke-width", "2").attr("d", "M9 5 5 1 1 5")
                ));
            root.add(
                UI.tag("h2").id(idz).sub(button),
                UI.tag("div").id(studentIdz).cls("hidden").attr("aria-labelledby", "accordion-collapse-heading-1").sub(
                    UI.tag("div").clz("p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900").sub(
                        UI.tag("p").clz("mb-2 text-gray-500 dark:text-gray-400").sub(studentContainers[period]),
                    )
                ));
            // root.add(UI.tag("h2").sub(period));
            // const students = Storage.students[period];
            // loadStudents(period, students);
            // root.add(studentContainers[period]);
            button.on("click", () => {
                const period = document.getElementById("studentIdz");
                console.log("e")
                period?.classList.toggle("hidden");
            });
        }


        clear.on("click", () => {
            const period = dropdown.dom.value;
            loadStudents(period, undefined);
        })
        root.add(dropdown, load, clear);
        (async () => {
            const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
            /** @type {string} */
            const url = tab.url;
            if (url.indexOf(INJECT_TARGET) === -1) {
                load.dom.textContent = "Load (Synergy only)";
                load.attr("disabled", "");
                return;
            };
            load.on("click", () => {
                chrome.scripting
                    .executeScript({
                        target: { tabId: tab.id },
                        files: ["injected.js"],
                    })
                    .then(() => console.log("script injected"));
            });
        })();
        return root;
    }
};