import { UI } from "../ui.js";
import { Storage } from "../storage.js";
import { TP } from "../templates.js";

/** @type {UI} */
let mainContent;

const components = {
    /** @type {UI} */
    label: null,
    /** @type {UI} */
    input: null,
    /** @type {UI} */
    bySize: null,
    /** @type {UI} */
    byNum: null,

    /** @type {UI} */
    shuffle: null,
    /** @type {UI} */
    clear: null,
};

function line(text) {
    return UI.tag("span").clz("text-base text-center").sub(text);
}

function button(text, color) {
    return UI.tag("button").clz(
        `bg-${color}-500 hover:bg-${color}-600 p-2 rounded-lg text-white font-bold cursor-pointer select-none`,
    ).attr("type", "button").sub(text);
}

function list(...items) {
    return UI.tag("ul").clz("list-disc list-inside text-base").sub(
        ...items.map((item) => UI.tag("li").sub(item)),
    );
}

function groupView(title, indices) {
    const students = Storage.students[Storage.period];
    const names = indices.map((i) => students.names[i]);
    return UI.tag("div").clz("border-2 border-gray-300 rounded-lg p-2").sub(
        UI.tag("h3").clz("text-lg text-center font-bold").sub(title),
        list(...names),
    );
}

function switchPeriod(period) {
    Storage.period = period;
    Storage.save("period");

    const studentData = Storage.students[period];
    if (studentData === undefined) {
        mainContent.dom.textContent = "";
        mainContent.sub(
            line("No students loaded for this period").cls(
                "text-lg",
                "font-bold",
            ),
            line("(Please go to Student Manager if this is unintentional)"),
        );
        return;
    }
    loadComponents();
}

function shuffle(arr) {
    let i = arr.length;
    while (--i > 0) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
}

function splitBy(arr, n) {
    const res = [];
    n = Math.max(1, n);
    for (let i = 0; i < arr.length; i += n) {
        const elem = [];
        for (let j = 0; j < n; j++) {
            if (i + j >= arr.length) break;
            elem.push(arr[i + j]);
        }
        res.push(elem);
    }
    return res;
}

/**
 * @param {number[]} arr 
 * @param {number} n 
 * @returns {number[][]}
 */
function splitInto(arr, n) {
    if (n > arr.length) n = arr.length;
    const size = Math.floor(arr.length / n);
    const rem = arr.length % n;
    const res = splitBy(arr, size);
    if (rem > 0) res.pop();
    for (let i = 0; i < rem; i++) {
        res[i].push(arr[arr.length - rem + i]);
    }
    return res;
}

function generateGroups(method, num) {
    const students = Storage.students[Storage.period];
    if (students === undefined) return;
    const indices = Array(students.names.length).fill(0).map((_, i) => i);
    shuffle(indices);

    //const num = Number.parseInt(components.input.dom.value);
    const splitted = (method === "size" ? splitBy : splitInto)(indices, num);
    const period = Storage.period;
    
    Storage.groups[period] = splitted;
    Storage.groupsMethod[period] = method;
    Storage.save("groups", "groupsMethod");

    loadComponents();
}

function initComponents() {
    components.label = UI.tag("label").clz(
        "block mb-2 text-lg font-bold text-gray-900 text-center",
    ).attr("for", "number-input").sub("Enter number:");

    components.input = UI.tag("input").attr("type", "number").id("number-input")
        .attr(
            "aria-describedby",
            "helper-text-explanation",
        ).clz(
            "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
        ).attr("min", "1").attr("value", "3");

    components.bySize = button("Generate Groups of N", "blue").cls("mx-1", "my-2");
    components.bySize.on("click", () => {
        /** @type {HTMLInputElement} */
        const input = components.input.dom;
        if (input.checkValidity()) generateGroups("size", Number.parseInt(input.value));
        else input.reportValidity();
    });

    components.byNum = button("Generate N Groups", "blue").cls("mx-1", "my-2");
    components.byNum.on("click", () => {
        /** @type {HTMLInputElement} */
        const input = components.input.dom;
        if (input.checkValidity()) generateGroups("num", Number.parseInt(input.value));
        else input.reportValidity();
    })

    components.shuffle = button("Shuffle", "green").cls("m-1");
    components.shuffle.on("click", () => {
        const groups = Storage.groups[Storage.period];
        const method = Storage.groupsMethod[Storage.period];
        generateGroups(method, method === "size" ? groups[0].length : groups.length);
    })

    components.clear = button("Clear", "red").cls("m-1");
    components.clear.on("click", () => {
        Storage.groups[Storage.period] = undefined;
        Storage.save("groups");

        loadComponents();
    });
}

function loadComponents() {
    mainContent.dom.textContent = "";
    const groups = Storage.groups[Storage.period];

    console.log(groups)
    if (groups === undefined) loadGroupInput();
    else loadGroupDisplay();
}

function loadGroupInput() {
    mainContent.sub(
        UI.tag("form").clz("max-w-sm mx-auto text-center").sub(
            components.label,
            components.input,
            UI.tag("div").sub(components.bySize, components.byNum),
        ),
    );
}

function loadGroupDisplay() {
    const groups = Storage.groups[Storage.period];

    const container = UI.tag("div").clz("w-full grid grid-cols-2 gap-4 overflow-y-auto");
    groups.forEach((indices, i) =>
        container.add(groupView(`Group ${i + 1}`, indices))
    );
    mainContent.sub(
        UI.tag("div").sub(components.shuffle, components.clear),
        container,
    );
}

const svgPath =
    "m96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112s-50.1-112-112-112-112 50.1-112 112 50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3c-63.6 0-115.2 51.6-115.2 115.2v28.8c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4c-11.6-11.5-27.5-18.6-45.1-18.6h-64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z";
const periods = ["1", "2", "3", "4A", "4B", "5", "6"];

export const Group = {
    name() {
        return "Group Generator";
    },
    icon() {
        return "group.png";
    },
    svg() {
        return UI.svg("svg").attr("viewBox", "0 0 640 512").sub(
            UI.svg("path").attr("d", svgPath),
        );
    },
    load(_state) {
        initComponents();

        mainContent = UI.tag("div").clz(
            "flex-1 flex flex-col items-center justify-center space-y-8",
        );

        const selection = TP.select(
            periods.map((period) => ({
                title: `Period ${period}`,
                value: period,
            })),
            (period) => {
                console.log("Loading", period);
                switchPeriod(period);
            },
            { defaultTitle: `Period ${Storage.period}` },
        );

        switchPeriod(Storage.period);

        return UI.tag("div").clz(
            "min-h-screen bg-gray-50 relative flex flex-col p-6",
        ).sub(
            UI.tag("h1").clz("text-4xl font-bold text-gray-800 text-left mb-8")
                .sub("Group Generator"),
            selection.button,
            selection.dropdown,
            mainContent,
        );
    },
};
