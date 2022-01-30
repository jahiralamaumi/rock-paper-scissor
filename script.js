const moves = document.querySelectorAll('[data-choice]'); // returns array
const yourScore = document.querySelector('[data-yourScore]');
const botScore = document.querySelector('[data-botScore]');
const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', () => {
    const divs = document.querySelectorAll('.choice-selected');
    const scores = document.querySelectorAll('.result-score');
    divs.forEach( div => div.remove());
    scores.forEach (score => score.innerText = 0);
})
const MOVE_LIST = [
    {
        title: 'Rock',
        emoji: '✊',
        beats: 'Scissor'
    },
    {
        title: 'Paper',
        emoji: '✋',
        beats: 'Rock'
    },
    {
        title: 'Scissor',
        emoji: '✌️',
        beats: 'Paper'
    }
];

moves.forEach(move => {
    move.addEventListener('click', (e) => {
        const yourMove = move.dataset.choice;  //returns value of data-choice
        const yourMoveSet = MOVE_LIST.find(move => move.title === yourMove);
        const botMoveSet = MOVE_LIST[Math.floor(Math.random() * MOVE_LIST.length)];
        const youWon = isWinner(yourMoveSet, botMoveSet);
        const botWon = isWinner(botMoveSet, yourMoveSet);
        appendResult(botMoveSet, botWon);
        appendResult(yourMoveSet, youWon);
        if(youWon) handleScore(yourScore);
        if(botWon) handleScore(botScore);
    })
})

const isWinner = (winnerMove, loserMove) => {
    return winnerMove.beats === loserMove.title;
}

const appendResult = (move, isWinner) => {
    const div = document.createElement('div');
    const finalColumn = document.querySelector('[data-final-column]');
    div.innerText = move.emoji;
    div.classList.add('choice-selected');
    if(isWinner) div.classList.add('winner');
    finalColumn.after(div);
}

const handleScore = (scoreSpan) => {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}