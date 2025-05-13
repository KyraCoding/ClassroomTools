import { UI } from "../ui.js";
import { Storage } from "../storage.js";

function createDropdownButton() {
    const button = UI.tag("button")
        .id("dropdownButton")
        .clz("absolute top-10 right-8 w-1/4 flex flex-row justify-between items-center border-2 border-black-700 hover:border-blue-700 rounded-lg bg-gray-100 text-sm font-semibold text-black-700 hover:text-blue-700 p-4 cursor-pointer transition-all")
        .attr("type", "button")
        .sub(
            "Period",
            UI.svg("svg")
                .clz("w-2.5 h-2.5 ms-3")
                .attr("aria-hidden", "true")
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("fill", "none")
                .attr("viewBox", "0 0 10 6")
                .sub(
                    UI.svg("path")
                        .attr("stroke", "currentColor")
                        .attr("stroke-linecap", "round")
                        .attr("stroke-linejoin", "round")
                        .attr("stroke-width", "2")
                        .attr("d", "m1 1 4 4 4-4")
                )
        );

    button.on("click", () => {
        const dropdown = document.getElementById("dropdown");
        dropdown?.classList.toggle("hidden");
    });

    return button;
}

function createDropdownList(period) {
    const listItem = UI.tag("li");
    const link = UI.tag("a")
        .clz("block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white")
        .attr("href", "#")
        .sub(period);

    link.on("click", (e) => {
        const button = document.getElementById("dropdownButton");
        const dropdown = document.getElementById("dropdown");

        button.firstChild.textContent = period;

        dropdown.classList.add("hidden");
    });

    listItem.sub(link);
    return listItem;
}

function createGroupsButton() {
    const button = UI.tag("div")
        .id("grouptButton")
        .cls("flex", "flex-col", "justify-center",
            "items-center", "border-2", "border-black-700",
            "hover:border-blue-700", "rounded-lg",
            "bg-gray-100", "text-sm", "font-semibold",
            "text-black-700", "hover:text-blue-700",
            "p-4", "min-w-[100px]", "cursor-pointer", "transition-all")
        .sub("Form Groups")

    button.on("click", () => {
        const dropdown = document.getElementById("dropdownButton");
        const period = dropdown.innerText;
        const i = 0;
        for (const [i, student] of Storage.students()) {

        }
    })

    return button;
}

const svgPath = "m96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112s-50.1-112-112-112-112 50.1-112 112 50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3c-63.6 0-115.2 51.6-115.2 115.2v28.8c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4c-11.6-11.5-27.5-18.6-45.1-18.6h-64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z";

export const Group = {
    name() { return "Group Generator"; },
    icon() { return "group.png"; },
    svg() {
        return UI.svg("svg").attr("viewBox", "0 0 640 512").sub(
            UI.svg("path").attr("d", svgPath)
        );
    },
    load(_state) {
        return UI.tag("div").clz("grow relative flex flex-col h-full w-full").sub(
            UI.tag("strong").clz("text-3xl text-center").sub("Group Generator"),
            createDropdownButton(),
            UI.tag("div")
                .id("dropdown")
                .clz("absolute inset-x-94 top-24 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700")
                .sub(
                    UI.tag("ul")
                        .clz("py-2 text-sm text-gray-700 dark:text-gray-200")
                        .attr("aria-labelledby", "dropdownButton")
                        .sub(
                            createDropdownList("Period 1"),
                            createDropdownList("Period 2"),
                            createDropdownList("Period 3"),
                            createDropdownList("Period 4A"),
                            createDropdownList("Period 4B"),
                            createDropdownList("Period 5"),
                            createDropdownList("Period 6")
                        )
            ),
            UI.tag("div").clz("pt-14"),
            UI.tag("form").clz("max-w-sm mx-auto").sub(
                UI.tag("label").clz("block mb-2 text-sm font-medium text-gray-900 dark:text-white").attr("for", "number-input").sub("Select group size:"),
                UI.tag("input").attr("type", "number").id("number-input").attr("aria-describedby", "helper-text-explanation").clz("bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500").attr("min", "2").attr("placeholder", "3")
            ),
            UI.tag("div").clz("flex flex-col w-full h-1/4 justify-center items-center").sub(
                createGroupsButton(),
                UI.tag("div").clz("flex items-center mb-4 pt-4").sub(

                )
            )
        );
    }
};

/*
UI.tag("input").id("balancedCheckbox").attr("type", "checkbox").clz("w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"),
UI.tag("label").attr("for", "checkbox").clz("ms-2 text-sm font-medium text-gray-900 dark:text-gray-300").sub("Balanced Groups")
*/
// UI.tag("div").clz("grow relative flex flex-col justify-center items-center grid-col-2").sub(
//     UI.tag("div").sub(),
//     UI.tag("").sub(

//     )
// )
