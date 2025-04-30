import { UI } from "../ui.js";

export const Picker = {
    name() { return "Student Picker"; },
    icon() { return "wheel.png"; },
    load(_state) {
        return UI.tag("div").clz("grow hidden flex-col h-full w-full").sub(
            UI.tag("strong").clz("text-3xl text-center").sub("Student Picker")
        );
    }
};