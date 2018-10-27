var canvas;
var ctx;
var gCurrImg;

function init() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    // gCurrImg = document.getElementById('start-image');
}

function renderCanvas(img) {
    //     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
}

function onFileInputChange(ev) {
    handleImageFromInput(ev, renderImgFitByRatio)
}

function downloadImg(elLink) {
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

function createMeme() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // renderCanvas(gCurrImg);
    renderImgFitByRatio(canvas, gCurrImg);
    var text = document.getElementById("custom-text").value;
    gMeme.txts[gCurrLine].line = text;
    // gMeme.txts[gCurrLine].lineX = canvas.width / 2 - text.length * 6;
    gMeme.txts[gCurrLine].lineX = canvas.width / 2 - ctx.measureText(text).width / 2;
    updateInputStyle()
    gMeme.txts[gCurrLine].width = ctx.measureText(text).width
}

function updateInputStyle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // renderCanvas(gCurrImg);
    renderImgFitByRatio(canvas, gCurrImg);
    for (var i = 0; i <= gLineCounter; i++) {
        var text = gMeme.txts[i].line
        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';
        ctx.font = gMeme.txts[i].size + 'pt impact';
        ctx.fillStyle = gMeme.txts[i].color;
        ctx.textAlign = gMeme.txts[i].align;
        if (gMeme.txts[i].stroke) {
            ctx.strokeStyle = 'black';
            ctx.strokeText(text, gMeme.txts[i].lineX, (gMeme.txts[i].lineY));
        }
        ctx.fillText(text, gMeme.txts[i].lineX, (gMeme.txts[i].lineY));
    }
}

function addLine() {
    gLineCounter += 1;
    var newLine = {
        line: 'Enter text',
        lineX: 150,
        lineY: 50 + 50 * gLineCounter,
        uppercase: false,
        stroke: true,
        size: 20,
        align: 'left',
        color: "#ffffff",
        width: undefined,
        isFocused: false,
    };
    gMeme.txts.push(newLine);
    gCurrLine += 1;
    document.getElementById("custom-text").value = '';
}

var mouse = {
    x: undefined,
    y: undefined
}

// Handles user clicks on lines.
document.getElementById("myCanvas").addEventListener("mousedown", function (event) {
    var rect = canvas.getBoundingClientRect();
    var clientMouseX = event.clientX - rect.left;
    var clientMouseY = event.clientY - rect.top;

    for (var i = 0; i <= gLineCounter; i++) {

        var line = gMeme.txts[i];
        xRangeMin = line.lineX;
        xRangeMax = line.lineX + line.width;
        yRangeMin = line.lineY - line.size;
        yRangeMax = line.lineY;
        console.log('line being checked ', line);

        if (clientMouseX >= xRangeMin && clientMouseX <= xRangeMax && clientMouseY >= yRangeMin && clientMouseY <= yRangeMax) {
            gCurrLine = i;
            switchLine(gCurrLine);
            console.log('clicked line: ', gCurrLine);
        }
    }
});


function renderImgFitByRatio(canvas, imageObj) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var imageAspectRatio = imageObj.width / imageObj.height;
    var canvasAspectRatio = canvas.width / canvas.height;
    var renderableHeight, renderableWidth, xStart, yStart;

    if (imageAspectRatio < canvasAspectRatio) {
        renderableHeight = canvas.height;
        renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
        xStart = (canvas.width - renderableWidth) / 2;
        yStart = 0;
    }

    // If image's aspect ratio is greater than canvas's we fit on width
    // and place the image centrally along height
    else if (imageAspectRatio > canvasAspectRatio) {
        renderableWidth = canvas.width
        renderableHeight = imageObj.height * (renderableWidth / imageObj.width);
        xStart = 0;
        yStart = (canvas.height - renderableHeight) / 2;
    }

    // Happy path - keep aspect ratio
    else {
        renderableHeight = canvas.height;
        renderableWidth = canvas.width;
        xStart = 0;
        yStart = 0;
    }
    ctx.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);

    canvasImagePositions = {
        start: {
            x: xStart,
            y: yStart
        },
        end: {
            x: parseInt(xStart) + parseInt(renderableWidth),
            y: parseInt(yStart) + parseInt(renderableHeight)
        },
        size: {
            width: renderableWidth,
            height: renderableHeight
        }
    }
}