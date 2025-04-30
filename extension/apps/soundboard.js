import { UI } from "../ui.js";

const audios = [
    { name: "Group Boo", file: "group-boo.mp3" },
    { name: "Group Hooray", file: "group-hooray.mp3" },
    { name: "Lone Boo", file: "lone-boo.mp3" },
    { name: "Lone Hooray", file: "lone-hooray.mp3" },
];

function createAudioButton({ name, file }) {
    const elem = UI.tag("div")
        .cls("flex", "flex-col", "justify-center", 
            "items-center", "border-2", "border-black-700", 
            "hover:border-blue-700", "rounded-lg", 
            "bg-gray-100", "text-sm", "font-semibold", 
            "text-black-700", "hover:text-blue-700", 
            "p-4", "min-w-[100px]", "cursor-pointer", "transition-all")
        .sub(name);
    const audio = new Audio(`assets/audio/${file}`);
    elem.on("click", () => {
        audio.play();
    });
    return elem;
}

export const Soundboard = {
    name() { return "Sound Board"; },
    icon() { return "sound.png"; },
    load(_state) {
        const container = UI.tag("div")
            .id("sb-list")
            .cls("grid", "grid-cols-3", "gap-4");
        
        for (const info of audios) {
            container.add(createAudioButton(info));
        }
        
        return UI.tag("div")
            .cls("flex", "w-full", "py-4", "justify-center")
            .sub(container);
    }
};