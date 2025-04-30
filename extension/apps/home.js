import { UI } from "../ui.js";

const buttonStyle = "h-1/2 w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";

export const Home = {
    name() { return "Home"; },
    icon() { return "home.png"; },
    load(_state) {
        return UI.tag("div").clz("grow flex flex-col h-full w-full").sub(
            UI.tag("div").clz("flex flex-col w-full border-b-4").sub(
                UI.tag("strong").clz("text-5xl text-center").sub("Classroom Tools")
            ),
            UI.tag("button").clz(buttonStyle).sub("Recently Used Tool"),
            UI.tag("button").clz(buttonStyle).sub("Most Recently Used Tool")
        );
    }
};