let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector(".glow-on-hover");
let msgContainer = document.querySelector(".msg-container");
let turnO = true;

// Initialize Audio Context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Sound effect functions
function playXSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(330, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
}

function playOSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
}

function playWinSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.4); // G5
    
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.6);
}

function playResetSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
}

const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.disabled) return;
        
        const mark = turnO ? "o" : "x";
        box.dataset.mark = mark;
        box.classList.add(mark);
        box.disabled = true;
        
        // Play different sounds for X and O
        if (mark === "x") {
            playXSound();
        } else {
            playOSound();
        }
        
        turnO = !turnO;
        checkWinner();
    });
});

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].dataset.mark;
        let pos2 = boxes[pattern[1]].dataset.mark;
        let pos3 = boxes[pattern[2]].dataset.mark;

        if ((pos1 == "x" || pos1 == "o") && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            pattern.forEach(index => boxes[index].classList.add('winner'));
            disableBoxes();
            return;
        }
    }
    
    if ([...boxes].every(box => box.disabled)) {
        alert("Game Draw!");
        return;
    }
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const showWinner = (winner) => {
    msgContainer.style.display = "block";
    msgContainer.querySelector("p").innerText = `Winner is ${winner}`;
    playWinSound();
};

resetButton.addEventListener("click", () => {
    boxes.forEach(box => {
        box.dataset.mark = "";
        box.disabled = false;
        box.classList.remove('winner', 'x', 'o');
    });
    msgContainer.style.display = "none";
    turnO = true;
    playResetSound();
});