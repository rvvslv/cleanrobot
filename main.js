/**
 * Created by mac on 6/28/25
 */

const size = 20;
const gridElem = document.getElementById("grid");

let grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => Math.random() < 0.3)
);

let robot = { x: 0, y: 0, dir: 'RIGHT' };
let visited = new Map();
let stepCounter = 0;
let timer = null;

function renderGrid() {
    gridElem.innerHTML = '';
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const cell = document.createElement("div");
            cell.className = "cell";

            if (!grid[y][x]) {
                cell.classList.add("clean");
            }

            const visitStep = visited.get(`${x},${y}`);
            if (visitStep !== undefined) {
                const age = stepCounter - visitStep;
                const maxAge = 50;
                const intensity = Math.max(0, 1 - age / maxAge);
                const blue = Math.floor(255 - intensity * 80);
                const green = Math.floor(236 - intensity * 50);
                cell.style.backgroundColor = `rgb(208, ${green}, ${blue})`;
            }

            if (robot.x === x && robot.y === y) {
                const r = document.createElement("div");
                r.className = "robot";

                const dirMap = {
                    'UP': 'rotate(-90deg)',
                    'RIGHT': 'rotate(0deg)',
                    'DOWN': 'rotate(90deg)',
                    'LEFT': 'rotate(180deg)'
                };
                r.style.transform = dirMap[robot.dir];
                cell.appendChild(r);
            }

            cell.onclick = () => {
                grid[y][x] = !grid[y][x];
                renderGrid();
            };

            gridElem.appendChild(cell);
        }
    }

    updateMemoryView();
}

function updateMemoryView() {
    const memEl = document.getElementById("memoryView");
    memEl.textContent = JSON.stringify(robotMemory, null, 2);
}

function doStep() {
    if (typeof nextStep !== 'function') return;

    stepCounter++;
    visited.set(`${robot.x},${robot.y}`, stepCounter);

    const action = nextStep({
        x: robot.x,
        y: robot.y,
        cellIsDirty: grid[robot.y][robot.x],
    });

    if (!action) return;

    if (action === 'CLEAN') {
        grid[robot.y][robot.x] = false;
    } else if (action === 'MOVE UP' && robot.y > 0) {
        robot.y--;
        robot.dir = 'UP';
    } else if (action === 'MOVE DOWN' && robot.y < size - 1) {
        robot.y++;
        robot.dir = 'DOWN';
    } else if (action === 'MOVE LEFT' && robot.x > 0) {
        robot.x--;
        robot.dir = 'LEFT';
    } else if (action === 'MOVE RIGHT' && robot.x < size - 1) {
        robot.x++;
        robot.dir = 'RIGHT';
    }

    renderGrid();
    timer = setTimeout(doStep, 150);
}

function randomizeGrid() {
    grid = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => Math.random() < 0.3)
    );
}

function resetSimulation() {
    robot = { x: 0, y: 0, dir: 'RIGHT' };
    visited = new Map([[`0,0`, 0]]);
    stepCounter = 0;
    clearTimeout(timer);
    randomizeGrid();
    renderGrid();
}

async function reloadAlgorithm() {
    const old = document.getElementById("algo-script");
    if (old) old.remove();

    const script = document.createElement("script");
    script.id = "algo-script";
    script.src = 'algorithm.js?t=' + Date.now();
    document.body.appendChild(script);
}

window.start = async function () {
    await reloadAlgorithm();
    resetSimulation();
    doStep();
};

window.reset = resetSimulation;
window.randomizeGrid = () => {
    randomizeGrid();
    renderGrid();
};

renderGrid();