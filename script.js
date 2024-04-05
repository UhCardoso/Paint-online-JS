const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d", { willReadFrequently: true });

const inputColor = document.querySelector('.input__color');
const tools = document.querySelectorAll('.button__tool');
const sizeButtons = document.querySelectorAll('.button__size');
const buttonClear = document.querySelector('.button__clear');

let brushSize = 10;
let isPainting = false;
let activeTool = "rubber";
let xInitial = 0;
let yInitial = 0;
let snapshot = '';

inputColor.addEventListener("change", ({ target }) => {
    ctx.fillStyle = target.value;
})

canvas.addEventListener("mousedown", ({ clientX, clientY }) => {
    isPainting = true;

    if (activeTool == "brush") {
        draw(clientX, clientY);
    }

    if (activeTool == "rubber") {
        erase(clientX, clientY);
    }

    if (activeTool == 'form-box') {
        xInitial = clientX;
        yInitial = clientY;
    }
})

canvas.addEventListener("mousemove", ({ offsetX, offsetY, clientX, clientY }) => {
    if (isPainting) {
        if (activeTool == "brush") {
            draw(clientX, clientY);
        }

        if (activeTool == "rubber") {
            erase(clientX, clientY);
        }

        if (activeTool == 'form-box') {
            let width = offsetX - xInitial;
            let height = offsetY - yInitial;

            // Limpa o canvas antes de desenhar o novo retângulo
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.rect(xInitial, yInitial, width, height);
            ctx.stroke();
        }
    }
})

canvas.addEventListener("mouseup", () => {
    isPainting = false;
})

const draw = (x, y) => {
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize / 2, 0, 2 * Math.PI);
    ctx.fill()
}

const erase = (x, y) => {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize / 2, 0, 2 * Math.PI);
    ctx.fill()
}

const selectTool = ({ target }) => {
    const selectedTool = target.closest("button");
    const action = selectedTool.getAttribute("data-action");

    if (action) {
        tools.forEach((tool) => { tool.classList.remove('active') });
        selectedTool.classList.add('active');
        activeTool = action
    }
}

const selectSize = ({ target }) => {
    const selectedTool = target.closest("button");
    const size = selectedTool.getAttribute("data-size");

    sizeButtons.forEach((tool) => { tool.classList.remove('active') });
    selectedTool.classList.add('active');
    brushSize = size;
}

tools.forEach((tool) => {
    tool.addEventListener("click", selectTool);
})

sizeButtons.forEach((button) => {
    button.addEventListener("click", selectSize);
})

buttonClear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

/**
let canvas = document.getElementById('yourCanvasId');
let ctx = canvas.getContext('2d');
let isPainting = false;
let xInitial, yInitial;
let rectangulos = []; // Lista para armazenar os retângulos desenhados

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    xInitial = e.offsetX;
    yInitial = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
    if (isPainting && activeTool === 'form-box') {
        // Armazena o retângulo atual ao soltar o botão do mouse
        rectangulos.push({x: xInitial, y: yInitial, width: e.offsetX - xInitial, height: e.offsetY - yInitial});
        isPainting = false;
    }
});

canvas.addEventListener('mousemove', ({ offsetX, offsetY }) => {
    if (isPainting && activeTool === 'form-box') {
        let width = offsetX - xInitial;
        let height = offsetY - yInitial;

        // Redesenha todos os retângulos anteriores
        redesenharRetangulos();

        // Desenha o retângulo atual
        ctx.beginPath();
        ctx.rect(xInitial, yInitial, width, height);
        ctx.stroke();
    }
});

function redesenharRetangulos() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    // Redesenha cada retângulo armazenado
    rectangulos.forEach(({x, y, width, height}) => {
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();
    });
}
 */
