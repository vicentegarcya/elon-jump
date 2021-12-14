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

        //interval
        this.intervalId = undefined;
        this.fps = 1000/60;

        //scores
        this.score = 0;
        this.satellites = 0;
        this.imgSatellite = new Image();
        this.imgSatellite.src = './assets/images/satellite.png';
        this.imgSatellite.isReady = false;
        this.imgSatellite.onload = () => {
            this.imgSatellite.isReady = true;
        }

        //music
        this.music = new Audio('./assets/sounds/sintonia-2.wav');
        this.music.loop = true;
        this.music.volume = 0.2;

        //sounds
        this.gameOverSound = new Audio('./assets/sounds/game-over-3.mp3');
        this.jumpingSound = new Audio('./assets/sounds/jump-sound.wav');
        this.trapSound = new Audio('./assets/sounds/trap-sound.mp3');
        this.bouncySound = new Audio('./assets/sounds/bouncy-sound.wav');
        this.bouncySound.volume = 0.3;

        //frames
        this.platformFramesCount = 0;
        this.trapFramesCount = 0;
        this.bouncyFramesCount = 0;
    }

    start(){
        if(!this.intervalId){
            this.music.play();
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

                //Frame Counting
                this.platformFramesCount++;
                this.trapFramesCount++;
                this.bouncyFramesCount++;

                console.log(this.platforms.length);
                
            }, this.fps);
        }
    }

    clear(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.bouncies = this.bouncies.filter(bouncy => bouncy.y < 600);

        this.platforms = this.platforms.filter(platform => platform.y < 600);
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
        //Check collisions with platform
        const collidesWithPlatform = this.platforms.find(platform => this.player.collidesWithPlatform(platform));
        if(collidesWithPlatform){
            this.player.vy = -6;  
            this.jumpingSound.play();
        }

        //check collisions with trap
        const collidesWithTrap = this.traps.find(trap => this.player.collidesWithTrap(trap));
        if(collidesWithTrap){
            this.player.vy = 1;
            this.trapSound.play();

            this.traps = this.traps.filter(trap => trap !== collidesWithTrap);
            
        }

        //check collisions with bouncy
        const collidesWithBouncy = this.bouncies.find(bouncy => this.player.collidesWithBouncy(bouncy));
        if(collidesWithBouncy){
            this.player.vy = -10;
            this.bouncySound.play();
        }

        //check Game Over
        if(this.player.y > this.ctx.canvas.height){
            this.gameOver();
            document.dispatchEvent(new CustomEvent('game-finished-event'));
            this.music.pause();
            this.gameOverSound.play();
        }

    }

    gameOver(){
        clearInterval(this.intervalId);
        this.ctx.save();

        //draw the background
        this.ctx.fillStyle = 'rgba(0, 0, 27, 0.7)';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        //draw the score rectangles
        this.ctx.fillStyle = '#fcfaec';
        this.ctx.fillRect(this.ctx.canvas.width / 2 - 65, 110, 140, 200);
        this.ctx.fillStyle = '#00001b';
        this.ctx.strokeStyle = "#fcfaec";
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(this.ctx.canvas.width / 2 - 75, 100, 140, 200);
        this.ctx.fillRect(this.ctx.canvas.width / 2 - 75, 100, 140, 200);

        //draw the score text
        let rectWidth = 140;
        let rectX = this.ctx.canvas.width / 2 - 75;

        this.ctx.fillStyle = '#fcfaec';
        this.ctx.font = '20px Montserrat';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`score`, rectX+(rectWidth/2), 140);
        this.ctx.font = 'bold 26px Montserrat';
        this.ctx.fillText(`${this.score}`, rectX+(rectWidth/2), 175);

        this.ctx.fillStyle = '#fcfaec';
        this.ctx.font = '20px Montserrat';
        this.ctx.textAlign = 'center';
        this.ctx.drawImage(
            this.imgSatellite,
            rectX+(rectWidth/2) - 17,
            200,
            35,
            35
        )
        this.ctx.font = 'bold 28px Montserrat';
        this.ctx.fillText(`${this.satellites}`, rectX+(rectWidth/2), 265);

        this.ctx.restore();
    }

    drawScore(){
        this.ctx.save();

        this.ctx.fillStyle = 'rgba(255, 255, 236, 0.3)';
        this.ctx.strokeStyle = "white";
        this.ctx.strokeRect(0, 0, this.ctx.canvas.width, 40);
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, 40);

        //draw the main score
        this.ctx.fillStyle = '#fcfaec';
        this.ctx.font = '14px Montserrat';
        this.ctx.fillText(`score:`, 15, 25);
        this.ctx.font = 'bold 14px Montserrat';
        this.ctx.fillText(`${this.score}`, 65, 25);

        if(this.score % 2000 === 0){
            this.satellites++;
        }
        //draw the satellites score
        this.ctx.font = '14px Montserrat';
        this.ctx.fillText(`x `, 385, 25);
        this.ctx.font = 'bold 16px Montserrat';
        this.ctx.fillText(`${this.satellites}`, 396, 25);
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