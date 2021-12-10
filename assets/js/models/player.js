class Player {
    constructor(ctx){
        this.ctx = ctx;
        this.x = 40;
        this.y = 450;
        this.width = 50;
        this.height = 52;

        this.vx = 0;
        this.vy = -5;
        this.ay = 0.2;

        this.img = new Image();
        this.img.src = './assets/images/player.png';
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
        }

        this.horizontalFrames = 4;
        this.verticalFrames = 1;

        this.frameX = 0;
        this.frameY = 0;

    }

    draw(){
        this.ctx.drawImage(
            this.img,
            (this.img.width * this.frameX) / this.horizontalFrames,
            (this.img.height * this.frameY) / this.verticalFrames,
            this.img.width / this.horizontalFrames,
            this.img.height / this.verticalFrames,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    move(){
        //movement on x axis
        this.x += this.vx;

        if(this.x > this.ctx.canvas.width){
            this.x = -15;
        }

        if(this.x + this.width < 0){
            this.x = this.ctx.canvas.width - 25;
        }

        //movement on y axis
        this.y += this.vy;
        this.vy += this.ay;
    }

    onKeyDown(event){
        if(event.keyCode === LEFT_KEY){
            this.vx = -3;
        }

        if(event.keyCode === RIGHT_KEY){
            this.vx = 3;
        }
    }

    onKeyUp(event){
        if(event.keyCode === LEFT_KEY || event.keyCode === RIGHT_KEY){
            this.vx = 0;
        }
    }

    collidesWithPlatform(platform){
        if (
            this.x < platform.x + platform.width &&
            this.x + this.width > platform.x &&
            this.y < platform.y + platform.height &&
            this.y + this.height > platform.y
        ){
            return true
        }

        return false
    }
}