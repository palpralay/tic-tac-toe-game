let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector(".glow-on-hover");
let msgContainer = document.querySelector(".msg-container");
let turnO = true;

const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.disabled) return;
        
        const mark = turnO ? "O" : "X";
        box.innerText = mark;
        box.classList.add(mark === "X" ? "x-mark" : "o-mark");
        box.disabled = true;
        turnO = !turnO;
        
        checkWinner();
    });
});

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            pattern.forEach(index => boxes[index].classList.add('winner'));
            disableBoxes();
            return true;
        }
    }
    
    if ([...boxes].every(box => box.disabled)) {
        alert("Game Draw!");
        return true;
    }
    return false;
};

const showWinner = (winner) => {
    msgContainer.innerText = `Player ${winner} wins!`;
    msgContainer.style.display = "block";
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

resetButton.addEventListener("click", () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        box.classList.remove('winner', 'x-mark', 'o-mark');
    });
    msgContainer.style.display = "none";
    turnO = true;
});