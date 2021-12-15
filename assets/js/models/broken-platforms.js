class BrokenPlatform {
    constructor(ctx, x){
        this.ctx = ctx;
        this.x = x;
        this.y = -30;
        this.width = 75;
        this.height = 32;

        this.vy = 2.5;
        this.vx = 2.5;

        this.img = new Image();
        this.img.src = './assets/images/broken-platform.png';

        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
        }
    }

    draw(){
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    move(){
        this.y += this.vy;
    }
}