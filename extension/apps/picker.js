import { UI } from "../ui.js";

export const Picker = {
    name() { return "Student Picker"; },
    icon() { return "wheel.png"; },
    load(_state) {
        return UI.tag("div").clz("grow flex flex-col h-full w-full").sub(
            UI.tag("strong").clz("text-3xl text-center").sub("Student Picker"),
            UI.tag("button")
                .clz("text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800")
                .attr("id", "dropdownDefaultButton")
                .attr("data-dropdown-toggle", "dropdown")
                .attr("type", "button")
                .sub(
                    "Dropdown button",
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
                ),
            UI.tag("div")
                .id("dropdown")
                .clz("z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700")
                .sub(
                    UI.tag("ul")
                        .clz("py-2 text-sm text-gray-700 dark:text-gray-200")
                        .attr("aria-labelledby", "dropdownDefaultButton")
                        .sub(
                            UI.tag("li").sub(
                                UI.tag("a")
                                    .clz("block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white")
                                    .attr("href", "#")
                                    .sub("Dashboard")
                            ),
                            UI.tag("li").sub(
                                UI.tag("a")
                                    .clz("block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white")
                                    .attr("href", "#")
                                    .sub("Settings")
                            ),
                            UI.tag("li").sub(
                                UI.tag("a")
                                    .clz("block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white")
                                    .attr("href", "#")
                                    .sub("Earnings")
                            ),
                            UI.tag("li").sub(
                                UI.tag("a")
                                    .clz("block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white")
                                    .attr("href", "#")
                                    .sub("Sign out")
                            )
                        )
                )
            ,
            UI.tag("div").clz("pt-8"),
            UI.tag("img").clz("mx-auto").id("studentImage").attr("src", "/assets/imgs/defaultAvatar.jpg").attr("height", "200px").attr("width", "150px"),
            UI.tag("label").clz("text-center pt-4").id("nameLabel").sub("John Doe"),
            UI.tag("div").clz("flex flex-row w-full h-1/4 justify-center items-center").sub(
                UI.tag("div").id("nextButton").cls("flex", "flex-col", "justify-center",
                    "items-center", "border-2", "border-black-700",
                    "hover:border-blue-700", "rounded-lg",
                    "bg-gray-100", "text-sm", "font-semibold",
                    "text-black-700", "hover:text-blue-700",
                    "p-4", "min-w-[100px]", "cursor-pointer", "transition-all").sub("New Student"),
                UI.tag("div").id("periodButton").cls("flex", "flex-col", "justify-center",
                    "items-center", "border-2", "border-black-700",
                    "hover:border-blue-700", "rounded-lg",
                    "bg-gray-100", "text-sm", "font-semibold",
                    "text-black-700", "hover:text-blue-700",
                    "p-4", "min-w-[100px]", "cursor-pointer", "transition-all").sub(". period"),
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
/*
<div id="studentTool" class="grow hidden flex-col h-full w-full ">
            <strong class="text-3xl text-center"> Student Picker </strong>
            <div class="pt-8"></div>
            <img src="/assets/imgs/defaultAvatar.jpg" class="mx-auto" id="studentImage" height="200px" width="150px">
            <label class="text-center" id="nameLabel"> John Doe</label>
            <div class="flex flex-row w-full h-1/4 justify-center items-center">
                <button id=" nextButton"
                class="w-1/4 h-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                New Student</button>
                <button id="periodButton"
                    class="w-1/4 h-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    . period</button>
            </div>
            <div class="flex flex-row w-full h-1/4 justify-center items-center">
                <button id=" badButton"
                class="w-1/4 h-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Bad</button>
                <button id="goodButton"
                    class="w-1/4 h-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Good</button>
            </div>
        </div>
        "flex", "flex-col", "justify-center", 
                "items-center", "border-2", "border-black-700", 
                "hover:border-blue-700", "rounded-lg", 
                "bg-gray-100", "text-sm", "font-semibold", 
                "text-black-700", "hover:text-blue-700", 
                "p-4", "min-w-[100px]", "cursor-pointer", "transition-all"

                UI.tag("button").clz("text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800").attr("data-dropdown-toggle", "dropdown").attr("type", "button").sub(
                "Dropdown",
                UI.tag("svg").clz("w-2.5 h-2.5 ms-3").attr("aria-hidden", "true").attr("xmlns", "http://www.w3.org/2000/svg").attr("fill", "none").attr("viewBox", "0 0 10 6").sub(
                    UI.tag("path").attr("stroke", "currentColor").attr("stroke-linecap", "round").attr("stroke-linejoin", "round").attr("stroke-width", "2").attr("d", "m1 1 4 4 4-4")
                )
            )
    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button 
    <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>
UI.tag("div").id("dropdown").clz("z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700").sub(
    UI.tag("ul").clz("py-2 text-sm text-gray-700 dark:text-gray-200").attr("aria-labelledby", "dropdownDefaultButton").sub(
        UI.tag("li").sub(UI.tag("a").clz("block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white").attr("href", "#").sub("Period 1")),
        UI.tag("li").sub(UI.tag("a").clz("block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white").attr("href", "#").sub("Period 2")),
        UI.tag("li").sub(UI.tag("a").clz("block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white").attr("href", "#").sub("Period 3")),
        UI.tag("li").sub(UI.tag("a").clz("block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white").attr("href", "#").sub("Period 4A")),
        UI.tag("li").sub(UI.tag("a").clz("block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white").attr("href", "#").sub("Period 4B")),
        UI.tag("li").sub(UI.tag("a").clz("block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white").attr("href", "#").sub("Period 5")),
        UI.tag("li").sub(UI.tag("a").clz("block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white").attr("href", "#").sub("Period 6"))
    )
)
<!-- Dropdown menu -->
<div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
      </li>
    </ul>
</div>
*/