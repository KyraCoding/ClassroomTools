const keys = [
    "lastApp",
    "students",
    "theme",
    "period",
    "groups",
    "groupsMethod"
];

function toStorageKey(key) {
    return `storage:${key}`;
}

function saveOne(key) {
    if (key === "save") return;
    const stringified = JSON.stringify(Storage[key]);
    localStorage.setItem(toStorageKey(key), stringified);
}

export const Storage = {
    lastApp: -1,
    students: {},
    theme: "default",
    period: "1",
    groups: {},
    groupsMethod: {},
    save(...keys) {
        keys.forEach(saveOne);
    }
};

for (const key of keys) {
    const json = localStorage.getItem(toStorageKey(key));
    if (json !== null)
        Storage[key] = JSON.parse(json);
}