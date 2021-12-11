class Bouncy {
    constructor(ctx, x){
        this.ctx = ctx;
        this.x = x;
        this.y = -15;
        this.width = 27;
        this.height = 27;

        this.vy = 2.5;

        this.img = new Image();
        this.img.src = './assets/images/bouncy-icon.png';

        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
        };

        this.imgPlatform = new Image();
        this.imgPlatform.src = './assets/images/platform.png';

        this.imgPlatform.isReady = false;
        this.imgPlatform.onload = () => {
            this.imgPlatform.isReady = true;
        };
    }

    draw(){

        this.ctx.drawImage(
            this.imgPlatform,
            this.x - 25,
            this.y + this.height - 5,
            75,
            20
        )

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