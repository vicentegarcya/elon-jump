window.onload = () => {
    const canvas = document.getElementById('my-canvas');
    const ctx = canvas.getContext('2d');

    const game = new Game(ctx);
    game.start();

    //eventListener start-btn
}


