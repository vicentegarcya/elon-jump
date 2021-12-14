class Bouncy {
    constructor(ctx, x){
        this.ctx = ctx;
        this.x = x;
        this.y = -42;
        this.width = 25;
        this.height = 27;

        this.vy = 2.5;

        this.img = new Image();
        this.img.src = './assets/images/bouncy-icon.png';

        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
        };
    }

    draw(){
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        );
        
    }

    move(){
        this.y += this.vy;
    }

}