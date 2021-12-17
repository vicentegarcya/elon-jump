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
const addScoreBtn = document.getElementById('score-btn');

function showButtons(event) {
    restartBtn.forEach(button => {
        button.classList.remove('hidden-btn');
        button.classList.add('visible-btn');
    });
    inputName.classList.remove('hidden-btn');
    inputName.classList.add('visible-btn');
    document.removeEventListener('gameFinished-event', showButtons)
};

document.addEventListener('game-finished-event', showButtons)

//scoreboard logic
const scoresTable = document.getElementById('scores-table');
const scoresTableNames = document.getElementById('score-table-names');
const scoresTableScores = document.getElementById('score-table-scores');
const closeScoreList = document.getElementById('close-score-list');

window.localStorage.setItem('scoreList', JSON.stringify([]));

//get the score list from the localStorage
let storedScores = JSON.parse(localStorage.getItem('scoresList')) ?? [];

//push new score, sort the list by score and remove items from the 11th score till the end
addScoreBtn.onclick = () => {
    if(inputName.value !== ''){
        storedScores.push({'name': inputName.value, 'score': game.score});
        storedScores.sort((a, b) => b.score - a.score).splice(10);
        
        inputName.value = '';

        window.localStorage.clear();
        window.localStorage.setItem('scoresList', JSON.stringify(storedScores));

        storedScores.forEach(object => {
            scoresTable.innerHTML += `
            <tr>
                <td>${object.name}</td>
                <td>${object.score}</td>
            </tr>
            `;
        });

        inputName.classList.remove('visible-btn');
        inputName.classList.add('hidden-btn');
        addScoreBtn.classList.remove('visible-btn');
        addScoreBtn.classList.add('hidden-btn');

        scoresTable.classList.remove('non-displayed');
        closeScoreList.classList.remove('non-displayed');
    };
};

//close the score list
closeScoreList.onclick = () => {
    scoresTable.classList.add('non-displayed');
    closeScoreList.classList.add('non-displayed');
};