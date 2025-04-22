normalFurnitureDivs = window.frames["FRAME_CONTENT"].document.getElementsByClassName("Student NoSelect Furniture");
normalDivs = window.frames["FRAME_CONTENT"].document.getElementsByClassName("Student NoSelect");

studentNames = [];
studentPortraitURLs = [];

baseURL = "https://md-hcpss.edupoint.com/";

allDivs = [];
allDivs.push(...normalFurnitureDivs);
allDivs.push(...normalDivs);

console.log(allDivs.length);

    for (let i = 0; i < allDivs.length; i++) {

        attElem = allDivs[i].querySelector(".AMAtt.NoSelect.ATR_1");
        if (attElem != null) {
            if (attElem.innerText === "A") {
                continue;
            }
        }

        attElem = allDivs[i].querySelector(".AMAtt.NoSelect.ATR_4");
        if (attElem != null) {
            if (attElem.innerText === "ILL") {
                continue;
            }
        }

        studentNames.push(allDivs[i].querySelector(".formattedName").innerText);
        
        temp = allDivs[i].querySelector(".Picture").innerHTML.split('"');
        studentPortraitURLs.push(baseURL + temp[1]);

    }



for (let i = 0; i < studentNames.length; i++) {
    console.log(studentNames[i]);
    console.log(studentPortraitURLs[i]);
}

chrome.runtime.sendMessage({names: studentNames, URLs: studentPortraitURLs});
console.log("Names & Image URLs Loaded");