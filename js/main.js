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
    var text = document.getElementById("custom-text").value;
    // for (var i = 0; i <= gLineCounter; i++) {
    //     // let el = 'custom-text-' + i;
    //     // var text = document.getElementById(el).value;
    //     // gMeme.txts[0].line = text;
    //     // gMeme.txts[0].lineX = canvas.width / 2 - text.length * 6;
    //     gMeme.txts[i].line = text;
    //     gMeme.txts[i].lineX = canvas.width / 2 - text.length * 6;
    // }
    gMeme.txts[gCurrLine].line = text;
    gMeme.txts[gCurrLine].lineX = canvas.width / 2 - text.length * 6;
    updateInputStyle()

    gMeme.txts[gCurrLine].width = ctx.measureText(text).width

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
            ctx.strokeText(text, gMeme.txts[i].lineX, (gMeme.txts[i].lineY));
        }
        ctx.fillText(text, gMeme.txts[i].lineX, (gMeme.txts[i].lineY));
    }

}

function addLine() {
    gLineCounter += 1;
    // document.querySelector("#inputs").innerHTML += `
    // <p> <input id="custom-text-${gLineCounter}" type="text" placeholder="Enter Text Here" oninput="createMeme()"/></p>
    // `;
    var newLine = {
        line: 'Enter text',
        lineX: 150,
        lineY: 50 + 50 * gLineCounter,
        uppercase: false,
        stroke: true,
        size: 20,
        align: 'left',
        color: "#ffffff"
    };
    gMeme.txts.push(newLine);
    gCurrLine += 1;
    document.getElementById("custom-text").value = '';
}

function lineFocus() {

}

var mouse = {
    x: undefined,
    y: undefined
}


document.getElementById("myCanvas").addEventListener("mousedown", function (event) {
    
    // function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        var clientMouseX = event.clientX - rect.left;
        var clientMouseY = event.clientY - rect.top;
        console.log(event.clientX - rect.left);
        console.log(event.clientY - rect.top);
     
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


