function game_Mine(container) {
  this.container = container;
  this.tiles = new Array(100); //4
  this.tiles_2d = new Array();
  for (var i = 0; i < 10; i++) { //5
    this.tiles_2d.push([]);
  }
  this.arr = [];
  this.arr_2 = [];
  // this.ini.call(this);
};
// game_Mine.prototype.ini = function(){
//   var _this = this;
// }
var countOfDiv = 0;
//创建扫雷界面
game_Mine.prototype.createTile = function() {
  var length = this.tiles.length;
  var length_2d = this.tiles_2d.length;
  for (var i = 0; i < length; i++) {
    var tile = document.createElement("div");
    tile.className = "tile";
    tile.index = i;
    this.container.appendChild(tile);
    this.tiles[i] = tile;
  }
  for (var i = 0; i < length_2d; i++) {
    for (var j = 0; j < 10; j++) { //6
      this.tiles_2d[i].push(this.tiles[countOfDiv]);
      countOfDiv++
    }
  }
}
//初始化扫雷，设定雷数；
game_Mine.prototype.start = function(num) {
  var length = this.tiles.length;
  for (var i = 0; i < length; i++) {
    this.tiles[i].setAttribute("val", 0);
  }
  //num是你设定的雷数
  for (var i = 0; i < num; i++) {
    var index_Mine = Math.floor(Math.random() * this.tiles.length);
    // var aa = index_Mine;
    if (this.tiles[index_Mine].getAttribute("val") == 0) {
      this.tiles[index_Mine].setAttribute("val", 1);
    } else {
      num++;
    }
  }
}
//储存周围的位置；；
game_Mine.prototype.store = function(elem) {
  var num = elem.index;
  var j = num % 10; //7
  var i = (num - j) / 10; //8
  this.arr = [];
  //左上
  if (i - 1 >= 0 && j - 1 >= 0) {
    this.arr.push(this.tiles_2d[i - 1][j - 1]);
  }
  //正上
  if (i - 1 >= 0) {
    this.arr.push(this.tiles_2d[i - 1][j]);
  }
  //右上
  if (i - 1 >= 0 && j + 1 <= 9) {
    this.arr.push(this.tiles_2d[i - 1][j + 1]);
  }
  //左边
  if (j - 1 >= 0) {
    this.arr.push(this.tiles_2d[i][j - 1]);
  }
  //右边
  if (j + 1 <= 9) {
    this.arr.push(this.tiles_2d[i][j + 1]);
  }
  //左下
  if (i + 1 <= 9 && j - 1 >= 0) {
    this.arr.push(this.tiles_2d[i + 1][j - 1]);
  }
  //正下
  if (i + 1 <= 9) {
    this.arr.push(this.tiles_2d[i + 1][j]);
  }
  //右下
  if (i + 1 <= 9 && j + 1 <= 9) {
    this.arr.push(this.tiles_2d[i + 1][j + 1]);
  }
}
//游戏结束
game_Mine.prototype.over = function() {
  for (var i = 0; i < 100; i++) { //11
    this.tiles[i].onclick = "null";
    this.tiles[i].oncontextmenu = "null";
    var val = this.tiles[i].getAttribute("val");
    var value = this.tiles[i].getAttribute("value");
    if (val == 1) {
      this.tiles[i].className = "boom";
    } else if (val == 0) {
      this.tiles[i].className = "showed";
      this.tiles[i].innerHTML = value == 0 ? "" : value;
    }
  }
}

//显示周边雷数目
game_Mine.prototype.showValue = function(game) {
  var count = 0;
  for (var i = 0; i <= 9; i++) {
    for (var j = 0; j <= 9; j++) {
      this.store(this.tiles_2d[i][j]);
      for (var n = 0; n < this.arr.length; n++) {
        if (this.arr[n].getAttribute("val") == 1) {
          count++;
        }
      }
      this.tiles_2d[i][j].setAttribute("value", count);
      count = 0;
    }
  }
}

//鼠标中键 和win7扫雷鼠标中键同样的作用
game_Mine.prototype.show2 = function(game, numb, func) {
  var j = numb % 10; //15
  var i = (numb - j) / 10; //16
  var count = 0;
  this.store(this.tiles_2d[i][j]);
  for (var m = 0,length = this.arr_2.length; m < length; m++) {
    if (this.arr_2[m].className != "tile biaoji") {
      this.arr_2[m].className = "tile";
    }
  }
  this.arr_2.length = 0;
  for (var m = 0,length = this.arr.length; m <length ; m++) {
    if (this.arr[m].className == "tile biaoji") {
      count++;
    }
  }
  var numofmines = this.tiles_2d[i][j].getAttribute("value");
  if (numofmines == count) {
    for (var n = 0,length = this.arr.length; n < length; n++) {
      if (this.arr[n].className == "tile" && this.arr[n].getAttribute("val") != 1) {
        this.arr[n].className = "showed";
        this.arr[n].innerHTML = this.arr[n].getAttribute("value") == 0 ? "" : this.arr[n].getAttribute("value");
        this.arr[n].oncontextmenu = null;
        setting1(this.arr[n], game, this.tiles.length);
      } else if (this.arr[n].className == "tile" && this.arr[n].getAttribute("val") == 1) {
        this.over();
        alert("壮士，一路走好");
        return false;
      }
    }
  }
  func();
}

