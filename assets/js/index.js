const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx);

//functionality to use the last player you played with
if(window.sessionStorage.length){
    game.setPlayer(window.sessionStorage.getItem('sprite'));

    document.querySelectorAll('.select-player-btn').forEach((button) => {
        if(button.classList.contains('clicked-btn')){
            button.classList.remove('clicked-btn');
        }
    });

    switch (game.playerSprite) {
        case 'red-sprite':
            redButton.classList.add('clicked-btn');
            break;
        case 'zelda-sprite':
            linkButton.classList.add('clicked-btn');
            break;
        case 'aura-sprite':
            auraButton.classList.add('clicked-btn');
            break;
        case 'peach-sprite':
            peachButton.classList.add('clicked-btn');
            break;
    };
} else {
    game.setPlayer('red-sprite');
};

window.onload = () => {
    //loading page
    setTimeout(() => {
        document.querySelector('.loading-div').style.display = 'none'
    }, 3000);

    document.getElementById('start-btn').onclick = () => {
        if(game.player){
            game.start();
            document.getElementById('start-btn').style.display = 'none';
            document.querySelectorAll('.select-player-btn').forEach((button) => {
                button.classList.add('non-displayed');
            });
            selectPlayerText.classList.add('non-displayed');

            window.sessionStorage.setItem('sprite', game.playerSprite);
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
    const musicOnOff = (button1, button2) => {
            button1.classList.add('non-displayed');
            button2.classList.remove('non-displayed');
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
        game.jumpingSound.volume = 0.2;
        game.trapSound.volume = 1;
    }
}


//select player funcionality
redButton.onclick = () => {
    game.setPlayer('red-sprite');
    document.querySelectorAll('.select-player-btn').forEach((button) => {
        if(button.classList.contains('clicked-btn')){
            button.classList.remove('clicked-btn');
        }
    });
    redButton.classList.add('clicked-btn');
};

linkButton.onclick = () => {
    game.setPlayer('zelda-sprite');
    document.querySelectorAll('.select-player-btn').forEach((button) => {
        if(button.classList.contains('clicked-btn')){
            button.classList.remove('clicked-btn');
        }
    });
    linkButton.classList.add('clicked-btn');
};

auraButton.onclick = () => {
    game.setPlayer('aura-sprite');
    document.querySelectorAll('.select-player-btn').forEach((button) => {
        if(button.classList.contains('clicked-btn')){
            button.classList.remove('clicked-btn');
        }
    });
    auraButton.classList.add('clicked-btn');
};

peachButton.onclick = () => {
    game.setPlayer('peach-sprite');
    document.querySelectorAll('.select-player-btn').forEach((button) => {
        if(button.classList.contains('clicked-btn')){
            button.classList.remove('clicked-btn');
        }
    });
    peachButton.classList.add('clicked-btn');
};


//game-over interface
function showButtons(event) {
    restartBtn.forEach(button => {
        button.classList.remove('non-displayed');
    });
    inputName.classList.remove('non-displayed');
    document.removeEventListener('game-finished-event', showButtons)
};

document.addEventListener('game-finished-event', showButtons)

//scoreboard logic
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

        inputName.classList.add('non-displayed');
        addScoreBtn.classList.add('non-displayed');

        scoresTable.classList.remove('non-displayed');
        closeScoreList.classList.remove('non-displayed');
    };
};

//close the score list
closeScoreList.onclick = () => {
    scoresTable.classList.add('non-displayed');
    closeScoreList.classList.add('non-displayed');
};