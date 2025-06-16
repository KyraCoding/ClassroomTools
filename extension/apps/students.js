import { UI } from "../ui.js";
import { Storage } from "../storage.js";
import { TP } from "../templates.js";
import { DEFAULT_AVATAR } from "../share.js";

const DEBUG = true;
const MESSAGE = "(You must be on Synergy to load students)";

// check if url is synergy
const INJECT_TARGET = "md-hcpss.edupoint.com/POV_TXP_MAIN.aspx";

const periods = [
    "1",
    "2",
    "3",
    "4A",
    "4B",
    "5",
    "6",
];

const mainContent = UI.tag("div").clz(
    "flex-1 flex flex-col items-center justify-center space-y-8",
);

const components = {
    /** @type {UI} */
    clear: null,
    /** @type {UI} */
    loadDbg: null,
    /** @type {UI} */
    load: null,
    /** @type {UI} */
    message: null,
    /** @type {UI} */
    students: null,
};

function initComponents() {
    components.clear = TP.button("Clear", "red").on("click", () => {
        Storage.students[Storage.period] = undefined;
        Storage.save("students");
        loadComponents();
    });

    components.load = TP.button("Load", "gray").cls("m-1").attr(
        "disabled",
        "true",
    );

    if (DEBUG) {
        components.loadDbg = TP.button("Load funny", "yellow").cls("m-1").on(
            "click",
            () => {
                const period = Storage.period;
                Storage.students[period] = createMockData();
                Storage.save("students");
                loadComponents();
            },
        );
    }

    components.message = UI.tag("p").clz("text-base");

    components.students = UI.tag("div").clz("grid grid-cols-3 gap-2");
}

function loadComponents() {
    mainContent.clear();
    components.message.dom.textContent = "";
    components.message.sub(MESSAGE);
    const period = Storage.period;
    const students = Storage.students[period];
    if (students === undefined) {
        mainContent.add(
            UI.tag("div").clz("m-0").sub(
                ...(DEBUG
                    ? [components.load, components.loadDbg]
                    : [components.load]),
            ),
            UI.tag("p").clz("text-lg font-bold m-0").sub(
                "No students loaded yet",
            ),
        );
        if (!urlGood) mainContent.add(components.message);
    } else {
        components.students.clear();
        components.students.sub(
            ...mapStudents(students, ({ name, url }) => studentCard(name, url)),
        );
        mainContent.add(components.clear, components.students);
    }
}

let urlGood = false;
function checkUrl() {
    (async () => {
        const [tab] = await chrome.tabs.query({
            active: true,
            lastFocusedWindow: true,
        });
        /** @type {string} */
        const url = tab.url;
        if (url.indexOf(INJECT_TARGET) === -1) {
            components.message.clear();
            components.message.sub(MESSAGE);
            urlGood = false;
        } else {
            components.message.dom.remove();
            urlGood = true;
            components.load.dom.removeAttribute("disabled");
            components.load.on("click", () => {
                chrome.scripting
                    .executeScript({
                        target: { tabId: tab.id },
                        files: ["injected.js"],
                    });
            });
        }
    })();
}

function switchPeriod(_period) {
    loadComponents();
}

function mapStudents(students, fn) {
    const res = [];
    let len = students.names.length;
    for (let i = 0; i < len; i++) {
        res.push(fn({ name: students.names[i], url: students.urls[i] }));
    }
    return res;
}

function studentCard(name, url) {
    return UI.tag("div").clz(
        "grid grid-rows-[7fr_1fr] border-2 border-gray-300 rounded-lg p-2 text-center",
    ).sub(
        UI.tag("img").clz(
            "mx-auto rounded-lg shadow-lg border-2 border-gray-200 self-center justify-self-center",
        ).attr("src", url || DEFAULT_AVATAR).attr(
            "height",
            "100%",
        ),
        UI.tag("span").clz("self-center justify-self-center").sub(name),
    );
}

chrome.runtime.onMessage.addListener(function (request) {
    const names = request.names;
    const urls = request.URLs;
    const data = { names, urls };
    Storage.students[Storage.period] = data;
    Storage.save("students");
    loadComponents();
});

function createMockData() {
    return {
        names: [
            "Eda Vocado",
            "Tas Maniandevil",
            "Starf Ish",
            "Leonsoft Oiler",
            "Macrohard Doors",
            "Gaussian Gauss",
            "Legendre's Constant",
            "Walter White Uncertainty Principle",
            "Morris Worm",
            "Tux",
            "Xfce",
        ],
        urls: [
            "./test-images/avocado.jpg",
            "./test-images/tasmanian.jpg",
            "./test-images/patrick.png",
            "./test-images/euler.jpeg",
            "./test-images/doors.jpeg",
            "./test-images/gauss.webp",
            "./test-images/uno.png",
            "./test-images/heisen.webp",
            "./test-images/morris.jpg",
            "./test-images/tux.jpeg",
            "./test-images/xfce.png",
        ],
    };
}

const svgPath =
    "m487.4 315.7-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3l-42.6 24.6c-17.9-15.4-38.5-27.3-60.8-35.1v-49.1c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7v49.2c-22.2 7.9-42.8 19.8-60.8 35.1l-42.5-24.6c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14l42.6 24.6c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zm-231.4 20.3c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z";

export const Students = {
    name() {
        return "Student Manager";
    },
    icon() {
        return null;
    },
    svg() {
        return UI.svg("svg").attr("viewBox", "0 0 511 512").sub(
            UI.svg("path").attr("fill-rule", "evenodd").attr("d", svgPath),
        );
    },
    load(_state) {
        initComponents();
        loadComponents();

        checkUrl();

        const selector = TP.select(
            periods.map((period) => ({
                title: `Period ${period}`,
                value: period,
            })),
            (period) => {
                Storage.period = period;
                Storage.save("period");
                switchPeriod(period);
            },
            { defaultTitle: `Period ${Storage.period}` },
        );

        return UI.tag("div")
            .clz("min-h-screen bg-gray-50 relative flex flex-col p-6")
            .sub(
                UI.tag("div").clz("flex justify-between items-center mb-8").sub(
                    UI.tag("h1").clz("text-4xl font-bold text-gray-800").sub(
                        "Student Manager",
                    ),
                    selector.button,
                    selector.dropdown,
                ),
                mainContent,
            );
    },
};
