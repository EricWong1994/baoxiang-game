// const { ZCM_HEIGHT } = require('./config')
const config = {
  ZCM_HEIGHT: 200,
  GAME_TIME: 3000,
}
const { ZCM_HEIGHT, GAME_TIME } = config

/**
 * Created by Administrator on 2015/7/18 0018.
 * 根据 http://www.cnblogs.com/Wayou/p/how-to-make-a-simple-html5-canvas-game.html 改编
 * TODO 把按键玩法改变为触摸玩法
 */
//获取屏幕宽度
var w =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth
var h =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight

//设置按钮的位置
var btn = document.getElementById('btn')
btn.style.left = w / 2.2 + 'px'
btn.style.top = h / 2 + 'px'

// 游戏对象-招财猫
var zcm = {
  speed: 200,
  x: 0,
  y: 0,
}
var good = {
  x: 0,
  y: 0,
}
// 游戏对象-元宝类
function c_yb() {
  var speed = 10,
    x = 0,
    y = 0
}
c_yb.prototype.init = function () {
  this.speed = 10
  this.y = -canvas.height * 2 * Math.random()
  this.x = (canvas.width + 100) * Math.random() - 5
  this.type = Math.random() > 0.5 ? 'small' : 'big'
}
var ybs = []

//创建炸弹对象
function bom() {
  var speed = 3,
    x = 0,
    y = 0
}
bom.prototype.bomb = function () {
  this.speed = 3
  this.y = -canvas.height * 2 * Math.random()
  this.x = (canvas.width + 100) * Math.random() - 5
}
var bomB = new bom()

//游戏对象-时间、分数
var gtime = 0,
  gscore = 0,
  ybsl = 5,
  gstop = true,
  bomb = 1

//touch事件
document.addEventListener('touchstart', touch, false)
document.addEventListener('touchmove', touch, false)
document.addEventListener('touchend', touch, false)

function touch(event) {
  var event = event || window.event
  switch (event.type) {
    case 'touchstart':
      event.preventDefault()
      // oInp.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
      // can.style.left=event.changedTouches[0].clientX+"px";
      // can.style.top=event.changedTouches[0].clientY+"px";
      // zcm.x=event.changedTouches[0].clientX+43.5;
      zcm.y = h - ZCM_HEIGHT
      // zcm.y = h - 300
      if (zcm.x <= 0) {
        zcm.x = 0
      }
      if (zcm.x >= w - 87) {
        zcm.x = w - 87
      }
      break
    case 'touchend':
      event.preventDefault()
      // oInp.innerHTML = "<br>Touch end (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";
      // 禁止点击瞬间移动位置
      // zcm.x = event.changedTouches[0].clientX + 43.5
      zcm.y = h - ZCM_HEIGHT
      if (zcm.x <= 0) {
        zcm.x = 0
      }
      if (zcm.x >= w - 87) {
        zcm.x = w - 87
      }
      break
    case 'touchmove':
      event.preventDefault()
      // oInp.innerHTML = "<br>Touch moved (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
      //    can.style.left=event.changedTouches[0].clientX+"px";
      // can.style.top=event.changedTouches[0].clientY+"px";
      zcm.x = event.changedTouches[0].clientX + 43.5
      zcm.y = h - ZCM_HEIGHT
      if (zcm.x <= 0) {
        zcm.x = 0
      }
      if (zcm.x >= w - 87) {
        zcm.x = w - 87
      }
      break
  }
}

// Create the canvas
var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d')
canvas.width = w
canvas.height = h
document.body.appendChild(canvas)

// 招财猫图片
var zcmReady = false
var zcmImage = new Image()
zcmImage.onload = function () {
  zcmReady = true
}
zcmImage.src = 'imgs2/zcm.png'
// 元宝图片
var ybReady = false
var ybImage = new Image()
ybImage.onload = function () {
  ybReady = true
}
ybImage.src = 'imgs2/yb.png'
// 大元宝
var big_ybReady = false
var big_ybImage = new Image()
big_ybImage.onload = function () {
  big_ybReady = true
}
big_ybImage.src = 'imgs2/big_yb.png'
//炸弹图片
var bomReady = false
var bomImage = new Image()
bomImage.onload = function () {
  bomReady = true
}
bomImage.src = 'imgs2/bomb.png'
//时钟图片
var clockImgReady = false
var clockImage = new Image()
clockImage.onload = function () {
  clockImgReady = true
}
clockImage.src = 'imgs2/clock.png'
//处理按键
var keysDown = {}

addEventListener(
  'keydown',
  function (e) {
    keysDown[e.keyCode] = true
  },
  false
)

addEventListener(
  'keyup',
  function (e) {
    delete keysDown[e.keyCode]
  },
  false
)

