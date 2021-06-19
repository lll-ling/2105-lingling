// 1.获取元素
const bannerBox = document.querySelector(".adv");
const imgBox = bannerBox.querySelector(".adv-photo");
const pointBox = bannerBox.querySelector("ol");
const leftRightTabs = bannerBox.querySelector(".adv-LR");
// 首先获取可视窗口的宽度
const bannerWidth = bannerBox.clientWidth;
// 定义一标识  如果我的flag=true 代表我要执行动画 如果我是false那么就不能再次执行动画
let flag = true;
// 设置一个初始值 代表的是第几张图
let index = 1;
let timer;
// 2.设置焦点
setPoint();
// 3.复制元素
copyEle();
// 4.autoPlay
autoPlay();
// 5.移入移除
overOut();
// 6.左右切换
leftRightEvent();
// 7.焦点切换
pointEvent();
// 设置焦点
function setPoint() {
    let pointNum = imgBox.children.length;
    for (let i = 0; i < pointNum; i++) {
        let li = document.createElement("li");
        pointBox.appendChild(li);
        //  默认圆点被选中样式
        if (i == 0) {
            li.className = "active";
        }
        li.setAttribute("point-index", i + 1);
    }

    pointBox.style.width = pointNum * 20 + "px";
}
// 复制元素
function copyEle() {
    // cloneNode()  复制节点，括号里面可以写true、false  true代表的是克隆当前元素的所有子元素，如果是false代表只复制当前的一个元素
    let firstEle = imgBox.children[0].cloneNode(true);
    let lastEle = imgBox.children[imgBox.children.length - 1].cloneNode(true);
    // 把复制的两个元素添加到ul中
    imgBox.appendChild(firstEle);
    imgBox.insertBefore(lastEle, imgBox.children[0]);

    imgBox.style.width = imgBox.children.length * bannerWidth + "px";
    imgBox.style.left = -index * bannerWidth + "px";
}
// 自动轮播
function autoPlay() {
    //由于之前的动画可以存在没有完成动画，那么就需要停止之前的动画
    clearInterval(timer)
    timer = setInterval(function() {
        index++;
        animate(imgBox, {
            left: -index * bannerWidth
        }, moveEnd);
    }, 1000);
}
// 移入移除
function overOut() {
    bannerBox.addEventListener("mouseover", function() {
        clearInterval(timer);
    });
    bannerBox.addEventListener("mouseout", function() {
        // clearInterval(timer)
        autoPlay();
    });
}
// 绑定一个事件用来做边界判断
function moveEnd() {
    if (index == imgBox.children.length - 1) {
        index = 1;
        imgBox.style.left = -index * bannerWidth + "px";
    }
    if (index == 0) {
        index = imgBox.children.length - 2;
        imgBox.style.left = -index * bannerWidth + "px";
    }
    //   添加类名
    for (let i = 0; i < pointBox.children.length; i++) {
        pointBox.children[i].className = "";
    }
    pointBox.children[index - 1].className = "active";
    flag = true;
}
// 左右切换
function leftRightEvent() {
    leftRightTabs.addEventListener("click", function(e) {
        e = e || window.event;
        if (flag == false) {
            return;
        }
        flag = false;
        // 判断是点击左侧还是右侧
        if (e.target.className == "left") {
            index--;
            animate(imgBox, {
                left: -index * bannerWidth
            }, moveEnd);
        }
        if (e.target.className == "right") {
            index++;
            animate(imgBox, {
                left: -index * bannerWidth
            }, moveEnd);
        }
    });
}
// 焦点
function pointEvent() {
    pointBox.addEventListener("click", function(e) {
        e = e || window.event;
        if (flag == false) {
            return;
        }
        flag = false;
        if (e.target.nodeName === "LI") {
            index = e.target.getAttribute("point-index");
            animate(imgBox, {
                left: -index * bannerWidth
            }, moveEnd);
        }
    });
}
// 浏览器隐藏的时候执行的方法
document.onvisibilitychange = function() {
    if (document.visibilityState == 'hidden') {
        clearInterval(timer)
    } else {
        autoPlay()
    }
}