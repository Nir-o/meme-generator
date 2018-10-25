var gCurrLine = 0;
var gLineCounter = 0;
var gImgs = [{ id: 1, url: '/meme-imgs/9.jpg', keywords: ['happy'] }];
var gMeme = {
    selectedImgId: 1,
    txts: [
        {
            line: 'Enter text',
            lineX: 0,
            lineY: 50,
            uppercase: false,
            stroke: true,
            size: 20,
            align: 'left',
            color: "#ffffff",
            width: undefined,
            isFocused: false,
        },
    ]
}

function selectedMeme(img) {
    gMeme.selectedImgId = img.id;
    gCurrImg = img;
    renderCanvas(img)
}

function deleteText() {
    gMeme.txts[gCurrLine].line = '';
    updateInputStyle()
    var elToReset = document.getElementById("custom-text");
    elToReset.value = '';
}

function toggleUppercase() {
    gMeme.txts[gCurrLine].uppercase = !gMeme.txts[gCurrLine].uppercase;
    if (gMeme.txts[gCurrLine].uppercase) gMeme.txts[gCurrLine].line = gMeme.txts[gCurrLine].line.toUpperCase();
    else gMeme.txts[gCurrLine].line = gMeme.txts[gCurrLine].line.toLowerCase();
    updateInputStyle()
}

function toggleStroke() {
    gMeme.txts[gCurrLine].stroke = !gMeme.txts[gCurrLine].stroke;
    updateInputStyle()
}

function fontResize(resize) {
    gMeme.txts[gCurrLine].size += resize;
    updateInputStyle()
}

function lineAlign(direction) {
    gMeme.txts[gCurrLine].lineX += direction;
    updateInputStyle()
}

function lineAlignCenter() {
    // gMeme.txts[gCurrLine].lineX = canvas.width / 2 - gMeme.txts[gCurrLine].line.length * 6;
    gMeme.txts[gCurrLine].lineX = canvas.width / 2 - ctx.measureText(gMeme.txts[gCurrLine].line).width / 2;
    gMeme.txts[gCurrLine].lineY = 50;
    updateInputStyle()
}

function lineHeight(direction) {
    gMeme.txts[gCurrLine].lineY += direction;
    updateInputStyle()
}

// Color select button handler
document.getElementById("color-wheel").addEventListener("change", watchColorPicker, false);

function watchColorPicker(event) {
    var colorSelector = document.querySelector("#color-wheel")
    gMeme.txts[gCurrLine].color = colorSelector.value;
    updateInputStyle()
}

function switchLine(line) {
    if (line === undefined) {
        gCurrLine += 1;
        if (gCurrLine > gLineCounter) gCurrLine = 0;
    } else {
        gCurrLine = line;
    }
    document.getElementById("custom-text").value = gMeme.txts[gCurrLine].line;
    // lineFocus(gCurrLine);
}

function deleteLine() {
    if (gLineCounter === 0) {
        console.log('Cannot delete more lines!');
        return
    }
    gMeme.txts.splice(gCurrLine, 1);
    gLineCounter -= 1;
    updateInputStyle()
    gCurrLine -= 1;
    if (gCurrLine < 0) gCurrLine = 0;
    document.getElementById("custom-text").value = gMeme.txts[gCurrLine].line;
}

