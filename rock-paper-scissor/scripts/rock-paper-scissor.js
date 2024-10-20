
let score = JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        losses: 0,
        ties: 0
    };  //  Default operator

/*if(!score) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };
}*/

updateScoreElement();

let isAutoPlaying = false;

let intervalId;

function autoPlay() {
    if(!isAutoPlaying) {
        document.querySelector('.js-auto-play').innerHTML = 'Stop playing';

        /*
        intervalId = setInterval(function() {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        */

        // arrow function
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.js-auto-play').innerHTML = 'Auto Play';
    }
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}

function showResetConfirmation() {
    document.querySelector('.js-reset-confirmation').innerHTML=`
        <p>Are you sure you want to reset the score?</p>
        <button class="js-reset-confirm-yes reset-confirm-button">
            Yes
        </button>
        <button class="js-reset-confirm-no reset-confirm-button">
            No
        </button>
    `;

    document.querySelector('.js-reset-confirm-yes').addEventListener('click', () => {
        resetScore();
        hideResetConfirmation();
    });

    document.querySelector('.js-reset-confirm-no').addEventListener('click', () => {
        hideResetConfirmation();
    });
}

function hideResetConfirmation() {
    document.querySelector('.js-reset-confirmation').innerHTML = '';
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissor-button').addEventListener('click', () => {
    playGame('scissor');
});

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
    showResetConfirmation();
});

document.querySelector('.js-auto-play').addEventListener('click', () => {
    autoPlay();
});

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r') {
        playGame('rock');
    } else if(event.key === 'p') {
        playGame('paper');
    } else if(event.key === 's') {
        playGame('scissor');
    } else if(event.key === 'a') {
        autoPlay();
    } else if(event.key === 'Backspace') {
        reset
    }
});

function playGame(playerMove) {
    computerMove = pickComputerMove();       

    let result = '';

    if(playerMove === 'scissor') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissor') {
            result = 'Tie.'
        }
    }
    else if(playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissor') {
            result = 'You lose.'
        }
    }
    else if(playerMove === 'rock'){
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissor') {
            result = 'You win.'
        }
    }

    if(result === 'You win.') {
        score.wins++;
    } else if (result === 'You lose.') {
        score.losses++;
    } else if (result === 'Tie.') {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();
    
    

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon">Computer`;

    /*
    alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`); 
    */
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


function pickComputerMove() {
    let computerMove = '';

    const randomNumber = Math.random();
    
    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'scissor';
    }  

    return computerMove;
}
