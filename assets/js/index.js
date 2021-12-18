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
            document.querySelectorAll('.select-player-btn').forEach((button) => {
                button.classList.add('hidden-btn');
            });
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

    //turn the music off and on
    const musicOn = document.getElementById('music-on');
    const musicOff = document.getElementById('music-off');

    const musicOnOff = (button1, button2) => {
            button1.classList.remove('visible-btn');
            button1.classList.add('hidden-btn');

            button2.classList.remove('hidden-btn');
            button2.classList.add('visible-btn');
    }

    musicOn.onclick = () => {
        musicOnOff(musicOn, musicOff);
        game.music.volume = 0;
        game.bouncySound.volume = 0;
        game.gameOverSound.volume = 0;
        game.jumpingSound.volume = 0;
        game.trapSound.volume = 0;
    }

    musicOff.onclick = () => {
        musicOnOff(musicOff, musicOn);
        game.music.volume = 0.2;
        game.bouncySound.volume = 0.3;
        game.gameOverSound.volume = 1;
        game.jumpingSound.volume = 1;
        game.trapSound.volume = 1;
    }
}


//select player interface
const redButton = document.getElementById('red-sprite');
const linkButton = document.getElementById('link-sprite');
const auraButton = document.getElementById('aura-sprite');
const peachButton = document.getElementById('peach-sprite');
const selectPlayerText = document.getElementById('select-sprite-text');

redButton.onclick = () => {
    game.setPlayer('red-sprite');
    redButton.classList.add('clicked-btn');
    document.querySelectorAll('.select-player-btn').forEach((button) => {
        if(button.classList.contains('clicked-btn')){
            button.classList.remove('clicked-btn');
        }
    });
};

linkButton.onclick = () => {
    game.setPlayer('zelda-sprite');
    linkButton.classList.add('clicked-btn');
    document.querySelectorAll('.select-player-btn').forEach((button) => {
        if(button.classList.contains('clicked-btn')){
            button.classList.remove('clicked-btn');
        }
    });
};

auraButton.onclick = () => {
    game.setPlayer('aura-sprite');
    auraButton.classList.add('clicked-btn');
    document.querySelectorAll('.select-player-btn').forEach((button) => {
        if(button.classList.contains('clicked-btn')){
            button.classList.remove('clicked-btn');
        }
    });
};

peachButton.onclick = () => {
    game.setPlayer('peach-sprite');
    peachButton.classList.add('clicked-btn');
    document.querySelectorAll('.select-player-btn').forEach((button) => {
        if(button.classList.contains('clicked-btn')){
            button.classList.remove('clicked-btn');
        }
    });
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
    document.removeEventListener('game-finished-event', showButtons)
};

document.addEventListener('game-finished-event', showButtons)

//scoreboard logic
const scoresTable = document.getElementById('scores-table');
const scoresTableNames = document.getElementById('score-table-names');
const scoresTableScores = document.getElementById('score-table-scores');
const closeScoreList = document.getElementById('close-score-list');

//get the score list from the localStorage
let storedScores = JSON.parse(localStorage.getItem('scoresList')) || [];

//push new score, sort the list by score and remove items from the 11th score till the end
addScoreBtn.onclick = () => {
    if(inputName.value !== ''){
        storedScores.push({'sprite': game.player.frontImg.src, 'name': inputName.value, 'score': game.score});
        storedScores.sort((a, b) => b.score - a.score).splice(10);
        
        inputName.value = '';

        window.localStorage.clear();
        window.localStorage.setItem('scoresList', JSON.stringify(storedScores));

        storedScores.forEach(object => {
            scoresTable.innerHTML += `
            <tr class="score-row">
                <td><img src='${object.sprite}'</td>
                <td>${object.name}</td>
                <td>${object.score}</td>
            </tr>
            `;
            console.log(object.sprite)
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