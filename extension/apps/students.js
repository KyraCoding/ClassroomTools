import { UI } from "../ui.js";
import { Storage } from "../storage.js";

// check if url is synergy
const INJECT_TARGET = "md-hcpss.edupoint.com/POV_TXP_MAIN.aspx";
const periods = [
    "1", "2", "3", "4A", "4B", "5", "6"
];

chrome.runtime.onMessage.addListener(function(request) {
    const studentNames = request.names;
    const studentPortraitURLs = request.URLs;
    // const called = new Array(studentNames.length).fill(false);
    // const studentWeights = new Array(studentNames.length).fill(1); // Initialize weights
    console.log("Data received");
    const period = "4A";
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
    Storage.students["4B"] = createMockData();
}

function createMockData() {
    return {
        names: ["Eda Vocado", "Tas Maniandevil", "Starf Ish"],
        urls: [null, null, null]
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

export const Students = {
    name() { return "Student Manager"; },
    icon() { return null; },
    load(_state) {
        mockData();
        const root = UI.tag("div");
        for (const period of periods) {
            root.add(UI.tag("h2").sub(period));
            const students = Storage.students[period];
            loadStudents(period, students);
            root.add(studentContainers[period]);
        }

        const dropdown = createDropdown(periods);
        const load = UI.tag("button").sub("Load");
        const clear = UI.tag("button").sub("Clear");
        clear.on("click", () => {
            const period = dropdown.dom.value;
            loadStudents(period, undefined);
        })
        root.add(dropdown, load, clear);
        (async () => {
            const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
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
                        target : {tabId : tab.id},
                        files : [ "injected.js" ],
                    })
                    .then(() => console.log("script injected"));
            });
        })();
        return root;
    }
}