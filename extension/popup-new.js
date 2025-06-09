import { Apps } from "./apps/exports.js";
import { Storage } from "./storage.js";
import { UI } from "./ui.js";

const APP_COUNT = Apps.length;
console.log("[debug] num of apps:", APP_COUNT);
let currentApp = -1;

/**
 * @param {string} title 
 * @param {*} param1 
 * @returns 
 */
function createTabButton(title, {type, icon}) {
    const DEFAULT_TEXT_SIZE = 14;
    const OVERFLOW_LEN = 13;
    const textSize = Math.round(DEFAULT_TEXT_SIZE * Math.min(1, OVERFLOW_LEN / title.length));
    return UI.tag("div").clz(`ct-tab-button flex grow h-1/${APP_COUNT} bg-sky-700 border-gray-700 border-0 m-1 box-content justify-center items-center rounded-lg`).sub(
        UI.tag("span").cls("h-1/2", "flex", "flex-col", "justify-center", "items-center").sub(
            type === "svg" ?
                icon.clz("aspect-square w-1/2")
                : UI.tag("img").clz("grow aspect-square object-scale-down w-1/2").attr("src", icon),
            UI.tag("p").cls("text-center", `text-[${textSize}px]`, "whitespace-nowrap").sub(title)
        )
    );
}

/** @type {UI[]} */
const tabButtons = [];
const tabPane = UI.tag("div").clz("ct-tab-pane flex flex-col h-full w-1/6 select-none sticky");
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


