const keys = [
    "lastApp",
    "students"
];

function toStorageKey(key) {
    return `storage:${key}`;
}

export const Storage = {
    lastApp: -1,
    students: {},
    save(key) {
        if (key === "save") return;
        const stringified = JSON.stringify(this[key]);
        localStorage.setItem(toStorageKey(key), stringified);
    }
};

for (const key of keys) {
    const json = localStorage.getItem(toStorageKey(key));
    if (json !== null)
        Storage[key] = JSON.parse(json);
}