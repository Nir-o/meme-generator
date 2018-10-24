var canvas;
var ctx;
var gCurrImg;

function init() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    gCurrImg = document.getElementById('start-image');

}

function renderCanvas(img) {
    ctx.drawImage(img, 0, 0);
}

function onFileInputChange(ev) {
    handleImageFromInput(ev, renderCanvas)
}

function downloadImg(elLink) {
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

function createMeme() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderCanvas(gCurrImg);
    for (var i = 0; i <= gLineCounter; i++) {
        let el = 'custom-text-' + i;
        var text = document.getElementById(el).value;
        // gMeme.txts[0].line = text;
        // gMeme.txts[0].lineX = canvas.width / 2 - text.length * 6;
        gMeme.txts[i].line = text;
        gMeme.txts[i].lineX = canvas.width / 2 - text.length * 6;
    }
    updateInputStyle()
}



function updateInputStyle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderCanvas(gCurrImg);
    for (var i = 0; i <= gLineCounter; i++) {
        var text = gMeme.txts[i].line
        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';
        ctx.font = gMeme.txts[i].size + 'pt impact';
        ctx.fillStyle = gMeme.txts[i].color;
        ctx.textAlign = gMeme.txts[i].align;
        if (gMeme.txts[i].stroke) {
            ctx.strokeStyle = 'black';
            ctx.strokeText(text, gMeme.txts[i].lineX, (gMeme.txts[i].lineY + i * 50));
        }
        ctx.fillText(text, gMeme.txts[i].lineX, (gMeme.txts[i].lineY + i * 50));
    }

}

function addLine() {
    gLineCounter += 1;
    document.querySelector("#inputs").innerHTML += `
    <p> <input id="custom-text-${gLineCounter}" type="text" placeholder="Enter Text Here" oninput="createMeme()"/></p>
    `;
    var newLine = {
        line: 'Enter text',
        lineX: 150,
        lineY: 50,
        uppercase: false,
        stroke: true,
        size: 20,
        align: 'left',
        color: "#ffffff"
    };
    gMeme.txts.push(newLine);
    gCurrLine += 1;
}

function lineFocus() {

}

document.body.addEventListener("mousedown", function (event) {
    if (utils.rectanlePointCollision(event.clientX, event.clientY, handle)) {
        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp);
        offset.x = event.clientX - handle.x;
        offset.y = event.clientY - handle.y;
    }
});

function onMouseMove(event) {
    handle.x = event.clientX;// - offset.x;
    handle.y = event.clientY;// - offset.y;
    draw();
}

function onMouseUp(event) {
    document.body.removeEventListener("mousemove", onMouseMove);
    document.body.removeEventListener("mouseup", onMouseUp);
}


};
