const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx);

window.onload = () => {
    document.getElementById('start-btn').onclick = () => {
        game.start();
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

const restartBtn = document.querySelectorAll('.gameover-btn');
function showButtons(event) {
    restartBtn.forEach(button => {
        button.classList.remove('hidden-btn');
        button.classList.add('visible-btn');
    })
    document.removeEventListener('gameFinished-event', showButtons)
}

document.addEventListener('game-finished-event', showButtons)
