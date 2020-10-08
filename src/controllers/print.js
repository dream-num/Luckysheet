import { jsPDF } from "jspdf";



// Get the pixel value per millimeter
function getOneMmsPx (){
    let div = document.createElement("div");
    div.id = "mm";
    div.style.width = "1mm";
    document.querySelector("body").appendChild(div);
    let mm1 = document.getElementById("mm").getBoundingClientRect();
    return mm1.width;
} 