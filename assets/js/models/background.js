class Background {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;

        this.vy = 2.5;

        this.img = new Image();
        this.img.src = "./assets/images/background.png";
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
        );
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y - this.height,
            this.width,
            this.height
        );
    }

    move(){
        this.y += this.vy;
        
        if(this.y > this.ctx.canvas.height){
            this.y = 0;
        }
    }
}