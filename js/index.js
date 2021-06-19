//输入框的显示、隐藏
var nmi = document.getElementById("nav-m-input");
var nms = document.getElementById("nav-m-search");
//鼠标移入显示
nmi.onmouseover = function () {
    nms.style.display = "block";
}
function nmiover() {
    nms.style.display = "block";
}
//鼠标移出隐藏
nmi.onmouseout = function () {
    nms.style.display = "none";
}              
function nmiout() {
    nms.style.display = "none";
}

