class Game {
    constructor(ctx){
        this.ctx = ctx;

        this.background = new Background(ctx);

    }

    start(){

        //this.clear();

        //this.move();

        this.draw();

    }

    draw(){
        this.background.draw();
    }
}