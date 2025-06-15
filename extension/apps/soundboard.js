import { UI } from "../ui.js";

const audios = [
    { name: "Hooray", file: "group-hooray.mp3", color: "green" },
    { name: "Boo", file: "group-boo.mp3", color: "red" }
];

function createAudioButton({ name, file, color }) {
    const bgColor = color === "green" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600";
    
    const elem = UI.tag("button")
        .clz(`px-8 py-6 ${bgColor} text-white font-semibold text-xl rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer w-full min-h-[80px]`)
        .sub(name);
    
    const audio = new Audio(`assets/audio/${file}`);
    elem.on("click", () => {
        audio.play();
    });
    
    return elem;
}

const svgPath = "m470.38 1.51-319.97 94.49a32 32 0 0 0 -22.41 30.51v261.41a139 139 0 0 0 -32-3.92c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64v-233.68l256-75v184.61a138.4 138.4 0 0 0 -32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64v-352a32 32 0 0 0 -41.62-30.49z";

export const Soundboard = {
    name() { return "Sound Board"; },
    icon() { return "sound.png"; },
    svg() {
        return UI.svg("svg").attr("viewBox", "0 0 512 512").sub(
            UI.svg("path").attr("d", svgPath).attr("fill-rule", "evenodd")
        );
    },
    load(_state) {
        return UI.tag("div")
            .clz("min-h-screen bg-gray-50 flex flex-col p-6")
            .sub(
                UI.tag("h1").clz("text-4xl font-bold text-gray-800 text-left mb-8").sub("Sound Board"),
                
                UI.tag("div")
                    .clz("flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full")
                    .sub(
                        UI.tag("div")
                            .id("sb-list")
                            .clz("flex flex-col gap-4 w-full")
                            .sub(...audios.map(info => createAudioButton(info)))
                    )
            );
    }
};