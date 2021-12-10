class Platform {
    constructor(ctx, x, y){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 75;
        this.height = 20;

        this.vy = 2.5;

        this.img = new Image();
        this.img.src = './assets/images/platform.png';

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