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
            new Platform(ctx, 40, 380),
            new Platform(ctx, 140, 90)
        ];
        this.player = new Player(ctx);
        this.traps = [];
        this.bouncies = [];
        this.intervalId = undefined;
        this.fps = 1000/60;

        this.score = 0;
        this.satellites = 0;

        this.imgSatellite = new Image();
        this.imgSatellite.src = './assets/images/satellite.png';

        this.platformFramesCount = 0;
        this.trapFramesCount = 0;
        this.bouncyFramesCount = 0;
    }

    start(){
        if(!this.intervalId){
            this.intervalId = setInterval(() => {
                if(this.platformFramesCount % platformFrames1 === 0){
                    this.addPlatform();

                    this.platformFramesCount = 0;
                }

                if(this.trapFramesCount % trapFrames === 0){
                    this.addTrap();

                    this.trapFramesCount = 0;
                }

                if(this.bouncyFramesCount % bouncyFrames === 0){
                    this.addBouncy();

                    this.bouncyFramesCount = 0;
                }

                this.clear();

                this.move();

                this.draw();

                this.checkCollisions();

                this.gameOver();

                //Frame Counting
                this.platformFramesCount++;
                this.trapFramesCount++;
                this.bouncyFramesCount++;
                
            }, this.fps);
        }
    }

    clear(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    move(){
        this.background.move();
        this.platforms.forEach(platform => platform.move());
        this.bouncies.forEach(bouncy => bouncy.move());
        this.player.move();
        this.traps.forEach(trap => trap.move());

        this.score++;
    }

    draw(){
        this.background.draw();
        this.platforms.forEach(platform => platform.draw());
        this.bouncies.forEach(bouncy => bouncy.draw());
        this.player.draw();
        this.traps.forEach(trap => trap.draw());

        this.drawScore();

    }

    addPlatform(){
        this.platforms.push(new Platform(this.ctx, Math.floor(Math.random() * (353 - 0 + 1) + 0), -15));
    }

    addTrap(){
        this.traps.push(new Trap(this.ctx, Math.floor(Math.random() * (353 - 0 + 1) + 0)));
    }

    addBouncy(){
        this.bouncies.push(new Bouncy(this.ctx, Math.floor(Math.random() * (330 - 30 + 1) + 30)));
    }

    onKeyDown(event){
        this.player.onKeyDown(event);
    }

    onKeyUp(event){
        this.player.onKeyUp(event);
    }

    checkCollisions(){
        const collidesWithPlatform = this.platforms.find(platform => this.player.collidesWithPlatform(platform));
        if(collidesWithPlatform){
            this.player.vy = -6;  

        }

        const collidesWithTrap = this.traps.find(trap => this.player.collidesWithTrap(trap));
        if(collidesWithTrap){
            this.player.vy = 1;

            this.traps = this.traps.filter(trap => trap !== collidesWithTrap);
            
        }

        const collidesWithBouncy = this.bouncies.find(bouncy => this.player.collidesWithBouncy(bouncy));
        if(collidesWithBouncy){
            this.player.vy = -10;
            
        }
    }

    gameOver(){
        if(this.player.y > this.ctx.canvas.height){
            clearInterval(this.intervalId);
            
            //enlazar con la página de nuevo
        }
    }

    drawScore(){
        this.ctx.save();

        this.ctx.fillStyle = 'rgba(255,255,255, 0.3)';
        this.ctx.strokeStyle = "white";
        this.ctx.strokeRect(0, 0, this.ctx.canvas.width, 40);
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, 40);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '16px sans-serif';
        //draw the main score
        this.ctx.fillText(`Score:`, 15, 25);
        this.ctx.font = 'bold 16px sans-serif';
        this.ctx.fillText(`${this.score}`, 65, 25);

        if(this.score % 2000 === 0){
            this.satellites++;
        }
        //draw the satellites score
        this.ctx.fillText(`x ${this.satellites}`, 385, 25);
        this.ctx.drawImage(
            this.imgSatellite,
            360,
            10,
            20,
            20
        )

        this.ctx.restore();
    }
}