//鼠标中键在一个有数字的格子按下，如果该键周边有tile属性使其变白
game_Mine.prototype.show3 = function(game, numb) { 
  var j = numb % 10; //17
  var i = (numb - j) / 10;
  this.store(this.tiles_2d[i][j]);
  for (var m = 0; m < this.arr.length; m++) {
    if (this.arr[m].className == "tile") {
      this.arr_2.push(this.arr[m]);
      this.arr[m].className = "showed";
    }
  }
}

//若周围无雷处于hide状态，则显示周围无雷的
game_Mine.prototype.showAll = function(num, game) {
  var x = num % 10;
  var y = (num - x) / 10;
  if (this.tiles_2d[y][x].className == "showed" && this.tiles_2d[y][x].getAttribute("val") == 0) {
    this.store(this.tiles_2d[y][x]);
    var arr2 = new Array();
    arr2 = this.arr;
    for (var i = 0; i < arr2.length; i++) {
      if (arr2[i].className != "showed") {
        if (arr2[i].getAttribute("value") == 0) {
          arr2[i].className = "showed";
          this.showAll(arr2[i].index, game);
        } else {
          arr2[i].className = "showed";
          arr2[i].innerHTML = arr2[i].getAttribute("value");
        }
      }
    }
  }
}
//点击格子触发事件
game_Mine.prototype.click_1 = function(i, j, dianji, game, func) {
  var elem = this.tiles;
  var event = event || window.event;
  var len = this.tiles.length;
  this.tiles_2d[i][j].onmouseover = function() {
    if (this.className == "tile") {
      this.className = "tile current";
    }
  }
  this.tiles_2d[i][j].onmouseout = function() {
    if (this.className == "tile current") {
      this.className = "tile";
    }
  }

  this.tiles_2d[i][j].onmousedown = function(event) {
    if (this.className == "showed") {
      if (event.button == 1) {
        game.show3(game, this.index);
      }
    }
  }
  this.tiles_2d[i][j].onmouseup = function(event) {
    if (this.className == "showed") {
      if (event.button == 1) {
        game.show2(game, this.index, func);
      }
    } else {
      if (event.button == 0 && this.className != "tile biaoji") {
        dianji(this, game);
        setting1(this, game, len);
      }
    }
  }

  this.tiles_2d[i][j].oncontextmenu = function() {

    if (this.className == "tile biaoji") { //如果已被标记，则取消标记，恢复onclick事件
      this.className = "tile";
      this.onclick = function() {
        dianji(this, game);
      }
    } else if (this.className != "tile biaoji") { //若未被标记，标记，取消onclick事件
      this.onclick = null;
      this.className = "tile biaoji";
    }
    return false; //取消默认菜单。。
  }
}
//显示格子属性等
function setting1(elem, obj, len) {
  if (elem.getAttribute("value") == 0) {
    obj.showAll(elem.index, obj);
    for (var i = 0; i < len; i++) {
      if (obj.tiles[i].className == "showed") {
        if (obj.tiles[i].innerHTML == "false") { //测试中部分格子出现false,原因目前不清楚
          obj.tiles[i].innerHTML = obj.tiles[i].getAttribute("value");
        }
        obj.tiles[i].onclick = null;
        obj.tiles[i].oncontextmenu = null;
      }
    }
  }
}
window.onload = function() {
  if (!document.getElementsByClassName) { //兼容className事件
    document.getElementsByClassName = function(className, element) {
      var children = (element || document).getElementsByTagName('*');
      var elements = new Array();
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var classNames = child.className.split(' ');
        for (var j = 0; j < classNames.length; j++) {
          if (classNames[j] == className) {
            elements.push(child);
            break;
          }
        }
      }
      return elements;
    };
  }

  var container = document.getElementById("box");
  var showed = document.getElementsByClassName('showed');
  var oBtn = document.getElementsByTagName('button')[0];
  var reset = document.getElementById("new_1");
  var numOfMine;
  var good;
  var numOfRestMines;
  box.oncontextmenu = function() { //取消右击事件
    return false;
  }

  var game = new game_Mine(container);
  game.createTile();
  reset.onclick = function() {
    window.location.reload(); //
  }
  oBtn.onclick = function() { //设置雷数                          
    numOfMine = document.getElementsByTagName("input")[0].value;
    good = 100 - numOfMine; //扩展修改
    game.start(numOfMine);
    game.showValue(game);
    // sjishu.innerHTML = "剩余雷数:"+numOfRestMines;

    for (var i = 0; i < 10; i++) { //2
      for (var j = 0; j < 10; j++) { //3
        game.click_1(i, j, dianji, game, search);
      }
    }
  }

  function search() {

    if (showed.length >= good) {
      game.over();
      alert("祝贺你");
    }
  }

  function dianji(elem, obj) {
    if (elem.getAttribute("val") == 1) {
      obj.over();
      alert("可惜了");
    } else {
      search();
      elem.oncontextmenu = null;
      elem.className = "showed";
      elem.innerHTML = elem.getAttribute("value") == 0 ? "" : elem.getAttribute("value");
      if (elem.getAttribute("value") == 0) {
        obj.showAll(elem.index, obj);
      }
    }
  }
}