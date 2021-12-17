const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx);
game.setPlayer('red-sprite');

window.onload = () => {
    //loading page
    setTimeout(() => {
        document.querySelector('.loading-div').style.display = 'none'
    }, 3000);

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


//select player interface
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


//game-over interface
const restartBtn = document.querySelectorAll('.gameover-btn');
const inputName = document.getElementById('input-name');
const addScoreBtn = document.getElementById('score-btn')
function showButtons(event) {
    restartBtn.forEach(button => {
        button.classList.remove('hidden-btn');
        button.classList.add('visible-btn');
    });
    inputName.classList.remove('hidden-btn');
    inputName.classList.add('visible-btn');
    document.removeEventListener('gameFinished-event', showButtons)
}

document.addEventListener('game-finished-event', showButtons)

//scoreboard logic
window.localStorage.setItem('scoreList', JSON.stringify([]));
let storedScores = JSON.parse(localStorage.getItem('scoresList')) ?? [];
addScoreBtn.onclick = () => {
    storedScores.push(
        {'name': inputName.value, 'score': game.score}
    );
    inputName.value = '';
    window.localStorage.clear();
    window.localStorage.setItem('scoresList', JSON.stringify(storedScores));
}




console.log(storedScores[0]);
console.log(storedScores[1]);