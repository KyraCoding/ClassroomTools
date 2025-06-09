const list = [
    "default",
    "rust",
    "night"
];

const style = document.querySelector("#theme-stylesheet");

export const Theme = {
    all() {
        return list;
    },
    set(name) {
        style.setAttribute("href", `themes/${name}.css`);
    }
};