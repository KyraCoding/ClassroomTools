import { UI } from "../ui.js";

const buttonStyle = "h-1/2 w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
const svgPath = "m280.37 148.26-184.37 151.85v163.89a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16v-95.71a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05l112.02.31a16 16 0 0 0 16-16v-164l-184.33-151.74a12.19 12.19 0 0 0 -15.3 0zm291.23 103.21-83.6-68.91v-138.51a12 12 0 0 0 -12-12h-56a12 12 0 0 0 -12 12v72.61l-89.53-73.66a48 48 0 0 0 -61 0l-253.13 208.47a12 12 0 0 0 -1.6 16.9l25.5 31a12 12 0 0 0 16.91 1.63l235.22-193.74a12.19 12.19 0 0 1 15.3 0l235.23 193.74a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0 -1.7-16.93z";

export const Home = {
    name() { return "Home"; },
    icon() { return "home.png"; },
    svg() {
        return UI.svg("svg").attr("viewBox", "0 0 576 512").sub(
            UI.svg("path").attr("d", svgPath)
        );
    },
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