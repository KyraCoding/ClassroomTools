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

function createTabButton(title, icon) {
    return UI.tag("div").clz(`h-1/${APP_COUNT} bg-sky-700 border-gray-700 border-2`).sub(
        UI.tag("span").cls("h-1/2").sub(
            UI.tag("img").clz("aspect-square object-scale-down").attr("src", icon),
            UI.tag("p").cls("text-center").sub(title)
        )
    );
}

const tabPane = UI.tag("div").clz("flex flex-col h-full w-1/6");
for (const [i, app] of Apps.entries()) {
    const tabButton = createTabButton(app.name(), `/assets/imgs/${app.icon()}`);
    tabButton.on("click", () => {
        loadApp(i);
    });
    tabPane.add(tabButton);
}

const appFrame = UI.tag("div").clz("h-full w-5/6");

function loadApp(i) {
    appFrame.dom.textContent = "";
    appFrame.add(Apps[i].load(null));
}

const body = new UI(document.body);
body.add(tabPane, appFrame);

loadApp(APP_COUNT - 1);


