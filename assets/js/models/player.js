class Player {
    constructor(ctx){
        this.ctx = ctx;
        this.x = 40;
        this.y = 450;
        this.width = 50;
        this.height = 52;

        this.img = new Image();
        this.img.src = './assets/images/player.png';
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
        }

        this.horizontalFrames = 4;
        this.verticalFrames = 1;

        this.frameX = 3;
        this.frameY = 0;

        //this.goesRight = false;
        //this.goesLeft = false;

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

    }
}