const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const size = 30;

const snake = [
    { x: 180, y: 180 }, 
    { x: 210, y: 180 }, 
];

let direction = "right";

const drawSnake = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ddd";

    snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, size, size);
    });
};

const moveSnake = () => {
    const head = snake[snake.length - 1];

    let newHead;
    if (direction === "right") {
        newHead = { x: head.x + size, y: head.y };
    } else if (direction === "left") {
        newHead = { x: head.x - size, y: head.y };
    } else if (direction === "up") {
        newHead = { x: head.x, y: head.y - size };
    } else if (direction === "down") {
        newHead = { x: head.x, y: head.y + size };
    }

    snake.push(newHead);
    snake.shift();
};

window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    } else if (event.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    } else if (event.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    } else if (event.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    }
});

setInterval(() => {
    moveSnake();
    drawSnake();
    drawGrid();
    drawFood();
    checkEat();
    checkCollision();
},150);

const drawGrid = () => {
    ctx.lineWidth = 1

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.lineTo(i, 0)
    ctx.lineTo(i, 600)
    ctx.stroke()
    ctx.beginPath()

    ctx.lineTo(0, i)
    ctx.lineTo(600, i)
    ctx.stroke()
    ctx.beginPath()
    }
}

drawGrid()

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0,255)
    const blue = randomNumber(0,255)

    return `rgb(${red}, ${green}, ${blue})`
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

const drawFood = () => {

    const { x, y, color} = food
    ctx.shadowColor = "white"
    ctx.shadowBlur = 50
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur0
}

const checkEat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        snake.push(head)

    food.x = randomPosition();
    food.y = randomPosition();
    food.color = randomColor();
    }
}

const checkCollision = () => {
    const head = snake[snake.length - 1]
    if (head.x < 0 || head.x > 570 || head.y < 0 || head.y > 570)
        alert("Game Over")
    const canvasLimit = canvas.width - size
}