class Game {
    constructor(ctx){
        this.ctx = ctx;
        this.background = new Background(ctx);
        this.platforms = [
            new Platform(ctx, 20, 500),
            new Platform(ctx, 95, 475),
            new Platform(ctx, 350, 360),
            new Platform(ctx, 160, 300),
            new Platform(ctx, 265, 220),
            new Platform(ctx, 80, 230),
            new Platform(ctx, 329, 430),
            new Platform(ctx, 213, 510),
            new Platform(ctx, 140, 180),
            new Platform(ctx, 190, 270),
            new Platform(ctx, 0, 20),
            new Platform(ctx, 40, 330),
            new Platform(ctx, 140, 90)
        ];
        this.player = new Player(ctx);
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
        this.player.draw();

    }

    addPlatform(){
        this.platforms.push(new Platform(this.ctx, Math.floor(Math.random() * (353 - 0 + 1) + 0), -15))
    }
}