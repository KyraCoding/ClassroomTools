import { UI } from "./ui.js";

/**
 * @typedef SelectOptions
 * @prop {string?} defaultTitle
 */

/**
 * @template T
 * @param {{title: string, value: T}[]} list
 * @param {(value: T) => any} callback
 * @param {SelectOptions} options
 */
function select(list, callback, options = {}) {
    function updateTitle(title) {
        button.dom.textContent = title + " ▼";
    }

    function createItem(title, value) {
        const item = UI.tag("li");
        const link = UI.tag("a")
            .clz(
                "block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer",
            )
            .attr("href", "#")
            .sub(title);

        link.on("click", (e) => {
            e.preventDefault();
            updateTitle(title);
            dropdown.dom.classList.add("hidden");
            callback(value);
        });

        item.sub(link);
        return item;
    }

    const button = UI.tag("button")
        .clz(
            "absolute top-6 right-6 px-4 py-2 bg-white border-2 border-gray-300 hover:border-blue-500 rounded-lg text-gray-700 hover:text-blue-600 font-medium shadow-sm hover:shadow-md transition-all cursor-pointer select-none",
        )
        .attr("type", "button");

    updateTitle(options.defaultTitle || list[0].title);

    const inner = UI.tag("ul").clz("py-2").sub(
        ...list.map(({ title, value }) => createItem(title, value)),
    );

    const dropdown = UI.tag("div")
        .clz(
            "absolute top-20 right-6 z-10 hidden bg-white border border-gray-200 rounded-lg shadow-lg min-w-[160px] select-none",
        )
        .sub(inner);

    button.on("click", () => {
        dropdown.dom.classList.toggle("hidden");
    });

    return { button, dropdown };
}

export const TP = {
    select,
};
