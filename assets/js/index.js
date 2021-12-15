const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx);

window.onload = () => {
    document.getElementById('start-btn').onclick = () => {
        if(game.player){
            game.start();
            redButton.classList.add('hidden-btn');
            linkButton.classList.add('hidden-btn');
            selectPlayerText.classList.add('hidden-btn');
        }
        if(!game.player){
            alert('choose a player!');
        }
    };
    
    // keydown listener
    document.onkeydown = (event) => {
        game.onKeyDown(event);
    }

    // keyup listener
    document.onkeyup = (event) => {
        game.onKeyUp(event);
    }
}

const redButton = document.getElementById('red-sprite');
const linkButton = document.getElementById('link-sprite');
const selectPlayerText = document.getElementById('select-sprite-text');

redButton.onclick = () => {
    game.setPlayer('red-sprite');
    redButton.classList.add('clicked-btn');
    linkButton.classList.remove('clicked-btn');
};

linkButton.onclick = () => {
    game.setPlayer('zelda-sprite');
    linkButton.classList.add('clicked-btn');
    redButton.classList.remove('clicked-btn');
};

const restartBtn = document.querySelectorAll('.gameover-btn');
function showButtons(event) {
    restartBtn.forEach(button => {
        button.classList.remove('hidden-btn');
        button.classList.add('visible-btn');
    })
    document.removeEventListener('gameFinished-event', showButtons)
}

document.addEventListener('game-finished-event', showButtons)
