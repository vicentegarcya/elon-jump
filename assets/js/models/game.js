class Game {
    constructor(ctx){
        this.ctx = ctx;
        this.background = new Background(ctx);
        this.intervalId = undefined;
        this.fps = 1000/60;

    }

    start(){
        if(!this.intervalId){
            this.intervalId = setInterval(() => {
                
                this.clear();

                this.move();

                this.draw();

            }, this.fps)
        }

    }

    clear(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    move(){
        //...
    }

    draw(){
        this.background.draw();
    }
}