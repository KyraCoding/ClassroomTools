import { UI } from "../ui.js";

const audios = [
    { name: "Hooray", file: "group-hooray.mp3", color: "green" },
    { name: "Boo", file: "group-boo.mp3", color: "red" }
];

function createAudioButton({ name, file, color }) {
    const bgColor = color === "green" ? "bg-green-100" : "bg-red-100"
    const borderColor = color === "green" ? "border-green-700" : "border-red-700";
    const hoverBorderColor = color === "green" ? "hover:border-green-500" : "hover:border-red-500";
    const textColor = color === "green" ? "text-green-700" : "text-red-700";
    const hoverTextColor = color === "green" ? "hover:text-green-500" : "hover:text-red-500"
    const elem = UI.tag("div")
        .cls("flex", "flex-col", "justify-center", 
            "items-center", "border-2", borderColor, 
            hoverBorderColor, "rounded-lg", 
            bgColor, "text-lg", "font-bold", 
            textColor, hoverTextColor, 
            "p-8", "w-full", "h-full", "cursor-pointer", "transition-all")
        .sub(name)
    
    const audio = new Audio(`assets/audio/${file}`);
    elem.on("click",() => {
        audio.play()
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
        const container = UI.tag("div")
            .id("sb-list")
            .cls("flex", "flex-col", "gap-4", "w-full", "h-full")
        
        for (const info of audios) {
            container.add(createAudioButton(info));
        }

        return UI.tag("div")
            .cls("flex", "w-full", "h-full", "py-4", "justify-center")
            .sub(container)
    }

}