//开始新一轮游戏
var reset = function () {
  gstop = false
  gtime = GAME_TIME //时间、分数重置、元宝数
  gscore = 0
  ybsl = 5
  zcm.x = canvas.width / 2 - 43 //猫居中
  zcm.y = canvas.height - ZCM_HEIGHT
  for (var i = 0; i < ybsl; i++) {
    ybs[i] = new c_yb()
    ybs[i].init()
  }
  bomB.bomb()
}

//更新游戏
var update = function (modifier) {
  // console.log('更新游戏');
  if (37 in keysDown) {
    // 用户按的是←
    // zcm.x > -35 ? zcm.x -= zcm.speed * modifier : zcm.x = -34;
    if (zcm.x <= 0) {
      zcm.x = 0 //这里出现一抖抖的
    } else {
      // zcm.x-=zcm.speed*modifier;
      zcm.x -= 10
    }
  }
  if (39 in keysDown) {
    // 用户按的是→
    if (zcm.x < canvas.width - 35) {
      // zcm.x += zcm.speed * modifier;
      zcm.x += 10
    }
    if (zcm.x >= canvas.width - 85) {
      zcm.x = canvas.width - 85
    }
    // else {
    //     zcm.x = canvas.width-70;
    // }
  }

  if (gtime > 0) {
    for (var i = 0; i < ybsl; i++) {
      //炸弹算法  bomB.bomb();bomB.y+=bomB.speed;
      if (bomB.y > canvas.height - 100) {
        if (Math.abs(zcm.x + 44 - bomB.x - 30) < 84) {
          gscore -= 10
        }
        bomB.bomb()
      } else {
        bomB.y += bomB.speed
      }

      // 分数计算-元宝算法
      const { type } = ybs[i]
      if (ybs[i].y > canvas.height - 100) {
        if (Math.abs(zcm.x + 44 - ybs[i].x - 25) < 80) {
          gscore += type === 'big' ? 200 : 10
        }
        ybs[i].init()
      } else {
        ybs[i].y += ybs[i].speed
      }
    }
  } else {
    gstop = true
    ybImage.src = ' ' //让元宝消失；
    bomImage.src = ' '
    // if (38 in keysDown) { // 用户按的是
    //
    // }
    btn.style.display = 'block'
  }
}

btn.addEventListener('click', function () {
  btn.style.display = 'none'
  ybImage.src = 'imgs2/yb.png'
  bomImage.src = 'imgs2/bomb.png'
  reset()
})
//画出所有物体
var render = function () {
  //背景
  ctx.fillStyle = '#ff9588'
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = '#000'
  ctx.font = '16px Helvetica'
  //console.log('画出所有物体');
  if (zcmReady) {
    ctx.drawImage(zcmImage, zcm.x, zcm.y)
  }
  if (ybReady) {
    for (var i = 0; i < ybsl; i++) {
      // ctx.drawImage(ybImage, ybs[i].x, ybs[i].y)
      const { type } = ybs[i]
      ctx.drawImage(type === 'big' ? big_ybImage : ybImage, ybs[i].x, ybs[i].y)
    }
  }

  if (bomReady) {
    ctx.drawImage(bomImage, bomB.x, bomB.y)
  }

  if (gstop) {
    var gradient = ctx.createLinearGradient(0, 0, canvas.width / 2, 0)
    gradient.addColorStop('0', 'magenta')
    gradient.addColorStop('0.5', 'blue')
    gradient.addColorStop('1.0', 'red')
    ctx.fillStyle = gradient
    ctx.font = '30px Helvetica'
    ctx.fillText('你的得分为：' + gscore, canvas.width / 2, canvas.height / 5)
    // ctx.fillText("哎哟，不错哦!",canvas.width/2, canvas.width/4);
    // ctx.fillText("按↑重新开始^_^", canvas.width/2, canvas.width/4.5);
  } else {
    ctx.shadowBlur = 40
    ctx.shadowColor = 'white'
    ctx.textAlign = 'center'
    ctx.fillStyle = '#1A1A1A'
    ctx.font = '30px Helvetica'
    ctx.fillText('分数: ' + gscore, canvas.width / 10, canvas.height / 15)
    ctx.fillText(
      gtime.toString().substring(0, 4),
      // '时间: ' + gtime.toString().substring(0, 4),
      canvas.width / 3,
      canvas.height / 15
    )
    if (clockImgReady) {
      ctx.drawImage(clockImage, canvas.width / 3 - 100, canvas.height / 15 - 20)
    }
  }
}

// 游戏主函数
var main = function () {
  var now = Date.now()
  var delta = now - then
  gtime = (gtime * 1000 - delta) / 1000
  update(delta / 500)
  render()
  then = now
  // 立即调用主函数
  requestAnimationFrame(main)
}

var then = Date.now()
reset()

main()
