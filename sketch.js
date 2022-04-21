var canvas, dolphin, dolphin_ani, bg, bg1, fish_ani, coin_ani, whale_ani;
var coinGroup, coin, fish, fishGroup, score

function preload(){
    dolphin_ani=loadAnimation("D0.png","D1.png","D2.png","D3.png","D4.png","D5.png","D6.png","D7.png");
    fish_ani = loadAnimation("F0.png","F1.png","F2.png","F3.png","F4.png","F5.png","F6.png","F7.png");
    coin_ani=loadAnimation("C0.png","C1.png","C2.png","C3.png","C4.png","C5.png","C6.png","C7.png","C8.png","C9.png","C10.png","C11.png","C12.png","C13.png","C14.png","C15.png","C16.png","C17.png","C18.png","C19.png","C20.png","C21.png")
    whale_ani=loadAnimation("W0.gif","W1.gif","W2.gif","W3.gif","W4.gif")
    bg_img=loadImage("bg.jpg")
}

function setup() {
    createCanvas(600,400);
    score = 0;
    dolphin = createSprite(50,350,20,10)
    dolphin.addAnimation("SwimmingDolphin", dolphin_ani)
    dolphin.scale = 0.6
    dolphin.debug = true


    bg1 = createSprite(900,200,600,400)
    bg1.addImage(bg_img)
    bg = createSprite(300,200,600,400)
    bg.addImage(bg_img)

    
    dolphin.depth = bg.depth+1
    fishGroup=new Group()
    coinGroup=new Group()
}

function draw() {
    background("#ffffff")
    
    if(keyDown("RIGHT_ARROW")){
        bg.velocityX = -3
        bg1.velocityX = -3
        spawnCoins()
        spawnFish()
        coinGroup.setVelocityXEach(-3)
        coinGroup.setLifetimeEach(-1)
        fishGroup.setVelocityXEach(-6)
        fishGroup.setLifetimeEach(-1)
        if(coinGroup.isTouching(dolphin)){
            // deleteCoin()
            coinGroup.destroyEach()
            score+=1
            // dolphin.bounceOff(coinGroup, deleteCoin)
            // deleteCoin(coinGroup[])
            // console.log(coinGroup.length)
            // coinGroup.pop()
        }
    }
    else{
        bg.velocityX = 0
        bg1.velocityX = 0
        coinGroup.setVelocityXEach(0)
        fishGroup.setVelocityXEach(-3)
    }
    if(bg.x < -300){
        bg.x = 900
    }
    if(bg1.x < -300){
        bg1.x = 900
    }
    if(keyDown("UP_ARROW")){
        dolphin.y-=5
    }
    if(keyDown("DOWN_ARROW")){
        dolphin.y+=5
    }
    if(dolphin.y > 360){
        dolphin.y = 360
    }
    if(dolphin.y < 40){
        dolphin.y = 40
    }
    drawSprites()
    textSize(20)
    fill("black")
    text("Score:"+score, 500,50)
    
}
function spawnCoins(){
    if(frameCount % Math.round(random(80,200))==0){
        coin = createSprite(600, 200, 20,20)
        coin.debug = true
        coin.setCollider("circle", 0,0,40)
        coin.velocityX = -3
        coin.addAnimation("CoinSpin", coin_ani)
        coin.scale = 0.25
        coin.y=Math.round(random(50,350))
        coinGroup.add(coin)
    }
}
function deleteCoin(){
    coin.remove()
}
function spawnFish(){
    if(frameCount % Math.round(random(80,200))==0){
        fish = createSprite(600, 200, 20,20)
        fish.velocityX = -3
        fish.addAnimation("fishSwin", fish_ani)
        fish.scale = 0.25
        fish.y=Math.round(random(50,350))
        fishGroup.add(fish)
    }
}