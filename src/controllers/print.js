import { jsPDF } from "jspdf";

let ExcelPlaceholder = {
    "[tabName]":"&A",
    "[CurrentDate]":"&D",
    "[fileName]":"&F",
    "[background]":"&G",
    "[Shadow]":"&H",
    "[TotalPages]":"&N",
    "[pageNumber]":"&P",
    "[CurrentTime]":"&T",
    "[filePath]":"&Z",
}

// Get the pixel value per millimeter
function getOneMmsPx (){
    let div = document.createElement("div");
    div.id = "mm";
    div.style.width = "1mm";
    document.querySelector("body").appendChild(div);
    let mm1 = document.getElementById("mm").getBoundingClientRect();
    return mm1.width;
} 