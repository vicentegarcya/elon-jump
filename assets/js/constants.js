//keyboard
const RIGHT_KEY = 39;
const LEFT_KEY = 37;

//select player buttons
const redButton = document.getElementById('red-sprite');
const linkButton = document.getElementById('link-sprite');
const auraButton = document.getElementById('aura-sprite');
const peachButton = document.getElementById('peach-sprite');

//game-over buttons
const restartBtn = document.querySelectorAll('.gameover-btn');
const inputName = document.getElementById('input-name');
const addScoreBtn = document.getElementById('score-btn');

//scoreboard elements
const scoresTable = document.getElementById('scores-table');
const scoresTableNames = document.getElementById('score-table-names');
const scoresTableScores = document.getElementById('score-table-scores');
const closeScoreList = document.getElementById('close-score-list');

//music on/off buttons
const musicOn = document.getElementById('music-on');
const musicOff = document.getElementById('music-off');