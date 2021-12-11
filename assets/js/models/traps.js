class Trap {
    constructor(ctx, x){
        this.ctx = ctx;
        this.x = x;
        this.y = -15;
        this.width = 50;
        this.height = 30;

        this.vy = 2.5;

        this.img = new Image();
        this.img.src = './assets/images/wifi-icon.png';

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