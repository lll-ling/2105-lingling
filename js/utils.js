/**
 * animate 用于多属性缓动
 * @param {element} dom 要缓动节点
 * @param {object} obj 要缓动的样式的集合，对象格式
 * @param {function} fn 回调函数，动画完成后执行的函数
 */

function animate(dom,obj,fn){
    clearInterval(dom.timer);
    dom.timer = setInterval(function(){
        // 假设都为true 代表所有动画都运动到终点位置
        var flag = true;
        // 运动遍历到的属性
        for(var attr in obj){
            // 1 获取元素当前位置
            var current = parseInt(getStyle(dom,attr));
            // 2 计算速度
            var speed = (obj[attr] - current)/10
            speed = speed>0?Math.ceil(speed):Math.floor(speed);
            // 3 计算下一个位置
            var next = current + speed;
            // 4 定位目标
            dom.style[attr] = next+"px";
            if(next!=obj[attr]){
                flag = false
            }
        }

        // 20ms多个属性运动完一次，判断是否都到达
        if(flag){
            clearInterval(dom.timer);
            // 如果有回调函数，那么继续执行回调函数
            if(fn){
                fn()
            }
        }        
    },20)
}
/**
 * getStyle 用于获取节点的样式值
 * @param {element} dom 要获取样式的节点
 * @param {string} attr 要获取的样式值
 */
function getStyle(dom,attr){
    if(window.getComputedStyle){
        // 标准浏览器
        return window.getComputedStyle(dom)[attr]
    }else{
        // ie低版本
        return dom.currentStyle[attr];
    }
}

/**
 * move 用于单属性缓动
 * @param {element} dom 要缓动节点
 * @param {string} attr 要缓动的样式名称
 * @param {string} target 要缓动到的目标
 * @param {function} fn 回调函数
 */
function move(dom,attr,target,fn){
    clearInterval(dom.timer);
    dom.timer = setInterval(function(){
        // 1 获取当前位置
        var current = parseInt(getStyle(dom,attr));
        // 2 计算速度
        var speed = (target - current)/10
        speed = speed>0?Math.ceil(speed):Math.floor(speed);
        // 3 计算下一个位置
        var next = current + speed;
        // 4 定位元素
        if(next==target){
            clearInterval(dom.timer);
            if(fn){
                fn()
            }
        }
        dom.style[attr] = next+"px";
    },20)
}  

// 范围内的随机数
function rand(min,max){	
    var res=Math.floor(Math.random()*(max-min+1))+min;
    return res;
}
// 书写一个函数，可以生成一个随机的颜色
function getColor(){
    var str = "#"
    // 10进制：0-9
    // 十六进制：0-15
    for(var i=1;i<=6;i++){
        var num = rand(0,15); // 0-9 10(a) 11(b) 12(c) 13(d) 14(e) 15(f)
        // toString可以把数字转字符串
        var char = num.toString(16);//()里写你要转成几进制
        // 拼接再str的后面
        str = str + char;
    };
    return str;
}
// 范围内的随机数
// 代用函数的时候只需要讲范围添加清楚即可
// 例如 sjs(10,20)
function sjs(min,max){	
    var res=Math.floor(Math.random()*(max-min))+min;
}
// 时间格式化函数
function format(time){	
    //进行格式化操作	
    // 这里dtime接受的就是一个需要格式化的时间对象	
    // 获取时间对象内的信息	var year=time.getFullYear()//获取年份信息	
    var month=time.getMonth()
    //获取月份信息	
    var date=time.getDate() 
    //获取日期信息	
    var hours=time.getHours()
    //获取小时信息	
    var minutes=time.getMinutes()
    //获取分钟信息	
    var seconds=time.getSeconds()
    //获取秒钟信息	
    var week=time.getDay()
    //获取星期几	
    // 修改获取到的信息	month+=1	
    var str="日一二三四五六"	
    week="星期"+str[week]	
    // 根据自己的需求确定	
    var s=hours>=12?"下午":"上午";	
    if(hours>=12){		hours-=12	}	
    var res=year + "年 " + month + "月 " + date + "日 " + week + " "  + s + " " + hours + "点 " + minutes + "分 " + seconds + "秒 "	
    // 把组装好的结果返回		
    return res
}
    // 封装倒计时
    function diffTime(time1,time2){	
        var t1=time1.getTime()	
        var t2=time2.getTime()	
        var sub = parseInt((t2-t1)/1000)	
        var day=parseInt(sub/(60*60*24))	
        var hours = parseInt(sub%(60*60*24)/(60*60))	
        var minutes = parseInt(sub%(60*60)/60)	
        var seconds=sub%60	
        var obj={		
            day:day,		
            hours:hours,		
            minutes:minutes,		
            seconds:seconds	
        }	
        return obj
    }		



    // 生成快捷键 ctrl+alt+D
    /**
     *getElement 通过id获取元素
     *
     * @param {element} ele  获取元素
     * @return {*} 
     */
    function getElement(ele) { 
        return document.getElementById(ele)
     }
     