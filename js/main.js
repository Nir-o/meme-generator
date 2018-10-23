var canvas;
var ctx;
var gCurrImg;

function init() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    gCurrImg = document.getElementById('start-image');
    renderCanvas(gCurrImg)

}

function renderCanvas(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
}

function onFileInputChange(ev) {
    handleImageFromInput(ev, renderCanvas)
}

function downloadImg(elLink) {
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

// function drawStartMeme() {
//     //  Grab the image
//     var img = document.getElementById('start-image');

//     // When the image has loaded...
//     img.onload = function() {
//     // Work out where to center it
//     x = canvas.width/2 - img.width/2;
//     y = canvas.height/2 - img.height/2;

//     // Draw it
//     ctx.drawImage(img, x, y);
//   }
// }

function creatMeme() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderCanvas(gCurrImg);

    // Defaul style for text
    ctx.lineWidth = 5;
    ctx.font = '20pt impact';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.lineJoin = 'round';

    // Draw the text
    var text = document.getElementById('custom-text').value;
    text = text.toUpperCase();
    x = canvas.width / 2;
    y = canvas.height - canvas.height / 4.5;
    // ctx.drawImage(gCurrImg, 0, 0);
    ctx.strokeText(text, 250, 50);
    ctx.fillText(text, 250, 50);
}