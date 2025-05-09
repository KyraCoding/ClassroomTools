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

const dropdown = createDropdown(periods);
const load = UI.tag("button").sub("Load");
const clear = UI.tag("button").sub("Clear");

export const Students = {
    name() { return "Student Manager"; },
    icon() { return null; },
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
}

/*
UI.tag("div").id("accordion-collapse").attr("data-accordion", "collapse").sub(
    UI.tag("h2").id("accordion-collapse-period-1").sub(
        UI.tag("button").attr("type", "button").clz("flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1"),
        UI.tag("span").sub("Period 1"),
        UI.tag("svg").attr("data-accordion-icon").clz("w-3 h-3 rotate-180 shrink-0").attr("aria-hidden", "true").attr("xmlns", "http://www.w3.org/2000/svg").attr("fill", "none").attr("viewBox", "0 0 10 6").sub(
            UI.tag("path").attr("stroke", "currentColor").attr("stroke-linecap", "round").attr("stroke-width", "2").attr("d", "M9 5 5 1 1 5")
        )
    ),
    UI.tag("div").id("accorion-collapse-period-1-students").cls("hidden").attr("aria-labelledby", "accordion-collapse-hading-1").sub(
        UI.tag("div").clz("p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900").sub(
            UI.tag("p").clz("mb-2 text-gray-500 dark:text-gray-400").sub(studentContainers[period]),
        )
    )

    )

<div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
  <h2 id="accordion-flush-heading-1">
    <button type="button" class="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
      <span>What is Flowbite?</span>
      <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-flush-body-1" class="hidden" aria-labelledby="accordion-flush-heading-1">
    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
      <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
      <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
    </div>
  </div>
  <h2 id="accordion-flush-heading-2">
    <button type="button" class="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-2" aria-expanded="false" aria-controls="accordion-flush-body-2">
      <span>Is there a Figma file available?</span>
      <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-flush-body-2" class="hidden" aria-labelledby="accordion-flush-heading-2">
    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
      <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
      <p class="text-gray-500 dark:text-gray-400">Check out the <a href="https://flowbite.com/figma/" class="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.</p>
    </div>
  </div>
  <h2 id="accordion-flush-heading-3">
    <button type="button" class="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-3" aria-expanded="false" aria-controls="accordion-flush-body-3">
      <span>What are the differences between Flowbite and Tailwind UI?</span>
      <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-flush-body-3" class="hidden" aria-labelledby="accordion-flush-heading-3">
    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
      <p class="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
      <p class="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
      <p class="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
      <ul class="ps-5 text-gray-500 list-disc dark:text-gray-400">
        <li><a href="https://flowbite.com/pro/" class="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
        <li><a href="https://tailwindui.com/" rel="nofollow" class="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
      </ul>
    </div>
  </div>
</div>

*/