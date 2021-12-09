class Platform {
    constructor(ctx){
        this.ctx = ctx;
        this.x = Math.floor(Math.random() * (353 - 0 + 1) + 0);
        this.y = -15;
        this.width = 75;
        this.height = 20;

        this.vy = 3;

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
        console.log(this.x)
    }

    move(){
        this.y += this.vy;
    }
}