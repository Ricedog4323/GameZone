const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const audio = new Audio("Audio.mp3");

const size = 30;
const gridSize = 30;

const snake = [
    { x: 180, y: 180 },
    { x: 210, y: 180 },
];

let direction = "right";

const drawSnake = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the entire canvas
    ctx.fillStyle = "#ddd";  // Color for snake

    snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, size, size);  // Draw each snake segment
    });
};

const moveSnake = () => {
    const head = snake[snake.length - 1];
    let newHead;

    // Move the snake based on current direction
    if (direction === "right") {
        newHead = { x: head.x + size, y: head.y };
    } else if (direction === "left") {
        newHead = { x: head.x - size, y: head.y };
    } else if (direction === "up") {
        newHead = { x: head.x, y: head.y - size };
    } else if (direction === "down") {
        newHead = { x: head.x, y: head.y + size };
    }

    snake.push(newHead);  // Add the new head
    snake.shift();  // Remove the last part of the snake to keep the same length
};

const drawGrid = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "gray";

    // Draw grid lines on the canvas
    for (let i = 0; i < canvas.width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
};

const randomPosition = () => {
    return Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
};

const randomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`;
};

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor(),
};

const drawFood = () => {
    ctx.shadowColor = "white";
    ctx.shadowBlur = 10;
    ctx.fillStyle = food.color;
    ctx.fillRect(food.x, food.y, size, size);
    ctx.shadowBlur = 0;
};

const checkEat = () => {
    const head = snake[snake.length - 1];

    // If the snake's head collides with food
    if (head.x === food.x && head.y === food.y) {
        snake.push({ ...head });  // Add a new segment to the snake
        audio.play();

        // Reposition the food
        food.x = randomPosition();
        food.y = randomPosition();
        food.color = randomColor();
    }
};

const checkCollision = () => {
    const head = snake[snake.length - 1];

    // If the snake collides with the wall (border)
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        resetGame();
    }
};

const resetGame = () => {
    // Reset the snake to its initial state
    snake.length = 2;
    snake[0] = { x: 180, y: 180 };
    snake[1] = { x: 210, y: 180 };

    // Reset the direction
    direction = "right";
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

// Set an interval to continuously update the game every 150ms
setInterval(() => {
    moveSnake();
    drawSnake();
    drawGrid();
    drawFood();
    checkEat();
    checkCollision();
}, 150);

// Initial function calls to set up the game
drawGrid();
