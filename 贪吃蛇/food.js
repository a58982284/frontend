(function () {
    var elements = [];

    function Food(x, y, width, height, color) {
        this.x = x || 0;
        this.y = y || 0;

        this.width = width || 20;
        this.height = height || 20;
        this.color = color || "green";
    }

//为原型添加初始化的方法(作用：在页面上显示这个食物)
    //因为食物要在地图上显示,所以,需要地图的这个参数(map---就是页面上的.class=map的这个div)
    Food.prototype.init = function (map) {
        //先删除这个小食物
        //外部无法访问的函数
        remove();
        var div = document.createElement("div");
        //把div加到map中
        map.appendChild(div);
        //设置div的样式
        div.style.width = this.width + "px";
        div.style.height = this.height = "px";
        div.style.backgroundColor = this.color;
        //脱离文档流
        div.style.position = "absolute";
        //随机横纵坐标
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";

        //把div加入到数组elements中
        elements.push(div);
    };

    //私有函数--删除食物的
    function remove() {
        //elements数组中有这个食物
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            //找到这个子元素的父级元素,然后删除这个子元素
            ele.parentNode.removeChild(ele);
            //再次把elements中的这个子元素也要删除
            elements.splice(i, 1);
        }


    }

    //把Food暴露给Window,外部可以使用
    window.Food = Food;
}())