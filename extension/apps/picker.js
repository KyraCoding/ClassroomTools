import { UI } from "../ui.js";

function createDropdownButton() {
    const button = UI.tag("button")
        .id("dropdownButton")
        .clz("absolute top-8 right-8 w-1/4 flex flex-row justify-between items-center border-2 border-black-700 hover:border-blue-700 rounded-lg bg-gray-100 text-sm font-semibold text-black-700 hover:text-blue-700 p-4 cursor-pointer transition-all")
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

const svgPath = "m384 32h-320c-35.35 0-64 28.65-64 64v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64v-320c0-35.35-28.65-64-64-64zm-256 352c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm96 96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm96 96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z";

export const Picker = {
    name() { return "Student Picker"; },
    icon() { return "wheel.png"; },
    svg() {
        return UI.svg("svg").attr("viewBox", "0 0 448 512").sub(
            UI.svg("path").attr("d", svgPath)
        );
    },
    load(_state) {
        return UI.tag("div").clz("grow relative flex flex-col h-full w-full").sub(
            UI.tag("strong").clz("text-3xl text-center").sub("Student Picker"),
            createDropdownButton(),
            UI.tag("div")
                .id("dropdown")
                .clz("absolute inset-x-94 top-22 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700")
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
                )
            ,
            UI.tag("div").clz("pt-14"),
            UI.tag("img").clz("mx-auto").id("studentImage").attr("src", "/assets/imgs/defaultAvatar.jpg").attr("height", "200px").attr("width", "150px"),
            UI.tag("label").clz("text-center pt-4").id("nameLabel").sub("John Doe"),
            UI.tag("div").clz("flex flex-row w-full h-1/4 justify-center items-center").sub(
                UI.tag("div").id("nextButton").cls("flex", "flex-col", "justify-center",
                    "items-center", "border-2", "border-black-700",
                    "hover:border-blue-700", "rounded-lg",
                    "bg-gray-100", "text-sm", "font-semibold",
                    "text-black-700", "hover:text-blue-700",
                    "p-4", "min-w-[100px]", "cursor-pointer", "transition-all").sub("New Student"),

            ),
            UI.tag("div").clz("flex flex-row w-full h-1/4 justify-center items-center").sub(
                UI.tag("div").id("badButton").cls("flex", "flex-col", "justify-center",
                    "items-center", "border-2", "border-black-700",
                    "hover:border-blue-700", "rounded-lg",
                    "bg-gray-100", "text-sm", "font-semibold",
                    "text-black-700", "hover:text-blue-700",
                    "p-4", "min-w-[100px]", "cursor-pointer", "transition-all").sub("Bad"),
                UI.tag("div").id("goodButton").cls("flex", "flex-col", "justify-center",
                    "items-center", "border-2", "border-black-700",
                    "hover:border-blue-700", "rounded-lg",
                    "bg-gray-100", "text-sm", "font-semibold",
                    "text-black-700", "hover:text-blue-700",
                    "p-4", "min-w-[100px]", "cursor-pointer", "transition-all").sub("Good")
            )
        );
    }
};

