/*
document.addEventListener('DOMContentLoaded', function () {
    let tabs = document.querySelectorAll('.tab');
    let contents = document.querySelectorAll('.tab-content');

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function (e) {
            let targetId = tab.id.replace('Tab', 'Content');

            // Hide all content divs
            contents.forEach(function (content) {
                content.classList.add('hidden');
            });

            // Remove active class from all tabs
            tabs.forEach(function (tab) {
                tab.classList.remove('text-blue-700', 'bg-white');
                tab.classList.add('text-slate-900');
            });

            // Show the target content
            document.getElementById(targetId).classList.remove('hidden');

            // Add active class to the clicked tab
            tab.classList.add('text-blue-700', 'bg-white');
            tab.classList.remove('text-slate-900');
        });
    });
});
*/

import { Apps } from "./apps/exports.js";
import { Storage } from "./storage.js";
import { UI } from "./ui.js";

/* 
<div class="flex flex-col h-full w-1/6">
    <div class="h-1/4 bg-sky-700 border-gray-700 border-2">
        <span class="h-1/2">
            <img class="aspect-square object-scale-down" src="/assets/imgs/wheel.png" />
            <p class="text-center">Student Picker</p>
        </span>
    </div>
    <div class="h-1/4  rounded-none bg-sky-700 border-gray-700 border-2">
        <span class="h-1/2">
            <img class="aspect-square object-scale-down" src="/assets/imgs/group.png" />
            <p class="text-center">Group Gen</p>
        </span>
    </div>
    <div class="h-1/4 bg-sky-700 border-gray-700 border-2">
        <span class="h-1/2">
            <img class="aspect-square object-scale-down" src="/assets/imgs/sound.png" />
            <p class="text-center">Soundboard</p>
        </span>
    </div>
    <div class="h-1/4 bg-sky-700 border-gray-700 border-2">
        <span class="h-1/2">
            <img class="aspect-square object-scale-down" src="/assets/imgs/home.png" />
            <p class="text-center">Home</p>
        </span>
    </div>
</div>
*/

const APP_COUNT = Apps.length;
console.log("[debug] num of apps:", APP_COUNT);
let currentApp = -1;

function createTabButton(title, {type, icon}) {
    return UI.tag("div").clz(`ct-tab-button flex grow h-1/${APP_COUNT} bg-sky-700 border-gray-700 border-0 m-1 box-content justify-center items-center rounded-lg`).sub(
        UI.tag("span").cls("h-1/2", "flex", "flex-col", "justify-center", "items-center").sub(
            type === "svg" ?
                icon
                : UI.tag("img").clz("grow aspect-square object-scale-down w-1/2").attr("src", icon),
            UI.tag("p").cls("text-center").sub(title)
        )
    );
}

/** @type {UI[]} */
const tabButtons = [];
const tabPane = UI.tag("div").clz("ct-tab-pane flex flex-col h-full w-1/6 select-none");
for (const [i, app] of Apps.entries()) {
    let type, icon;
    if (app.svg !== undefined) {
        type = "svg";
        icon = app.svg();
    }
    else {
        type = "bmp";
        icon = `/assets/imgs/${app.icon()}`;
    }
    const tabButton = createTabButton(app.name(), {type, icon});
    
    tabButtons[i] = tabButton;
    tabButton.on("click", () => {
        Storage.lastApp = i;
        Storage.save("lastApp");
        loadApp(i);
    });
    tabPane.add(tabButton);
}

const appFrame = UI.tag("div").clz("h-full w-5/6");
function loadApp(i) {
    if (currentApp !== -1) tabButtons[currentApp].dom.classList.remove("active");
    tabButtons[i].dom.classList.add("active");
    currentApp = i;
    appFrame.dom.textContent = "";
    appFrame.add(Apps[i].load(null));
}

const body = new UI(document.body);
body.add(tabPane, appFrame);

function getLastApp() {
    const last = Storage.lastApp;
    return (last === -1) ? (APP_COUNT - 1) : last;
}

loadApp(getLastApp());


