import { UI } from "../ui.js";
import { Theme } from "../theme.js";
import { Storage } from "../storage.js";
import { TP } from "../templates.js";

// const buttonStyle =
//     "h-1/2 w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
const svgPath =
    "m280.37 148.26-184.37 151.85v163.89a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16v-95.71a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05l112.02.31a16 16 0 0 0 16-16v-164l-184.33-151.74a12.19 12.19 0 0 0 -15.3 0zm291.23 103.21-83.6-68.91v-138.51a12 12 0 0 0 -12-12h-56a12 12 0 0 0 -12 12v72.61l-89.53-73.66a48 48 0 0 0 -61 0l-253.13 208.47a12 12 0 0 0 -1.6 16.9l25.5 31a12 12 0 0 0 16.91 1.63l235.22-193.74a12.19 12.19 0 0 1 15.3 0l235.23 193.74a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0 -1.7-16.93z";

const REPO_LINK = "https://github.com/KyraCoding/ClassroomTools";

/**
 * @param {string} name
 * @returns {string}
 */
function cap(name) {
    return name[0].toUpperCase() + name.substring(1);
}

function header(title) {
    return UI.tag("h3").clz("text-lg font-bold border-b-2 border-gray-300").sub(title);
}

function paragraph(...text) {
    return UI.tag("p").clz("text-base").sub(...text);
}

function vspace() {
    return UI.tag("br");
}

function list(...items) {
    return UI.tag("ul").clz("list-disc list-inside text-base").sub(...items.map(item => UI.tag("li").sub(item)));
}

function link(title, url) {
    const res =  UI.tag("a").clz("underline text-blue-600 hover:text-blue-800 visited:text-purple-600").attr("href", url).sub(title);
    res.on("click", () => {
        chrome.tabs.create({ url });
    });
    return res;
}

export const Home = {
    name() {
        return "Home";
    },
    icon() {
        return "home.png";
    },
    svg() {
        return UI.svg("svg").attr("viewBox", "0 0 576 512").sub(
            UI.svg("path").attr("d", svgPath),
        );
    },
    load(_state) {
        const selection = TP.select(
            Theme.all().map((themeName) => ({
                title: cap(themeName),
                value: themeName,
            })),
            (themeName) => {
                Theme.set(themeName);
            },
            { defaultTitle: cap(Storage.theme) },
        );

        return UI.tag("div").clz("grow flex flex-col p-6").sub(
            // UI.tag("div").clz("flex flex-col w-full border-b-4").sub(
            //     UI.tag("strong").clz("text-5xl text-center").sub(
            //         "Classroom Tools",
            //     ),
            // ),
            UI.tag("h1").clz("text-4xl font-bold text-gray-800 text-left mb-8").sub("Home"),
            selection.dropdown,
            selection.button,
            // UI.tag("button").clz(buttonStyle).sub("Recently Used Tool"),
            // UI.tag("button").clz(buttonStyle).sub("Most Recently Used Tool"),
            paragraph("Hello and welcome to Classroom Tools!"),
            vspace(),
            header("Getting Started"),
            paragraph("On the left side bar, there are multiple different apps with the goal of making classroom-related tasks more convenient. Give them a try!"),
            vspace(),
            header("Custom Themes"),
            paragraph("In case you don't like the default colors, use the dropdown menu on this page to change the theme of this extension."),
            vspace(),
            header("About"),
            paragraph("This extension was created for the Advanced Object Oriented Design class by the following students:"),
            list(
                "Oliver (Team lead)",
                "Barry (UI)",
                "Christian (UI + Styling)",
                "Kai (Logic + Project structure)",
                "Nolan (Styling)"
            ),
            vspace(),
            header("Source Code"),
            paragraph("The full repo is available on ", link("GitHub", REPO_LINK), "."),
            vspace(),
            header("Bug Report"),
            paragraph("If you encounter any bugs, either email Mr. Hobson (michael_hobson@hcpss.org) or create a GitHub issue. We will try our best to fix it quickly.")
            
        );
    },
};
