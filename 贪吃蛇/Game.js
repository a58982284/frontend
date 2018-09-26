(function () {
    var that = null;//该变量的目的就是为了保存游戏Game的实例对象

    //游戏的构造函数
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;//保存当前的实例对象到that变量中-----------------此时that就是this
    }

    Game.prototype.init = function () {
        this.food.init(this.map);
        this.snake.init(this.map);
        this.runSnake(this.food, this.map);
        this.bindKey();
    };


    Game.prototype.runSnake = function () {

        var timeId = setInterval(function () {
            //此时的this是window
            this.snake.move(food, map);
            this.snake.init(map);
            var maxX = map.offsetWidth / this.snake.width;
            var maxY = map.offsetHeight / this.snake.height;

            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;

            if (headX < 0 || headX >= maxX) {
                clearInterval(timeId);
                alert("GAME OVER");
            }
            if (headY < 0 || headY >= maxY) {
                clearInterval(timeId);
                alert("GAME OVER");
            }
        }.bind(that), 300)


    };
    //添加原型方法---设置用户按键,改变小蛇移动的方向
    Game.prototype.bindKey = function () {
        document.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = "left";
                    break;
                case 38:
                    this.snake.direction = "top";
                    break;
                case 39:
                    this.snake.direction = "right";
                    break;
                case 40:
                    this.snake.direction = "bottom";
                    break;
            }
        }.bind(that), false);
    };


    window.Game = Game;


}())