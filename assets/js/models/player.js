class Player {
    constructor(ctx, sprite = 'zelda-sprite'){
        this.ctx = ctx;
        this.sprite = sprite;
        this.x = 40;
        this.y = 450;
        this.width = 50;
        this.height = 52;

        this.vx = 0;
        this.vy = -6;
        this.ay = 0.2;

        this.img = new Image();
        this.img.src = `./assets/images/${this.sprite}.png`;
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
            this.frameX = 3;
        }

        if(event.keyCode === RIGHT_KEY){
            this.vx = 3;
            this.frameX = 1;
        }
    }

    onKeyUp(event){
        if(event.keyCode === LEFT_KEY || event.keyCode === RIGHT_KEY){
            this.vx = 0;
        }
    }

    collidesWithPlatform(platform){
        if (
            this.y + this.height >= platform.y &&
            this.x + this.width / 2 >= platform.x &&
            this.x + 10 <= platform.x + platform.width &&
            this.y + this.height <= platform.y + platform.height -10 &&
            this.vy >= -1
        ){
            if(this.frameX === 1){
                this.frameX = 0;
            }

            if(this.frameX === 3){
                this.frameX = 2;
            }

            return true
        }

        return false
    }

    collidesWithTrap(trap){
        if(
            this.x < trap.x + trap.width &&
            this.x + this.width > trap.x &&
            this.y < trap.y + trap.height &&
            this.y + this.height > trap.y
        ){
            return true;
        }

        return false;
    }

    collidesWithBouncy(bouncy){
        if(
            this.y + this.height >= bouncy.y + 5 &&
            this.x + this.width - 14 >= bouncy.x &&
            this.x + 14 <= bouncy.x + bouncy.width &&
            this.y + this.height <= bouncy.y + bouncy.height &&
            this.vy >= -1
        ){
            return true;
        }

        return false;
    }
}