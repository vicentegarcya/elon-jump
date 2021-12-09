class Game {
    constructor(ctx){
        this.ctx = ctx;
        this.background = new Background(ctx);
        this.platforms = [];
        this.intervalId = undefined;
        this.fps = 1000/60;

        this.platformFramesCount = 0;
    }

    start(){
        if(!this.intervalId){
            this.intervalId = setInterval(() => {
                if(this.platformFramesCount % platformFrames === 0){
                    this.addPlatform();

                    this.platformFramesCount = 0;
                }
                this.clear();

                this.move();

                this.draw();

                this.platformFramesCount++;
                
            }, this.fps);
        }
    }

    clear(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    move(){
        this.background.move();
        this.platforms.forEach(platform => platform.move());


    }

    draw(){
        this.background.draw();
        this.platforms.forEach(platform => platform.draw());
    

    }

    addPlatform(){
        this.platforms.push(new Platform(this.ctx))
    }
}