window.onload = () => {
    const canvas = document.getElementById('my-canvas');
    const ctx = canvas.getContext('2d');

    const game = new Game(ctx);

    document.getElementById('start-btn').onclick = () => {
        game.start()
    };
    
    // keydown listener

    // keyup listener

}


