const choiceButtons = document.querySelectorAll('[data-choice]');
const finalColumn = document.querySelector('[data-final-column]');
const yourScoreSpan = document.querySelector('[data-yourScore]');
const computerScoreSpan = document.querySelector('[data-computerScore]');
const CHOICE_LIST = [
    {
        name: 'Rock',
        emoji: '✊',
        beats: 'Scissor'
    },
    {
        name: 'Paper',
        emoji: "✋",
        beats: 'Rock'
    },
    {
        name: 'Scissor',
        emoji: '✌️',
        beats: 'Paper'
    }
];

choiceButtons.forEach(choice => {
    choice.addEventListener('click', (e) => {
        choiceName = choice.dataset.choice;
        const hit = CHOICE_LIST.find(choice => choice.name === choiceName);
        makeChoice(hit);
        makeRandomChoice();
    })
});

const makeChoice = (yourChoice) => {
    const computerChoice = makeRandomChoice();
    const youWinner = winner(yourChoice, computerChoice);
    const computerWinner = winner(computerChoice, yourChoice);
    handleResult(computerChoice, computerWinner);
    handleResult(yourChoice, youWinner);

    if(youWinner) handleScore(yourScoreSpan);
    if(computerWinner) handleScore(computerScoreSpan);
}

const makeRandomChoice = () => {
    const randomIdx = Math.floor(Math.random() * CHOICE_LIST.length) ;
    return CHOICE_LIST[randomIdx];
}

const winner = (choice, opponentChoice) => {
    return (choice.beats === opponentChoice.name);
}

const handleResult = (choiceObj, winner) => {
    const div = document.createElement('div');
    div.innerText = choiceObj.emoji;
    div.classList.add('choice-selected');
    if(winner) div.classList.add('winner');
    finalColumn.after(div);
}

const handleScore = (scoreSpan) => {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}